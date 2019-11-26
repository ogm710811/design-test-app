import {Component, Input} from '@angular/core';
import {ClaimHistoryAuditVO} from '@fox/rest-clients';

@Component({
  selector: 'fox-claim-details-audit',
  templateUrl: './claim-details-audit-log.component.html',
  styleUrls: ['./claim-details-audit-log.component.css']
})

export class ClaimDetailsAuditComponent {
  @Input() claimAuditDetails: ClaimHistoryAuditVO;
  @Input() suspendReason: string = '';
  @Input() qualityErrorCode: string = '';
}
