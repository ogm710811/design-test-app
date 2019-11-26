import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
import {
  AltProviderVO,
  BuwOption,
  CheckActionVO,
  CheckStatusEnum,
  GetProviderVO,
  MemWithNineDigAcctNoApi,
  PagedResourcesOfResourceOfAccountMembershipResponseVO,
  SearchMemberVO,
  ResourceOfCheckVO,
  CheckIdsVO
} from '@fox/rest-clients';
import {
  CommonService,
  LoginService,
  MessageBoxService,
  MessageBoxType
} from '@fox/shared';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {CheckRecoveryService} from '../../shared/check-recovery.service';
import ActionRequestReasonEnum = CheckActionVO.ActionRequestReasonEnum;

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!control && control.invalid && control.touched;
  }

}

@Component({
  selector: 'fox-mc-replace-void',
  templateUrl: './mc-replace-void.component.html',
  styleUrls: ['../check-detail/check-detail.component.css']
})
export class McReplaceVoidComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() checkIds: any = {};
  @Input() checkDetails: ResourceOfCheckVO = new ResourceOfCheckVO();
  @Input() checkedItems: any = {};
  @Output() statusChange = new EventEmitter();

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginatorObj?: MatPaginator;

  dataSource = new MatTableDataSource();
  displayedColumns = ['action', 'checkNumber', 'issueDate', 'claimAmount', 'payeeName', 'tin', 'npi', 'claimNumber', 'accountNumber'];
  startPageIndex = 1;
  pageSizeOption = [5, 10, 20];
  pages: number[] = [];
  state: string = 'default';
  showDialog: boolean = false;

  OUTSTANDING = CheckStatusEnum.OUTSTANDING;
  replaceOrVoidFormGroup: FormGroup = this.fb.group({});
  actionDropdown: string = '';
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  isActionSelected: boolean = true;
  errorMsg: boolean = false;
  providerServiceFailMsg: boolean = false;
  providerTINFailMsg: boolean = false;
  providerBUWFailMsg: boolean = false;
  memberNotFoundMsg: boolean = false;
  hideCloseBtn: boolean = false;
  showProviderModal: boolean = false;
  showAltProviderModal: boolean = false;
  isRadioSelected: boolean = false;
  providerDataSource = new MatTableDataSource();
  displayedProviderColumns = ['providerName', 'tin', 'npi', 'address', 'addressType', 'alternativeOnFile'];
  altProviderDataSource = new MatTableDataSource();
  displayedAltProviderColumns = ['blank', 'providerName', 'tin', 'npi', 'address', 'addressType'];
  showMemberModal: boolean = false;
  memberDataSource = new MatTableDataSource();
  displayedMemberColumns = ['memberAccountNo', 'memberName', 'address', 'addressType', 'radioSelect'];
  dataLength = 0;
  currentPage = 0;
  lastPageIndex = 0;
  pageSize = 5;
  selectedProvider: GetProviderVO = new GetProviderVO();
  altSelectedProvider: AltProviderVO = new AltProviderVO();
  selectedMember: SearchMemberVO = new SearchMemberVO();
  isAlternateRadioSelected: boolean = false;
  isAlternateSelectedAddress: boolean = false;
  isClaimSelcted: boolean = false;
  viewAlternateString: boolean = false;
  bothAltProviderStr: boolean = false;
  zipRegEx: RegExp = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;

  dropdownOptionsForBUW: BuwOption[] = [
    {
      key: 'replace_same_provider',
      value: 'Replace to Same Provider'
    }, {
      key: 'replace_payee',
      value: 'Replace to Member / Special Payee'
    }];

  isShowForm: boolean = false;
  isOtherReasonSelected = false;

  formvalueData: CheckActionVO = new CheckActionVO();

  private listOfReason = {
    '1': 'LOST_CHECK',
    '2': 'DECEASED_INSURED',
    '3': 'ACCOUNT_PAID_IN_FULL',
    '4': 'STALE_DATED',
    '5': 'INCORRECT_PAYEE',
    '6': 'OVERPAYMENT',
    '7': 'INCORRECT_ADDRESS',
    '8': 'WRONG_PROVIDER',
    '9': 'DAMAGED_CHECK',
    'A': 'ASSIGNMENT_OF_BENEFITS_RECEIVED',
    'B': 'SURVEY_LETTER',
    'C': 'OTHER'
  };
  private actionDropdownOptions: any;
  private isConfirm: boolean = false;

  constructor(
    private checkSvc: CheckRecoveryService,
    private fb: FormBuilder,
    private lgnsrv: LoginService,
    private router: Router,
    private commonSvc: CommonService,
    private memNineDigSvc: MemWithNineDigAcctNoApi,
    private messageBoxService: MessageBoxService) {
  }

  ngAfterViewInit(): void {
    if (this.paginatorObj) {
      this.providerDataSource.paginator = this.paginatorObj;
    }
    if (this.sort) {
      this.providerDataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.hasOwnProperty('checkIds') && changes['checkIds'] &&
      changes['checkIds'] && this.checkIds && this.checkIds.length) {
      this.getMultipleCheckDetails(this.checkIds);
    }
    if (this.checkDetails) {
      if (this.checkDetails.status && this.checkDetails.status !== CheckStatusEnum.OUTSTANDING) {
        this.isShowForm = true;
        this.createForm();
      } else {
        this.initialiseForm();
        this.isShowForm = false;
      }
      if (this.checkDetails.tin === 0 || this.checkDetails.tin === undefined) {
        this.dropdownOptionsForBUW.splice(0, 1);
        this.actionDropdownOnChange('replace_payee');
        this.actionDropdown = 'replace_payee';
        this.displayedColumns.splice(5, 2);
      } else {
        this.dropdownOptionsForBUW.splice(1, 1);
        this.actionDropdownOnChange('replace_same_provider');
        this.actionDropdown = 'replace_same_provider';
      }
    }
  }

  displayButtons(): boolean {
    // Display Authorize/Deny Buttons
    return !!this.checkDetails && !!this.checkDetails.status &&
      (this.checkDetails.status === CheckStatusEnum.REPLACEMENT_REQUESTED ||
        this.checkDetails.status === CheckStatusEnum.VOID_REQUESTED) &&
      this.lgnsrv.hasOpAuthorizePaymentRole;
  }

  displaySubmitButton(): boolean {
    return !(this.providerBUWFailMsg || this.providerServiceFailMsg || this.providerTINFailMsg || this.memberNotFoundMsg) && this.lgnsrv.hasOpMaintainPaymentRole;
  }

  omitSpecChar(event: KeyboardEvent): boolean {
    let k;
    k = window.event ? event.keyCode : event.which; // k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k <= 122) || k === 8 || k === 0 || (k >= 48 && k <= 57));
  }

  prepareReq(actionDetails: any): CheckActionVO {
    return <CheckActionVO>{
      'checkIds': this.checkIds.checkid || [''],
      'payee': this.replaceOrVoidFormGroup.get('Payee')!.value || '',
      'actionRequestReason': actionDetails.ReplaceReason || '',
      'actionReasonOtherDesc': actionDetails.otherReplaceReason || '',
      'tin': actionDetails.Tin || this.replaceOrVoidFormGroup.get('Tin')!.value,
      'npi': actionDetails.Npi || this.replaceOrVoidFormGroup.get('Npi')!.value,
      'payeeAddress': {
        'addressLine1': actionDetails.AddOne || this.replaceOrVoidFormGroup.get('AddOne')!.value,
        'addressLine2': actionDetails.AddTwo || this.replaceOrVoidFormGroup.get('AddTwo')!.value,
        'addressLine3': actionDetails.AddThree || this.replaceOrVoidFormGroup.get('AddThree')!.value,
        'city': actionDetails.City || this.replaceOrVoidFormGroup.get('City')!.value,
        'state': actionDetails.State || this.replaceOrVoidFormGroup.get('State')!.value,
        'zip': actionDetails.Zip || this.replaceOrVoidFormGroup.get('Zip')!.value
      },
      'notation': actionDetails.Notation || '',
      'printNotationOnCheck': (actionDetails.IncludeNotation === 'true'),
      'returned': (actionDetails.ReturnCheck === 'true')
    };
  }

  getVoidRequest(actionDetails: CheckActionVO): void {
    if (!this.checkDetails || !this.checkDetails.checkId) {
      return;
    }
    this.checkSvc.getVoid(this.checkDetails.checkId, actionDetails).subscribe(res => {
      if (res) {
        this.statusChange.emit({
          status: 'denialRequest',
          action: 'refresh',
          data: {
            isConfirm: true
          }
        });
      }
    });
  }

  getReplaceRequest(actionDetails: CheckActionVO): void {
    this.checkSvc.getReplace(actionDetails).subscribe(res => {
      if (res && res.length >= 1) {
        this.statusChange.emit({
          status: 'replaceMsg',
          action: 'refresh',
          data: {
            isConfirm: true
          }
        });
        // this.isReadOnly = true;
        this.goBack();
        this.commonSvc.replaceSuccessMsg = true;
      } else {
        this.errorMsg = true;
        this.showUnexpectedMessage();
        this.providerServiceFailMsg = false;
        this.statusChange.emit({
          status: 'denialRequest',
          action: 'noRequest'
        });
      }
    }, (e) => {
      this.errorMsg = true;
      this.showUnexpectedMessage();
      this.providerServiceFailMsg = false;
      this.statusChange.emit({
        status: 'denialRequest',
        action: 'noRequest'
      });
    });
  }

  getReplaceApprovalRequest(): void {
    if (!this.checkDetails || !this.checkDetails.checkId) {
      return;
    }
    this.checkSvc.getReplaceApproval(this.checkDetails.checkId).subscribe(res => {
      if (res) {
        this.statusChange.emit({
          status: 'denialRequest',
          action: 'refresh',
          data: {
            isConfirm: true
          }
        });
      }
    });
  }

  getReplaceDenialRequest(): void {
    if (!this.checkDetails || !this.checkDetails.checkId) {
      return;
    }
    this.checkSvc.getReplaceDenial(this.checkDetails.checkId).subscribe(res => {
      if (res) {
        this.statusChange.emit({
          status: 'denialRequest',
          action: 'refresh',
          data: {
            isConfirm: true
          }
        });
      }
    });
  }

  getVoidApprovalRequest(): void {
    if (!this.checkDetails || !this.checkDetails.checkId) {
      return;
    }
    this.checkSvc.getVoidApproval(this.checkDetails.checkId).subscribe(res => {
      if (res) {
        this.statusChange.emit({
          status: 'denialRequest',
          action: 'refresh',
          data: {
            isConfirm: true
          }
        });
      }
    });
  }

  getVoidDenialeRequest(): void {
    if (!this.checkDetails || !this.checkDetails.checkId) {
      return;
    }
    this.checkSvc.getVoidDenial(this.checkDetails.checkId).subscribe(res => {
      if (res) {
        this.statusChange.emit({
          status: 'denialRequest',
          action: 'refresh',
          data: {
            isConfirm: true
          }
        });
      }
    });
  }

  getDenialeRequest(): void {
    if (this.checkDetails && this.checkDetails.status && this.checkDetails.status === CheckStatusEnum.REPLACEMENT_REQUESTED) {
      this.getReplaceDenialRequest();
    } else {
      this.getVoidDenialeRequest();
    }
  }

  getApprovalRequest(): void {
    if (this.checkDetails && this.checkDetails.status && this.checkDetails.status === CheckStatusEnum.REPLACEMENT_REQUESTED) {
      this.getReplaceApprovalRequest();
    } else {
      this.getVoidApprovalRequest();
    }
  }

  isDisplayTin(): boolean {
    if (this.checkDetails && this.checkDetails.checkActionDetail && this.checkDetails.checkActionDetail.transactionId === 'R') {
      return (this.checkDetails.tin !== this.checkDetails.checkActionDetail.tin && this.checkDetails.checkActionDetail.tin !== 0);
    }
    return false;
  }

  isDisplayErrorTxt(): boolean {
    for (let k = 0; k < this.dataSource.data.length; k++) {
      // @ts-ignore
      if ((this.dataSource.data[k]['buwIndicator'] as string) === '1' && (this.actionDropdown === 'replace_payee')) {
        return true;
      }

    }
    return false;
  }

  replaceVoidSubmit(formControl: FormGroup, actionDropdownOptions: any): void {
    this.replaceOrVoidFormGroup.controls['ReplaceReason'].markAsTouched({onlySelf: true});
    const formvalue = this.prepareReq(formControl.value);
    this.isOtherReasonSelected = false;
    if (formvalue['actionReasonOtherDesc'] === '' && formvalue['actionRequestReason'] === ActionRequestReasonEnum.OTHER) {
      this.isOtherReasonSelected = true;
      this.replaceOrVoidFormGroup.controls['otherReplaceReason'].markAsTouched({onlySelf: true});
    }
    if (formControl.valid && !this.isOtherReasonSelected && actionDropdownOptions) {
      this.formvalueData = formvalue;
      this.actionDropdownOptions = actionDropdownOptions;
      this.showDialog = true;
    } else if (!actionDropdownOptions) {
      this.isActionSelected = false;
    }
  }

  appendRemainedCheckDetails(remainedCheckDetails: ResourceOfCheckVO): void {
    if (remainedCheckDetails && remainedCheckDetails.accountNumber) {
      const zeroField = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const numberLength = remainedCheckDetails.accountNumber.toString().length;
      zeroField.splice(0, numberLength);
      remainedCheckDetails.accountNumber = zeroField.join('') + remainedCheckDetails.accountNumber;
    }
    if (this.actionDropdown === 'replace_same_provider') {
      this.replaceOrVoidFormGroup = this.fb.group({
        'MemberAcc': [{value: ``, disabled: true}],
        'Payee': [{value: '', disabled: true}],
        'Tin': [{value: ``, disabled: true}],
        'Npi': [{value: '', disabled: true}],
        'ReplaceReason': [{value: '', disabled: false}, [Validators.required]],
        'otherReplaceReason': [{value: '', disabled: false}],
        'AddOne': [{value: '', disabled: true}],
        'AddTwo': [{value: '', disabled: true}],
        'AddThree': [{value: '', disabled: true}],
        'City': [{value: '', disabled: true}],
        'State': [{value: '', disabled: true}],
        'Zip': [{value: '', disabled: true}],
        'Notation': [{value: ``, disabled: false}],
        'IncludeNotation': [{value: 'false', disabled: false}],
        'ReturnCheck': [{value: 'false', disabled: false}]
      });
    } else {
      this.replaceOrVoidFormGroup = this.fb.group({
        'MemberAcc': [{value: remainedCheckDetails.accountNumber, disabled: true}],
        'Payee': [{value: remainedCheckDetails.payee, disabled: true}],
        'Tin': [{value: remainedCheckDetails.tin, disabled: false}],
        'Npi': [{
          value: remainedCheckDetails.npi === 0 ? '' : remainedCheckDetails.npi,
          disabled: false
        }],
        'ReplaceReason': [{value: '', disabled: false}, [Validators.required]],
        'otherReplaceReason': [{value: '', disabled: false}],
        'AddOne': [{
          value: remainedCheckDetails.payeeAddress && remainedCheckDetails.payeeAddress.addressLine1 ?
            remainedCheckDetails.payeeAddress.addressLine1 : '',
          disabled: true
        }],
        'AddTwo': [{
          value: remainedCheckDetails.payeeAddress && remainedCheckDetails.payeeAddress.addressLine2 ?
            remainedCheckDetails.payeeAddress.addressLine2 : '',
          disabled: true
        }],
        'AddThree': [{
          value: remainedCheckDetails.payeeAddress && remainedCheckDetails.payeeAddress.addressLine3 ?
            remainedCheckDetails.payeeAddress.addressLine3 : '',
          disabled: true
        }],
        'City': [{
          value: remainedCheckDetails.payeeAddress && remainedCheckDetails.payeeAddress.city ?
            remainedCheckDetails.payeeAddress.city : '',
          disabled: true
        }],
        'State': [{
          value: remainedCheckDetails.payeeAddress && remainedCheckDetails.payeeAddress.state ?
            remainedCheckDetails.payeeAddress.state : '',
          disabled: true
        }],
        'Zip': [{
          value: remainedCheckDetails.payeeAddress && remainedCheckDetails.payeeAddress.zip ?
            remainedCheckDetails.payeeAddress.zip : '',
          disabled: true
        }],
        'Notation': [{value: ``, disabled: false}],
        'IncludeNotation': [{value: 'false', disabled: false}],
        'ReturnCheck': [{value: 'false', disabled: false}]
      });
    }
    this.memberNotFoundMsg = false;
  }

  actionDropdownOnChange(selectedOption: string): void {
    if (selectedOption === '') {
      this.isActionSelected = false;
    } else {
      this.isActionSelected = true;
      if (selectedOption === 'replace_same_provider' && this.checkDetails) {
        this.replaceOrVoidFormGroup = this.fb.group({
          'MemberAcc': [{value: ``, disabled: true}],
          'Payee': [{value: '', disabled: true}],
          'Tin': [{value: ``, disabled: true}],
          'Npi': [{value: '', disabled: true}],
          'ReplaceReason': [{value: '', disabled: false}, [Validators.required]],
          'otherReplaceReason': [{value: '', disabled: false}],
          'AddOne': [{value: '', disabled: true}],
          'AddTwo': [{value: '', disabled: true}],
          'AddThree': [{value: '', disabled: true}],
          'City': [{value: '', disabled: true}],
          'State': [{value: '', disabled: true}],
          'Zip': [{value: '', disabled: true}],
          'Notation': [{value: ``, disabled: false}],
          'IncludeNotation': [{value: 'false', disabled: false}],
          'ReturnCheck': [{value: 'false', disabled: false}]
        });
      } else if (selectedOption === 'replace_payee' && this.checkDetails) {
        this.replaceOrVoidFormGroup = this.fb.group({
          'MemberAcc': [{value: this.checkDetails.accountNumber, disabled: true}],
          'Payee': [{value: (this.checkDetails.payee || '').slice(0, 33), disabled: true}],
          'Tin': [{value: this.checkDetails.tin, disabled: true}],
          'Npi': [{value: this.checkDetails.npi, disabled: true}],
          'ReplaceReason': [{value: '', disabled: false}, [Validators.required]],
          'otherReplaceReason': [{value: '', disabled: false}],
          'AddOne': [{
            value: (this.checkDetails.payeeAddress && this.checkDetails.payeeAddress.addressLine1 ?
              this.checkDetails.payeeAddress.addressLine1 : '').slice(0, 100),
            disabled: true
          }],
          'AddTwo': [{
            value: (this.checkDetails.payeeAddress && this.checkDetails.payeeAddress.addressLine2 ?
              this.checkDetails.payeeAddress.addressLine2 : '').slice(0, 100),
            disabled: true
          }],
          'AddThree': [{
            value: this.checkDetails.payeeAddress && this.checkDetails.payeeAddress.addressLine3 ?
              this.checkDetails.payeeAddress.addressLine3 : '',
            disabled: true
          }],
          'City': [{
            value: (this.checkDetails.payeeAddress && this.checkDetails.payeeAddress.city ?
              this.checkDetails.payeeAddress.city : '').slice(0, 50),
            disabled: true
          }],
          'State': [{
            value: (this.checkDetails.payeeAddress && this.checkDetails.payeeAddress.state ?
              this.checkDetails.payeeAddress.state : '').slice(0, 2),
            disabled: true
          }],
          'Zip': [{
            value: (this.checkDetails.payeeAddress && this.checkDetails.payeeAddress.zip ?
              this.checkDetails.payeeAddress.zip.replace(this.zipRegEx, '') : '').slice(0, 20),
            disabled: true
          }],
          'Notation': [{value: ``, disabled: false}],
          'IncludeNotation': [{value: 'false', disabled: false}],
          'ReturnCheck': [{value: 'false', disabled: false}]
        });
      } else if (this.checkDetails && this.checkDetails.status && this.checkDetails.status === CheckStatusEnum.OUTSTANDING) {
        this.replaceOrVoidFormGroup = this.fb.group({
          'MemberAcc': [{value: this.checkDetails.accountNumber, disabled: true}],
          'Payee': [{value: '', disabled: true}],
          'Tin': [{value: this.checkDetails.tin, disabled: true}],
          'Npi': [{value: this.checkDetails.npi, disabled: true}],
          'ReplaceReason': [{value: '', disabled: false}, [Validators.required]],
          'otherReplaceReason': [{value: '', disabled: false}],
          'AddOne': [{value: '', disabled: true}],
          'AddTwo': [{value: '', disabled: true}],
          'AddThree': [{value: '', disabled: true}],
          'City': [{value: '', disabled: true}],
          'State': [{value: '', disabled: true}],
          'Zip': [{value: '', disabled: true}],
          'Notation': [{value: ``, disabled: false}],
          'IncludeNotation': [{value: 'false', disabled: false}],
          'ReturnCheck': [{value: 'false', disabled: false}]
        });
      } else {
        this.replaceOrVoidFormGroup = this.fb.group({
          'MemberAcc': [{value: '', disabled: true}],
          'Payee': [{value: '', disabled: true}],
          'Tin': [{value: '', disabled: true}],
          'Npi': [{value: '', disabled: true}],
          'ReplaceReason': [{value: '', disabled: false}, [Validators.required]],
          'otherReplaceReason': [{value: '', disabled: false}],
          'AddOne': [{value: '', disabled: true}],
          'AddTwo': [{value: '', disabled: true}],
          'AddThree': [{value: '', disabled: true}],
          'City': [{value: '', disabled: true}],
          'State': [{value: '', disabled: true}],
          'Zip': [{value: '', disabled: true}],
          'Notation': [{value: ``, disabled: false}],
          'IncludeNotation': [{value: 'false', disabled: false}],
          'ReturnCheck': [{value: 'false', disabled: false}]
        });
      }
    }
    this.providerBUWFailMsg = false;
    this.errorMsg = false;
    this.providerServiceFailMsg = false;
    this.providerTINFailMsg = false;
    this.memberNotFoundMsg = false;
  }

  initialiseForm(): void {
    const zeroField = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (this.checkDetails.accountNumber) {
      const numberLength = this.checkDetails.accountNumber.toString().length;
      zeroField.splice(0, numberLength);
      this.checkDetails.accountNumber = zeroField.join('') + this.checkDetails.accountNumber;
    }
    this.replaceOrVoidFormGroup = this.fb.group({
      'MemberAcc': [{
        value: this.checkDetails ? this.checkDetails.accountNumber : '',
        disabled: true
      }],
      'Payee': [{value: this.checkDetails ? this.checkDetails.payee : '', disabled: true}],
      'Tin': [{value: this.checkDetails ? this.checkDetails.tin : '', disabled: true}],
      'Npi': [{value: this.checkDetails ? this.checkDetails.npi : '', disabled: true}],
      'ReplaceReason': [{value: '', disabled: true}, [Validators.required]],
      'otherReplaceReason': [{value: '', disabled: true}],
      'AddOne': [{value: '', disabled: true}],
      'AddTwo': [{value: '', disabled: true}],
      'AddThree': [{value: '', disabled: true}],
      'City': [{value: '', disabled: true}],
      'State': [{value: '', disabled: true}],
      'Zip': [{value: '', disabled: true}],
      'Notation': [{value: ``, disabled: true}],
      'IncludeNotation': [{value: 'false', disabled: true}],
      'ReturnCheck': [{value: 'false', disabled: true}]
    });
  }

  createForm(): void {
    if (!this.checkDetails) {
      return;
    }
    const values: any = {};
    values['MemberAcc'] = this.checkDetails.accountNumber;
    if (this.checkDetails.checkActionDetail) {
      const checkActionDetails = this.checkDetails.checkActionDetail;
      if (checkActionDetails.payee) {
        values['Payee'] = checkActionDetails.payee;
      }
      if (checkActionDetails.tin) {
        values['Tin'] = checkActionDetails.tin;
      }
      if (checkActionDetails.npi) {
        (values['Npi'] as number) = checkActionDetails.npi;
      }
      if (checkActionDetails.actionRequestReason) {
        // @ts-ignore
        (values['ReplaceReason'] as any) = this.listOfReason[checkActionDetails.actionRequestReason];
      }
      if (checkActionDetails.actionReasonOtherDesc) {
        values['otherReplaceReason'] = checkActionDetails.actionReasonOtherDesc;
      }
      values['Notation'] = checkActionDetails.notation;
      values['IncludeNotation'] = (checkActionDetails.printNotationOnCheck) ? 'true' : 'false';
      values['ReturnCheck'] = (checkActionDetails.returned) ? 'true' : 'false';

      if (checkActionDetails.payeeAddress) {
        values['AddOne'] = checkActionDetails.payeeAddress.addressLine1;
        values['AddTwo'] = checkActionDetails.payeeAddress.addressLine2;
        values['AddThree'] = checkActionDetails.payeeAddress.addressLine3;
        values['City'] = checkActionDetails.payeeAddress.city;
        values['State'] = checkActionDetails.payeeAddress.state;
        values['Zip'] = checkActionDetails.payeeAddress.zip;
      }
    }
    this.initialiseForm();
    for (const k in values) {
      if (values[k] !== undefined) {
        this.replaceOrVoidFormGroup.controls[k].setValue(values[k]);
      }
    }
  }

  goBack(): void {
    this.commonSvc.isBack = !(this.checkDetails && this.checkDetails.isBulk && this.commonSvc.checkRegisterPayload.dropdownOptions === 'check_series');
    this.router.navigate(['/check-recovery/find-check-register']);
  }

  openMemberModal(): void {
    if (!this.checkDetails || !this.checkDetails.accountNumber) {
      return;
    }
    const membershipNumber = this.checkDetails.accountNumber.substr(0, 9);
    this.memNineDigSvc.getMemberByNineDigitAccountNumber(membershipNumber, uuid()).subscribe(searchResult => {
      if (searchResult && searchResult._embedded && searchResult._embedded.items) {
        this.showMemberModal = true;
        const memberResult: PagedResourcesOfResourceOfAccountMembershipResponseVO[] = [];
        const memberData = searchResult._embedded.items;
        if (memberData && memberData.length > 0) {
          for (let i = 0; i < memberData.length; i++) {
            const memberDetails = memberData[i].memberDetails;
            const memberAddr = memberDetails!.address;
            if (memberAddr && memberAddr.length > 0) {
              for (let j = 0; j < memberAddr.length; j++) {
                const memberItem = this.getMemberItem(memberDetails, j);
                const address = memberItem.addr;
                if (address.recordDetail.attrCode === 'PERMADR') {
                  memberItem.addressType = 'PERM';
                  memberItem.address = address.address.addressLine1 + `<br/>` + address.address.addressLine2 + `<br/>` + address.address.city + `, ` + address.address.stateProvinceCode + ` ` + address.address.postalCode;
                  memberItem.fullAddress = address.address;
                  memberResult.push(memberItem);
                }
                if (address.recordDetail.attrCode === 'TEMPADR') {
                  memberItem.addressType = 'TEMP';
                  memberItem.address = address.address.addressLine1 + `<br/>` + address.address.addressLine2 + `<br/>` + address.address.city + `, ` + address.address.stateProvinceCode + ` ` + address.address.postalCode;
                  memberItem.fullAddress = address.address;
                  memberResult.push(memberItem);
                }
              }
            }
            const auxiliaryParty = memberData[i].auxiliaryParty;
            if (auxiliaryParty && auxiliaryParty.length > 0) {
              for (let k = 0; k < auxiliaryParty.length; k++) {
                if (auxiliaryParty[k].auxiliaryPersonPermAddress!.length > 0) {
                  for (let l = 0; l < auxiliaryParty[k].auxiliaryPersonPermAddress!.length; l++) {
                    const auxiliaryMemberItem = this.getAuxilaryMemberItem(memberDetails, auxiliaryParty, k, l);
                    auxiliaryMemberItem.addressType = 'AUX PERM';
                    auxiliaryMemberItem.address = auxiliaryMemberItem.permAddr.addressLine1 + `<br/>` + auxiliaryMemberItem.permAddr.addressLine2 + `<br/>` + auxiliaryMemberItem.permAddr.city + `, ` + auxiliaryMemberItem.permAddr.stateProvinceCode + ` ` + auxiliaryMemberItem.permAddr.postalCode;
                    auxiliaryMemberItem.fullAddress = auxiliaryMemberItem.permAddr;
                    memberResult.push(auxiliaryMemberItem);
                  }
                }
                if (auxiliaryParty[k].auxiliaryPersonTempAddress!.length > 0) {
                  for (let l = 0; l < auxiliaryParty[k].auxiliaryPersonTempAddress!.length; l++) {
                    const auxiliaryMemberItem = this.getAuxilaryMemberItem(memberDetails, auxiliaryParty, k, l);
                    auxiliaryMemberItem.addressType = 'AUX TEMP';
                    auxiliaryMemberItem.address = auxiliaryMemberItem.tempAddr.addressLine1 + `<br/>` + auxiliaryMemberItem.tempAddr.addressLine2 + `<br/>` + auxiliaryMemberItem.tempAddr.city + `, ` + auxiliaryMemberItem.tempAddr.stateProvinceCode + ` ` + auxiliaryMemberItem.tempAddr.postalCode;
                    auxiliaryMemberItem.fullAddress = auxiliaryMemberItem.tempAddr;
                    memberResult.push(auxiliaryMemberItem);
                  }
                }
              }
            }
          }
          this.memberDataSource.data = memberResult;
          this.dataLength = memberResult.length;
        }
      } else if (searchResult === 404) {
        this.memberNotFoundMsg = true;
        this.showMemberNotFoundMessage();
        this.showMemberModal = false;
      } else {
        this.errorMsg = false;
        this.providerServiceFailMsg = true;
        this.showMemberModal = false;
        this.statusChange.emit({
          status: 'voidDenialRequest',
          action: 'noRequest'
        });
        this.showMemberModal = false;
      }
    }, (e) => {
      if (e.status === 404) {
        this.memberNotFoundMsg = true;
        this.showMemberNotFoundMessage();
      } else {
        this.providerServiceFailMsg = true;
      }
      this.errorMsg = false;
      this.showMemberModal = false;
      this.statusChange.emit({
        status: 'denialRequest',
        action: 'noRequest'
      });
    });
  }

  getMemberItem(memberData: any, j: number): any {
    return {
      'aarpMembershipNumber': memberData.aarpMembershipNumber.membershipNumber,
      'aarpAssociationId': memberData.aarpMembershipNumber.associationId,
      'memberAccountNo': memberData.aarpMembershipNumber.membershipNumber + `` + memberData.aarpMembershipNumber.associationId + `` + memberData.householdId[0].insuredCode,
      'memberName': memberData.memberName.firstName + ` ` + memberData.memberName.lastName,
      'address': ``,
      'addressType': '',
      'fullAddress': {},
      'addr': memberData.address[j]
    };
  }

  getAuxilaryMemberItem(memberDetails: any, auxiliaryParty: any, k: number, l: number): any {
    return {
      'aarpMembershipNumber': memberDetails.aarpMembershipNumber.membershipNumber,
      'aarpAssociationId': memberDetails.aarpMembershipNumber.associationId,
      'memberAccountNo': memberDetails.aarpMembershipNumber.membershipNumber + `` + memberDetails.aarpMembershipNumber.associationId + `` + memberDetails.householdId[0].insuredCode,
      'memberName': auxiliaryParty[k].auxiliaryPersonName.firstName + ` ` + auxiliaryParty[k].auxiliaryPersonName.lastName,
      'address': ``,
      'addressType': '',
      'fullAddress': {},
      'permAddr': auxiliaryParty[k].auxiliaryPersonPermAddress[l] || [],
      'tempAddr': auxiliaryParty[k].auxiliaryPersonTempAddress[l] || []
    };
  }

  openProviderModal(): void {

    let npi: number | undefined = this.checkDetails.npi ? this.checkDetails.npi : undefined;
    if (this.commonSvc.isNpiMismatch || !this.checkDetails.npi) {
      npi = undefined;
    }
    this.checkDetails.tin = this.checkDetails.tin ? this.checkDetails.tin : 0;

    this.checkSvc.getProviderLookup(this.checkDetails.tin, npi).subscribe(res => {
      this.showProviderModal = true;
      this.showAltProviderModal = false;
      if (res._embedded && res._embedded.items && res._embedded.items.length) {
        const providerResult: any[] = [];
        const providerData: any = res._embedded.items;
        if (providerData.length > 0) {
          for (let i = 0; i < providerData.length; i++) {
            if (providerData[i].providerAddress) {
              const providerItem = this.getProviderItem(providerData, i);
              providerItem.addressType = 'CLAIM';
              providerItem.address = providerData[i].providerAddress![0].addressLine1 + `<br/>` + providerData[i].providerAddress![0].city + `, ` + providerData[i].providerAddress![0].state + ` ` + providerData[i].providerAddress![0].postalCode;
              providerItem.providerName = providerData[i].providerName!.businessName ? providerData[i].providerName!.businessName : providerData[i].providerName!.firstName + ' ' + providerData[i].providerName!.lastName;
              providerResult.push(providerItem);
            }
            if (providerData[i].overrideProviderAddress) {
              const providerItem = this.getProviderItem(providerData, i);
              providerItem.addressType = 'OVERRIDE';
              providerItem.address = providerData[i].overrideProviderAddress![0].addressLine1 + `<br/>` + providerData[i].overrideProviderAddress![0].city + `, ` + providerData[i].overrideProviderAddress![0].stateProvinceCode + ` ` + providerData[i].overrideProviderAddress![0].postalCode;
              providerItem.providerName = providerData[i].providerName!.businessName ? providerData[i].providerName!.businessName : providerData[i].providerName!.firstName + ' ' + providerData[i].providerName!.lastName;
              providerResult.push(providerItem);
            }
          }
        }
        this.providerDataSource.data = providerResult;
        this.dataLength = providerResult.length;
      } else if (res === 404) {
        this.providerTINFailMsg = true;
        this.showProviderNotFoundMessage();
        this.showProviderModal = false;
      } else {
        this.errorMsg = false;
        this.providerServiceFailMsg = true;
        this.showProviderModal = false;
        this.statusChange.emit({
          status: 'voidDenialRequest',
          action: 'noRequest'
        });
        this.showProviderModal = false;
      }
    }, (e) => {
      if (e.status === 404) {
        this.providerTINFailMsg = true;
        this.showProviderNotFoundMessage();
      } else {
        this.providerServiceFailMsg = true;
      }
      this.errorMsg = false;
      this.showProviderModal = false;
      this.statusChange.emit({
        status: 'denialRequest',
        action: 'noRequest'
      });
    });
  }

  showProviderNotFoundMessage(): void {
    this.messageBoxService.addMessageBox('Provider Not Found', MessageBoxType.ERROR, 'Provider not found in Provider Database.  Please reprocess claim to correct provider');
  }

  showMemberNotFoundMessage(): void {
    this.messageBoxService.addMessageBox('Member Not Found', MessageBoxType.ERROR, 'Member not found in Member Database.  Please reprocess claim to correct member');
  }

  showProvierBUWFailMessage(): void {
    this.messageBoxService.addMessageBox('Backup Withholding', MessageBoxType.ERROR, 'Void and Reprocess');
  }

  showUnexpectedMessage(): void {
    this.messageBoxService.addMessageBox('Operation Failed', MessageBoxType.ERROR, 'An Unexpected error occurred');
  }

  getProviderItem(providerData: any, i: number): any {
    return {
      'alternateOnFile': !!providerData[i]!.alternativeProviderId ? 'YES' : 'NO',
      'providerId': providerData[i]!.providerId,
      'providerName': providerData[i].providerName!.firstName + ' ' + providerData[i].providerName!.lastName,
      'tin': providerData[i]!.providerTin.tin,
      'npi': providerData[i]!.providerNpi.idNumber,
      'address': ``,
      'addressType': ``,
      'providerAddress': providerData[i]!.providerAddress,
      'overrideAddress': providerData[i]!.overrideAddress,
      'alternateProvider': providerData[i]!.alternativeProviderId
    };
  }

  openAltProviderModal(): void {
    this.isAlternateRadioSelected = false;
    this.showAltProviderModal = true;
    this.showProviderModal = false;
    const id = this.selectedProvider.alternateProvider.idNumber ? +this.selectedProvider.alternateProvider.idNumber : 0;
    this.checkSvc.getProvider(id).subscribe(searchResult => {
      if (searchResult && searchResult.overrideProviderAddress && searchResult.providerAddress && searchResult.providerName) {
        const altProviderResult: any[] = [];
        for (let i = 0; i < searchResult.overrideProviderAddress.length; i++) {
          const addressData = this.getProviderAlternateAddress(searchResult, searchResult.overrideProviderAddress, searchResult.overrideProviderName, i);
          altProviderResult.push(addressData);
        }
        for (let j = 0; j < searchResult.providerAddress.length; j++) {
          const addressData = this.getProviderAlternateAddress(searchResult, searchResult.providerAddress, searchResult.providerName, j);
          altProviderResult.push(addressData);
        }
        if (searchResult && searchResult.overrideProviderAddress && searchResult.providerAddress) {
          this.bothAltProviderStr = true;
        }
        this.altProviderDataSource.data = altProviderResult;
      }

    });

  }

  getProviderAlternateAddress(providerData: any, address: any[], name: any, i: number): any {
    return {
      'providerId': providerData!.providerId,
      'providerName': name!.firstName + ' ' + name!.lastName.trim(),
      'tin': providerData!.providerTin.tin,
      'npi': providerData!.providerNpi.idNumber,
      'address': address[i]!.addressLine1 + `<br/>` + address[i]!.addressLine2 + `<br/>` + address[i]!.city + `, ` + address[i]!.state + ` ` + address[i]!.postalCode,
      'addressType': address[i].usageType === 'Override Address' ? `OVERRIDE` : 'CLAIM',
      'providerAddress': address[i].usageType === 'Claim Address' ? address[i] : '',
      'overrideProviderAddress': address[i].usageType === 'Override Address' ? address[i] : '',
      'blankColumn': address[i].usageType === 'Override Address' ? `Override :` : `Alternate :`
    };
  }

  selectProviderRow(selectedProvider: any): void {
    if (selectedProvider.alternateOnFile === 'YES') {
      this.viewAlternateString = true;
      this.isAlternateRadioSelected = true;
      this.isRadioSelected = false;
    } else if (selectedProvider.alternateOnFile === 'NO') {
      this.viewAlternateString = false;
      this.isAlternateRadioSelected = false;
      this.isRadioSelected = true;
    } else {
      this.isAlternateSelectedAddress = true;
      if (selectedProvider.addressType === 'CLAIM') {
        this.isClaimSelcted = true;
      } else {
        this.isClaimSelcted = false;
      }
    }
    this.selectedProvider = selectedProvider;
  }

  selectMemberRow(selectedMember: SearchMemberVO): void {
    this.isRadioSelected = true;
    this.selectedMember = selectedMember;
  }

  providerConfirmSubmit(): void {
    const id = this.selectedProvider.providerId.idNumber ? +this.selectedProvider.providerId.idNumber : 0;
    this.checkSvc.getProvider(id).subscribe(searchResult => {
      if (searchResult && searchResult.providerAddress && searchResult.providerName) {
        if (this.selectedProvider && this.selectedProvider.addressType === 'CLAIM') {
          this.replaceOrVoidFormGroup = this.fb.group({
            'MemberAcc': [{value: this.checkDetails!.accountNumber, disabled: true}],
            'Payee': [{
              value: this.selectedProvider.providerName.toString().slice(0, 33),
              disabled: true
            }],
            'Tin': [{value: this.checkDetails!.tin, disabled: true}],
            'Npi': [{value: this.selectedProvider.npi, disabled: true}],
            'ReplaceReason': [{value: '', disabled: false}, [Validators.required]],  // @ts-ignore
            'otherReplaceReason': [{value: '', disabled: false}],
            'AddOne': [{
              // @ts-ignore
              value: this.selectedProvider.providerAddress![0].addressLine1 as any,
              disabled: true
            }],
            'AddTwo': [{
              // @ts-ignore
              value: this.selectedProvider.providerAddress![0].addressLine2 as any,
              disabled: true
            }],
            // @ts-ignore
            'AddThree': [{value: '', disabled: true}],
            // @ts-ignore
            'City': [{value: this.selectedProvider.providerAddress![0].city as any, disabled: true}],
            'State': [{
              // @ts-ignore
              value: this.selectedProvider.providerAddress![0].state,
              disabled: true
            }],
            // @ts-ignore
            'Zip': [{value: this.selectedProvider.providerAddress![0].postalCode as any, disabled: true}],
            // @ts-ignore
            'Notation': [{value: ``, disabled: false}],
            'IncludeNotation': [{value: 'false', disabled: false}],
            // @ts-ignore
            'ReturnCheck': [{value: 'false', disabled: false}]
          });
        } else if (searchResult && searchResult.overrideProviderAddress && searchResult.overrideProviderName) {
          if (this.selectedProvider && this.selectedProvider.addressType === 'OVERRIDE') {
            this.replaceOrVoidFormGroup = this.fb.group({
              'MemberAcc': [{value: this.checkDetails!.accountNumber, disabled: true}],
              'Payee': [{
                value: this.selectedProvider.providerName.toString().slice(0, 33),
                disabled: true
              }],
              'Tin': [{value: this.checkDetails!.tin, disabled: true}],
              'Npi': [{value: this.selectedProvider.npi, disabled: true}],
              'ReplaceReason': [{value: '', disabled: false}, [Validators.required]],
              'otherReplaceReason': [{value: '', disabled: false}],
              'AddOne': [{
                value: searchResult.overrideProviderAddress![0].addressLine1,
                disabled: true
              }],
              'AddTwo': [{
                value: searchResult.overrideProviderAddress![0].addressLine2,
                disabled: true
              }],
              'AddThree': [{value: '', disabled: true}],
              'City': [{value: searchResult.overrideProviderAddress![0].city, disabled: true}],
              'State': [{
                value: searchResult.overrideProviderAddress![0].state,
                disabled: true
              }],
              'Zip': [{value: searchResult.overrideProviderAddress![0].postalCode, disabled: true}],
              'Notation': [{value: ``, disabled: false}],
              'IncludeNotation': [{value: 'false', disabled: false}],
              'ReturnCheck': [{value: 'false', disabled: false}]
            });
          }
        }
      }
      // @ts-ignore
      if (!this.checkDetails || (this.checkDetails.buwIndicator !== '2' && ((searchResult.tinInfo![0].taxStatusCode as string) === 'W' || (searchResult.tinInfo![0].taxStatusCode as string) === 'I'))) {
        this.providerBUWFailMsg = true;
        this.showProvierBUWFailMessage();
        this.errorMsg = false;
        this.providerServiceFailMsg = false;
        this.providerTINFailMsg = false;
        this.showProviderModal = false;
        this.statusChange.emit({
          status: 'voidDenialRequest',
          action: 'noRequest'
        });
      }
    });
    this.providerBUWFailMsg = false;
    this.showProviderModal = false;
    this.isRadioSelected = false;
    this.viewAlternateString = false;
  }

  altProviderConfirmSubmit(): void {
    const id = this.selectedProvider.providerId.idNumber ? +this.selectedProvider.providerId.idNumber : 0;

    this.checkSvc.getProvider(id).subscribe(searchResult => {
      if (searchResult && searchResult.providerAddress && searchResult.providerName) {
        if (this.selectedProvider && this.selectedProvider.addressType === 'CLAIM') {
          this.replaceOrVoidFormGroup = this.fb.group({
            'MemberAcc': [{value: this.checkDetails!.accountNumber, disabled: true}],
            'Payee': [{
              value: this.selectedProvider.providerName.toString().slice(0, 33),
              disabled: true
            }],
            'Tin': [{value: this.selectedProvider.tin, disabled: true}],
            'Npi': [{value: this.selectedProvider.npi, disabled: true}],
            'ReplaceReason': [{value: '', disabled: false}, [Validators.required]],
            'otherReplaceReason': [{value: '', disabled: false}],
            'AddOne': [{
              value: this.selectedProvider.providerAddress!.addressLine1,
              disabled: true
            }],
            'AddTwo': [{
              value: this.selectedProvider.providerAddress!.addressLine2,
              disabled: true
            }],
            'AddThree': [{value: '', disabled: true}],
            'City': [{value: this.selectedProvider.providerAddress!.city, disabled: true}],
            'State': [{
              value: this.selectedProvider.providerAddress!.state,
              disabled: true
            }],
            'Zip': [{value: this.selectedProvider.providerAddress!.postalCode, disabled: true}],
            'Notation': [{value: ``, disabled: false}],
            'IncludeNotation': [{value: 'false', disabled: false}],
            'ReturnCheck': [{value: 'false', disabled: false}]
          });
        } else if (searchResult && searchResult.overrideProviderAddress && searchResult.overrideProviderName) {
          if (this.selectedProvider && this.selectedProvider.addressType === 'OVERRIDE') {
            this.replaceOrVoidFormGroup = this.fb.group({
              'MemberAcc': [{value: this.checkDetails!.accountNumber, disabled: true}],
              'Payee': [{
                value: this.selectedProvider.providerName.toString().slice(0, 33),
                disabled: true
              }],
              'Tin': [{value: this.selectedProvider.tin, disabled: true}],
              'Npi': [{value: this.selectedProvider.npi, disabled: true}],
              'ReplaceReason': [{value: '', disabled: false}, [Validators.required]],
              'otherReplaceReason': [{value: '', disabled: false}],
              'AddOne': [{
                value: this.selectedProvider.overrideProviderAddress!.addressLine1,
                disabled: true
              }],
              'AddTwo': [{
                value: this.selectedProvider.overrideProviderAddress!.addressLine2,
                disabled: true
              }],
              'AddThree': [{value: '', disabled: true}],
              'City': [{
                value: this.selectedProvider.overrideProviderAddress!.city,
                disabled: true
              }],
              'State': [{
                value: this.selectedProvider.overrideProviderAddress!.state,
                disabled: true
              }],
              'Zip': [{
                value: this.selectedProvider.overrideProviderAddress!.postalCode,
                disabled: true
              }],
              'Notation': [{value: ``, disabled: false}],
              'IncludeNotation': [{value: 'false', disabled: false}],
              'ReturnCheck': [{value: 'false', disabled: false}]
            });
          }
        }
      }
      // @ts-ignore
      if (!this.checkDetails || (this.checkDetails.buwIndicator !== '2' && (searchResult.tinInfo![0].taxStatusCode === 'W' || searchResult.tinInfo![0].taxStatusCode === 'I'))) {
        this.providerBUWFailMsg = true;
        this.showProviderNotFoundMessage();
        this.errorMsg = false;
        this.providerServiceFailMsg = false;
        this.providerTINFailMsg = false;
        this.showProviderModal = false;
        this.statusChange.emit({
          status: 'voidDenialRequest',
          action: 'noRequest'
        });
      }
    });
    this.providerBUWFailMsg = false;
    this.showProviderModal = false;
    this.showAltProviderModal = false;
    this.isRadioSelected = false;
    this.isClaimSelcted = false;
    this.viewAlternateString = false;
  }

  memberConfirmSubmit(): void {
    const mdmActNumber = this.selectedMember.aarpMembershipNumber + '' + this.selectedMember.aarpAssociationId;
    if (this.selectedMember.fullAddress) {
      this.replaceOrVoidFormGroup = this.fb.group({
        'MemberAcc': [{value: mdmActNumber, disabled: true}],
        'Payee': [{
          value: this.selectedMember.memberName.toString().slice(0, 33),
          disabled: true
        }],
        'Tin': [{value: this.checkDetails ? this.checkDetails.tin : '', disabled: false}],
        'Npi': [{value: this.checkDetails ? this.checkDetails.npi : '', disabled: false}],
        'ReplaceReason': [{value: '', disabled: false}, [Validators.required]],
        'otherReplaceReason': [{value: '', disabled: false}],
        'AddOne': [{
          value: this.selectedMember.fullAddress.addressLine1!.slice(0, 100),
          disabled: true
        }],
        'AddTwo': [{
          value: this.selectedMember.fullAddress.addressLine2!.slice(0, 100),
          disabled: true
        }],
        'AddThree': [{value: '', disabled: true}],
        'City': [{
          value: this.selectedMember.fullAddress.city!.slice(0, 50),
          disabled: true
        }],
        'State': [{
          value: this.selectedMember.fullAddress.stateProvinceCode!.trim().slice(0, 2),
          disabled: true
        }],
        'Zip': [{
          value: this.selectedMember.fullAddress.postalCode!.replace(this.zipRegEx, '').slice(0, 20),
          disabled: true
        }],
        'Notation': [{value: ``, disabled: false}],
        'IncludeNotation': [{value: 'false', disabled: false}],
        'ReturnCheck': [{value: 'false', disabled: false}]
      });
    }
    this.showMemberModal = false;
    this.isRadioSelected = false;
  }

  cancelDialog(): void {
    if (this.showProviderModal) {
      this.showProviderModal = !this.showProviderModal;
      this.isRadioSelected = false;
      this.isAlternateRadioSelected = false;
      this.viewAlternateString = false;
    } else {
      if (this.showMemberModal) {
        this.showMemberModal = !this.showMemberModal;
      }
    }
    if (this.showAltProviderModal) {
      this.showAltProviderModal = !this.showAltProviderModal;
      this.isRadioSelected = false;
      this.viewAlternateString = false;
    } else {
      if (this.showAltProviderModal) {
        this.showAltProviderModal = !this.showAltProviderModal;
      }
    }
  }

  backToProviderModal(): void {
    this.openProviderModal();
    this.showAltProviderModal = !this.showAltProviderModal;
    this.isAlternateSelectedAddress = false;
    this.isClaimSelcted = false;
    this.viewAlternateString = false;
  }

  // Checkbox for RA
  selectCheckBoxRA(selectedElement: any): void {
    const stringRA = `For patient details on RA visit our website at aarpprovideronlinetool.uhc.com`;
    if (selectedElement.target.checked === true) {
      this.replaceOrVoidFormGroup.controls['Notation'].setValue(stringRA.slice(0, 78));
      this.replaceOrVoidFormGroup.controls['IncludeNotation'].setValue('true');
    } else {
      this.replaceOrVoidFormGroup.controls['Notation'].setValue(``);
      this.replaceOrVoidFormGroup.controls['IncludeNotation'].setValue('false');
    }
  }

  confirmSubmit(): void {
    if (this.actionDropdownOptions === 'option_void') {
      this.formvalueData.tin = this.checkDetails.tin;
      this.getVoidRequest(this.formvalueData);
    }
    if (this.actionDropdownOptions === 'replace_payee') {
      this.formvalueData.tin = 0;
      this.getReplaceRequest(this.formvalueData);
    }
    if (this.actionDropdownOptions === 'replace_same_provider') {
      this.formvalueData.tin = this.selectedProvider.tin;
      this.getReplaceRequest(this.formvalueData);
    }
    this.showDialog = false;
    this.isConfirm = true;
  }

  actionRemove(checkId: any): void {
    if (this.checkIds.checkid && checkId) {
      const index = this.checkIds.checkid.indexOf(checkId.toString());
      if (index !== -1) {
        this.checkIds.checkid.splice(index, 1);
      }
      if (this.checkIds.checkid.length) {
        this.getMultipleCheckDetails(this.checkIds);
      } else {
        this.dataSource.data = [];
        this.dataLength = 0;
      }
    }
    this.statusChange.emit({
      status: 'removeRow',
      action: 'remove',
      data: checkId
    });
  }

  getMultipleCheckDetails(checkIds: CheckIdsVO): any {
    this.checkSvc.getMultipleChecks(checkIds).subscribe((checkSummaries) => {
      if (checkSummaries && checkSummaries._embedded && checkSummaries._embedded.items) {
        for (let i = 0; i < checkSummaries._embedded.items.length; i++) {
          const summary = checkSummaries._embedded.items[i];
          if (summary && summary.accountNumber) {
            const zeroField = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const numberLength = summary.accountNumber.toString().length;
            zeroField.splice(0, numberLength);
            summary.accountNumber = zeroField.join('') + summary.accountNumber;
          }
        }
        this.dataSource.data = checkSummaries._embedded.items;
        this.dataLength = checkSummaries._embedded.items.length;
      }
    });
  }
}
