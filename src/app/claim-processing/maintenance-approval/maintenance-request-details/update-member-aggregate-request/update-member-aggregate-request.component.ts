import {
  claimProcessingRoutePathMaintenanceApproval,
  MessageBoxService,
  PaginatorNonMaterialComponent
} from '@fox/shared';
import {TitleCasePipe} from '@angular/common';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {
  AggregatesUpdateItemVO,
  ClaimHistoryApi,
  PagedResourcesofResourceOfDisplayRequestVO,
  PlanSpecificAggregatesVO
} from '@fox/rest-clients';
import * as uuid from 'uuid';
import {MemberInformationService} from '@fox/member-info';
import {MaintenanceApprovalDetailService} from '@fox/shared';
import {PageHeaderService} from '@fox/shared';
import {MemberCardSet} from '../../../claim-history/claim-history-models/member-card.model';
import {RequestResultSet} from '../../maintenance-approval-models/maintenance-request-result.model';
import {MemberAggregateUpdateResult} from '../../maintenance-approval-models/member-aggregate-update-result.model';
import {MaintIconStatus} from '@fox/shared';
import {MaintRequestStatus} from '@fox/shared';
import {MaintTextColorStatus} from '@fox/shared';
import {MaintenanceApprovalService} from '../../../shared/maintenance-approval.service';
import {MaintenanceApprovalHeaderDetails} from '@fox/shared';

interface AggregatedChanges {
  planYear: string;
  payeeAggregate: AggregatesUpdateItemVO;
  planSpecificAggregates: PlanSpecificAggregatesVO[];
}

@Component({
  selector: 'fox-update-member-aggregate',
  templateUrl: './update-member-aggregate-request.component.html',
  styleUrls: ['./update-member-aggregate-request.component.css']
})

export class UpdateMemberAggregateRequestComponent implements OnInit, OnDestroy {
  statusText: string = '';
  requestDetails: any = {};
  reqInfo: RequestResultSet;
  memberName: MemberCardSet;
  memberNumb: string;
  planYear: string;
  memberAggregateResults: MemberAggregateUpdateResult[] = [];
  viewData: MemberAggregateUpdateResult[];
  aggregatedChange: AggregatedChanges;
  isApproved = false;
  isPending = false;
  isDeny = false;
  url: string = '../' + claimProcessingRoutePathMaintenanceApproval;
  denialRsn: string = '';
  pageTitle: string = 'Member Aggregate Update Request';
  reviewTimeStmp: string = '';
  approverMsId: string = '';
  currentPage = 0;
  lastPageIndex = 0;
  pageSize = 5;
  isDesc: boolean = false;
  column: string = '';
  direction: number;
  pageSizeSelected = 10;
  dataLengthInput = 0;
  pageTotal = 0;
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

  @ViewChild(PaginatorNonMaterialComponent) paginator: PaginatorNonMaterialComponent;

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
        this.memberNumb = params['memberNum'];
        this.memberName = new MemberCardSet();
        this.memberSvc.getMemberByMemberNumber(this.memberNumb).subscribe(
          data => {
            if (data && data.memberDetails && data.memberDetails.memberName) {
              this.memberName.firstName = data.memberDetails.memberName.firstName;
              this.memberName.lastName = data.memberDetails.memberName.lastName;
            }
          },
          error => {
            this.memberName.firstName = 'FirstName';
            this.memberName.lastName = 'LastName';
          }
        );

        this.getRequestDetails('MEMBERAGGRMAINT', params['maintRequestId']);
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

  ngOnDestroy(): void {
    this.pageHeaderService.hasMaintApprovalDetails = false;
  }

  getRequestDetails(actionCode, maintRequestId): void {
    const res = this.clmSvc.getMaintRequest(uuid(), actionCode, maintRequestId);
    res.subscribe((resp) => {
      this.processRequestResult(resp);
    });
  }

  processRequestResult(result: PagedResourcesofResourceOfDisplayRequestVO): void {
    if (result._embedded && result._embedded.items) {
      this.memberAggregateResults = [];
      result._embedded.items.forEach(item => {
        const parseStr: string = item.maintScreenDispValue ? item.maintScreenDispValue : '';
        if (parseStr) {
          const parsedJson = JSON.parse(parseStr);
          const mappedItem: MemberAggregateUpdateResult = new MemberAggregateUpdateResult();

          if (parsedJson.payeeAggregate) {
            mappedItem.planYear = 'Lifetime';
            mappedItem.plan = 'Member';
            mappedItem.effectiveDate = '';
            mappedItem.field = 'Special Payee';
            mappedItem.originalValue = parsedJson.payeeAggregate.oldValue;
            mappedItem.newValue = parsedJson.payeeAggregate.newValue;
            mappedItem.difference = parsedJson.payeeAggregate.difference;
            this.memberAggregateResults.push({...mappedItem});
          }
          this.aggregatedChange = {
            planYear: parsedJson.planYear,
            payeeAggregate: parsedJson.payeeAggregate,
            planSpecificAggregates: parsedJson.planSpecificAggregates
          };
          const tableInfo = parsedJson.planSpecificAggregates;
          tableInfo.forEach(data => {
            let oopArray = [];
            if (data.hasOwnProperty('outOfPocketAggregates')) {
              oopArray = data['outOfPocketAggregates'];
              oopArray.forEach((elem, index) => {
                data['outOfPocketAggregates ' + index] = elem;
              });
              delete data['outOfPocketAggregates'];
            }
            const objKey = Object.keys(data);
            objKey.forEach(itm => {
              if (itm !== 'plan') {
                mappedItem.field = itm.split(/(?=[A-Z])/).join(' ');
                mappedItem.plan = data.plan;
                mappedItem.effectiveDate = '';
                mappedItem.planYear = parsedJson.planYear;
                mappedItem.originalValue = data[itm]['oldValue'];
                mappedItem.newValue = data[itm]['newValue'];
                mappedItem.difference = data[itm]['difference'];
                mappedItem.effectiveDate = data[itm]['effectiveDate'];
                this.memberAggregateResults.push({...mappedItem});
              }
              if (this.paginator) {
                this.paginator.currentPage = 0;
              }
            });
            this.dataLengthInput = this.memberAggregateResults.length;
            this.viewData = this.memberAggregateResults.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
            this.pageTotal = Math.ceil(this.memberAggregateResults.length / this.paginator.pageSize);
          });
        }
      });
    }
  }

  getRedirectUrl(data, type): string {
    return this.requestSvc.getRedirectUrl(data, type);
  }

  sort(property: string): void {
    this.isDesc = !this.isDesc;
    this.column = property;
    const orderBy = this.isDesc ? 'desc' : 'asc';
    this.viewData = _.orderBy(this.viewData, this.column, orderBy);
  }

  calculateNewPage(): void {
    this.viewData = this.memberAggregateResults.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.pageTotal = Math.ceil(this.memberAggregateResults.length / this.paginator.pageSize);
  }
}
