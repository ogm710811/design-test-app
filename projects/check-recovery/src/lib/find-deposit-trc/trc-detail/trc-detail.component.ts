import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  ClaimNoteVO,
  ReferencesApi,
  TRCDemoInfoVO,
  TRCObjectRequestVO,
  TreasuryReconciliationApi,
  TreasuryReconciliationRequestVO,
  TreasuryReconciliationVO
} from '@fox/rest-clients';
import {FoxValidators, LoginService, MessageBoxService, MessageBoxType} from '@fox/shared';
import {Subscription} from 'rxjs';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {TrcDetailAction, TrcDetailModel, TrcDetailActionNamespace} from './trc-detail.model';
import usdValidator = FoxValidators.usdValidator;
import {ReferenceValueVO} from '@fox/rest-clients';

declare class TrcFormValues {
  amount?: string;
  category?: string;
  interest?: string;
  isPriorYear?: boolean;
  reasonCd?: string;
  isOverpayment?: boolean;
  isBulk?: boolean;
  isBuw?: boolean;
  businessUnit: string;
  providerOrInsured: 'Provider' | 'Insured';
  claimNote?: string;
  claimNum?: string;
  firstName?: string;
  lastName?: string;
  linkedMemberNumber?: string;
  demoName?: string;
  addr1?: string;
  addr2?: string;
  city?: string;
  state?: string;
  zip?: string;
  acctPayableNote?: string;
}

@Component({
  selector: 'fox-trc-detail',
  templateUrl: './trc-detail.component.html',
  styleUrls: ['./trc-detail.component.css', '../../shared/material-site.css']
})
export class TrcDetailComponent implements OnChanges, OnInit {

  Empty: TrcDetailAction.Empty = TrcDetailAction.Empty;
  View: TrcDetailAction.View = TrcDetailAction.View;
  Add: TrcDetailAction.Add = TrcDetailAction.Add;
  Copy: TrcDetailAction.Copy = TrcDetailAction.Copy;
  Modify: TrcDetailAction.Modify = TrcDetailAction.Modify;
  trcCategoryDescriptions: ReferenceValueVO[] = [];
  checkReasonDescriptions: ReferenceValueVO[] = [];
  trcMemberState: ReferenceValueVO[] = [];
  linkClmNum: string = '';

  @Input() trcDetails: TrcDetailModel = {action: this.Empty};
  @Input() isVouchered?: boolean = false;
  @Input() isPending?: boolean = false;
  @Output() cancelTrc: EventEmitter<TreasuryReconciliationRequestVO> = new EventEmitter<TreasuryReconciliationRequestVO>();
  @Output() saveTrc: EventEmitter<TreasuryReconciliationRequestVO> = new EventEmitter<TreasuryReconciliationRequestVO>();
  @Output() completeTrc: EventEmitter<TreasuryReconciliationRequestVO> = new EventEmitter<TreasuryReconciliationRequestVO>();
  @Output() viewToModifyTransition: EventEmitter<string> = new EventEmitter<string>();

  trcFormGroup: FormGroup = this.fb.group({});
  maxNotationText: number = 256;

  linkedMemberNumber: string = '';
  showUnlinkBtn?: boolean = false;

  private fgSub: Subscription = new Subscription();
  private emitOnChange: () => void;
  private initialFormValues?: TrcFormValues;

  get currentTreasuryReconciliationId(): string {
    if (this.trcDetails) {
      switch (this.trcDetails.action) {
        case TrcDetailAction.Add:
          return 'N/A';
        case TrcDetailAction.Copy:
          return 'N/A';
        case TrcDetailAction.Modify:
          return this.trcDetails.trc
            ? this.trcDetails.trc.treasuryReconciliationId
              ? this.trcDetails.trc.treasuryReconciliationId.toString() : 'N/A'
            : 'N/A';
        case TrcDetailAction.View:
          return this.trcDetails.trc
            ? this.trcDetails.trc.treasuryReconciliationId
              ? this.trcDetails.trc.treasuryReconciliationId.toString() : 'N/A'
            : 'N/A';
        case TrcDetailAction.Empty:
          return 'N/A';
        default:
          return 'N/A';
      }
    }
    return 'N/A';
  }

  get currentTreasuryReconciliationStatus(): string {
    if (this.trcDetails) {
      switch (this.trcDetails.action) {
        case TrcDetailAction.Add:
          return 'N/A';
        case TrcDetailAction.Copy:
          return 'N/A';
        case TrcDetailAction.Modify:
          return this.trcDetails.trc
            ? this.trcDetails.trc.treasuryReconciliationStatus ? this.trcDetails.trc.treasuryReconciliationStatus : 'N/A' : 'N/A';
        case TrcDetailAction.View:
          return this.trcDetails.trc
            ? this.trcDetails.trc.treasuryReconciliationStatus ? this.trcDetails.trc.treasuryReconciliationStatus : 'N/A' : 'N/A';
        case TrcDetailAction.Empty:
          return 'N/A';
        default:
          return 'N/A';
      }
    }
    return 'N/A';
  }

  constructor(private fb: FormBuilder, private referencesSvc: ReferencesApi, private linkClaimApi: TreasuryReconciliationApi,
              private messageBoxService: MessageBoxService, private loginSvc: LoginService) {
    this.initialFormValues = {
      amount: '',
      category: '',
      interest: '',
      isPriorYear: false,
      reasonCd: '',
      isOverpayment: false,
      isBulk: false,
      isBuw: false,
      businessUnit: '',
      providerOrInsured: 'Provider',
      claimNote: '',
      claimNum: '',
      firstName: '',
      lastName: '',
      linkedMemberNumber: '',
      demoName: '',
      addr1: '',
      addr2: '',
      city: '',
      state: '',
      zip: '',
      acctPayableNote: ''
    };
    const controlConfig = {};
    Object.keys(this.initialFormValues).map(key => {
      if (key === 'amount' || key === 'interest') {
        // @ts-ignore
        (controlConfig[key] as any) = [this.initialFormValues[key], usdValidator];
      } else {
        // @ts-ignore
        (controlConfig[key] as any) = this.initialFormValues[key];
      }
    });
    this.trcFormGroup = this.fb.group(controlConfig);
    this.emitOnChange = () => {
      if (this.trcDetails.action === this.View && this.trcFormGroup.dirty) {
        this.viewToModifyTransition.emit('change');
      }
    };

    this.fgSub = this.trcFormGroup.valueChanges.subscribe(this.emitOnChange);
  }

  ngOnInit(): void {
    this.getTrcCategory();
    this.getCheckReason();
    this.getMemberState();
  }

  formatAmount(): void {
    this.formatDollarAmount('amount');
  }

  formatInterest(): void {
    this.formatDollarAmount('interest');
  }

  formatDollarAmount(formControlName: string): void {
    if (this.trcFormGroup && this.trcFormGroup.controls) {
      if (this.trcFormGroup.controls.hasOwnProperty(formControlName) && this.trcFormGroup.controls[formControlName]) {
        this.trcFormGroup.controls[formControlName].setValue(this.formatToDollarAmount(<string>this.trcFormGroup.controls[formControlName].value || ''));
      }
    }
  }

  actionString(): string {
    return TrcDetailActionNamespace.actionString(this.trcDetails.action);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fgSub.unsubscribe();
    if (changes.hasOwnProperty('isVouchered') && changes.isVouchered && changes.isVouchered.previousValue !== changes.isVouchered.currentValue) {
      if (this.isVouchered) {
        this.trcFormGroup.disable();
      } else {
        this.trcFormGroup.enable();
        this.disableFutureFields();
      }
    }

    if (changes.hasOwnProperty('trcDetails') && changes.trcDetails && changes.trcDetails.previousValue !== changes.trcDetails.currentValue) {
      this.disableFutureFields();
      switch (this.trcDetails.action) {
        case this.Empty:
          break;
        case this.Add:
          // we set the values to the initial state
          if (this.initialFormValues) {
            this.trcFormGroup.setValue(this.initialFormValues);
          }
          this.trcFormGroup.patchValue({amount: this.trcDetails.amount.toFixed(2)});
          this.showUnlinkBtn = false;
          break;
        case this.View:
          this.updateFormFromTrc(this.trcDetails.trc);
          break;
        case this.Copy:
          break;
        case this.Modify:
          break;
        default:
          // this lets the compiler ensure that we never get to this default, and we've handled all states
          const neverPossible: never = this.trcDetails;
          break;
      }
    }
    this.fgSub = this.trcFormGroup.valueChanges.subscribe(this.emitOnChange);
  }

  disableFutureFields(): void {
    this.trcFormGroup.controls['firstName'].disable();
    this.trcFormGroup.controls['lastName'].disable();
    this.trcFormGroup.controls['linkedMemberNumber'].disable();
    this.trcFormGroup.controls['claimNote'].disable();
  }

  onPressCancel(): void {
    switch (this.trcDetails.action) {
      case this.Add:
        this.cancelTrc.emit(this.trcFromForm());
        break;
      case this.Copy:
        this.cancelTrc.emit(this.trcFromForm());
        break;
      case this.Empty:
        // this should never happen because the cancel button does not appear in this state
        this.cancelTrc.emit({});
        break;
      case this.View:
        // this should never happen because the cancel button does not appear in this state
        // but if it does, submit what was originally put into the form, not the latest form values
        this.cancelTrc.emit(this.trcDetails.trc);
        break;
      case this.Modify:
        this.cancelTrc.emit(this.trcFromForm());
        break;
      default:
        // this lets the compiler ensure that we never get to this default, and we've handled all states
        const neverPossible: never = this.trcDetails;
        break;
    }
  }

  onPressSave(): void {
    this.saveTrc.emit(this.trcFromForm());
  }

  onPressComplete(): void {
    this.completeTrc.emit(this.trcFromForm());
  }

  onPriorYearSelection(): void {
    if (this.trcFormGroup.controls['isPriorYear'] && this.trcFormGroup.controls['isPriorYear'].value) {
      if (this.trcFormGroup.controls['isBuw'] && this.trcFormGroup.controls['isBuw'].value) {
        this.trcFormGroup.controls['isBuw'].setValue(false);
      }
      this.trcFormGroup.controls['isBuw'].disable();
    } else {
      this.trcFormGroup.controls['isBuw'].enable();
    }
  }

  trcFromForm(): TreasuryReconciliationRequestVO {
    const theTrc: TRCObjectRequestVO = {};
    switch (this.trcDetails.action) {
      case TrcDetailAction.Add:
        theTrc.depositDetailId = this.trcDetails.depositDetailId;
        break;
      case TrcDetailAction.Copy:
        theTrc.depositDetailId = this.trcDetails.depositDetailId;
        break;
      case TrcDetailAction.Modify:
        theTrc.treasuryReconciliationId = this.trcDetails.trc.treasuryReconciliationId;
        theTrc.depositDetailId = this.trcDetails.trc.depositDetailId;
        break;
      case TrcDetailAction.View:
        theTrc.treasuryReconciliationId = this.trcDetails.trc.treasuryReconciliationId;
        theTrc.depositDetailId = this.trcDetails.trc.depositDetailId;
        break;
      case TrcDetailAction.Empty:
        break;
    }
    theTrc.treasuryReconciliationAmount = +(this.trcFormGroup.controls['amount'].value);
    if (isNaN(theTrc.treasuryReconciliationAmount)) {
      theTrc.treasuryReconciliationAmount = undefined;
    }
    if (this.trcFormGroup.controls['amount'].value === '') {
      this.trcFormGroup.controls['amount'].setValidators(Validators.required);
    }
    theTrc.treasuryReconciliationCategory = this.trcFormGroup.controls['category'].value;
    if (this.trcFormGroup.controls['category'].value === '') {
      this.trcFormGroup.controls['category'].setValidators(Validators.required);
    }
    theTrc.interestAmount = +(this.trcFormGroup.controls['interest'].value);
    if (isNaN(theTrc.interestAmount)) {
      theTrc.interestAmount = undefined;
    }
    theTrc.priorYear = this.trcFormGroup.controls['isPriorYear'].value;
    theTrc.reasonCode = this.trcFormGroup.controls['reasonCd'].value;
    if (this.trcFormGroup.controls['reasonCd'].value === '') {
      this.trcFormGroup.controls['reasonCd'].setValidators(Validators.required);
    }
    theTrc.overpayment = this.trcFormGroup.controls['isOverpayment'].value;
    theTrc.bulk = this.trcFormGroup.controls['isBulk'].value;
    theTrc.backUpWithholding = this.trcFormGroup.controls['isBuw'].value;
    theTrc.providerInsured = (this.trcFormGroup.controls['providerOrInsured'].value === 'Insured' ? 'I' : 'P');
    theTrc.businessUnit = (this.trcFormGroup.controls['businessUnit'].value === 'UHC NY' ? 'UHCNY' : 'UHC');
    theTrc.claimNumber = +(this.trcFormGroup.controls['claimNum'].value) || 0;
    this.linkClmNum = this.trcFormGroup.controls['linkedMemberNumber'].value;
    if (this.linkClmNum.length === 10) {
      this.linkClmNum = '0' + this.linkClmNum;
    }
    theTrc.memberNumber = this.linkClmNum;
    theTrc.memberFirstInit = this.trcFormGroup.controls['firstName'].value[0];
    theTrc.memberLastName = this.trcFormGroup.controls['lastName'].value;

    if (isNaN(theTrc.claimNumber)) {
      theTrc.claimNumber = undefined;
    }

    const theClaimNote: ClaimNoteVO = {
      claimNote: this.trcFormGroup.controls['claimNote'].value
    };

    if (this.trcFormGroup.controls['category'].value === 'ACP') {
      const theDemoGraphicInfo: TRCDemoInfoVO = {
        name: this.trcFormGroup.controls['demoName'].value,
        addressLine1: this.trcFormGroup.controls['addr1'].value,
        addressLine2: this.trcFormGroup.controls['addr2'].value,
        city: this.trcFormGroup.controls['city'].value,
        state: this.trcFormGroup.controls['state'].value,
        zip: this.trcFormGroup.controls['zip'].value,
        note: this.trcFormGroup.controls['acctPayableNote'].value
      };
      return {
        treasuryReconciliation: theTrc,
        claimNote: theClaimNote,
        demographicInfo: theDemoGraphicInfo
      };
    } else if (this.trcFormGroup.controls['category'].value === 'UHR') {
      const theDemoGraphicInfo: TRCDemoInfoVO = {
        name: this.trcFormGroup.controls['demoName'].value
      };
      return {
        treasuryReconciliation: theTrc,
        claimNote: theClaimNote,
        demographicInfo: theDemoGraphicInfo
      };
    } else {
      return {
        treasuryReconciliation: theTrc,
        claimNote: theClaimNote
      };
    }

  }

  onSelectClearFields(): void {
    if (this.trcFormGroup.controls['category'].value === 'ACP') {
      this.trcFormGroup.controls['demoName'].setValue('');
      this.trcFormGroup.controls['addr1'].setValue('');
      this.trcFormGroup.controls['addr2'].setValue('');
      this.trcFormGroup.controls['city'].setValue('');
      this.trcFormGroup.controls['state'].setValue('');
      this.trcFormGroup.controls['zip'].setValue('');
      this.trcFormGroup.controls['acctPayableNote'].setValue('');
    } else if (this.trcFormGroup.controls['category'].value === 'UHR') {
      this.trcFormGroup.controls['demoName'].setValue('');
    }
  }

  updateFormFromTrc(trc: TreasuryReconciliationVO): void {
    this.trcFormGroup.setValue({
      amount: (trc.treasuryReconciliationAmount || 0).toFixed(2),
      category: trc.treasuryReconciliationCategory || '',
      interest: (trc.interestAmount || 0).toFixed(2),
      isPriorYear: trc.priorYear === undefined ? false : trc.priorYear,
      businessUnit: trc.additionalDetails ? trc.additionalDetails.legalEntity ? trc.additionalDetails.legalEntity === 'UHCNY' ? 'UHC NY' : 'UHC' : '' : '',
      reasonCd: trc.reasonCode || '',
      isOverpayment: trc.overpayment === undefined ? false : trc.overpayment,
      isBulk: trc.bulk === undefined ? false : trc.bulk,
      isBuw: trc.backUpWithholding === undefined ? false : trc.backUpWithholding,
      providerOrInsured: (trc.providerInsured === 'P' ? 'Provider' : 'Insured') || '',
      claimNote: trc.claimNote ? trc.claimNote : '',
      claimNum: trc.claimNumber || (trc.claimNote ? trc.claimNote.claimHistoryId || '' : ''),
      firstName: trc.memberFirstInit ? trc.memberFirstInit : '',
      lastName: trc.memberLastName ? trc.memberLastName : '',
      linkedMemberNumber: trc.memberNumber ? trc.memberNumber || '' : '',
      demoName: trc.demographicInfo ? trc.demographicInfo.name || '' : '',
      addr1: trc.demographicInfo ? trc.demographicInfo.addressLine1 || '' : '',
      addr2: trc.demographicInfo ? trc.demographicInfo.addressLine2 || '' : '',
      city: trc.demographicInfo ? trc.demographicInfo.city || '' : '',
      state: trc.demographicInfo ? trc.demographicInfo.state || '' : '',
      zip: trc.demographicInfo ? trc.demographicInfo.zip || '' : '',
      acctPayableNote: trc.demographicInfo ? trc.demographicInfo.note || '' : ''
    });
  }

  linkClaimOnClick(): void {
    const linkClaimNumber = this.trcFormGroup.controls['claimNum'].value;
    this.linkClaimApi.getLinkedClaim(linkClaimNumber, uuid()).subscribe(res => {
      console.log('link claim res', res);
      this.trcFormGroup.setValue({
        amount: this.trcFormGroup.controls['amount'].value,
        category: this.trcFormGroup.controls['category'].value,
        interest: this.trcFormGroup.controls['interest'].value,
        isPriorYear: this.trcFormGroup.controls['isPriorYear'].value,
        businessUnit: res.businessUnit === 'UHCNY' ? 'UHC NY' : 'UHC',
        reasonCd: this.trcFormGroup.controls['reasonCd'].value,
        isOverpayment: this.trcFormGroup.controls['isOverpayment'].value,
        isBulk: this.trcFormGroup.controls['isBulk'].value,
        isBuw: this.trcFormGroup.controls['isBuw'].value,
        providerOrInsured: res.providerInsured === 'I' ? 'Insured' : 'Provider',
        claimNote: res.claimNote || '',
        claimNum: this.trcFormGroup.controls['claimNum'].value,
        firstName: (res.firstName) ? res.firstName.substring(0, 1) : '',
        lastName: res.lastName || '',
        linkedMemberNumber: res.memberNumber || '',
        demoName: this.trcFormGroup.controls['demoName'].value,
        addr1: this.trcFormGroup.controls['addr1'].value,
        addr2: this.trcFormGroup.controls['addr2'].value,
        city: this.trcFormGroup.controls['city'].value,
        state: this.trcFormGroup.controls['state'].value,
        zip: this.trcFormGroup.controls['zip'].value,
        acctPayableNote: this.trcFormGroup.controls['acctPayableNote'].value
      });
      this.showUnlinkBtn = true;
      this.messageBoxService.reset();
    }, (e) => {
      if (e.status === 404) {
        this.messageBoxService.addMessageBox('Error: Claim Not Found', MessageBoxType.ERROR, 'The claim entered was not found in claim history. Please re-enter a correct claim');
        console.log('404');
        window.scrollTo(0, 0);
      }
      if (e.status === 500) {
        this.messageBoxService.addMessageBox('Error: Unexpected Error', MessageBoxType.ERROR, 'Unexpected error with 500 code');
        window.scrollTo(0, 0);
      }
    });
  }

  unLinkClaimBtn(): void {
    this.showUnlinkBtn = false;
    this.trcFormGroup.controls['claimNum'].setValue('');
    this.trcFormGroup.controls['linkedMemberNumber'].setValue('');
    this.trcFormGroup.controls['claimNote'].setValue('');
    this.trcFormGroup.controls['firstName'].setValue('');
    this.trcFormGroup.controls['lastName'].setValue('');
  }

  openInNewTab(): void {
    this.loginSvc.isNewBrowserTabOpen = true;
  }

  getTrcCategory(): void {
    this.trcCategoryDescriptions = new Array();
    const obs = this.referencesSvc.listCategoryCodes('TRC_CATEGORY', uuid());
    if (obs) {
      obs.subscribe(obj => {
        this.trcCategoryDescriptions = obj;
      });
    }
  }

  getMemberState(): void {
    this.trcMemberState = [];
    const obs = this.referencesSvc.listCategoryCodes('MEMBER_STATE', uuid());
    if (obs) {
      obs.subscribe(obj => {
        this.trcMemberState = obj;
      });
    }
  }

  getCheckReason(): void {
    this.checkReasonDescriptions = [];
    const obs = this.referencesSvc.listCategoryCodes('CHECK_REASON', uuid());
    if (obs) {
      obs.subscribe(obj => {
        this.checkReasonDescriptions = obj;
      });
    }
  }

  private formatToDollarAmount(str: string): string {
    return str.replace(/^\d*\.\d$/, '$&0')
      .replace(/^(\d*\.\d{2})\d+$/, '$1')
      .replace(/^(\d*)\.$/, '$1');
  }
}
