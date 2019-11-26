import {TitleCasePipe} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClaimHistoryApi} from '@fox/rest-clients';
import {
  claimProcessingRoutePathMaintenanceApproval,
  MessageBoxService
} from '@fox/shared';
import {MemberInformationService} from '@fox/member-info';
import {MaintenanceApprovalDetailService} from '@fox/shared';
import {PageHeaderService} from '@fox/shared';
import {MemberCardSet} from '../../../claim-history/claim-history-models/member-card.model';
import {MaintenanceApprovalService} from '../../../shared/maintenance-approval.service';
import {RequestResultSet} from '../../maintenance-approval-models/maintenance-request-result.model';
import {MaintIconStatus} from '@fox/shared';
import {MaintRequestStatus} from '@fox/shared';
import {MaintTextColorStatus} from '@fox/shared';
import {MaintenanceApprovalHeaderDetails} from '@fox/shared';

@Component({
  selector: 'fox-delete-claim',
  templateUrl: './delete-claim-request.component.html',
  styleUrls: ['./delete-claim-request.component.css']
})

export class DeleteClaimRequestComponent implements OnInit, OnDestroy {

  statusText: string = '';
  requestDetails: any = {};
  reqInfo: RequestResultSet;
  isApproved = false;
  isPending = false;
  isDeny = false;
  url: string = '../' + claimProcessingRoutePathMaintenanceApproval;
  empName: MemberCardSet;
  denialRsn: string = '';
  pageTitle: string = 'Delete Claim Request';

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

  getRedirectUrl(data, type): string {
    return this.requestSvc.getRedirectUrl(data, type);
  }

  ngOnDestroy(): void {
    this.pageHeaderService.hasMaintApprovalDetails = false;
  }

}
