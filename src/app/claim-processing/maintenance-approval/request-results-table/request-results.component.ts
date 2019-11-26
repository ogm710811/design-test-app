import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {
  claimProcessingRoutePathDeleteClaim,
  claimProcessingRoutePathReactivateClaim,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathTransferClaim,
  claimProcessingRoutePathTransferMember,
  claimProcessingRoutePathUpdateCrossRef,
  claimProcessingRoutePathUpdateEob,
  claimProcessingRoutePathUpdateMemberAggregate,
  claimProcessingRoutePathUpdateSplHandling,
  claimProcessingUrlPrefixClaimDetails,
  MaintenanceApprovalDetails,
  MaintenanceRequesterInfo,
  MaintIconStatus,
  MaintRequestStatus,
  MaintTextColorStatus,
  memberInformationUrlPrefixMemberProfile,
  PageHeaderService
} from '@fox/shared';
import {RequestResultSet} from '../maintenance-approval-models/maintenance-request-result.model';
import {MaintenanceApprovalHeaderDetails} from '@fox/shared';

@Component({
  selector: 'fox-request-results',
  templateUrl: './request-results.component.html',
  styleUrls: ['./request-results.component.css']
})

export class RequestResultsTableComponent implements OnInit {
  @Input() maintenanceRequestResults: RequestResultSet[] = [];
  @Input() isDesc: boolean = false;
  @Input() column: string = '';

  @Output() isDescChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() columnChange: EventEmitter<string> = new EventEmitter<string>();

  url: string = '';
  requestDetails: RequestResultSet;
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

  private _requesterInfo: MaintenanceRequesterInfo;

  get requesterInfo(): MaintenanceRequesterInfo {
    return this._requesterInfo;
  }

  constructor(private router: Router, private pageHeaderService: PageHeaderService) {
  }

  ngOnInit(): void {
    this.pageHeaderService.hasMaintApprovalDetails = false;
  }

  sort(property: string): void {
    this.isDesc = !this.isDesc; // change the direction
    this.isDescChange.emit(this.isDesc);
    this.column = property;
    this.columnChange.emit(this.column);
  }

  redirectDetailPage(data, type): void {
    let url = '';
    if (type === 'Member') {
      url = memberInformationUrlPrefixMemberProfile + data;
    } else if (type === 'Claim') {
      url = claimProcessingUrlPrefixClaimDetails + data;
    }
    const params: NavigationExtras = {queryParams: {command: 'RM'}};
    this.router.navigate([url], params);
  }

  setRequesterInfo(requestDetails: RequestResultSet): void {
    this._requesterInfo = {
      timeStamp: requestDetails.reviewTimeStmp,
      requester: requestDetails.requester
    };
  }

  getTransferMemberRequestHeaderDetails(status: string): MaintenanceApprovalHeaderDetails {
    const details = this._maintApprovalDetails.get(status);
    let result;
    if (details) {
      result = {
        maintApprovalDetails: details,
        requesterInfo: this.requesterInfo
      };
    }
    return result;
  }

  goToRequestPage(data): void {
    this.requestDetails = data;
    this.setRequesterInfo(this.requestDetails);
    this.pageHeaderService.hasMaintApprovalDetails = true;

    if (this.requestDetails.status === 'Pending') {
      this.pageHeaderService.maintenanceApprovalHeaderDetails = this.getTransferMemberRequestHeaderDetails('pending');
    } else if (this.requestDetails.status === 'Approved') {
      this.pageHeaderService.maintenanceApprovalHeaderDetails = this.getTransferMemberRequestHeaderDetails('approved');
    } else if (this.requestDetails.status === 'Denied') {
      this.pageHeaderService.maintenanceApprovalHeaderDetails = this.getTransferMemberRequestHeaderDetails('denied');
    }

    const params: NavigationExtras = {queryParams: this.requestDetails};
    const redirectUrl = this.getUrl(this.requestDetails.actionCode);

    if (this.url.length > 0) {
      this.router.navigate([redirectUrl], params);
    }

  }

  getUrl(data): string {
    switch (data) {
      case 'TRANSFERCLAIM':
        this.url = claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTransferClaim;
        break;
      case 'UPDATEEOB':
        this.url = claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathUpdateEob;
        break;
      case 'MEM_ACCT_TRANS':
        this.url = claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTransferMember;
        break;
      case 'SPHMAINT':
        this.url = claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathUpdateSplHandling;
        break;
      case 'OOP_AGGR_MAIN':
        this.url = claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathUpdateMemberAggregate;
        break;
      case 'DED_AGGR_MAIN':
        this.url = claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathUpdateMemberAggregate;
        break;
      case 'AGGR_UPDATE':
        this.url = claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathUpdateMemberAggregate;
        break;
      case 'CROSSREFMAINT':
        this.url = claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathUpdateCrossRef;
        break;
      case 'REACTIVATECLAIM':
        this.url = claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathReactivateClaim;
        break;
      case 'DELETECLAIM':
        this.url = claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathDeleteClaim;
        break;
      default:
        this.url = '';

    }
    return this.url;
  }
}
