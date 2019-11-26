import {AfterViewInit, Component, HostListener, NgZone, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourceOfCheckSummaryVO} from '@fox/rest-clients';
import {
  checkRecoveryUrlPrefixCheckDetail,
  checkRecoveryUrlPrefixPurgedCheck,
  CommonService,
  FeatureFlagService,
  FoxValidators,
  LoginService,
  MessageBoxService,
  MessageBoxType
} from '@fox/shared';
import * as _ from 'lodash';
import * as momentConst from 'moment';
import {CheckRecoveryService} from '../shared/check-recovery.service';
import {CheckRegisterCommon} from '../shared/checkregistercommon.model';

const moment = momentConst;
@Component({
  selector: 'fox-ui-check-register',
  templateUrl: './check-register.component.html',
  styleUrls: ['./check-register.component.css']
})
export class CheckRegisterComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginatorObj?: MatPaginator;

  common = new CheckRegisterCommon();
  checkRegisterDropdown: string = 'check_series';
  find: any = {};
  dataSource = new MatTableDataSource();
  dataLength = 0;
  displayedColumns = ['replaceOrVoid', 'checkNumber', 'issueDate', 'claimAmount', 'status', 'payeeName'
    , 'tin', 'claimNumber', 'accountNumber', 'checkAmount', 'isBulk']; // 'purgedCheck', 'replaceOrVoid', 'npi'
  checkRegisterFormGroup?: FormGroup;
  checkSeriesFormGroup?: FormGroup;
  accountNoFormGroup?: FormGroup;
  claimOrBatchFormGroup?: FormGroup;
  byProviderFormGroup?: FormGroup;
  isData: boolean = false;
  isError: boolean = false;
  isErrorForTIN: boolean = false;
  isErrorForNPI: boolean = false;
  showDialog: boolean = false;
  currentPage = 0;
  lastPageIndex = 0;
  pageSize = 5;
  isPayeeNameMismatch: boolean = false;
  isTinMismatch: boolean = false;
  misMatchCheckId: number | any;
  replaceSuccessMsg: boolean = false;
  voidSuccessMsg: boolean = false;
  authorizeSuccessMsg: boolean = false;
  denySuccessMsg: boolean = false;
  checkedItems: string[] = [];
  claimNumInput: string = '';

  get isF4764Enabled(): boolean {
    return !this.featureFlagService.isFeatureDisabled('F4764');
  }

  constructor(
    private checkSvc: CheckRecoveryService,
    private fb: FormBuilder,
    private loginSvc: LoginService,
    private router: Router,
    private commonSvc: CommonService,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private messageBoxService: MessageBoxService,
    private featureFlagService: FeatureFlagService
  ) {
    featureFlagService.disabledFeaturesChange.subscribe((disabledFeatures: string[]) => {
      this.doFormInit();
    });
    this.doFormInit();
    this.lastPageIndex = this.pageSize;
  }

  ngAfterViewInit(): void {
    if (this.paginatorObj) {
      this.dataSource.paginator = this.paginatorObj;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['claimNumber']) {
        this.checkRegisterDropdown = 'claim_number';
        this.claimNumInput = params['claimNumber'];
      }
    });
    this.common = new CheckRegisterCommon();
    if (this.commonSvc.isBack) {
      if (this.commonSvc.checkIds.length) {
        this.checkedItems = this.commonSvc.checkIds;
        this.checkRegisterDropdown = this.commonSvc.dropdownOption;
      }
      this.getCheck(this.commonSvc.checkRegisterPayload);
      this.replaceSuccessMsg = this.commonSvc.replaceSuccessMsg;
      this.voidSuccessMsg = this.commonSvc.voidSuccessMsg;
      this.authorizeSuccessMsg = this.commonSvc.authorizeSuccessMsg;
      this.denySuccessMsg = this.commonSvc.denySuccessMsg;
      if (this.replaceSuccessMsg || this.voidSuccessMsg || this.authorizeSuccessMsg || this.denySuccessMsg) {
        const __this = this;
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            this.ngZone.run(() => {
              __this.replaceSuccessMsg = false;
              __this.voidSuccessMsg = false;
              __this.authorizeSuccessMsg = false;
              __this.denySuccessMsg = false;
              __this.commonSvc.replaceSuccessMsg = false;
              __this.commonSvc.voidSuccessMsg = false;
              __this.commonSvc.authorizeSuccessMsg = false;
              __this.commonSvc.denySuccessMsg = false;
            });
          }, 5000);
        });
      }
    } else if (this.commonSvc.checkRegisterPayload && this.commonSvc.checkRegisterPayload.dropdownOptions === 'check_series') {
      this.replaceSuccessMsg = this.commonSvc.replaceSuccessMsg;
      this.voidSuccessMsg = this.commonSvc.voidSuccessMsg;
      this.authorizeSuccessMsg = this.commonSvc.authorizeSuccessMsg;
      this.denySuccessMsg = this.commonSvc.denySuccessMsg;
      if (this.replaceSuccessMsg || this.voidSuccessMsg || this.authorizeSuccessMsg || this.denySuccessMsg) {
        const __this = this;
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            this.ngZone.run(() => {
              __this.replaceSuccessMsg = false;
              __this.voidSuccessMsg = false;
              __this.authorizeSuccessMsg = false;
              __this.denySuccessMsg = false;
              __this.commonSvc.replaceSuccessMsg = false;
              __this.commonSvc.voidSuccessMsg = false;
              __this.commonSvc.authorizeSuccessMsg = false;
              __this.commonSvc.denySuccessMsg = false;
            });
          }, 5000);
        });
      }
    }
  }

  doFormInit(): void {
    this.checkSeriesValidation();
    this.accountNoValidation();
    this.claimOrBatchValidation();
    this.byProviderValidation();
    this.checkRegisterFormGroup = this.fb.group({
      'checkSeriesFormGroup': this.checkSeriesFormGroup,
      'accountNoFormGroup': this.accountNoFormGroup,
      'claimOrBatchFormGroup': this.claimOrBatchFormGroup,
      'byProviderFormGroup': this.byProviderFormGroup
    }, {
      validators: [(control: AbstractControl): ValidationErrors | null => {
        if (control instanceof FormGroup) {
          const checkFgValued = this.checkCriteriaValued();
          const acctFgValued = this.accountCriteriaValued();
          const clmFgValued = this.claimCriteriaValued();
          const prvdrFgValued = this.providerCriteriaValued();
          const checkFgValid = this.checkCriteriaValid();
          const acctFgValid = this.accountCriteriaValid();
          const clmFgValid = this.claimCriteriaValid();
          const prvdrFgValid = this.providerCriteriaValid();

          if (checkFgValued && !(acctFgValued || clmFgValued || prvdrFgValued)) {
            if (checkFgValid) {
              return null;
            } else {
              return [{
                'checkRegisterSearchRequirements': 'Check search criteria is invalid'
              }];
            }
          } else if (acctFgValued && !(checkFgValued || clmFgValued || prvdrFgValued)) {
            if (acctFgValid) {
              return null;
            } else {
              return [{
                'checkRegisterSearchRequirements': 'Member account search criteria is invalid'
              }];
            }
          } else if (clmFgValued && !(checkFgValued || acctFgValued || prvdrFgValued)) {
            if (clmFgValid) {
              return null;
            } else {
              return [{
                'checkRegisterSearchRequirements': 'Claim search criteria is invalid'
              }];
            }
          } else if (prvdrFgValued && !(checkFgValued || acctFgValued || clmFgValued)) {
            if (prvdrFgValid) {
              return null;
            } else {
              return [{
                'checkRegisterSearchRequirements': 'Provider search criteria is invalid'
              }];
            }
          } else {
            return [{
              'checkRegisterSearchRequirements': 'One and only one set of search criteria must be valued, and it must be valid'
            }];
          }
        }
        return null;
      }]
    });
  }

  checkCriteriaValued(): boolean {
    if (this.checkSeriesFormGroup) {
      const checkFg = this.checkSeriesFormGroup;
      const checkSeriesCtl = checkFg.get('checkSeriesControl') as FormControl;
      const checkNoCtl = checkFg.get('CheckRegisterNoControl') as FormControl;
      const checkIssDtCtl = checkFg.get('CheckRegisterIssueDateControl') as FormControl;
      return !!checkSeriesCtl.value || !!checkNoCtl.value || !!checkIssDtCtl.value;
    }
    return false;
  }

  checkCriteriaValid(): boolean {
    let checkFgValid = false;
    if (this.checkSeriesFormGroup) {
      const checkFg = this.checkSeriesFormGroup;
      checkFgValid = checkFg.valid;
      const checkSeriesCtl = checkFg.get('checkSeriesControl') as FormControl;
      const checkNoCtl = checkFg.get('CheckRegisterNoControl') as FormControl;
      const checkIssDtCtl = checkFg.get('CheckRegisterIssueDateControl') as FormControl;
      // All 3 must be valued since all 3 are required
      checkFgValid = checkFgValid && !!checkSeriesCtl.value && !!checkNoCtl.value && !!checkIssDtCtl.value;
    }
    return checkFgValid;
  }

  accountCriteriaValued(): boolean {
    if (this.accountNoFormGroup) {
      const acctFg = this.accountNoFormGroup;
      const acctNoCtl = acctFg.get('CheckRegisterAccountNoControl') as FormControl;
      return !!acctNoCtl.value;
    }
    return false;
  }

  accountCriteriaValid(): boolean {
    let acctFgValid = false;
    if (this.accountNoFormGroup) {
      const acctFg = this.accountNoFormGroup;
      acctFgValid = acctFg.valid;
      if (acctFgValid) {
        const acctNoCtl = acctFg.get('CheckRegisterAccountNoControl') as FormControl;
        acctFgValid = acctFgValid && !!acctNoCtl.value;
      }
    }
    return acctFgValid;
  }

  claimCriteriaValued(): boolean {
    if (this.claimOrBatchFormGroup) {
      const clmFg = this.claimOrBatchFormGroup;
      const clmNoCtl = clmFg.get('CheckRegisterClaimOrBatchControl') as FormControl;
      return !!clmNoCtl.value;
    }
    return false;
  }

  claimCriteriaValid(): boolean {
    let clmFgValid = false;
    if (this.claimOrBatchFormGroup) {
      const clmFg = this.claimOrBatchFormGroup;
      clmFgValid = clmFg.valid;
      if (clmFgValid) {
        const clmNoCtl = clmFg.get('CheckRegisterClaimOrBatchControl') as FormControl;
        clmFgValid = clmFgValid && !!clmNoCtl.value;
      }
    }
    return clmFgValid;
  }

  providerCriteriaValued(): boolean {
    if (this.byProviderFormGroup) {
      const prvdrFg = this.byProviderFormGroup;
      const tinCtl = prvdrFg.get('CheckRegisterPrvdrTINControl') as FormControl;
      const npiCtl = prvdrFg.get('CheckRegisterPrvdrNPIControl') as FormControl;
      return !!tinCtl.value || !!npiCtl.value;
    }
    return false;
  }

  providerCriteriaValid(): boolean {
    let prvdrFgValid = false;
    if (this.byProviderFormGroup) {
      const prvdrFg = this.byProviderFormGroup;
      prvdrFgValid = prvdrFg.valid;
      if (prvdrFgValid) {
        const tinCtl = prvdrFg.get('CheckRegisterPrvdrTINControl') as FormControl;
        const npiCtl = prvdrFg.get('CheckRegisterPrvdrNPIControl') as FormControl;
        prvdrFgValid = prvdrFgValid && (!!tinCtl.value || !!npiCtl.value);
      }
    }
    return prvdrFgValid;
  }

  switchForm(dropdownValue: string): void {
    if (dropdownValue === 'check_series') {
      this.checkSeriesValidation();
    }
    if (dropdownValue === 'account_number') {
      this.accountNoValidation();
    }
    if (dropdownValue === 'claim_number') {
      this.claimOrBatchValidation();
    }
    if (dropdownValue === 'provider') {
      this.byProviderValidation();
    }
    this.isError = false;
    this.isData = false;
    this.isErrorForTIN = false;
    this.isErrorForNPI = false;
  }

  checkSeriesValidation(): void {
    this.checkSeriesFormGroup = this.fb.group({
      checkSeriesControl:
        [
          '',
          Validators.compose(
            !this.isF4764Enabled
              ? [Validators.required, Validators.minLength(3), Validators.maxLength(3)]
              : [Validators.minLength(3), Validators.maxLength(3)]
          )
        ],
      CheckRegisterNoControl:
        [
          '',
          !this.isF4764Enabled
            ? [Validators.required, Validators.minLength(7), Validators.maxLength(7)]
            : [Validators.minLength(7), Validators.maxLength(7)]
        ],
      CheckRegisterIssueDateControl:
        [
          '',
          !this.isF4764Enabled
            ? [Validators.required, FoxValidators.mmddyyyyWithoutSlashDateValidator]
            : []
        ]
    });
  }

  accountNoValidation(): void {
    this.accountNoFormGroup = this.fb.group({
      CheckRegisterAccountNoControl:
        [
          '',
          !this.isF4764Enabled
            ? [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
            : []
      ]
    });
  }

  claimOrBatchValidation(): void {
    this.claimOrBatchFormGroup = this.fb.group({
      CheckRegisterClaimOrBatchControl:
        [
          '',
          !this.isF4764Enabled
            ? [Validators.required, Validators.minLength(12), Validators.maxLength(12)]
            : []
        ]
    });
  }

  byProviderValidation(): void {
    this.byProviderFormGroup = this.fb.group({
      CheckRegisterPrvdrTINControl: ['', [Validators.minLength(9), Validators.maxLength(9)]],
      CheckRegisterPrvdrNPIControl: ['', [Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  processDataForTable(data: ResourceOfCheckSummaryVO[]): void {

    data.forEach((searchResult: ResourceOfCheckSummaryVO) => {
      const zeroField = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      if (searchResult.isBulk) {
        // @ts-ignore
        searchResult.isBulk = 'BULK';
      } else {
        // @ts-ignore
        searchResult.isBulk = '';
      }
      if (searchResult.tin === 0) {
        // @ts-ignore
        searchResult.tin = '';
      }
      if (searchResult.npi === 0) {
        // @ts-ignore
        searchResult.npi = '';
      }
      let numberLength = 0;
      if (searchResult && searchResult.accountNumber) {
        numberLength = searchResult.accountNumber.toString().length;
      }
      zeroField.splice(0, numberLength);
      searchResult.accountNumber = zeroField.join('') + searchResult.accountNumber;
      if (searchResult && searchResult.status) {
        // @ts-ignore
        searchResult.status = searchResult.status.replace(/_/g, ' ');
      }

      if (searchResult.isPurged) {
        searchResult.payeeName = 'PURGED CHECK';
      }
    });
    const ELEMENT_DATA: ResourceOfCheckSummaryVO[] = data;

    this.dataSource.data = ELEMENT_DATA;
    this.dataLength = ELEMENT_DATA.length;
  }

  search(): void {
    if (this.checkRegisterFormGroup && this.checkRegisterFormGroup.valid) {
      if (this.checkSeriesFormGroup && this.checkCriteriaValid()) {
        this.searchData(this.checkSeriesFormGroup, 'check_series');
      } else if (this.accountNoFormGroup && this.accountCriteriaValid()) {
        this.searchData(this.accountNoFormGroup, 'account_number');
      } else if (this.claimOrBatchFormGroup && this.claimCriteriaValid()) {
        this.searchData(this.claimOrBatchFormGroup, 'claim_number');
      } else if (this.byProviderFormGroup && this.providerCriteriaValid()) {
        this.searchData(this.byProviderFormGroup, 'provider');
      }
    }
  }

  searchData(form: FormGroup, dropdownOptions: string): void {
    const formvalue = form.value;

    this.common = new CheckRegisterCommon();
    this.isError = false;
    this.isData = false;
    this.isErrorForTIN = false;
    this.isErrorForNPI = false;
    this.checkedItems = [];
    this.isPayeeNameMismatch = false;
    this.isTinMismatch = false;
    this.commonSvc.checkIds = [];

    if (form.valid) {
      let check_series, issueDate, formateIssueDt, formatedIssueDate, checkNumber,
        account_number,
        claim_number,
        tin,
        npi;
      if (dropdownOptions === 'check_series') {
        check_series = formvalue.checkSeriesControl;
        issueDate = formvalue.CheckRegisterIssueDateControl;
        formateIssueDt = moment(issueDate, 'MMDDYYYY');
        formatedIssueDate = !this.isF4764Enabled ? formateIssueDt.format('YYYY-MM-DD') : issueDate;
        checkNumber = formvalue.CheckRegisterNoControl;
      }
      if (dropdownOptions === 'account_number') {
        account_number = formvalue.CheckRegisterAccountNoControl;
      }
      if (dropdownOptions === 'claim_number') {
        claim_number = formvalue.CheckRegisterClaimOrBatchControl;
      }
      if (dropdownOptions === 'provider') {
        tin = formvalue.CheckRegisterPrvdrTINControl;
        if (parseInt(tin, 10) === 0) {
          this.isErrorForTIN = true;
          this.isData = false;
        } else {
          this.isErrorForTIN = false;
        }
        npi = formvalue.CheckRegisterPrvdrNPIControl;
        if (parseInt(npi, 10) === 0) {
          this.isErrorForNPI = true;
          this.isData = false;
        } else {
          this.isErrorForNPI = false;
        }
      }

      if (dropdownOptions && !this.isError && !this.isErrorForTIN && !this.isErrorForNPI) {

        const requestPayload = {
          dropdownOptions,
          account_number,
          check_series,
          checkNumber,
          formatedIssueDate,
          claim_number,
          tin,
          npi
        };
        this.getCheck(requestPayload);
      }

    }
  }

  getCheck(requestPayload: any): void {
    this.checkSvc.getCheck(requestPayload.dropdownOptions, requestPayload.account_number, requestPayload.check_series, requestPayload.checkNumber, requestPayload.formatedIssueDate, requestPayload.claim_number, requestPayload.tin, requestPayload.npi)
      .subscribe(resDataA => {
        if (resDataA && resDataA._embedded && resDataA._embedded.items) {
          this.commonSvc.checkRegisterPayload = requestPayload;
          this.commonSvc.isBack = false;
          if (resDataA._embedded.items[0].isBulk && !resDataA._embedded.items[0].isPurged && requestPayload.dropdownOptions === 'check_series') {
            const checkDetails = resDataA._embedded.items[0];
            this.findCheckDetail(checkDetails.checkId);
          } else {
            this.processDataForTable(resDataA._embedded.items);
            this.isError = false;
            this.isData = true;
          }
        } else {
          this.isError = true;
          this.isData = false;
          this.showNoRecordsMessage();
        }
      }, (e) => {
        this.isError = true;
        this.isData = false;
        this.showNoRecordsMessage(e);
      });
  }

  // Purged check Screen
  getUrlForCheck(checkDetails: ResourceOfCheckSummaryVO): string {
    let url = '';

    if (checkDetails.isPurged) {
      url = checkRecoveryUrlPrefixPurgedCheck + checkDetails.checkId;
    } else {
      url = checkRecoveryUrlPrefixCheckDetail + checkDetails.checkId;
    }

    return url;
  }

  // Navigate to Bulk view Screen, if check is Bulk on Check Series search
  findCheckDetail(checkId: number | undefined): void {
    if (checkId) {
      this.checkSvc.getCheckDetail(checkId).subscribe(res => {
        if (res) {
          const checkDetails = res;
          this.router.navigate(['/check-recovery/bulk-detail/', checkDetails.checkSeries + '|' + checkDetails.checkNumber + '|' + checkDetails.issueDate + '|' + checkDetails.status + '|' + checkDetails.checkAmount + '|' + checkDetails.payee]);
        }
      });
    }
  }

  showTable(): void {
    if (this.paginatorObj) {
      this.dataSource.paginator = this.paginatorObj;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.showDialog = true;
  }

  // multiple checks
  selectCheckBox(selectedElement: any): void {
    const val = selectedElement.target.value;

    if (selectedElement.target.checked === true) {
      this.checkedItems.push(val);
    } else {
      const index = this.checkedItems.indexOf(val);
      if (index !== -1) {
        this.checkedItems.splice(index, 1);
      }
    }
  }

  // multiple checks details
  postMultipleChecks(): void {
    this.isTinMismatch = false;
    this.isPayeeNameMismatch = false;
    this.commonSvc.checkIds = this.checkedItems;
    this.commonSvc.dropdownOption = this.checkRegisterDropdown;
    const ELEMENT_DATA = this.dataSource.data;
    let tin, payeeName;
    for (let k = 0; k < this.checkedItems.length; k++) {
      const checkItem: any = _.find(ELEMENT_DATA, ['checkId', parseInt(this.checkedItems[k], 10)]);
      if (!checkItem || !checkItem.tin) {
        checkItem.tin = '';
      }
      if (checkItem && (checkItem as any).npi === undefined) {
        (checkItem as any).npi = '';
      }
      if (checkItem && k === 0) {
        tin = (checkItem as any).tin;
        payeeName = (checkItem as any).payeeName;
      } else {
        if (checkItem && tin === (checkItem as any).tin) {
          if (payeeName !== (checkItem as any).payeeName) {
            this.misMatchCheckId = (checkItem as any).checkId;
            this.isPayeeNameMismatch = true;
          }
        } else if (tin !== (checkItem as any).tin) {
          this.misMatchCheckId = (checkItem as any).checkId;
          this.isTinMismatch = true;
          this.isPayeeNameMismatch = false;
        }
        if (this.isTinMismatch || this.isPayeeNameMismatch) {
          break;
        }
      }
    }
    if (!this.isPayeeNameMismatch && !this.isTinMismatch) {
      this.router.navigate(['/check-recovery/multiple-checks']);
    }
  }

  isSelected(checkId: number): boolean {
    let chkIds = this.commonSvc.checkIds;

    if (this.checkedItems.length) {
      chkIds = this.checkedItems;
    }

    if (chkIds) {
      return (chkIds.indexOf(checkId.toString()) !== -1);
    }
    return false;
  }

  clearAll(): void {
    this.checkedItems = [];
    const ELEMENT_DATA = this.dataSource.data;
    this.dataSource.data = [];
    this.dataLength = 0;
    this.dataSource.data = ELEMENT_DATA;
    this.dataLength = ELEMENT_DATA.length;
    this.commonSvc.checkIds = [];
    this.isTinMismatch = false;
    this.isPayeeNameMismatch = false;
  }

  // Access to Screen for these Groups
  grantedAccess(): boolean {
    return this.loginSvc.hasOpAuthorizePaymentRole || this.loginSvc.hasOpViewPaymentRole || this.loginSvc.hasOpMaintainPaymentRole;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {

    if (event.altKey && (event.key === 'M' || event.key === 'm')) {
      this.postMultipleChecks();
    }
  }

  showNoRecordsMessage(e?: any): void {
    if (e.status === 403) {
      this.messageBoxService.addMessageBox('User not authorized for search', MessageBoxType.ERROR, 'Please request access through Secure or contact your manager');
    } else {
      this.messageBoxService.addMessageBox('No Records Found', MessageBoxType.ERROR,
        'No records found in check register for your search');
    }
  }
}
