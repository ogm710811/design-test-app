import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClaimHistoryApi} from '@fox/rest-clients';
import * as _ from 'lodash';
import * as uuid from 'uuid';
import {SendReplaceEobResultModel} from '../../../claim-history-models/send-replace-eob-result.model';

@Component({
  selector: 'fox-send-replace-eob-modal',
  templateUrl: './send-replace-eob-modal.component.html',
  styleUrls: ['./send-replace-eob-modal.component.css']
})

export class SendReplaceEobModalComponent {

  @Input() sendReplaceModalVisible: boolean;
  @Input() enableSendReplace: boolean;
  @Input() eobModalType: string;
  @Input() eobModalTitle: string;
  @Input() sendReplaceEobResultSet: SendReplaceEobResultModel[] = [];
  @Input() sendReplaceEobValidateSet: SendReplaceEobResultModel[] = [];
  @Input() isEobActive: boolean;
  @Input() isRaActive: boolean;

  @Output() sendReplaceModalVisibleChange = new EventEmitter<boolean>();
  @Output() cancelSendReplace: EventEmitter<'cancel'> = new EventEmitter<'cancel'>();
  @Output() confirmSendReplace: EventEmitter<'confirm'> = new EventEmitter<'confirm'>();
  @Output() sendReplaceSuccessMsg = new EventEmitter<boolean>();
  @Output() sendReplaceFailMsg = new EventEmitter<boolean>();
  @Output() responseMsg = new EventEmitter<string>();

  claimNumArray: number[] = [];

  constructor(private claimHistorySearchApi: ClaimHistoryApi) {
  }

  cancelModalEob(): void {
    this.cancelSendReplace.emit('cancel');
  }

  sendReplaceEob(): void {
    this.claimNumArray = [];

    for (let i = 0; i < this.sendReplaceEobValidateSet.length; i++) {
      if (this.sendReplaceEobValidateSet[i].eobIndicator === 'Y' || this.sendReplaceEobValidateSet[i].raIndicator === 'Y') {
        this.claimNumArray.push(this.sendReplaceEobValidateSet[i].claimNumber);
      }
    }

    const res = this.claimHistorySearchApi.sendMultiSendReplaceEobRa(this.claimNumArray, this.eobModalType, uuid(), 'response');

    res.subscribe(response => {

      const msg = response.headers.get('message');
      if (msg !== null) {
        this.responseMsg.emit(msg);
      }
      if (response.status !== 201) {
        this.failedResponse();
      } else {
        this.successResponse();
      }
      this.confirmSendReplace.emit('confirm');

    }, (e) => {
      const msg = e.headers.get('message');
      if (msg !== null) {
        this.responseMsg.emit(msg);
      }
      this.failedResponse();
      this.confirmSendReplace.emit('confirm');
    });
  }

  checkEligibility(): boolean {
    let isDisable: boolean = true;

    for (let i = 0; i < this.sendReplaceEobResultSet.length; i++) {
      if (this.sendReplaceEobResultSet[i].eobIndicator === 'Y' || this.sendReplaceEobResultSet[i].raIndicator === 'Y') {
        isDisable = false;
        break;
      }
    }
    return isDisable;
  }

  failedResponse(): void {
    this.sendReplaceFailMsg.emit(true);
  }

  successResponse(): void {
    this.sendReplaceSuccessMsg.emit(true);
  }

  checkIndicator(row, indicator): void {
    this.enableSendReplace = false;

    const tempResult: SendReplaceEobResultModel[] = _.cloneDeep(this.sendReplaceEobValidateSet);

    if (indicator === 'eob') {
      tempResult[row].eobIndicator = (tempResult[row].eobIndicator === 'Y') ? 'N' : 'Y';
    }
    if (indicator === 'ra') {
      tempResult[row].raIndicator = (tempResult[row].raIndicator === 'Y') ? 'N' : 'Y';
    }

    for (let i = 0; i < tempResult.length; i++) {
      if (tempResult[i].eobIndicator === 'Y' || tempResult[i].raIndicator === 'Y') {
        this.enableSendReplace = true;
        break;
      }
    }

    this.sendReplaceEobValidateSet = tempResult;

  }
}
