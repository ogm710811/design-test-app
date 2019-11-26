import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  AccountMembershipResponseVO,
  ClaimsMemberApi,
  SpecialHandlingCodesVO
} from '@fox/rest-clients';
import {Subscription} from 'rxjs/Subscription';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {FeatureFlagService} from '@fox/shared';
import {MemberInformationService} from '../../../../../shared/member-information.service';

@Component({
  selector: 'fox-member-enrollment-info-handling-code',
  templateUrl: './handling-code.component.html',
  styleUrls: ['./handling-code.component.css', './cross-browser-stylesheet.css']
})
export class HandlingCodeComponent implements OnInit, OnChanges, OnDestroy {

  @Input() membershipNumber: string = '';
  @Input() isSpecialHCUpdated: boolean = false;
  memberProfile: AccountMembershipResponseVO = new AccountMembershipResponseVO();
  mProfileSubscription: Subscription = new Subscription();
  @Output() specialHandlingCode: EventEmitter<boolean> = new EventEmitter<boolean>();

  handlingDataSource: SpecialHandlingCodesVO[] = [];

  get toggleMemberSpecialHandlingCodeFeature(): boolean {
    return !this.featureFlagService.isFeatureDisabled('F1343');
  }

  constructor(
    private claimInsuredMemberApi: ClaimsMemberApi,
    private memberInformationService: MemberInformationService,
    private featureFlagService: FeatureFlagService) {
  }

  ngOnInit(): void {
    this.mProfileSubscription = this.memberInformationService.memberProfileChanges$.subscribe(
      mProfile => {
        this.memberProfile = mProfile;
        if (this.toggleMemberSpecialHandlingCodeFeature) {
          this.specHandlingCodeTable();
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isSpecialHCUpdated.currentValue && this.toggleMemberSpecialHandlingCodeFeature) {
      this.specHandlingCodeTable();
    }
  }

  ngOnDestroy(): void {
    if (this.mProfileSubscription) {
      this.mProfileSubscription.unsubscribe();
    }
  }

  specHandlingCodeTable(): void {
    if (this.memberProfile && this.memberProfile.memberDetails && this.memberProfile.memberDetails.aarpMembershipNumber && this.memberProfile.memberDetails.householdId && this.memberProfile.memberDetails.householdId.length > 0) {
      const membershipNumber = (this.memberProfile.memberDetails.aarpMembershipNumber.membershipNumber + '' + this.memberProfile.memberDetails.aarpMembershipNumber.associationId + '' + this.memberProfile.memberDetails.householdId[0].insuredCode);
      if (this.featureFlagService.isFeatureDisabled('F2606')) {
        this.claimInsuredMemberApi.specialHandlingCodes(membershipNumber, uuid()).subscribe(res => {
          if (res) {
            const specialHandlingResults: SpecialHandlingCodesVO[] = [];
            const specialHandlingData = res;
            if (specialHandlingData.length > 0) {
              for (let i = 0; i < specialHandlingData.length; i++) {
                const specialHandlingItem = this.getSpecialHandlingItem(specialHandlingData, i);
                specialHandlingResults.push(specialHandlingItem);
                if (specialHandlingItem.specHandlingCode !== undefined) {
                  this.specialHandlingCode.emit(true);
                }
              }
            }
            this.handlingDataSource = specialHandlingResults;
          }
        });
      }
    }
  }

  getSpecialHandlingItem(specialHandlingData: any, i: number): SpecialHandlingCodesVO {
    return {
      specialHandlingCode: specialHandlingData[i].specialHandlingCode || '',
      description: specialHandlingData[i].description || '',
      addedBy: specialHandlingData[i].addedBy || '',
      dateAdded: specialHandlingData[i].dateAdded || ''
    };
  }
}
