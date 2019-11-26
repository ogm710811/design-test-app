import {Component, Input} from '@angular/core';
import {ResourceOfClaimHistoryDetailVO} from '@fox/rest-clients';

@Component({
  selector: 'fox-transfer-claim-details-table',
  templateUrl: './transfer-claim-details.component.html',
  styleUrls: ['./transfer-claim-details.component.css']
})

export class TransferClaimDetailsTableComponent {

  @Input() claimDetails: ResourceOfClaimHistoryDetailVO;
  @Input() claimNumber: string;
  @Input() dos: string;

}
