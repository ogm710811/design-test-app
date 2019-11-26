import {
  AfterViewInit,
  Component, Input, OnChanges, OnInit, SimpleChanges
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  ResourceOfCheckVO,
  CheckReplaceVO,
  ActionRequestReasonEnum,
  InstituteEnum
} from '@fox/rest-clients';
import {CheckActionForms} from './enums/check-action-forms.enum';
import {CheckRecoveryService} from '../../../shared/check-recovery.service';
import * as uuidConst from 'uuid';
import {delay, takeUntil} from 'rxjs/operators';
import {CheckDetailState} from '../check-detail.state';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {checkRecoveryUrlFindCheckRegister} from '@fox/shared';
const uuid = uuidConst;

export class CheckRegisterInfo {
  tin?: number;
  npi?: number;
  accountNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  city?: string;
  state?: string;
  zip?: string;
}

@Component({
  selector: 'fox-check-actions',
  templateUrl: './check-actions.component.html',
  styleUrls: ['./check-actions.component.css']
})
export class CheckActionsComponent implements OnInit, OnChanges, AfterViewInit {
  checkActionFormGroup: FormGroup = this.fb.group({});
  checkRegisterInfo: CheckRegisterInfo = new CheckRegisterInfo();
  isProvider: boolean = false;
  checkActionForms = CheckActionForms;
  nameRegex = /^[A-Za-z][A-Za-z ,'/-]*$/;
  payeeNameRegex = /^[A-Za-z][A-Za-z &,'/-]*$/;
  middleRegex = /^[A-Za-z]*$/;

  @Input() set isAuthorizeScreen(e: any) {
    this._selectedAction = true;
    this.buildCheckActionForm();
    this.checkAction = 0;
  }
  @Input() checkDetails?: ResourceOfCheckVO;
  @Input()
  set selectedAction(e: any) {
    const action = e['action'];
    this._selectedAction = action === 0 || action === 1;
    this.buildCheckActionForm();
    if (action === 0) {
      this.checkAction = 0;
    } else {
      this.checkAction = 1;
    }
  }
  get selectedAction(): any {
    return this._selectedAction;
  }
  private _selectedAction = false;

  set checkAction(checkActionForms: CheckActionForms) {
    this._checkAction = checkActionForms;
  }
  get checkAction(): CheckActionForms {
    return this._checkAction;
  }
  private _checkAction: CheckActionForms = CheckActionForms.replaceCheck;

  @Input()
  set isInstitution(e) {
    this._isInstitution = (e as any)['institution'] !== 'no';
    this.buildCheckActionForm();
  }
  get isInstitution(): boolean {
    return this._isInstitution;
  }
  private _isInstitution = false;
  private _unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
      private fb: FormBuilder,
      public state: CheckDetailState,
      private checkRecoveryService: CheckRecoveryService,
      private router: Router
  ) {
    this.buildCheckActionForm();
  }

  ngOnInit(): void {
    this.buildCheckActionForm();
    this.state.memberSelectedBehaviorSubject
      .pipe(
        delay(300),
        takeUntil(this._unsubscribe$)
      )
      .subscribe(res => {
        if (res && this.state.selectedMember) {
          const selectedMember = this.state.selectedMember;
          if (this.isInstitution) {
            this.checkActionFormGroup.patchValue({
              checkName: {
                fullPayeeName: selectedMember.payeeEntireName ? selectedMember.payeeEntireName : '',
              }
            });
          } else {
            this.checkActionFormGroup.patchValue({
              checkName: {
                checkFirstName: selectedMember.firstName ? selectedMember.firstName : '',
                checkLastName: selectedMember.lastName ? selectedMember.lastName : '',
                checkMiddleName: selectedMember.middleName ? selectedMember.middleName.charAt(0) : '',
                checkSuffixName: selectedMember.suffix ? selectedMember.suffix : '',
              }
            });
          }
        }
      });
  }

  ngAfterViewInit(): void {
    this.buildCheckActionForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.checkDetails && changes.checkDetails.currentValue) {
      const currentValue = changes.checkDetails.currentValue;
      this.checkRegisterInfo = currentValue.payeeAddress;
      this.checkRegisterInfo = {...this.checkRegisterInfo, accountNumber: currentValue.accountNumber};
      if (currentValue.tin) {
        this.isProvider = true;
        this.checkRegisterInfo = {...this.checkRegisterInfo, tin: currentValue.tin};
      } else {
        this.isProvider = false;
      }
      if (currentValue.npi) {
        this.checkRegisterInfo = {...this.checkRegisterInfo, npi: currentValue.npi};
      }
    }
  }

  buildCheckActionForm(): void {
    this.checkActionFormGroup = this.fb.group({
      checkName: this.fb.group({
        fullPayeeName: ['', this.getFullPayeeNameValidators()],
        checkFirstName: ['', this.getCheckFirstNameValidators()],
        checkLastName: ['', this.getCheckLastNameValidators()],
        checkMiddleName: ['', this.getCheckMiddleNameValidators()],
        checkSuffixName: ['', this.getCheckSuffixNameValidators()]
      }),
      checkInfo: this.fb.group({
        providerTIN: [''],
        providerNPI: [''],
        memberNumber: [''],
        memberAddressOne: [''],
        memberAddressTwo: [''],
        memberAddressThree: [''],
        memberAddressCity: [''],
        memberAddressState: [''],
        memberAddressZip: ['']
      }),
      checkReplaceReason: this.fb.group({
        checkReason: [null, Validators.required],
        checkReasonOtherDesc: [''],
        checkReplaceRaMessage: [false],
        checkReplaceIncludeNotation: [1],
        checkReplaceReturn: [1],
        checkReplaceNotation: ['']
      })
    });
  }

  getFullPayeeNameValidators(): any {
    return this.isInstitution ?
        [
          Validators.required,
          Validators.maxLength(34),
          Validators.pattern(this.payeeNameRegex)
        ] : '';
  }

  getCheckFirstNameValidators(): any {
    return this.isInstitution ? '' :
        [
          Validators.required,
          Validators.maxLength(13),
          Validators.pattern(this.nameRegex)
        ];
  }

  getCheckLastNameValidators(): any {
    return this.isInstitution ? '' :
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(this.nameRegex)
        ];
  }

  getCheckMiddleNameValidators(): any {
    return this.isInstitution ? '' :
        [
          Validators.maxLength(1),
          Validators.pattern(this.middleRegex)
        ];
  }

  getCheckSuffixNameValidators(): any {
    return this.isInstitution ? '' :
        [
          Validators.maxLength(3),
          Validators.pattern(this.middleRegex)
        ];
  }

  currentCheckActionForm(checkActionForms: CheckActionForms): boolean {
    return this.checkAction === checkActionForms;
  }

  onSubmit(): void {
    const checkName = this.checkActionFormGroup.value.checkName;
    const checkReplaceReason = this.checkActionFormGroup.value.checkReplaceReason;
    const checkReplace: CheckReplaceVO = {
      checkIds: [],
      payeeAddress: {}
    };
    if (this.checkDetails && this.checkDetails.checkId && checkReplace.checkIds) {
      checkReplace.checkIds.push(this.checkDetails.checkId);
    }
    checkReplace.institute = checkName.fullPayeeName ? InstituteEnum.Y : InstituteEnum.N;
    checkReplace.payeeEntireName = checkName.fullPayeeName ? checkName.fullPayeeName : undefined;
    checkReplace.payeeSurname = checkName.checkLastName ? checkName.checkLastName : undefined;
    checkReplace.payeeFirstName = checkName.checkFirstName ? checkName.checkFirstName : undefined;
    checkReplace.payeeMiddleInit = checkName.checkMiddleName ? checkName.checkMiddleName : undefined;
    checkReplace.suffix = checkName.checkSuffixName ? checkName.checkSuffixName : undefined;
    checkReplace.actionRequestReason = this.getActionRequestReason(checkReplaceReason.checkReason);
    checkReplace.actionReasonOtherDesc = checkReplaceReason.checkReasonOtherDesc ? checkReplaceReason.checkReasonOtherDesc : undefined;
    if (this.checkRegisterInfo && checkReplace && checkReplace.payeeAddress) {
      checkReplace.tin = this.checkRegisterInfo.tin ? this.checkRegisterInfo.tin : undefined;
      checkReplace.npi = this.checkRegisterInfo.npi ? this.checkRegisterInfo.npi : undefined;
      checkReplace.payeeAddress.addressLine1 = this.checkRegisterInfo.addressLine1 ? this.checkRegisterInfo.addressLine1 : undefined;
      checkReplace.payeeAddress.addressLine2 = this.checkRegisterInfo.addressLine2 ? this.checkRegisterInfo.addressLine2 : undefined;
      checkReplace.payeeAddress.addressLine3 = this.checkRegisterInfo.addressLine3 ? this.checkRegisterInfo.addressLine3 : undefined;
      checkReplace.payeeAddress.city = this.checkRegisterInfo.city ? this.checkRegisterInfo.city : undefined;
      checkReplace.payeeAddress.state = this.checkRegisterInfo.state ? this.checkRegisterInfo.state : undefined;
      checkReplace.payeeAddress.zip = this.checkRegisterInfo.zip ? this.checkRegisterInfo.zip : undefined;
    }
    checkReplace.notation = checkReplaceReason.checkReplaceNotation ? checkReplaceReason.checkReplaceNotation : undefined;
    checkReplace.printNotationOnCheck = this.getIncludeNotationAndReturnCheck(checkReplaceReason.checkReplaceIncludeNotation);
    checkReplace.returned = this.getIncludeNotationAndReturnCheck(checkReplaceReason.checkReplaceReturn);

    this.checkRecoveryService.submitReplaceRequest(uuid(), checkReplace).subscribe( checkDetail => {
      if (checkDetail) {
        this.router.navigate([checkRecoveryUrlFindCheckRegister]);
      }
    });
  }

  getActionRequestReason(reason: number): ActionRequestReasonEnum | undefined {
    switch (reason) {
      case 1:
        return ActionRequestReasonEnum.LOSTCHECK;
      case 2:
        return ActionRequestReasonEnum.DECEASEDINSURED;
      case 3:
        return ActionRequestReasonEnum.ACCOUNTPAIDINFULL;
      case 4:
        return ActionRequestReasonEnum.STALEDATED;
      case 5:
        return ActionRequestReasonEnum.INCORRECTPAYEE;
      case 6:
        return ActionRequestReasonEnum.OVERPAYMENT;
      case 7:
        return ActionRequestReasonEnum.INCORRECTADDRESS;
      case 8:
        return ActionRequestReasonEnum.WRONGPROVIDER;
      case 9:
        return ActionRequestReasonEnum.DAMAGEDCHECK;
      case 10:
        return ActionRequestReasonEnum.ASSIGNMENTOFBENEFITSRECEIVED;
      case 11:
        return ActionRequestReasonEnum.SURVEYLETTER;
      case 12:
        return ActionRequestReasonEnum.OTHER;
      default:
        return undefined;
    }
  }

  getIncludeNotationAndReturnCheck(includeNotation: number): boolean {
    return includeNotation === 2;
  }

  resetForm(): void {
    this.checkRecoveryService.checkActionFormGroupBehaviorSubject.next(true);
    this.buildCheckActionForm();
  }
}
