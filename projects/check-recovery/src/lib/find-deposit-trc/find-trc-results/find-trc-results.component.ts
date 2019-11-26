import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TreasuryReconciliationSummaryVO} from '@fox/rest-clients';
import {checkRecoveryUrlPrefixDepositDetail, claimProcessingUrlPrefixClaimDetails} from '@fox/shared';

@Component({
  selector: 'fox-find-trc-results',
  templateUrl: './find-trc-results.component.html',
  styleUrls: ['../find-deposit-trc.component.css']
})
export class FindTrcResultsComponent {
  direction = 1;
  @Input() findTrcResults: TreasuryReconciliationSummaryVO[] = [];

  @Input() isDesc: boolean = false;
  @Input() column: string = 'id';

  @Output() isDescChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() columnChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  getUrlForDeposit(depositDetails: string): string {
    return checkRecoveryUrlPrefixDepositDetail + depositDetails;
  }

  getUrlForClaimDetails(claimId: string): string {
    return claimProcessingUrlPrefixClaimDetails + claimId;
  }

  sort(property: string): void {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
    this.isDescChange.emit(this.isDesc);
    this.columnChange.emit(this.column);
  }
}
