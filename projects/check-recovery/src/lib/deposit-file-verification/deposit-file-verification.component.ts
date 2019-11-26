import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {
  DepositApi as DepositApi,
  DepositConfirmationVO,
  DepositVerificationService as BpmDepositApi,
  PagedResourcesOfResourceListOfDepositSummaryVO,
  PagedResourcesOfResourceOfDepositSummaryVO,
  ReferencesApi,
  ReferenceValueVO
} from '@fox/rest-clients';
import {
  LoginService,
  MessageBoxService,
  MessageBoxType,
  TableColumnKind
} from '@fox/shared';
import * as momentConst from 'moment-timezone';
import * as uuidConst from 'uuid';
const moment = momentConst;
const uuid = uuidConst;
import {DepositHistoryResultSet} from './deposit-history.model';
import {VerifyDepositResultSet} from './verify-deposit.model';

@Component({
  selector: 'fox-deposit-file-verification',
  templateUrl: './deposit-file-verification.component.html',
  styleUrls: ['./deposit-file-verification.component.css'],
  providers: [BpmDepositApi]
})
export class DepositFileVerificationComponent implements OnInit {

  showDialog: boolean = false;
  depositDetailsListColumns: any[] = [];
  depositResultColumns = [
    {
      key: 'depositDateReceived',
      headerText: 'Date Received',
      border: false,
      kind: TableColumnKind.Date,
      sortKey: 'depositDateReceived'
    },
    {
      key: 'depositSource',
      headerText: 'Source',
      border: false,
      kind: TableColumnKind.Text,
      sortKey: 'depositSource'
    },
    {
      key: 'depositCount',
      headerText: '# of Deposits',
      border: false,
      kind: TableColumnKind.Text,
      sortKey: 'depositCount'
    },
    {
      key: 'depositSummaryTotal',
      headerText: 'Summary $ Amount',
      border: false,
      kind: TableColumnKind.Currency,
      sortKey: 'depositSummaryTotal'
    },
    {
      key: 'depositSummaryStatus',
      headerText: 'Verification Status',
      border: false,
      kind: TableColumnKind.Text,
      sortKey: 'depositSummaryStatus'
    },
    {
      key: 'verifyLink',
      headerText: 'Actions',
      border: false,
      kind: TableColumnKind.Link,
      preImage: 'confirm-green.svg'
    },
    {
      key: 'rejectLink',
      headerText: ' ',
      border: false,
      kind: TableColumnKind.Link,
      preImage: 'deny-red.svg'
    }
  ];
  isUnverifiedDepositDisplay: boolean = false;
  isHistoryDisplay: boolean = false;
  depositFileVerificationSuccessMsg: boolean = false;
  depositFileRejectedSuccessMsg: boolean = false;
  unverifiedDeposits: PagedResourcesOfResourceListOfDepositSummaryVO = new PagedResourcesOfResourceListOfDepositSummaryVO();
  pageSizeSelected: number = 10;
  showVerifyDepositModal = false;
  showRejectDepositModal = false;
  verifyRejectSummaryId: number = 0;
  maxRejectionDescriptionLength: number = 200;
  pageTotal: number = 0;
  rejectForm: FormGroup = new FormGroup({
    rejectionDescription: new FormControl()
  });
  depositResult: VerifyDepositResultSet[] = [];
  dataLengthInput: number | undefined;
  currentPage: number = 0;
  verifyRejectDepositResult: VerifyDepositResultSet[] = [];
  depositHistory: PagedResourcesOfResourceListOfDepositSummaryVO = new PagedResourcesOfResourceListOfDepositSummaryVO();
  errorStatus: string = '';
  isError: boolean = false;

  depositHistoryResult: DepositHistoryResultSet[] = [];
  showRejectionReasonModal: boolean = false;
  rejectedDepositDate: string = '';
  rejectedDepositUser: string = '';
  rejectedDepositReason: string = '';

  depositSummaryHistoryFormGroup: FormGroup = this.fb.group({});
  dataHistoryLengthInput: number | undefined;
  currentHistoryPage: number = 0;
  pageTotalHistory: number = 0;
  pageHistorySizeSelected: number = 10;
  rejectionSummaryId: number = 0;
  rejectionDepositResult: DepositHistoryResultSet[] = [];
  depositStatuses: Array<ReferenceValueVO> = [];
  depositSources: Array<ReferenceValueVO> = [];
  despositSummaryFrom = new FormControl('');
  despositSummaryTo = new FormControl('');
  tooManyDepositSummaries: boolean = false;
  errorStatusText: string = '';
  showNoDepositHistoryAlert: boolean = false;

  tableColumnCurrentSortKey: string = '';
  tableColumnCurrentSortDirection: string = '';
  historyResultSortKey: string = '';
  historyResultSortDirection: string = '';

  verifyRejectDepositColumns = [
    {
      key: 'depositDateReceived',
      headerText: 'Date Received',
      border: false,
      kind: TableColumnKind.Text
    },
    {
      key: 'depositSource',
      headerText: 'Source',
      border: false,
      kind: TableColumnKind.Text
    },
    {
      key: 'depositCount',
      headerText: '# of Deposits',
      border: false,
      kind: TableColumnKind.Text

    },
    {
      key: 'depositSummaryTotal',
      headerText: 'Summary # Amount',
      border: false,
      kind: TableColumnKind.Currency
    },
    {
      key: 'depositSummaryStatus',
      headerText: 'Verification Status',
      border: false,
      kind: TableColumnKind.Text
    }
  ];

  get dataKeys(): string[] {
    return Object.keys(this.depositResult[0]);
  }

  get dataHistoryKeys(): string[] {
    return Object.keys(this.depositHistoryResult[0]);
  }

  constructor(
    private depositsSvc: DepositApi,
    private loginSvc: LoginService,
    private bpmDepositSvc: BpmDepositApi,
    private fb: FormBuilder,
    private referencesSvc: ReferencesApi,
    private messageBoxSvc: MessageBoxService
  ) {
    this.depositSummaryHistoryForm();
  }

  ngOnInit(): void {
    this.getUnverifiedDeposits();
    this.getDepositStatuses();
    this.getDepositSources();
  }

  depositSummaryHistoryForm(): void {

    this.depositSummaryHistoryFormGroup = this.fb.group({
      despositSummaryFrom: this.despositSummaryFrom,
      despositSummaryTo: this.despositSummaryTo,
      depositSource: [''],
      depositStatus: ['']
    }, {updateOn: 'blur'});
  }

  getUnverifiedDeposits(): void {
    const obs = this.depositsSvc.findDepositSummary(uuid(), undefined, undefined, undefined, 'UNV', this.pageSizeSelected, this.currentPage, 'DESC', 'dateReceived');

    if (obs) {
      obs.subscribe(obj => {
        this.unverifiedDeposits = obj;
        if (obj) {
          this.isUnverifiedDepositDisplay = true;
        } else {
          this.isUnverifiedDepositDisplay = false;
        }
        this.processDepositSearchResult(obj);
      }, e => {
        if (e.status === 404) {
          this.isUnverifiedDepositDisplay = false;
        }
      });
    }
  }

  resetHistorySearch(): void {
    this.currentHistoryPage = 0;
  }

  getDepositHistory(): void {
    this.showNoDepositHistoryAlert = false;

    const values = this.depositSummaryHistoryFormGroup.value;
    const despositSummaryFrom = values.despositSummaryFrom;
    const despositSummaryTo = values.despositSummaryTo || values.despositSummaryFrom;
    const depositSource = values.depositSource;
    const depositStatus = values.depositStatus;
    this.tooManyDepositSummaries = false;

    const obs = this.depositsSvc.findDepositSummary(uuid(), despositSummaryFrom, despositSummaryTo, depositSource, depositStatus, this.pageHistorySizeSelected, this.currentHistoryPage, 'DESC', 'dateReceived');
    if (obs) {
      obs.subscribe(obj => {
        this.depositHistory = obj;
        if (obj) {
          if (obj && obj.page && obj.page.totalElements && obj.page.totalElements <= 100) {
            this.isHistoryDisplay = true;
          } else if (obj && obj.page && obj.page.totalElements && obj.page.totalElements > 100) {
            this.isHistoryDisplay = false;
            this.tooManyDepositSummaries = true;
            this.messageBoxSvc.addMessageBox('Too many deposit summaries found', MessageBoxType.ERROR, ' Please update your search query and try again.');
          }
        } else {
          this.isHistoryDisplay = false;
        }
        this.processDepositHistorySearchResult(obj);
      }, e => {
        if (e.status === 404) {
          this.isHistoryDisplay = false;
          this.showNoDepositHistoryAlert = true;
          this.messageBoxSvc.addMessageBox('No deposit history files found', MessageBoxType.ERROR, 'Please update your search query and try again.');
        }
      });
    }
  }

  verficationStatus(row: any): TableColumnKind {
    return row.depositSummaryStatus === 'Rejected' ? TableColumnKind.Link : TableColumnKind.Text;
  }

  processDepositHistorySearchResult(searchResult: PagedResourcesOfResourceOfDepositSummaryVO): void {
    this.depositDetailsListColumns = [
      {
        key: 'depositDateReceived',
        headerText: 'Date Received',
        border: false,
        kind: TableColumnKind.Date
      },
      {
        key: 'depositSource',
        headerText: 'Source',
        border: false,
        kind: TableColumnKind.Text,
        sortKey: 'depositSource'
      },
      {
        key: 'depositCount',
        headerText: '# of Deposits',
        border: false,
        kind: TableColumnKind.Text,
        sortKey: 'depositCount'
      },
      {
        key: 'depositSummaryTotal',
        headerText: 'Summary $ Amount',
        border: false,
        kind: TableColumnKind.Currency,
        sortKey: 'depositSummaryTotal'
      },
      {
        key: 'depositSummaryStatus',
        headerText: 'Verification Status',
        border: false,
        kind: TableColumnKind.Dynamic,
        dynamicKind: this.verficationStatus,
        sortKey: 'depositSummaryStatus'
      },
      {
        key: 'dateVerifiedRejected',
        headerText: 'Date Verified/Rejected',
        border: false,
        kind: TableColumnKind.Date,
        sortKey: 'dateVerifiedRejected'
      }

    ];
    if (searchResult && searchResult['_embedded'] && searchResult['_embedded'].items && searchResult.page &&
      searchResult.page.number !== undefined && searchResult.page.size && searchResult.page.totalPages) {

      this.depositHistoryResult = [];
      searchResult['_embedded'].items.forEach(item => {
        const mappedItem: DepositHistoryResultSet = new DepositHistoryResultSet();
        mappedItem.depositSummaryId = item.depositSummaryId ? item.depositSummaryId : 0;
        mappedItem.depositDateReceived = item.depositDateReceived ? this.formatDateToCST(this.getDate(item.depositDateReceived.toString())) : 'Not Available';
        mappedItem.depositSource = item.depositSource ? item.depositSource.toString() : 'Not Available';
        mappedItem.depositCount = item.depositCount ? item.depositCount : 0;
        mappedItem.depositSummaryTotal = item.depositSummaryTotal ? item.depositSummaryTotal.toString() : 'Not Available';
        mappedItem.depositSummaryStatus = item.depositSummaryStatus ? item.depositSummaryStatus.toString() : 'Not Available';
        mappedItem.dateVerifiedRejected = item.verifiedDate ? this.formatDateToCST(this.getDate(item.verifiedDate.toString())) : 'Not Available';
        mappedItem.lastModifiedBy = item.verifiedBy ? item.verifiedBy.toString() : 'Not Available';
        mappedItem.reason = item.despositSummaryStatusReason ? item.despositSummaryStatusReason.toString() : 'Not Available';
        this.depositHistoryResult.push(mappedItem);
      });

      this.dataHistoryLengthInput = searchResult.page.totalElements;
      this.currentHistoryPage = searchResult.page.number;
      this.pageTotalHistory = searchResult.page.totalPages;
    }
  }

  getDepositStatuses(): void {
    const obs = this.referencesSvc.listCategoryCodes('DEPOSIT_STATUS', uuid());

    if (obs) {
      obs.subscribe(obj => {
        this.depositStatuses = obj.filter(status => status.code !== 'REC');
      });
    }
  }

  getDepositSources(): void {
    const obs = this.referencesSvc.listCategoryCodes('DEPOSIT_SOURCE', uuid());

    if (obs) {
      obs.subscribe(obj => {
        this.depositSources = obj;
      });
    }
  }

  processDepositSearchResult(searchResult: PagedResourcesOfResourceOfDepositSummaryVO): void {
    if (searchResult && searchResult['_embedded'] && searchResult['_embedded'].items && searchResult.page &&
      searchResult.page.number !== undefined && searchResult.page.size && searchResult.page.totalPages) {

      this.depositResult = [];
      searchResult['_embedded'].items.forEach(item => {
        const mappedItem: VerifyDepositResultSet = new VerifyDepositResultSet();
        mappedItem.depositSummaryId = item.depositSummaryId ? item.depositSummaryId : 0;
        mappedItem.depositDateReceived = item.depositDateReceived ? this.formatDateToCST(this.getDate(item.depositDateReceived.toString())) : 'Not Available';
        mappedItem.depositSource = item.depositSource ? item.depositSource.toString() : 'Not Available';
        mappedItem.depositCount = item.depositCount ? item.depositCount : 0;
        mappedItem.depositSummaryTotal = item.depositSummaryTotal ? item.depositSummaryTotal.toString() : 'Not Available';
        mappedItem.depositSummaryStatus = item.depositSummaryStatus ? item.depositSummaryStatus.toString() : 'Not Available';
        mappedItem.verifyLink = 'Verify';
        mappedItem.rejectLink = 'Reject';

        this.depositResult.push(mappedItem);
      });
      this.dataLengthInput = searchResult.page.totalElements;
      this.currentPage = searchResult.page.number;
      this.pageTotal = searchResult.page.totalPages;
    }
  }

  getDate(date: string): string {
    return date.replace(/"/g, '');
  }

  verifyDepositModal(summaryId: number): void {
    this.depositFileVerificationSuccessMsg = false;
    this.verifyRejectSummaryId = summaryId;
    const found = this.depositResult.filter(x => x.depositSummaryId === summaryId);
    this.verifyRejectDepositResult = found;
    this.showVerifyDepositModal = true;
  }

  closeVerifyDepositModal(): void {
    this.showVerifyDepositModal = false;
  }

  confirmVerifyDeposit(): void {
    const depConf: DepositConfirmationVO = {
      depositSummaryId: this.verifyRejectSummaryId,
      status: DepositConfirmationVO.StatusEnum.VERIFIED,
      reason: '',
      verifiedBy: this.loginSvc.loginState.username
    };
    const obs = this.bpmDepositSvc.completeDepositVerification(depConf, uuid());

    if (obs) {
      obs.subscribe(obj => {
        const objT = obj;
        this.getUnverifiedDeposits();
        this.depositFileVerificationSuccessMsg = true;
        this.messageBoxSvc.addMessageBox('Deposit File Verified', MessageBoxType.SUCCESS, 'This deposit file has been successfully verified');
        if (this.verifyRejectDepositResult && this.verifyRejectDepositResult.length) {
          if (this.verifyRejectDepositResult[0].depositSource !== 'PRS') {
            this.submitQueueDetails(this.verifyRejectSummaryId);
          }
        }
      }, e => {
        if (e.status !== 202) {
          this.errorStatus = e.status;
          this.errorStatusText = e.statusText;
          this.isError = true;
          const msg = 'Error (' + this.errorStatus + '): ' + this.errorStatusText;
          this.messageBoxSvc.addMessageBox('Error', MessageBoxType.ERROR, msg);
          this.setCompleteActionStatus();
        } else {
          this.depositFileVerificationSuccessMsg = true;
          this.messageBoxSvc.addMessageBox('Deposit File Verified', MessageBoxType.SUCCESS, 'This deposit file has been successfully verified');
        }
      });
    }

    this.showVerifyDepositModal = false;

  }

  submitQueueDetails(depositSummaryId: number): void {
    this.depositsSvc.getQueueDetails(depositSummaryId, uuid()).subscribe(res => {
    });
  }

  confirmRejectDeposit(): void {
    const reason: string = this.rejectForm.get('rejectionDescription')!.value.toString();
    const depConf: DepositConfirmationVO = {
      depositSummaryId: this.verifyRejectSummaryId,
      status: DepositConfirmationVO.StatusEnum.REJECTED,
      reason: reason,
      verifiedBy: this.loginSvc.loginState.username
    };
    const obs = this.bpmDepositSvc.completeDepositVerification(depConf);

    if (obs) {
      obs.subscribe(obj => {
          const objT = obj;
          this.getUnverifiedDeposits();
          this.depositFileRejectedSuccessMsg = true;
        }, e => {
          if (e.status !== 202) {
            this.errorStatus = e.status;
            this.errorStatusText = e.statusText;
            this.isError = true;
            const msg = 'Error (' + this.errorStatus + '): ' + this.errorStatusText;
            this.messageBoxSvc.addMessageBox('Error', MessageBoxType.ERROR, msg);
            this.setCompleteActionStatus();
          } else {
            this.depositFileRejectedSuccessMsg = true;
          }
        }
      );
    }

    this.closeRejectDepositModal();
  }

  setCompleteActionStatus(): void {
    switch (Number(this.errorStatus)) {
      case 400:
        this.errorStatusText = 'Bad Request';
        break;
      case 401:
        this.errorStatusText = 'User Unauthorized';
        break;
      case 403:
        this.errorStatusText = 'User Forbidden';
        break;
      case 404:
        this.errorStatusText = 'Resource Not Found';
        break;
      case 409:
        this.errorStatusText = 'Process Complete';
        break;
      case 412:
        this.errorStatusText = 'Process Complete';
        break;
      case 415:
        this.errorStatusText = 'Unsupported Media Type';
        break;
      case 500:
        this.errorStatusText = 'Internal Error';
        break;
    }
  }

  rejectDepositModal(summaryId: number): void {
    this.depositFileRejectedSuccessMsg = false;
    this.verifyRejectSummaryId = summaryId;
    const found = this.depositResult.filter(x => x.depositSummaryId === summaryId);
    this.verifyRejectDepositResult = found;
    this.showRejectDepositModal = true;
  }

  closeRejectDepositModal(): void {
    this.showRejectDepositModal = false;
    this.rejectForm.reset({
      rejectionDescription: ''
    });
  }

  formatDateToCST(originalFormat: any): string {
    return moment.tz(originalFormat, 'America/Chicago').format('MM/DD/YYYY');
  }

  convertDateToISO(originalDate: string): string | undefined {
    if (originalDate) {
      const dob = originalDate.split('/');
      return dob[2] + '-' + dob[0] + '-' + dob[1];
    } else {
      return undefined;
    }
  }

  getRejectionReasonModal(summaryId: number): void {
    this.rejectionSummaryId = summaryId;
    this.rejectionDepositResult = this.depositHistoryResult.filter(x => x.depositSummaryId === summaryId);
    this.rejectedDepositUser = this.rejectionDepositResult[0].lastModifiedBy;
    this.rejectedDepositDate = this.rejectionDepositResult[0].dateVerifiedRejected;
    this.rejectedDepositReason = this.rejectionDepositResult[0].reason;
    this.showRejectionReasonModal = true;
  }

  checkIfRecDateFilled(): void {
    if (!this.despositSummaryFrom.invalid && this.despositSummaryFrom.value) {
      this.despositSummaryTo.reset({value: '', disabled: false});
    } else {
      this.despositSummaryTo.reset({value: '', disabled: true});
    }
  }

  checkIfFormFilled(): boolean {
    const values = this.depositSummaryHistoryFormGroup.value;

    return !!(values.despositSummaryFrom || values.depositSource || values.depositStatus);
  }

  verifyReject(linkData: any): void {
    const key = linkData && linkData.col && linkData.col.key;
    const summaryId = linkData && linkData.data && linkData.data.depositSummaryId;
    switch (key) {
      case 'verifyLink':
        this.verifyDepositModal(summaryId);
        break;
      case 'rejectLink':
        this.rejectDepositModal(summaryId);
        break;
      case 'depositSummaryStatus':
        this.getRejectionReasonModal(summaryId);
        break;
    }
  }

  getRemainingCharacters(length: number): number {
    return this.maxRejectionDescriptionLength - length;
  }
}
