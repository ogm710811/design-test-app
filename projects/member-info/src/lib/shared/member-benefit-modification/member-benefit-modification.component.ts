import {Component, Input, ViewChild} from '@angular/core';
import {CancelConfirmModal, ModalComponent} from '@fox/shared';
import {InsurancePlanModification} from '../../search/profile/tabs/enrollment-info/insurance-parent/insurance-plan-modification';

@Component({
  selector: 'fox-member-benefit-modification',
  templateUrl: './member-benefit-modification.component.html',
  styleUrls: ['./member-benefit-modification.component.css']
})
export class MemberBenefitModificationComponent extends CancelConfirmModal<void> {
  @Input() insurancePlanModificationData: InsurancePlanModification = new InsurancePlanModification();
  @ViewChild('modal') modal?: ModalComponent<void>;

  get planCode(): string {
    return this.insurancePlanModificationData.planCode;
  }

  get numberOfBenModifications(): number {
    const benefitModifications = this.insurancePlanModificationData.benefitModifications;
    if (benefitModifications) {
      return this.insurancePlanModificationData.benefitModifications.length;
    }
    return 0;
  }

  constructor() {
    super();
  }
}
