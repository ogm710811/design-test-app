import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as moment from 'moment-timezone';
import {
  ClaimHistoryApi,
  EobUpdateVO,
  ResourceOfClaimBillLineDetailsVO,
  ResourceOfClaimHistoryDetailVO
} from '@fox/rest-clients';
import * as uuid from 'uuid';

@Component({
  selector: 'fox-update-eob-modal',
  templateUrl: './update-eob-modal.component.html',
  styleUrls: ['./update-eob-modal.component.css']
})

export class UpdateEobModalComponent {

  @Input() isUpdateEobModalVisible: boolean;
  @Input() claimNumber: number;
  @Input() claimDetails: ResourceOfClaimHistoryDetailVO;
  @Input() billLineResultSetUpdateEob: ResourceOfClaimBillLineDetailsVO[] = [];
  @Input() validateResultUpdateEob: ResourceOfClaimBillLineDetailsVO[] = [];
  @Input() eobUpdateReqBody: EobUpdateVO;
  @Input() isEobHos: boolean;
  @Input() exceptionInd: string;

  @Output() updateEobVisibleChange = new EventEmitter<boolean>();
  @Output() cancelUpdateEob: EventEmitter<'cancel'> = new EventEmitter<'cancel'>();
  @Output() confirmUpdateEob: EventEmitter<'confirm'> = new EventEmitter<'confirm'>();
  @Output() responseMsg = new EventEmitter<string>();
  @Output() updateEobSuccessMsg = new EventEmitter<boolean>();
  @Output() updateEobFailMsg = new EventEmitter<boolean>();

  isEditInProgress: boolean = false;
  selectedRow: number = -1;

  constructor(private claimHistorySearchApi: ClaimHistoryApi) {
  }

  cancelUpdateEobModal(): void {
    this.isEditInProgress = false;
    this.cancelUpdateEob.emit('cancel');
  }

  editInProgress(index): void {
    this.isEditInProgress = true;
    this.selectedRow = index;
  }

  isRowBeingEdited(index): boolean {
    return this.isEditInProgress && this.selectedRow === index;
  }

  resetRow(row): void {
    const updatedBillLine = this.eobUpdateReqBody.items ? this.eobUpdateReqBody.items[row] : null;
    if (updatedBillLine) {
      if (updatedBillLine.billLineDosFrom) { updatedBillLine.billLineDosFrom.newValue = updatedBillLine.billLineDosFrom.oldValue; }
      if (updatedBillLine.billLineDosTo) { updatedBillLine.billLineDosTo.newValue = updatedBillLine.billLineDosTo.oldValue; }
      if (updatedBillLine.billLineSrvAccum1) { updatedBillLine.billLineSrvAccum1.newValue = updatedBillLine.billLineSrvAccum1.oldValue; }
      if (updatedBillLine.billLineSrvAccum2) { updatedBillLine.billLineSrvAccum2.newValue = updatedBillLine.billLineSrvAccum2.oldValue; }
      if (updatedBillLine.billLineBenefitPeriodNum) { updatedBillLine.billLineBenefitPeriodNum.newValue = updatedBillLine.billLineBenefitPeriodNum.oldValue; }
      if (updatedBillLine.billLineBenefitPeriodDays) { updatedBillLine.billLineBenefitPeriodDays.newValue = updatedBillLine.billLineBenefitPeriodDays.oldValue; }
      if (updatedBillLine.billLineDateOfAccident) { updatedBillLine.billLineDateOfAccident.newValue = updatedBillLine.billLineDateOfAccident.oldValue; }
      if (updatedBillLine.billLineServiceCode) { updatedBillLine.billLineServiceCode.newValue = updatedBillLine.billLineServiceCode.oldValue; }
      if (updatedBillLine.billLineTypeCode) { updatedBillLine.billLineTypeCode.newValue = updatedBillLine.billLineTypeCode.oldValue; }
    }
  }

  updateRow(row): void {
    const updatedBillLine = this.eobUpdateReqBody.items !== undefined ? this.eobUpdateReqBody.items[row] : null;
    if (updatedBillLine !== null) {
      if (updatedBillLine.billLineDosFrom !== undefined) {
        updatedBillLine.billLineDosFrom.newValue = this.formatDateToService(updatedBillLine.billLineDosFrom.newValue);
        updatedBillLine.billLineDosFrom.oldValue = this.formatDateToService(updatedBillLine.billLineDosFrom.oldValue);
      }
      if (updatedBillLine.billLineDosTo !== undefined) {
        updatedBillLine.billLineDosTo.newValue = this.formatDateToService(updatedBillLine.billLineDosTo.newValue);
        updatedBillLine.billLineDosTo.oldValue = this.formatDateToService(updatedBillLine.billLineDosTo.oldValue);
      }
      if (updatedBillLine.billLineDateOfAccident !== undefined) {
        updatedBillLine.billLineDateOfAccident.newValue = this.formatDateToService(updatedBillLine.billLineDateOfAccident.newValue);
        updatedBillLine.billLineDateOfAccident.oldValue = this.formatDateToService(updatedBillLine.billLineDateOfAccident.oldValue);
      }
    }
  }

  updateRecord(): void {
    if (this.eobUpdateReqBody.exceptionInd) {
      this.eobUpdateReqBody.exceptionInd.newValue = this.exceptionInd;
    }
    const resp = this.claimHistorySearchApi.updateEob(this.claimNumber, this.eobUpdateReqBody, uuid(), 'response');
    resp.subscribe(response => {
      if (response.status === 200) {
        const msg = response.headers.get('message');
        if (msg !== null) {
          this.responseMsg.emit(msg);
        }
        this.updateEobSuccessMsg.emit(true);
        this.confirmUpdateEob.emit('confirm');
      }

    }, (e) => {
      const msg = e.headers.get('message');
      if (msg !== null) {
        this.responseMsg.emit(msg);
      }
      this.updateEobFailMsg.emit(true);
      this.confirmUpdateEob.emit('confirm');
    });
  }

  formatDateToService(originalFormat): string {
    return moment.tz(originalFormat, 'MM/DD/YYYY').format('YYYY-MM-DD');
  }
}
