import {Component, Input} from '@angular/core';
import {ResourceOfClaimHistoryBillLineMessagesVO} from '@fox/rest-clients';

@Component({
  selector: 'fox-bill-lines-messages',
  templateUrl: './bill-lines-messages-table.component.html',
  styleUrls: ['../../claim-details.component.css']
})

export class BillLinesMessagesTableComponent {

  @Input() billLinesResults: ResourceOfClaimHistoryBillLineMessagesVO[] = [];

  get dataKeys(): string[] {
    return Object.keys(this.billLinesResults[0]);
  }

}
