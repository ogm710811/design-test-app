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
import {MemberCardSet} from '../../../claim-history/claim-history-models/member-card.model';
import {MaintenanceApprovalService} from '../../../shared/maintenance-approval.service';
import {RequestResultSet} from '../../maintenance-approval-models/maintenance-request-result.model';
import {UpdateEobResultModel} from '../../maintenance-approval-models/update-eob-result.model';

@Component({
  selector: 'fox-update-eob',
  templateUrl: './update-eob-request.component.html',
  styleUrls: ['./update-eob-request.component.css']
})

export class UpdateEobRequestComponent implements OnInit, OnDestroy {

  statusText: string = '';
  requestDetails: any = {};
  updateEobResults: UpdateEobResultModel[] = [];
  reqInfo: RequestResultSet;
  empName: MemberCardSet;
  isApproved = false;
  isPending = false;
  isDeny = false;
  url: string = '../' + claimProcessingRoutePathMaintenanceApproval;
  denialRsn: string = '';
  pageTitle: string = 'Update EOB request';

  claimDosFrom: string = '';
  claimDosTo: string = '';
  claimPrimaryIcd: string = '';
  reviewTimeStmp: string = '';
  approverMsId: string = '';

  isUpdatedClaimDosFrom: boolean = false;
  isUpdatedClaimDosTo: boolean = false;
  isUpdatedPrimaryIcd: boolean = false;

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
      this.updateEobResults = [];
      result._embedded.items.forEach(item => {
        const parseStr: string = item.maintScreenDispValue ? item.maintScreenDispValue : '';
        if (parseStr) {
          const parsedJson = JSON.parse(parseStr);
          const claimInfo = parsedJson.payload;
          const claimDos = parsedJson.params;
          this.assignClaimInfo(claimInfo, claimDos);
          const tableInfo = parsedJson.payload.items;
          tableInfo.forEach(data => {
            const mappedItem: UpdateEobResultModel = new UpdateEobResultModel();
            mappedItem.billLineNum = data.billLineNum ? data.billLineNum : '';
            mappedItem.billLineDosFrom = data.billLineDosFrom ? data.billLineDosFrom.newValue : '';
            mappedItem.billLineDosTo = data.billLineDosTo ? data.billLineDosTo.newValue : '';
            mappedItem.billLineServiceCode = data.billLineServiceCode ? data.billLineServiceCode.newValue : '';
            mappedItem.billLineSrvAccum1 = data.billLineSrvAccum1 ? data.billLineSrvAccum1.newValue : '';
            mappedItem.billLineSrvAccum2 = data.billLineSrvAccum2 ? data.billLineSrvAccum2.newValue : '';
            mappedItem.billLineBenefitPeriodNum = data.billLineBenefitPeriodNum ? data.billLineBenefitPeriodNum.newValue : '';
            mappedItem.billLineBenefitPeriodDays = data.billLineBenefitPeriodDays ? data.billLineBenefitPeriodDays.newValue : '';
            mappedItem.billLineDateOfAccident = data.billLineDateOfAccident ? data.billLineDateOfAccident.newValue : '';
            mappedItem.billLineTypeCode = data.billLineTypeCode ? data.billLineTypeCode.newValue : '';
            mappedItem.isUpdatedDosFrom = data.billLineDosFrom ? (data.billLineDosFrom.newValue !== data.billLineDosFrom.oldValue) : false;
            mappedItem.isUpdatedDosTo = data.billLineDosTo ? (data.billLineDosTo.newValue !== data.billLineDosTo.oldValue) : false;
            mappedItem.isUpdatedServiceCode = data.billLineServiceCode ? (data.billLineServiceCode.newValue !== data.billLineServiceCode.oldValue) : false;
            mappedItem.isUpdatedSrvAccum1 = data.billLineSrvAccum1 ? (data.billLineSrvAccum1.newValue !== data.billLineSrvAccum1.oldValue) : false;
            mappedItem.isUpdatedSrvAccum2 = data.billLineSrvAccum2 ? (data.billLineSrvAccum2.newValue !== data.billLineSrvAccum2.oldValue) : false;
            mappedItem.isUpdatedBenefitPeriodNum = data.billLineBenefitPeriodNum ? (data.billLineBenefitPeriodNum.newValue !== data.billLineBenefitPeriodNum.oldValue) : false;
            mappedItem.isUpdatedBenefitPeriodDays = data.billLineBenefitPeriodDays ? (data.billLineBenefitPeriodDays.newValue !== data.billLineBenefitPeriodDays.oldValue) : false;
            mappedItem.isUpdatedTypeCode = data.billLineTypeCode ? (data.billLineTypeCode.newValue !== data.billLineTypeCode.oldValue) : false;
            mappedItem.isUpdatedDateOfAccident = data.billLineDateOfAccident ? (data.billLineDateOfAccident.newValue !== data.billLineDateOfAccident.oldValue) : false;
            if (data.billLineExceptionInd) {
              mappedItem.billLineExceptionInd = data.billLineExceptionInd.newValue === 'Y' ? 'Yes' : ((data.billLineExceptionInd.newValue === 'N') ? 'No' : data.billLineExceptionInd.newValue);
              mappedItem.isUpdatedExceptionInd = data.billLineExceptionInd.newValue !== data.billLineExceptionInd.oldValue;
            }
            this.updateEobResults.push(mappedItem);
          });
        }
      });
    }
  }

  getRedirectUrl(data, type): string {
    return this.requestSvc.getRedirectUrl(data, type);
  }

  assignClaimInfo(data, dos): void {
    const claimInfo = data;
    const claimDos = dos;
    this.claimPrimaryIcd = claimInfo.primaryIcd.newValue;
    this.isUpdatedPrimaryIcd = (claimInfo.primaryIcd.newValue !== claimInfo.primaryIcd.oldValue);
    this.claimDosFrom = claimDos.claimDosFromDate;
    this.claimDosTo = claimDos.claimDosToDate;
  }

  ngOnDestroy(): void {
    this.pageHeaderService.hasMaintApprovalDetails = false;
  }

}
