import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  AccountMembershipResponseVO,
  GetClaimDeliveryPreferenceVO,
  PreferenceApi
} from '@fox/rest-clients';
import {Subscription} from 'rxjs/Subscription';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {FeatureFlagService} from '@fox/shared';
import {MemberInformationService} from '../../../../../shared/member-information.service';

@Component({
  selector: 'fox-member-demographics-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit, OnDestroy {

  @Input() membershipNumber: string = '';
  @Input() memberPreference: GetClaimDeliveryPreferenceVO = new GetClaimDeliveryPreferenceVO();

  memberProfile: AccountMembershipResponseVO = new AccountMembershipResponseVO();
  mProfileSubscription: Subscription = new Subscription();

  get toggleMemberPreferenceDeliveryFeature(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F1974');
  }

  constructor(
      private preferenceApi: PreferenceApi,
      private memberInformationService: MemberInformationService,
      private featureFlagSvc: FeatureFlagService
  ) {}

  ngOnInit(): void {
    this.mProfileSubscription = this.memberInformationService.memberProfileChanges$.subscribe(
      mProfile => {
        this.memberProfile = mProfile;
        if (this.toggleMemberPreferenceDeliveryFeature) {
          this.getPreferenceDelivery();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.mProfileSubscription.unsubscribe();
  }

  getPreferenceDelivery(): void {
    if (this.memberProfile
      && this.memberProfile.memberDetails
      && this.memberProfile.memberDetails.aarpMembershipNumber
      && this.memberProfile.memberDetails.householdId
    ) {
      const membershipNumber = (this.memberProfile.memberDetails.aarpMembershipNumber['membershipNumber'] + ''
        + this.memberProfile.memberDetails.aarpMembershipNumber['associationId'] + ''
        + this.memberProfile.memberDetails.householdId[0]['insuredCode']);

      this.preferenceApi.getClaimDeliveryPreference(membershipNumber, uuid()).subscribe(res => {
        const memberNumber = res.memberNumber;
        if (res && memberNumber) {
          this.memberPreference = res;
        }
      });
    }
  }
}
