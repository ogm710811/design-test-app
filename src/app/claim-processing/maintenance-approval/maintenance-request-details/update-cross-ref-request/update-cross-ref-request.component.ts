import {
  claimProcessingRoutePathMaintenanceApproval,
  MaintenanceApprovalDetailService,
  MaintenanceApprovalHeaderDetails,
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
  ClaimHistoryApi,
  PagedResourcesofResourceOfDisplayRequestVO
} from '@fox/rest-clients';
import * as uuid from 'uuid';
import {MemberInformationService} from '@fox/member-info';
import {CrossRefUpdateResult} from '../../../claim-history/claim-history-models/cross-ref-update-result.model';
import {MemberCardSet} from '../../../claim-history/claim-history-models/member-card.model';
import {MaintenanceApprovalService} from '../../../shared/maintenance-approval.service';
import {RequestResultSet} from '../../maintenance-approval-models/maintenance-request-result.model';

@Component({
  selector: 'fox-update-cross-ref',
  templateUrl: './update-cross-ref-request.component.html',
  styleUrls: ['./update-cross-ref-request.component.css']
})

export class UpdateCrossRefComponent implements OnInit, OnDestroy {

  statusText: string = '';
  requestDetails: any = {};
  reqInfo: RequestResultSet;
  empName: MemberCardSet;
  crossRefUpdateResults: CrossRefUpdateResult[] = [];
  isApproved = false;
  isPending = false;
  isDeny = false;
  url: string = '../' + claimProcessingRoutePathMaintenanceApproval;
  denialRsn: string = '';
  pageTitle: string = 'Cross-Reference Update Request';

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
      }
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
      this.crossRefUpdateResults = [];
      result._embedded.items.forEach(item => {
        const parseStr: string = item.maintScreenDispValue ? item.maintScreenDispValue : '';
        if (parseStr) {
          const parsedJson = JSON.parse(parseStr);
          const action = parsedJson.httpMethod;
          const mappedItem: CrossRefUpdateResult = new CrossRefUpdateResult();
          mappedItem.action = (action === 'POST') ? 'Added' : (action === 'DELETE' ? 'Deleted' : '');
          if (mappedItem.action === 'Added') {
            mappedItem.claimNum = parsedJson.payload.crossReferenceNumber;
          } else if (mappedItem.action === 'Deleted') {
            mappedItem.claimNum = parsedJson.params.crossReferenceNumber;
          }
          this.crossRefUpdateResults.push(mappedItem);
        }
      });
    }
  }

  getRedirectUrl(data, type): string {
    return this.requestSvc.getRedirectUrl(data, type);
  }

  ngOnDestroy(): void {
    this.pageHeaderService.hasMaintApprovalDetails = false;
  }

}
