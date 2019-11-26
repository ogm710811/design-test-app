import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClaimHistoryApi, DedAggrIndicatorVO} from '@fox/rest-clients';
import * as uuid from 'uuid';
import DedAggrIndicatorEnum = DedAggrIndicatorVO.DedAggrIndicatorEnum;

@Component({
  selector: 'fox-reactivate-claim-modal',
  templateUrl: './reactivate-claim-modal.component.html',
  styleUrls: ['./reactivate-claim-modal.component.css']
})

export class ReactivateClaimModalComponent {

  @Input() reactivateModalVisible: boolean;
  @Input() claimNumber: number;

  @Output() reactivateModalVisibleChange = new EventEmitter<boolean>();
  @Output() cancelReactivateClaim: EventEmitter<'cancel'> = new EventEmitter<'cancel'>();
  @Output() confirmReactivateClaimModal: EventEmitter<'confirm'> = new EventEmitter<'confirm'>();
  @Output() responseMsg = new EventEmitter<string>();
  @Output() reactivateClmSuccessMsg = new EventEmitter<boolean>();
  @Output() reactivateClmFailMsg = new EventEmitter<boolean>();
  @Output() responseVal = new EventEmitter<string>();

  isReactiveClaim: boolean = false;
  dedAgrInctrVO: DedAggrIndicatorVO;
  statusCode: string = 'D';

  constructor(private claimHistorySearchApi: ClaimHistoryApi) {
  }

  cancelReactivateModal(): void {
    this.isReactiveClaim = false;
    this.cancelReactivateClaim.emit('cancel');
  }

  onChangeReactive(): void {
    this.isReactiveClaim = !this.isReactiveClaim;
  }

  reactivateClaim(): void {
    this.dedAgrInctrVO = {
      'dedAggrIndicator': DedAggrIndicatorEnum.N
    };
    if (this.isReactiveClaim) {
      this.dedAgrInctrVO.dedAggrIndicator = DedAggrIndicatorEnum.Y;
    } else {
      this.dedAgrInctrVO.dedAggrIndicator = DedAggrIndicatorEnum.N;
    }
    const resp = this.claimHistorySearchApi.reactivateClaim(uuid(), this.claimNumber, this.dedAgrInctrVO, 'response');

    resp.subscribe(response => {
      if (response.status === 200) {
        const msg = response.headers.get('message');
        if (msg !== null) {
          this.responseMsg.emit(msg);
        }
        this.reactivateClmSuccessMsg.emit(true);
        this.responseVal.emit(this.statusCode);
        this.confirmReactivateClaimModal.emit('confirm');
      }

    }, (e) => {
      const msg = e.headers.get('message');
      if (msg !== null) {
        this.responseMsg.emit(msg);
      }
      this.reactivateClmFailMsg.emit(true);
      this.confirmReactivateClaimModal.emit('confirm');
    });
  }
}
