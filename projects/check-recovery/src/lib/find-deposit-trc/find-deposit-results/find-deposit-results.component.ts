import {Component, EventEmitter, Input, Output} from '@angular/core';
import {checkRecoveryUrlPrefixDepositDetail} from '@fox/shared';
import {FindDepositResultSet} from '../find-deposit-result.model';

@Component({
  selector: 'fox-find-deposit-results',
  templateUrl: './find-deposit-results.component.html',
  styleUrls: ['../find-deposit-trc.component.css']
})
export class FindDepositResultsComponent {
  @Input() findDepositResults: FindDepositResultSet[] = [];

  @Input() isDesc: boolean = false;
  @Input() column: string = 'depositDetailId';

  @Output() isDescChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() columnChange: EventEmitter<string> = new EventEmitter<string>();

  get dataKeys(): string[] {
    return Object.keys(this.findDepositResults[0]);
  }

  constructor() {
  }

  getUrlForCheck(depositDetails: string): string {
    return checkRecoveryUrlPrefixDepositDetail + depositDetails;
  }

  sort(property: string): void {
    this.isDesc = !this.isDesc; // change the direction
    this.isDescChange.emit(this.isDesc);

    this.column = property;
    this.columnChange.emit(this.column);
  }
}
