import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClaimHistoryApi, DedAggrIndicatorVO} from '@fox/rest-clients';
import * as uuid from 'uuid';
import DedAggrIndicatorEnum = DedAggrIndicatorVO.DedAggrIndicatorEnum;

@Component({
  selector: 'fox-suspend-claim-modal',
  templateUrl: './suspend-claim-modal.component.html',
  styleUrls: ['./suspend-claim-modal.component.css']
})

export class SuspendClaimModalComponent {

  @Input() suspendClaimModalVisible: boolean;
  @Input() claimNumber: number;
  @Input() hasDeductible: boolean;

  @Output() suspendModalVisibleChange = new EventEmitter<boolean>();
  @Output() cancelSuspendClaim: EventEmitter<'cancel'> = new EventEmitter<'cancel'>();
  @Output() responseMsg = new EventEmitter<string>();
  @Output() suspendClmSuccessMsg = new EventEmitter<boolean>();
  @Output() suspendClmFailMsg = new EventEmitter<boolean>();
  @Output() confirmSuspendClaimModal: EventEmitter<'confirm'> = new EventEmitter<'confirm'>();
  @Output() responseVal = new EventEmitter<string>();

  isSuspendClaim: boolean = false;
  dedAgrInctrVO: DedAggrIndicatorVO;
  statusCode: string = 'S';
  constructor(private claimHistorySearchApi: ClaimHistoryApi) {
  }

  cancelSuspendModal(): void {
    this.isSuspendClaim = false;
    this.cancelSuspendClaim.emit('cancel');
  }

  onChangeSuspend(): void {
    this.isSuspendClaim = !this.isSuspendClaim;
  }

  suspendClaim(): void {
    this.dedAgrInctrVO = {
      'dedAggrIndicator': DedAggrIndicatorEnum.N
    };
    if (this.isSuspendClaim) {
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
        this.suspendClmSuccessMsg.emit(true);
        this.responseVal.emit(this.statusCode);
        this.confirmSuspendClaimModal.emit('confirm');
      }

    }, (e) => {
      const msg = e.headers.get('message');
      if (msg !== null) {
        this.responseMsg.emit(msg);
      }
      this.suspendClmFailMsg.emit(true);
      this.confirmSuspendClaimModal.emit('confirm');
    });
  }
}
