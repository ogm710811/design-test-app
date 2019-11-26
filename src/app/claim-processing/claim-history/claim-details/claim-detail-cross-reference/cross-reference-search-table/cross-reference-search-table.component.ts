import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClaimHistoryResultSet} from '../../../claim-history-models/claim-history-result.model';

@Component({
  selector: 'fox-cross-reference-search-table',
  templateUrl: './cross-reference-search-table.component.html',
  styleUrls: ['../../claim-details.component.css']
})

export class CrossReferenceSearchTableComponent {
  @Input() claimHistoryResults: ClaimHistoryResultSet[] = [];
  @Input() claimAddArray: string[] = [];
  @Input() isDesc: boolean = false;
  @Input() column: string = '';

  @Output() isDescChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() columnChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectEvent: EventEmitter<string> = new EventEmitter<string>();

  claimValue: string = '';

  sort(property: string): void {
    this.isDesc = !this.isDesc; // change the direction
    this.isDescChange.emit(this.isDesc);

    this.column = property;
    this.columnChange.emit(this.column);
  }

  getClaim(data: string): void {
    this.claimValue = data;
    this.selectEvent.emit(this.claimValue);
  }

}
