import {animate, state, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {
  CheckIdsVO,
  PagedResourcesOfResourceOfCheckVO,
  ResourceOfCheckVO
} from '@fox/rest-clients';
import {
  checkRecoveryRoutePathPrefixBulkDetail,
  checkRecoveryRoutePathRoot,
  checkRecoveryUrlFindCheckRegister,
  CommonService,
  FeatureFlagService,
  LoginService,
  TableColumnKind
} from '@fox/shared';
import {CheckRecoveryService} from '../../shared/check-recovery.service';
import {CheckDetailSubSectionComponent} from '../check-detail-sub-section/check-detail-sub-section.component';
import {McReplaceVoidComponent} from '../mc-replace-void/mc-replace-void.component';

@Component({
  selector: 'fox-multiple-checks',
  templateUrl: './multiple-checks.component.html',
  styleUrls: ['./multiple-checks.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('*', style({height: '*', visibility: 'visible'})),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
    [
      trigger('rotatedState', [
        state('default', style({transform: 'rotate(0deg)'})),
        state('rotated', style({transform: 'rotate(90deg)'})),
        transition('rotated => default', animate('225ms ease-out')),
        transition('default => rotated', animate('225ms ease-out'))
      ])
    ]
  ]
})
export class MultipleChecksComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginatorObj?: MatPaginator;
  @ViewChild(McReplaceVoidComponent) replaceVoidCheck?: McReplaceVoidComponent;

  dataSource = new MatTableDataSource<ResourceOfCheckVO>();
  tableData: any[] = [];
  displayedColumns = [
    {
      key: 'checkNumber',
      headerText: 'Check #',
      border: false
    },
    {
      key: 'issueDate',
      headerText: 'Date',
      border: false,
      kind: TableColumnKind.Date
    },
    {
      key: 'claimAmount',
      headerText: 'Claim Amount',
      kind: TableColumnKind.Currency,
      border: false
    },
    {
      key: 'payeeName',
      headerText: 'Payee',
      border: false
    },
    {
      key: 'claimNumber',
      headerText: 'Claim #',
      kind: TableColumnKind.Link,
      border: false,
      preImage: 'claim-blue.svg'
    },
    {
      key: 'checkAmount',
      headerText: 'Check Amount',
      kind: TableColumnKind.Currency,
      border: false
    },
    {
      key: 'remove',
      headerText: 'Actions',
      kind: TableColumnKind.Link,
      border: false,
      preImage: 'deny-blue.svg'
    },
    {
      key: 'bulkLink',
      headerText: ' ',
      kind: TableColumnKind.Link,
      border: false,
      preImage: 'check-blue.svg'
    }
  ];
  currentPage = 0;
  lastPageIndex = 0;
  pageSize = 5;
  state: string = 'default';
  showDialog: boolean = false;
  replaceSuccessMsg: boolean = false;
  errorMsg: boolean = false;
  checkIds: CheckIdsVO = {checkid: []};
  isConfirm: boolean = false;
  expandedCheckId?: number;

  get toggleCheckReplacementVersionFeature(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F4554');
  }

  get dataLength(): number {
    if (this.tableData && this.tableData) {
      return this.tableData.length;
    } else {
      return 0;
    }
  }

  get checkDetails(): ResourceOfCheckVO | undefined {
    if (this.dataLength) {
      return this.tableData[0];
    }
    return undefined;
  }

  constructor(
    private checkSvc: CheckRecoveryService,
    private fb: FormBuilder,
    private loginSvc: LoginService,
    private router: Router,
    private commonSvc: CommonService,
    private featureFlagSvc: FeatureFlagService,
    private checkRecoveryService: CheckRecoveryService
  ) {
    this.lastPageIndex = this.pageSize;
  }

  ngOnInit(): void {
    this.checkIds.checkid = this.commonSvc.checkIds;
    this.checkRecoveryService.checkIds = this.checkIds;
    this.getMultipleCheckDetails(this.checkIds);
  }

  ngAfterViewInit(): void {
    if (this.paginatorObj) {
      this.dataSource.paginator = this.paginatorObj;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  getMultipleCheckDetails(checkIds: CheckIdsVO): void {
    this.checkSvc.getMultipleChecks(checkIds).subscribe((checkSummaries: PagedResourcesOfResourceOfCheckVO) => {
      if (checkSummaries && checkSummaries._embedded && checkSummaries._embedded.items && checkSummaries._embedded.items.length) {
        this.tableData = checkSummaries._embedded.items;
        this.tableData = this.tableData.map(e => {
          e.remove = 'Remove';
          e.bulkLink = e.isBulk ? 'Bulk Check Details' : '';
          e.component = CheckDetailSubSectionComponent;
          return e;
        });
        this.checkNpi(this.tableData);
      } else {
        this.tableData = [];
      }
    });
  }

  checkNpi(data: any): void {
    if (data) {
      const firstNpi = data[0].npi;
      const npiMismatchArr = data.filter((d: any) => d.npi !== firstNpi);
      if (npiMismatchArr && npiMismatchArr.length > 0) {
        this.commonSvc.isNpiMismatch = true;
      } else {
        this.commonSvc.isNpiMismatch = false;
      }
    }
  }

  goBack(): void {
    this.commonSvc.isBack = true;
    this.router.navigate([checkRecoveryUrlFindCheckRegister]).then();
  }

  actionRemove(checkId: number): void {
    if (this.checkIds && this.checkIds.checkid && checkId) {
      this.checkIds.checkid = (this.checkIds.checkid || []).filter(cId => cId !== checkId.toString());
      this.tableData = this.tableData.filter(check => check.checkId !== checkId);
      this.commonSvc.checkIds = this.commonSvc.checkIds.filter(cId => cId !== checkId.toString());
      this.checkNpi(this.tableData);
      if (this.replaceVoidCheck && this.checkDetails) {
        this.replaceVoidCheck.appendRemainedCheckDetails(this.checkDetails);
      }
    }
  }

  rotate(checkId: string): void {
    const incomingCheckId = parseInt(checkId, 10);
    if (isNaN(incomingCheckId) || this.expandedCheckId === incomingCheckId) {
      this.expandedCheckId = undefined;
    } else {
      this.expandedCheckId = incomingCheckId;
    }
  }

  statusChange(e: any): void {
    console.log(e);
    if (e.action === 'refresh') {
      this.isConfirm = e.data.isConfirm;
      this.getMultipleCheckDetails(this.checkIds);
      this.commonSvc.checkIds = [];
      this.replaceSuccessMsg = true;
      this.errorMsg = false;
    } else if (e.action === 'remove') {
      this.actionRemove(e.data);
    } else {
      this.errorMsg = true;
      this.replaceSuccessMsg = false;
    }
  }

  currentRowIfExpanded(row: any): any {
    if (row) {
      if (row.checkId === this.expandedCheckId) {
        return row;
      }
    }
    return undefined;
  }

  // Access to Screen for these Groups
  grantedAccessToRVScreen(): boolean {
    return this.loginSvc.hasOpAuthorizePaymentRole || this.loginSvc.hasOpMaintainPaymentRole;
  }

  linkClicked(linkData: any): void {
    const key = linkData && linkData.col && linkData.col.key;
    if (key) {
      if (key === 'remove') {
        const checkId = linkData && linkData.data && linkData.data.checkId;
        this.actionRemove(checkId);
      }
      if (key === 'bulkLink') {
        const checkParams = this.getBulkDetailsLink(linkData.data);
        const path = '/' + checkRecoveryRoutePathRoot + '/' + checkRecoveryRoutePathPrefixBulkDetail;
        this.router.navigate([path, checkParams]).then();
      }
    }
  }

  getBulkDetailsLink(checkDetails: any): string {
    const checkSeries = checkDetails.checkSeries || '';
    const checkNumber = checkDetails.checkNumber ?
      checkDetails.checkNumber :
      (checkDetails.checkNumber === 0 ? 0 : '');
    const checkIssueDate = checkDetails.issueDate || '';
    const checkStatus = (checkDetails.status || '').toString();
    const checkAmount = checkDetails.checkAmount ?
      checkDetails.checkAmount :
      (checkDetails.checkAmount === 0 ? 0 : '');
    const checkPayee = checkDetails.payee || '';
    return checkSeries + '|' + checkNumber + '|' + checkIssueDate + '|' + checkStatus + '|' + checkAmount + '|' + checkPayee;
  }
}
