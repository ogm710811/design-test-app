import {
  claimProcessingRoutePathMaintenanceApproval,
  MaintenanceApprovalDetailService,
  MaintIconStatus,
  MaintRequestStatus,
  MaintTextColorStatus,
  MessageBoxService,
  PageHeaderService
} from '@fox/shared';
import {TitleCasePipe} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  ClaimHistMaintRequestUpdateVO,
  ClaimHistoryApi,
  PagedResourcesofResourceOfDisplayRequestVO
} from '@fox/rest-clients';
import * as uuid from 'uuid';
import {MemberInformationService} from '@fox/member-info';
import {MemberCardSet} from '../../../claim-history/claim-history-models/member-card.model';
import {RequestResultSet} from '../../maintenance-approval-models/maintenance-request-result.model';
import {MaintenanceApprovalHeaderDetails} from '@fox/shared';
import ActionTypeEnum = ClaimHistMaintRequestUpdateVO.ActionTypeEnum;
import {MaintenanceApprovalService} from '../../../shared/maintenance-approval.service';

@Component({
  selector: 'fox-transfer-member',
  templateUrl: './transfer-member-request.component.html',
  styleUrls: ['./transfer-member-request.component.css']
})

export class TransferMemberRequestComponent implements OnInit, OnDestroy {
  statusText: string = '';
  requestDetails: any = {};
  reqInfo: RequestResultSet;
  isApproved = false;
  isPending = false;
  isDeny = false;
  url: string = '../' + claimProcessingRoutePathMaintenanceApproval;
  destMemberNum: string = '';
  destAarpMemberNum: string = '';
  denialRsn: string = '';
  empName: MemberCardSet;
  destEmpName: MemberCardSet;
  pageTitle: string = 'Transfer Member Request';
  reviewTimeStmp: string = '';
  approverMsId: string = '';

  requestStatus: MaintRequestStatus;
  maintenanceApprovalHeaderDetails: MaintenanceApprovalHeaderDetails = {
    maintApprovalDetails: {
      iconStatus: MaintIconStatus.pending,
      requestStatus: MaintRequestStatus.pending,
      textColorStatus: MaintTextColorStatus.pending
    },
    requesterInfo: {
      requester: '',
      timeStamp: ''
    }
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private memberSvc: MemberInformationService,
    private clmSvc: ClaimHistoryApi,
    private titlecasePipe: TitleCasePipe,
    private messageBoxService: MessageBoxService,
    private requestSvc: MaintenanceApprovalService,
    private pageHeaderService: PageHeaderService,
    private maintenanceApprovalDetailService: MaintenanceApprovalDetailService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params) {
        this.requestDetails = params;
        const actionCode = this.getActionCode(params['actionCode']);
        this.statusText = this.requestSvc.getStatusText(params['status']);
        this.empName = this.requestSvc.getName(params['memberNum']);
        this.getRequestDetails(actionCode, params['maintRequestId']);
        if (params['status'] === 'Approved') {
          this.isApproved = true;
          this.requestStatus = MaintRequestStatus.approved;
        } else if (params['status'] === 'Denied') {
          this.isDeny = true;
          this.denialRsn = (params['denialReason']) ? (params['denialReason']) : '';
          this.requestStatus = MaintRequestStatus.denied;
        } else {
          this.isPending = true;
          this.requestStatus = MaintRequestStatus.pending;
        }
      }
      this.reviewTimeStmp = (params['reviewTimeStmp']) ? (params['reviewTimeStmp']) : '';
      this.approverMsId = (params['approver']) ? (params['approver']) : '';
      this.reqInfo = {...this.reqInfo, ...this.requestDetails};
    });
    this.requestSvc.requestDetailVisited = true;

    this.maintenanceApprovalHeaderDetails = {
      maintApprovalDetails: this.maintenanceApprovalDetailService.getMaintenanceApproval(this.requestStatus),
      requesterInfo: {
        requester: this.approverMsId,
        timeStamp: this.reviewTimeStmp
      }
    };
    this.pageHeaderService.maintenanceApprovalHeaderDetails = this.maintenanceApprovalHeaderDetails;
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
      case 'MEMBER_AGGR_MAINT':
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
    }
    return actionType;
  }

  getRequestDetails(actionCode, maintRequestId): void {
    const res = this.clmSvc.getMaintRequest(uuid(), actionCode, maintRequestId);
    res.subscribe(resp => {
      this.processRequestResult(resp);
    }, (e) => {
    });
  }

  processRequestResult(result: PagedResourcesofResourceOfDisplayRequestVO): void {
    let resultItems;
    let destMemberNumParse;
    if (result._embedded && result._embedded.items) {
      resultItems = result._embedded.items[0];
      destMemberNumParse = JSON.parse(resultItems.maintScreenDispValue);
      this.destMemberNum = destMemberNumParse['newMemberNumber'];
      this.destAarpMemberNum = this.requestSvc.splitMemberNum(this.destMemberNum);
      this.reqInfo.insuredNote = destMemberNumParse['insuredNote'];
      this.reqInfo.recipientNumber = this.destMemberNum;
      this.destEmpName = this.requestSvc.getName(this.destMemberNum);
    }
  }

  getRedirectUrl(data, type): string {
    return this.requestSvc.getRedirectUrl(data, type);
  }

  ngOnDestroy(): void {
    this.pageHeaderService.hasMaintApprovalDetails = false;
  }

}
