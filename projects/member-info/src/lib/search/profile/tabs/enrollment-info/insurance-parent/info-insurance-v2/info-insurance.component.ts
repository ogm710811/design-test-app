import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  EligibilityUiApi,
  PlanVO,
  ResourceOfEligibilityVO
} from '@fox/rest-clients';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as uuidConst from 'uuid';
import {FeatureFlagService} from '@fox/shared';
import {MemberBenefitModificationComponent} from '../../../../../../shared/member-benefit-modification/member-benefit-modification.component';
import {InsurancePlanModification} from '../insurance-plan-modification';

const uuid = uuidConst;

@Component({
  selector: 'fox-member-enrollment-info-insurance',
  templateUrl: './info-insurance.component.html',
  styleUrls: ['./info-insurance.component.css']
})
export class InfoInsuranceComponent implements OnInit, OnDestroy {
  column = 'planCode';
  direction = -1;
  isDesc = false;
  memberEligibility: ResourceOfEligibilityVO = new ResourceOfEligibilityVO();
  insurancePlans: PlanVO[] = [];
  insurancePlanModificationData: InsurancePlanModification = {
    benefitModifications: [],
    planCode: ''
  };
  hasEligibilityServiceData: boolean = true;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() membershipNumber: string = '';
  @ViewChild(MemberBenefitModificationComponent) benefitModModal?: MemberBenefitModificationComponent;

  get toggleEligibilityFeature(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F4015');
  }

  constructor(
    private eligibilityService: EligibilityUiApi,
    private featureFlagSvc: FeatureFlagService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.appInit();
    }, 3000);
  }

  appInit(): void {
    if (this.membershipNumber && this.toggleEligibilityFeature) {
      this.eligibilityService.getCompasEligibility(this.membershipNumber, uuid())
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
          if (res) {
            this.memberEligibility = res;
            if (this.memberEligibility.plans) {
              this.insurancePlans = this.memberEligibility.plans;
            }
          }
        }, err => {
          if (err.status === 404) {
            this.hasEligibilityServiceData = false;
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSort(col: string): void {
    this.column = col;
    this.isDesc = !this.isDesc;
    this.direction = this.isDesc ? 1 : -1;
  }

  openBenModModal(planItem: number): void {
    const insurancePlanItem = this.insurancePlans[planItem];
    if (insurancePlanItem) {
      if (insurancePlanItem.benMod && insurancePlanItem.planCode) {
        this.insurancePlanModificationData.planCode = insurancePlanItem.planCode;
        this.insurancePlanModificationData.benefitModifications = insurancePlanItem.benMod;
      }
    }
    if (this.benefitModModal) {
      this.benefitModModal.openModal();
    }
  }
}
