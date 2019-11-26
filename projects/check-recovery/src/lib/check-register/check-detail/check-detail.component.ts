import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourceOfCheckVO, CheckStatusEnum} from '@fox/rest-clients';
import {CheckRecoveryService} from '../../shared/check-recovery.service';
import {StatusAndAction} from '@fox/shared';
import { CheckDetailState } from '../check-replacement/check-detail.state';

@Component({
  selector: 'fox-check-detail',
  templateUrl: './check-detail.component.html',
  styleUrls: ['./check-detail.component.css']
})
export class CheckDetailComponent implements OnChanges {

  @Input() checkId: number = 0;
  @Output() checkDetailsChange: EventEmitter<ResourceOfCheckVO> = new EventEmitter<ResourceOfCheckVO>();
  replaceSuccessMsg: boolean = false;
  voidSuccessMsg: boolean = false;
  denySuccessMsg: boolean = false;
  authorizeSuccessMsg: boolean = false;
  errorMsg: boolean = false;

  constructor(
    public state: CheckDetailState,
    private router: Router,
    private route: ActivatedRoute,
    private checkSvc: CheckRecoveryService
    ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.checkId && this.checkId) {
      this.init(this.checkId);
    }
  }

  init(checkId: number): void {
    if (checkId) {
      this.checkSvc.getCheckDetail(checkId).subscribe(res => {
        if (res) {
          this.state.checkDetails = res;
          if (this.state.checkDetails.status === CheckStatusEnum.REPLACEMENT_REQUESTED) {
            this.state.isAuthorizeScreen = true;
          } else {
            this.state.isAuthorizeScreen = false;
          }
          this.state.checkDetailsBehaviorSubject.next(true);
          const zeroField = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          if (this.state.checkDetails.accountNumber) {
            const numberLength = this.state.checkDetails.accountNumber.toString().length;
            zeroField.splice(0, numberLength);
            this.state.checkDetails.accountNumber = zeroField.join('') + this.state.checkDetails.accountNumber;
          }
          if (this.state.checkDetails.tin === 0) {
            this.state.checkDetails.tin = undefined;
          }
          if (this.state.checkDetails.npi === 0) {
            this.state.checkDetails.npi = undefined;
          }
          this.checkDetailsChange.emit(this.state.checkDetails);
        }
      });
    }
  }

  onStatusChange(statusAndAction: StatusAndAction): void {
    if (statusAndAction.action === 'refresh') {
      if (statusAndAction.status === 'replaceMsg') {
        this.replaceSuccessMsg = true;
        this.voidSuccessMsg = false;
        this.denySuccessMsg = false;
        this.authorizeSuccessMsg = false;
        this.errorMsg = false;
      }
      if (statusAndAction.status === 'voidMsg') {
        this.replaceSuccessMsg = false;
        this.voidSuccessMsg = true;
        this.denySuccessMsg = false;
        this.authorizeSuccessMsg = false;
        this.errorMsg = false;
      }
      if (statusAndAction.status === 'denyMsg') {
        this.replaceSuccessMsg = false;
        this.voidSuccessMsg = false;
        this.denySuccessMsg = true;
        this.authorizeSuccessMsg = false;
        this.errorMsg = false;
      }
      if (statusAndAction.status === 'authorizeMsg') {
        this.replaceSuccessMsg = false;
        this.voidSuccessMsg = false;
        this.denySuccessMsg = false;
        this.authorizeSuccessMsg = true;
        this.errorMsg = false;
      }
      this.init(this.checkId);
    } else if (statusAndAction.action === 'remove') {

    } else {
      this.errorMsg = true;
      this.replaceSuccessMsg = false;
      this.voidSuccessMsg = false;
      this.denySuccessMsg = false;
      this.authorizeSuccessMsg = false;
    }
  }

  getBulkDetailsLink(): string | void {
    if (!this.state.checkDetails) {
      return;
    }
    const urlPrefix = '../../bulk-detail/';
    const checkSeries = this.state.checkDetails.checkSeries || '';
    const checkNumber = this.state.checkDetails.checkNumber ?
      this.state.checkDetails.checkNumber :
      (this.state.checkDetails.checkNumber === 0 ? 0 : '');
    const checkIssueDate = this.state.checkDetails.issueDate || '';
    const checkStatus = this.state.checkDetails.status || '';
    const checkAmount = this.state.checkDetails.checkAmount ?
      this.state.checkDetails.checkAmount :
      (this.state.checkDetails.checkAmount === 0 ? 0 : '');
    const checkPayee = this.state.checkDetails.payee || '';
    return urlPrefix + checkSeries + '|' + checkNumber + '|' + checkIssueDate + '|' + checkStatus + '|' + checkAmount + '|' + checkPayee;
  }

  isBulk(): boolean {
    if (this.state.checkDetails) {
      return (this.state.checkDetails.isBulk !== undefined) && this.state.checkDetails.isBulk;
    }
    return false;
  }

  hasCheckNumber(): boolean {
    if (this.state.checkDetails) {
      return !!(this.state.checkDetails.checkNumber) && !isNaN(this.state.checkDetails.checkNumber);
    }
    return false;
  }

}
