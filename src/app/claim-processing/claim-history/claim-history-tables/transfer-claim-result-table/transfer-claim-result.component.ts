import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TransferClaimResultModel} from '../../claim-history-models/transfer-claim-result.model';

@Component({
  selector: 'fox-transfer-claim-result-table',
  templateUrl: './transfer-claim-result.component.html',
  styleUrls: ['./transfer-claim-result.component.css']
})

export class TransferClaimResultTableComponent {

  @Input() transferClaimResult: TransferClaimResultModel[] = [];
  @Output() selectedMember = new EventEmitter<TransferClaimResultModel>();

  selectMember(data): void {
    const selectedMemberDetails = data;
    this.selectedMember.emit(selectedMemberDetails);
  }

}
