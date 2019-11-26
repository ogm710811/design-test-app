import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as moment from 'moment';
import {
  AggregatesUpdateItemVO,
  AggregatesUpdateVO,
  ClaimHistMaintHistUpdateVO,
  ClaimHistMaintRequestUpdateVO,
  ClaimHistoryApi,
  ClaimsMaterialApi,
  ClaimsMemberApi,
  PlanSpecificAggregatesVO,
  TransferAccountRequestVO,
  TransferAccountResponseVO,
} from '@fox/rest-clients';
import {Observable} from 'rxjs';
import * as uuid from 'uuid';
import {
  MaintenanceApprovalDetails,
  MaintenanceApprovalHeaderDetails,
  MaintenanceRequesterInfo,
  MaintIconStatus,
  MaintRequestStatus,
  MaintTextColorStatus,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService
} from '@fox/shared';
import {RequestResultSet} from '../../maintenance-approval-models/maintenance-request-result.model';
import {MaintenanceApprovalService} from '../../../shared/maintenance-approval.service';
import ActionTypeEnum = ClaimHistMaintRequestUpdateVO.ActionTypeEnum;

@Component({
  selector: 'fox-approve-deny-request',
  templateUrl: './approve-deny-request.component.html',
  styleUrls: ['./approve-deny-request.component.css']
})

export class ApproveDenyRequestComponent {

  @Input() reqInfo: RequestResultSet;
  @Input() isApproved: boolean;
  @Input() isPending: boolean;
  @Input() isDeny: boolean;
  @Input() denialRsn: string;
  @Input() approverMsid: string;
  @Input() reviewTimeStmp: string;
  @Input() aggregatesUpdate: AggregatesUpdateVO;
  @Output() isPendingChange = new EventEmitter<boolean>();
  @Output() isApprovedChange = new EventEmitter<boolean>();
  @Output() isDeniedChange = new EventEmitter<boolean>();
  @Output() statusChange = new EventEmitter<string>();

  requestParamsMaintRequestUpdate: ClaimHistMaintRequestUpdateVO;
  requestParamsTransferAccountRequest: TransferAccountRequestVO;
  denialReasonModalVisible: boolean;
  requestStatus: string = '';
  statusText: string = '';

  private _requesterInfo: MaintenanceRequesterInfo;
  private _maintApprovalDetails: Map<string, MaintenanceApprovalDetails> = new Map<string, MaintenanceApprovalDetails>([
    ['pending',
      {
        iconStatus: MaintIconStatus.pending,
        textColorStatus: MaintTextColorStatus.pending,
        requestStatus: MaintRequestStatus.pending
      }
    ],
    ['denied',
      {
        iconStatus: MaintIconStatus.denied,
        textColorStatus: MaintTextColorStatus.denied,
        requestStatus: MaintRequestStatus.denied
      }
    ],
    ['approved',
      {
        iconStatus: MaintIconStatus.approved,
        textColorStatus: MaintTextColorStatus.approved,
        requestStatus: MaintRequestStatus.approved
      }
    ]
  ]);

  constructor(private clmSvc: ClaimHistoryApi,
              private requestSvc: MaintenanceApprovalService,
              private pageHeaderService: PageHeaderService,
              private messageBoxService: MessageBoxService,
              private claimsMaterialApi: ClaimsMaterialApi,
              private claimsMemeberApi: ClaimsMemberApi) { }

  setRequesterInfo(requestDetails: RequestResultSet): void {
    this._requesterInfo = {
      timeStamp: requestDetails.reviewTimeStmp,
      requester: requestDetails.requester
    };
  }

  get requesterInfo(): MaintenanceRequesterInfo {
    return this._requesterInfo;
  }

  assignFlags(): void {
    this.isApproved = false;
    this.isDeny = false;
  }

  cancelDenialRequest(): void {
    this.denialReasonModalVisible = false;
  }

  confirmDenialModal(): void {
    this.denialReasonModalVisible = false;
    this.updateRequest('DENIED');
  }

  updateRequest(data): void {
    if (this.aggregatesUpdate && this.aggregatesUpdate.planSpecificAggregates) {
      this.aggregatesUpdate.planSpecificAggregates.forEach((specificAggregate, index) => {
        if (this.aggregatesUpdate.planSpecificAggregates) {
          this.aggregatesUpdate.planSpecificAggregates[index] = this.createPlanSpecificAggregatesObjectResult(specificAggregate);
        }
      });
    }

    this.assignFlags();
    this.requestStatus = data;
    const status = this.requestStatus === 'APPROVED' ? 'Approved' : 'Denied';
    const reqId = this.reqInfo.maintRequestId ? this.reqInfo.maintRequestId : undefined;
    const reqStat = (this.requestStatus === 'APPROVED') ? ClaimHistMaintRequestUpdateVO.RequestStatusEnum.APPROVED : ClaimHistMaintRequestUpdateVO.RequestStatusEnum.DENIED;
    const denialReason = (this.requestStatus === 'APPROVED') ? undefined : (this.denialRsn ? this.denialRsn : undefined);

    this.requestParamsMaintRequestUpdate = {
      'maintRequestId': reqId,
      'actionType': this.getActionCode(this.reqInfo.actionCode),
      'requestStatus': reqStat,
      'maintRequestUpdateDesc': denialReason
    };

    this.requestParamsTransferAccountRequest = {
      'newMemberNumber': this.reqInfo.recipientNumber,
      'insuredNote': this.reqInfo.insuredNote
    };

    this.setRequesterInfo(this.reqInfo);
    const maintRequestUpdate: Observable<ClaimHistMaintHistUpdateVO> = this.clmSvc.updateMaintRequest(this.requestParamsMaintRequestUpdate, uuid());
    const transferAccountRequest: Observable<TransferAccountResponseVO[]> = this.claimsMaterialApi.transferAccount(this.reqInfo.memberNum, this.requestParamsTransferAccountRequest, uuid());

    maintRequestUpdate.subscribe(resp => {
      if (resp) {
        this.approverMsid = resp.approverMsid ? resp.approverMsid : '';
        this.denialRsn = resp.maintRequestUpdateDesc ? resp.maintRequestUpdateDesc : '';
        if (resp.reviewedTimestamp) {
          this.reviewTimeStmp = moment(resp.reviewedTimestamp, 'YYYY-MM-DD hh:mm A').format('MM/DD/YYYY hh:mm A');
        }

        if (this.reqInfo.actionCode === 'AGGR_UPDATE' && resp.requestStatus === 'APPROVED') {
          this.claimsMemeberApi.updateMemberAggregates(uuid(), this.reqInfo.memberNum, this.aggregatesUpdate).subscribe(() => {});
        } else if (resp.requestStatus === 'APPROVED') {
          this.lockAccount(transferAccountRequest, this.reqInfo.memberNum);
        }

        this.statusText = this.requestSvc.getStatusText(status);
        this.isApproved = (status === 'Approved');
        this.isDeny = (status === 'Denied');
        this.isPending = false;
        this.emitFlags();

        if (status === 'Approved') {
          this.pageHeaderService.maintenanceApprovalHeaderDetails = this.getTransferMemberRequestHeaderDetails('approved');
        } else if (status === 'Denied') {
          this.pageHeaderService.maintenanceApprovalHeaderDetails = this.getTransferMemberRequestHeaderDetails('denied');
        }
      }
    }, (e) => {
      this.messageBoxService.reset();
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'There was an error submitting your request. Please try again.');
    });
  }

  getTransferMemberRequestHeaderDetails(status: string): MaintenanceApprovalHeaderDetails  {
    const details =  this._maintApprovalDetails.get(status);
    let result;
    if (details) {
      result = {
        maintApprovalDetails: details,
        requesterInfo: this.requesterInfo
      };
    }
    return result;
  }

  emitFlags(): void {
    this.isApprovedChange.emit(this.isApproved);
    this.isDeniedChange.emit(this.isDeny);
    this.isPendingChange.emit(this.isPending);
    this.statusChange.emit(this.statusText);
  }

  lockAccount(transferAccountRequest: Observable<TransferAccountResponseVO[]>, membershipNumber: string, ): void {
    this.claimsMaterialApi.lockAccount(membershipNumber, uuid()).subscribe(res => {
      if (res.lockStatus === 'LOCKED') {
        transferAccountRequest.subscribe(transferRes => {
          if (transferRes[0].newMemberNumber === this.reqInfo.recipientNumber) {
            this.unlockAccount(this.reqInfo.recipientNumber);
          }
        }, err => {
          this.unlockAccount(this.reqInfo.recipientNumber);
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Transfer account cannot be performed. Please close out and try again.');
        });
      }
    }, err => {
      if (err.status === 400) {
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Member is currently locked and transfer account cannot be performed.');
      } else {
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'The account has not been locked. Please close out and try again.');
      }
    });
  }

  unlockAccount(membershipNumber): void {
    this.claimsMaterialApi.unlockAccount(membershipNumber, uuid()).subscribe(res => {
      this.messageBoxService.addMessageBox('Success', MessageBoxType.SUCCESS, 'Member was unlocked.', 3000);
    }, err => {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'The account has not been unlocked.');
    });
  }

  getActionCode(actionCode): ActionTypeEnum {
    let actionType;

    switch (actionCode) {
      case 'TRANSFER_CLAIM':
        actionType = 'TRANSFERCLAIM';
        break;
      case 'UPDATE_EOB':
        actionType = 'UPDATEEOB';
        break;
      case 'MEM_ACCT_TRANS':
        actionType = 'ACCOUNTTRANSFER';
        break;
      case 'SPH_MAINT':
        actionType = 'SPHMAINT';
        break;
      case 'AGGR_MAINT':
        actionType = 'MEMBERAGGRMAINT';
        break;
      case 'CROSS_REF_MAINT':
        actionType = 'CROSSREFMAINT';
        break;
      case 'REACTIVATE_CLAIM':
        actionType = 'REACTIVATECLAIM';
        break;
      case 'DELETE_CLAIM':
        actionType = 'DELETECLAIM';
        break;
      case 'AGGR_UPDATE':
        actionType = 'MEMBERAGGRMAINT';
        break;
    }
    return actionType;
  }

  createPlanSpecificAggregatesObjectResult(planSpecificAggregates: PlanSpecificAggregatesVO): PlanSpecificAggregatesVO {
    const objResult: PlanSpecificAggregatesVO = {};
    const outOfPocketAggregates: AggregatesUpdateItemVO[] = [];
    const objectEntries = Object.entries(planSpecificAggregates);

    objectEntries.forEach(kv => {
      if (kv[0].includes('outOfPocketAggregates')) {
        outOfPocketAggregates.push(kv[1]);
        objResult.outOfPocketAggregates = outOfPocketAggregates;
      } else {
        objResult[kv[0]] = kv[1];
      }
    });
    return objResult;
  }

}
