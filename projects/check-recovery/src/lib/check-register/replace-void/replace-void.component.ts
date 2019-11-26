import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
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
  ResourceOfCheckVO,
  SearchMemberVO,
  CheckActionDetailVO
} from '@fox/rest-clients';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {CommonService, LoginService, StatusAndAction} from '@fox/shared';
import {CheckRecoveryService} from '../../shared/check-recovery.service';
import ActionRequestReasonEnum = CheckActionVO.ActionRequestReasonEnum;

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!control && control.invalid && control.touched;
  }

}

@Component({
  selector: 'fox-replace-void',
  templateUrl: './replace-void.component.html',
  styleUrls: ['../check-detail/check-detail.component.css']
})
export class ReplaceVoidComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() checkDetails?: ResourceOfCheckVO;
  @Output() statusChange = new EventEmitter<StatusAndAction>();

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginatorObj?: MatPaginator;

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
  altProviderDataSource = new MatTableDataSource();
  displayedProviderColumns = ['providerName', 'tin', 'npi', 'address', 'addressType', 'alternativeOnFile'];
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
  selectedMemebrId: string = '';
  prePopulateField: boolean = false;
  selectedMember: SearchMemberVO = new SearchMemberVO();
  providerData: any;
  isAlternateRadioSelected: boolean = false;
  isAlternateSelectedAddress: boolean = false;
  isClaimSelcted: boolean = false;
  viewAlternateString: boolean = false;
  bothAltProviderStr: boolean = false;
  zipRegEx = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;

  dropdownOptionsForBUW: BuwOption[] = [
    {
      key: '',
      value: 'Select Action'
    },
    {
      key: 'replace_same_provider',
      value: 'Replace to Same Provider'
    }, {
      key: 'replace_payee',
      value: 'Replace to Member / Special Payee'
    }, {
      key: 'option_void',
      value: 'Void'
    }];

  isShowForm: boolean = false;
  isOtherReasonSelected = false;
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
  private formvalueData: CheckActionVO = new CheckActionVO();
  private actionDropdownOptions: string = '';

  get payee(): any {
    return this.replaceOrVoidFormGroup.get('Payee');
  }

  constructor(private checkSvc: CheckRecoveryService, private fb: FormBuilder, private lgnsrv: LoginService, private router: Router, private commonSvc: CommonService, private memNineDigSvc: MemWithNineDigAcctNoApi) {
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
    if (this.checkDetails) {
      if (this.checkDetails.tin === undefined) {
        this.dropdownOptionsForBUW.splice(1, 1);
      } else if (this.checkDetails.tin !== undefined) {
        this.dropdownOptionsForBUW.splice(2, 1);
      }
    }
  }

  ngOnChanges(): void {
    if (this.checkDetails) {
      if (this.checkDetails.status && this.checkDetails.status !== CheckStatusEnum.OUTSTANDING) {
        this.isShowForm = true;
        this.createForm();
      } else {
        this.initialiseForm();
        this.isShowForm = false;
      }
    }
  }

  displayButtons(): boolean {
    return !!this.checkDetails && !!this.checkDetails.status &&
      (this.checkDetails.status === CheckStatusEnum.REPLACEMENT_REQUESTED ||
        this.checkDetails.status === CheckStatusEnum.VOID_REQUESTED) &&
      this.lgnsrv.hasOpAuthorizePaymentRole;
  }

  displaySubmitButton(): boolean {
    return !!this.checkDetails && this.checkDetails!.status === CheckStatusEnum.OUTSTANDING && !(this.providerBUWFailMsg || this.providerServiceFailMsg || this.providerTINFailMsg || this.memberNotFoundMsg) && this.lgnsrv.hasOpMaintainPaymentRole;
  }

  omitSpecChar(event: any): boolean {
    let k;
    k = window.event ? event.keyCode : event.which; // k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k <= 122) || k === 8 || k === 0 || (k >= 48 && k <= 57));
  }

  prepareReq(actionDetails: any): CheckActionVO {
    return <CheckActionVO>{
      'checkIds': (this.checkDetails && this.checkDetails.checkId) ? [this.checkDetails.checkId] : undefined,
      'payee': this.replaceOrVoidFormGroup.get('Payee')!.value || '',
      'actionRequestReason': actionDetails.ReplaceReason || '',
      'actionReasonOtherDesc': actionDetails.otherReplaceReason || '',
      'tin': actionDetails.Tin || 0,
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
      if (res && res.checkExtId) {
        this.statusChange.emit({
          status: 'voidMsg',
          action: 'refresh'
        });
        this.goBack();
        this.commonSvc.voidSuccessMsg = true;
      } else {
        this.errorMsg = true;
        this.providerServiceFailMsg = false;
        this.statusChange.emit({
          status: 'voidDenialRequest',
          action: 'noRequest'
        });
      }
    }, (e) => {
      this.errorMsg = true;
      this.providerServiceFailMsg = false;
      this.statusChange.emit({
        status: 'voidDenialRequest',
        action: 'noRequest'
      });
    });
  }

  getReplaceRequest(actionDetails: CheckActionVO): void {
    this.checkSvc.getReplace(actionDetails).subscribe(res => {
      if (res && res.length >= 1) {
        this.statusChange.emit({
          status: 'replaceMsg',
          action: 'refresh'
        });
        this.goBack();
        this.commonSvc.replaceSuccessMsg = true;
      } else {
        this.errorMsg = true;
        this.providerServiceFailMsg = false;
        this.statusChange.emit({
          status: 'denialRequest',
          action: 'noRequest'
        });
      }
    }, (e) => {
      this.errorMsg = true;
      this.providerServiceFailMsg = false;
      this.statusChange.emit({
        status: 'denialRequest',
        action: 'noRequest'
      });
    });
  }

  // Authorize Button
  getReplaceApprovalRequest(): void {
    if (!this.checkDetails || !this.checkDetails.checkId) {
      return;
    }
    this.checkSvc.getReplaceApproval(this.checkDetails.checkId).subscribe(res => {
      if (res && res.checkExtId) {
        this.statusChange.emit({
          status: 'authorizeMsg',
          action: 'refresh'
        });
        this.goBack();
        this.commonSvc.authorizeSuccessMsg = true;
      } else {
        this.errorMsg = true;
        this.providerServiceFailMsg = false;
        this.statusChange.emit({
          status: 'voidDenialRequest',
          action: 'noRequest'
        });
      }
    }, (e) => {
      this.errorMsg = true;
      this.providerServiceFailMsg = false;
      this.statusChange.emit({
        status: 'denialRequest',
        action: 'noRequest'
      });
    });
  }

  getReplaceDenialRequest(): void {
    if (!this.checkDetails || !this.checkDetails.checkId) {
      return;
    }
    this.checkSvc.getReplaceDenial(this.checkDetails.checkId).subscribe(res => {
      if (res && res.checkExtId) {
        this.statusChange.emit({
          status: 'denyMsg',
          action: 'refresh'
        });
        this.goBack();
        this.commonSvc.denySuccessMsg = true;
      } else {
        this.errorMsg = true;
        this.providerServiceFailMsg = false;
        this.statusChange.emit({
          status: 'voidDenialRequest',
          action: 'noRequest'
        });
      }
    }, (e) => {
      this.errorMsg = true;
      this.providerServiceFailMsg = false;
      this.statusChange.emit({
        status: 'denialRequest',
        action: 'noRequest'
      });
    });
  }

  getVoidApprovalRequest(): void {
    if (!this.checkDetails || !this.checkDetails.checkId) {
      return;
    }
    this.checkSvc.getVoidApproval(this.checkDetails.checkId).subscribe(res => {
      if (res && res.checkExtId) {
        this.statusChange.emit({
          status: 'authorizeMsg',
          action: 'refresh'
        });
        this.goBack();
        this.commonSvc.authorizeSuccessMsg = true;
      } else {
        this.errorMsg = true;
        this.providerServiceFailMsg = false;
        this.statusChange.emit({
          status: 'voidDenialRequest',
          action: 'noRequest'
        });
      }
    }, (e) => {
      this.errorMsg = true;
      this.providerServiceFailMsg = false;
      this.statusChange.emit({
        status: 'denialRequest',
        action: 'noRequest'
      });
    });
  }

  getVoidDenialeRequest(): void {
    if (!this.checkDetails || !this.checkDetails.checkId) {
      return;
    }
    this.checkSvc.getVoidDenial(this.checkDetails.checkId).subscribe(res => {
      if (res && res.checkExtId) {
        this.statusChange.emit({
          status: 'denyMsg',
          action: 'refresh'
        });
        this.goBack();
        this.commonSvc.denySuccessMsg = true;
      } else {
        this.errorMsg = true;
        this.providerServiceFailMsg = false;
        this.statusChange.emit({
          status: 'voidDenialRequest',
          action: 'noRequest'
        });
      }
    }, (e) => {
      this.errorMsg = true;
      this.providerServiceFailMsg = false;
      this.statusChange.emit({
        status: 'denialRequest',
        action: 'noRequest'
      });
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
    return (!!this.checkDetails) && this.checkDetails.buwIndicator === '1' && (this.actionDropdown === 'replace_payee' || this.actionDropdown === 'replace_same_provider');
  }

  replaceVoidSubmit(formControl: FormGroup, actionDropdownOptions: string): void {
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
      if (this.actionDropdownOptions === 'option_void') {
        this.formvalueData.tin = this.checkDetails ? this.checkDetails.tin : undefined;
        this.getVoidRequest(this.formvalueData);
      }
      if (this.actionDropdownOptions === 'replace_payee') {
        this.formvalueData.tin = 0;
        this.getReplaceRequest(this.formvalueData);
      }
      if (this.actionDropdownOptions === 'replace_same_provider') {
        this.formvalueData.tin = this.checkDetails ? this.checkDetails.tin : undefined;
        this.getReplaceRequest(this.formvalueData);
      }
    } else if (!actionDropdownOptions) {
      this.isActionSelected = false;
    }
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
          'Payee': [{value: (this.checkDetails.payee || ''), disabled: this.displayButtons()},
            [Validators.required, Validators.maxLength(34), Validators.pattern('[a-zA-Z\\s\\-\\,\\\'\\/]+')]],
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
    this.replaceOrVoidFormGroup = this.fb.group({
      'MemberAcc': [{
        value: this.checkDetails ? this.checkDetails.accountNumber : '',
        disabled: true
      }],
      'Payee': [{value: this.checkDetails ? this.checkDetails.payee : '', disabled: this.displayButtons()},
        [Validators.required, Validators.maxLength(34), Validators.pattern('[a-zA-Z\\s\\-\\,\\\'\\/]+')]],
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
    const checkActionDetails = this.checkDetails.checkActionDetail;
    this.initialiseForm();
    this.replaceOrVoidFormGroup = this.fb.group({
      'MemberAcc': [{
        value: this.checkDetails ? this.checkDetails.accountNumber : '',
        disabled: true
      }],
      'Payee': [{value: this.checkDetails ? this.checkDetails.payee : '', disabled: this.displayButtons()},
        [Validators.required, Validators.maxLength(34), Validators.pattern('[a-zA-Z\\s\\-\\,\\\'\\/]+')]],
      'Tin': [{value: this.checkDetails ? this.checkDetails.tin : '', disabled: true}],
      'Npi': [{value: this.checkDetails ? this.checkDetails.npi : '', disabled: true}],
      'ReplaceReason': [{value: this.checkDetails && this.checkDetails.checkActionDetail && this.checkDetails.checkActionDetail.actionRequestReason ? this.checkDetails.checkActionDetail.actionRequestReason : '', disabled: true}, [Validators.required]],
      'otherReplaceReason': [{value: this.checkDetails && this.checkDetails.checkActionDetail && this.checkDetails.checkActionDetail.actionReasonOtherDesc ? this.checkDetails.checkActionDetail.actionReasonOtherDesc : '', disabled: true}],
      'AddOne': [{value: checkActionDetails && checkActionDetails.payeeAddress && checkActionDetails.payeeAddress.addressLine1 ? checkActionDetails.payeeAddress.addressLine1 : '', disabled: true}],
      'AddTwo': [{value: checkActionDetails && checkActionDetails.payeeAddress && checkActionDetails.payeeAddress.addressLine2 ? checkActionDetails.payeeAddress.addressLine2 : '', disabled: true}],
      'AddThree': [{value: checkActionDetails && checkActionDetails.payeeAddress && checkActionDetails.payeeAddress.addressLine3 ? checkActionDetails.payeeAddress.addressLine3 : '', disabled: true}],
      'City': [{value: checkActionDetails && checkActionDetails.payeeAddress && checkActionDetails.payeeAddress.city ? checkActionDetails.payeeAddress.city : '', disabled: true}],
      'State': [{value: checkActionDetails && checkActionDetails.payeeAddress && checkActionDetails.payeeAddress.state ? checkActionDetails.payeeAddress.state : '', disabled: true}],
      'Zip': [{value: checkActionDetails && checkActionDetails.payeeAddress && checkActionDetails.payeeAddress.zip ? checkActionDetails.payeeAddress.zip : '', disabled: true}],
      'Notation': [{value: checkActionDetails && checkActionDetails.notation ? checkActionDetails.notation : '', disabled: true}],
      'IncludeNotation': [{value: checkActionDetails && checkActionDetails.printNotationOnCheck ? 'true' : 'false', disabled: true}],
      'ReturnCheck': [{value: checkActionDetails && checkActionDetails.returned ? 'true' : 'false', disabled: true}]
    });
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
    if (!this.checkDetails || !this.checkDetails.tin) {
      return;
    }
    this.checkDetails.npi = this.checkDetails.npi ? this.checkDetails.npi : 0;
    this.checkSvc.getProviderLookup(this.checkDetails.tin, this.checkDetails.npi).subscribe(res => {
      this.showProviderModal = true;
      this.showAltProviderModal = false;
      if (res._embedded && res._embedded.items && res._embedded.items.length) {
        const providerResult: any[] = [];
        const providerData: any = res._embedded.items;
        this.providerData = providerData;
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
              providerItem.address = providerData[i].overrideProviderAddress![0].addressLine1 + `<br/>` + providerData[i].overrideProviderAddress![0].city + `, ` + providerData[i].overrideProviderAddress![0].state + ` ` + providerData[i].overrideProviderAddress![0].postalCode;
              providerItem.providerName = providerData[i].providerName!.businessName ? providerData[i].providerName!.businessName : providerData[i].providerName!.firstName + ' ' + providerData[i].providerName!.lastName;
              providerResult.push(providerItem);
            }
          }
        }
        this.providerDataSource.data = providerResult;
        this.dataLength = providerResult.length;
      } else if (res === 404) {
        this.providerTINFailMsg = true;
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

  openAltProviderModal(): void {
    this.isAlternateRadioSelected = false;
    this.showAltProviderModal = true;
    this.showProviderModal = false;
    this.selectedProvider.alternateProvider.idNumber = this.selectedProvider.alternateProvider.idNumber ? this.selectedProvider.alternateProvider.idNumber : '';
    this.checkSvc.getProvider(+this.selectedProvider.alternateProvider.idNumber).subscribe(searchResult => {
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

  getProviderAlternateAddress(providerData: any, address: any, name: any, i: number): any {
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
    this.selectedProvider.providerId.idNumber = this.selectedProvider.providerId.idNumber ? this.selectedProvider.providerId.idNumber : '';
    this.checkSvc.getProvider(+this.selectedProvider.providerId.idNumber).subscribe(searchResult => {
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
            'ReplaceReason': [{value: '', disabled: false}, [Validators.required]],
            'otherReplaceReason': [{value: '', disabled: false}],
            'AddOne': [{
              // @ts-ignore
              value: this.selectedProvider.providerAddress![0].addressLine1,
              disabled: true
            }],
            'AddTwo': [{
              // @ts-ignore
              value: this.selectedProvider.providerAddress![0].addressLine2,
              disabled: true
            }],
            'AddThree': [{value: '', disabled: true}],
            // @ts-ignore
            'City': [{value: this.selectedProvider.providerAddress![0].city, disabled: true}],
            'State': [{
              // @ts-ignore
              value: this.selectedProvider.providerAddress![0].state,
              disabled: true
            }],
            // @ts-ignore
            'Zip': [{value: this.selectedProvider.providerAddress![0].postalCode, disabled: true}],
            // @ts-ignore
            'Notation': [{value: ``, disabled: false}],
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
      if (!this.checkDetails || (this.checkDetails.buwIndicator !== '2' && (searchResult.tinInfo![0].taxStatusCode === 'W' || searchResult.tinInfo![0].taxStatusCode === 'I'))) {
        this.providerBUWFailMsg = true;
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
    this.selectedProvider.providerId.idNumber = this.selectedProvider.providerId.idNumber ? this.selectedProvider.providerId.idNumber : '';
    this.checkSvc.getProvider(+this.selectedProvider.providerId.idNumber).subscribe(searchResult => {
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
          value: this.selectedMember.memberName ? this.selectedMember.memberName.toString().slice(0, 33) : '',
          disabled: this.displayButtons()
        },
          [Validators.required, Validators.maxLength(34), Validators.pattern('[a-zA-Z\\s\\-\\,\\\'\\/]+')]],
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
}
