import {DatePipe} from '@angular/common';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  AccountMembershipResponseVO,
  EligibilityUiApi,
  GetClaimDeliveryPreferenceVO,
  ResourceOfEligibilityVO
} from '@fox/rest-clients';
import {Subscription} from 'rxjs/Subscription';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {FeatureFlagService} from '@fox/shared';
import {MemberInformationService} from '../../../../shared/member-information.service';

@Component({
  selector: 'fox-member-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.css']
})

export class DemographicsComponent implements OnInit, OnDestroy {
  @Input() membershipNumber: string = '';
  memberProfile: AccountMembershipResponseVO = new AccountMembershipResponseVO();
  memberEligibility: ResourceOfEligibilityVO = new ResourceOfEligibilityVO();
  mProfileSubscription: Subscription = new Subscription();
  @Input() memberPreference: GetClaimDeliveryPreferenceVO = new GetClaimDeliveryPreferenceVO();

  get toggleMemberDemographicsVersionFeature(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F2752');
  }

  get currentMemberPhone(): string {
    let phoneNumber = '';
    if (this.memberProfile && this.memberProfile.memberDetails) {
      const phoneArr = this.memberProfile.memberDetails.phone;

      if (phoneArr && phoneArr.length > 0) {
        const phoneNo = phoneArr[phoneArr.length - 1].phoneNumber;
        if (phoneNo) {
          phoneNumber = phoneNo;
        }
      }
    }
    return phoneNumber;
  }

  get toggleEligibilityFeature(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F4015');
  }

  constructor(
    private memberInformationService: MemberInformationService,
    private eligibilityUiService: EligibilityUiApi,
    private datePipe: DatePipe,
    private featureFlagSvc: FeatureFlagService
  ) {}

  ngOnInit(): void {
    this.mProfileSubscription = this.memberInformationService.memberProfileChanges$.subscribe(
      mProfile => {
        this.memberProfile = mProfile;
      }
    );
    setTimeout(() => {
      this.appInit();
    }, 3000);
  }

  appInit(): void {
    if (this.membershipNumber && this.toggleEligibilityFeature) {
      this.eligibilityUiService.getCompasEligibility(this.membershipNumber, uuid()).subscribe(eligibilityResp => {
        if (eligibilityResp) {
          this.memberEligibility = eligibilityResp;
        }
      });
    }
  }

  checkMemberProfile(): boolean {
    if (this.memberProfile && this.memberProfile.memberDetails && this.memberProfile.memberDetails.aarpMembershipNumber && this.memberProfile.memberDetails.householdId) {
      return true;
    }
    return false;
  }

  calcMemberNumber(): string {
    if (this.memberProfile && this.memberProfile.memberDetails && this.memberProfile.memberDetails.aarpMembershipNumber && this.memberProfile.memberDetails.aarpMembershipNumber.membershipNumber && this.memberProfile.memberDetails.aarpMembershipNumber.associationId && this.memberProfile.memberDetails.householdId && this.memberProfile.memberDetails.householdId[0].insuredCode) {
      return (this.memberProfile.memberDetails.aarpMembershipNumber.membershipNumber - this.memberProfile.memberDetails.aarpMembershipNumber.associationId - +(this.memberProfile.memberDetails.householdId[0].insuredCode)).toString();
    }
    return '';
  }

  get premiumPaidDate(): string {
    let premiumDate = '';
    if (this.memberEligibility) {
      const date = (this.memberEligibility.premiumPaidThru) ? this.datePipe.transform(this.memberEligibility.premiumPaidThru, 'MM/dd/yyyy') : '';
      premiumDate = date as string;
    }
    return premiumDate;
  }

  ngOnDestroy(): void {
    if (this.mProfileSubscription) {
      this.mProfileSubscription.unsubscribe();
    }
  }
}
