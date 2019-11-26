import {Component, Input} from '@angular/core';
import {ResourceOfClaimHistoryClaimMessagesVO} from '@fox/rest-clients';

@Component({
  selector: 'fox-claim-details-message',
  templateUrl: './claim-details-message.component.html',
  styleUrls: ['../../claim-details.component.css']
})

export class ClaimDetailsMessageComponent {

  @Input() claimMessagesResult: ResourceOfClaimHistoryClaimMessagesVO[] = [];

}
