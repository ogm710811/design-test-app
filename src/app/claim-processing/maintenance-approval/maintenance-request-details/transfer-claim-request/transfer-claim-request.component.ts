import {
  claimProcessingRoutePathMaintenanceApproval,
  MessageBoxService
} from '@fox/shared';
import {TitleCasePipe} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  ClaimHistoryApi,
  PagedResourcesofResourceOfDisplayRequestVO
} from '@fox/rest-clients';
import * as uuid from 'uuid';
import {MemberInformationService} from '@fox/member-info';
import {MaintenanceApprovalDetailService} from '@fox/shared';
import {PageHeaderService} from '@fox/shared';
import {MemberCardSet} from '../../../claim-history/claim-history-models/member-card.model';
import {RequestResultSet} from '../../maintenance-approval-models/maintenance-request-result.model';
import {TransferClaimResultModel} from '../../maintenance-approval-models/transfer-claim-result.model';
import {MaintIconStatus} from '@fox/shared';
import {MaintRequestStatus} from '@fox/shared';
import {MaintTextColorStatus} from '@fox/shared';
import {MaintenanceApprovalHeaderDetails} from '@fox/shared';
import {MaintenanceApprovalService} from '../../../shared/maintenance-approval.service';

@Component({
  selector: 'fox-transfer-claim',
  templateUrl: './transfer-claim-request.component.html',
  styleUrls: ['./transfer-claim-request.component.css']
})

export class TransferClaimRequestComponent implements OnInit, OnDestroy {

  statusText: string = '';
  requestDetails: any = {};
  reqInfo: RequestResultSet;
  isApproved = false;
  isPending = false;
  isDeny = false;
  url: string = '../' + claimProcessingRoutePathMaintenanceApproval;
  transferClaimResults: TransferClaimResultModel[] = [];
  destMemberNum: string = '';
  destAarpMemberNum: string = '';
  denialRsn: string = '';
  empName: MemberCardSet;
  destEmpName: MemberCardSet;
  pageTitle: string = 'Transfer Claim Request';

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
        this.statusText = this.requestSvc.getStatusText(params['status']);
        this.empName = this.requestSvc.getName(params['memberNum']);
        this.getRequestDetails(params['actionCode'], params['maintRequestId']);
        if (params['status'] === 'Approved') {
          this.requestStatus = MaintRequestStatus.approved;
          this.isApproved = true;
        } else if (params['status'] === 'Denied') {
          this.requestStatus = MaintRequestStatus.denied;
          this.isDeny = true;
          this.denialRsn = (params['denialReason']) ? (params['denialReason']) : '';
        } else {
          this.requestStatus = MaintRequestStatus.pending;
          this.isPending = true;
        }
      }
      this.reviewTimeStmp = (params['reviewTimeStmp']) ? (params['reviewTimeStmp']) : '';
      this.approverMsId = (params['approver']) ? (params['approver']) : '';
      this.reqInfo = this.requestDetails;

      this.maintenanceApprovalHeaderDetails = {
        maintApprovalDetails: this.maintenanceApprovalDetailService.getMaintenanceApproval(this.requestStatus),
        requesterInfo: {
          requester: this.approverMsId,
          timeStamp: this.reviewTimeStmp
        }
      };
      this.pageHeaderService.maintenanceApprovalHeaderDetails = this.maintenanceApprovalHeaderDetails;
    });
    this.requestSvc.requestDetailVisited = true;
  }

  getRequestDetails(actionCode, maintRequestId): void {
    const res = this.clmSvc.getMaintRequest(uuid(), actionCode, maintRequestId);
    res.subscribe(resp => {
      this.processRequestResult(resp);
    }, (e) => {

    });
  }

  processRequestResult(result: PagedResourcesofResourceOfDisplayRequestVO): void {
    if (result._embedded && result._embedded.items) {
      this.transferClaimResults = [];

      result._embedded.items.forEach(item => {
        const parseStr: string = item.maintScreenDispValue ? item.maintScreenDispValue : '';
        if (parseStr) {
          const parsedJson = JSON.parse(parseStr);
          const mappedItem: TransferClaimResultModel = new TransferClaimResultModel();
          mappedItem.claimNum = parsedJson.params.claimNumber;
          mappedItem.dosFrom = parsedJson.params.claimDosFromDate;
          mappedItem.dosTo = parsedJson.params.claimDosToDate;
          mappedItem.oldMemberNum = parsedJson.params.aarpMembershipNumber;
          mappedItem.newMemberNum = parsedJson.params.newMemberNumber;
          mappedItem.newAarpMemberNum = this.requestSvc.splitMemberNum(parsedJson.params.newMemberNumber);
          this.transferClaimResults.push(mappedItem);
        }
      });
      this.destMemberNum = this.transferClaimResults[0].newMemberNum;
      this.destAarpMemberNum = this.transferClaimResults[0].newAarpMemberNum;
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
