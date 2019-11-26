import {DatePipe} from '@angular/common';
import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ClaimsMaterialApi, SpecialHandlingCodesVO} from '@fox/rest-clients';
import {LoginService, MessageBoxService, MessageBoxType} from '@fox/shared';
import {Subscription} from 'rxjs/Subscription';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {MemberInformationService} from '../../../shared/member-information.service';

@Component({
  selector: 'fox-special-handling-modal',
  templateUrl: './special-handling-modal.component.html',
  styleUrls: ['./special-handling-modal.component.css']
})
export class SpecialHandlingModalComponent implements OnInit, OnChanges, OnDestroy {
  specialHandlingCodeForm: FormGroup = this.fb.group({});
  specialHandlingCodeValue: string = '';
  addSpecialHandlingCodeToggle = false;
  removeCodeToggle = false;
  disableWhenSpecialCode = true;
  codeControlSubscription: Subscription = new Subscription();
  descriptionControlSubscription: Subscription = new Subscription();
  errorMessage: string[] = ['', ''];
  userName: string = '';
  lastModifiedBy = '';
  lastModifiedOn = '';
  validator: Validators = new Validators();
  allIncluding = 'OP_OPS_SPH';
  allIncludingButS = 'OP_SHC_ANUM';
  numericOnly = 'OP_SHC_NUM';
  codeErrorMessage = 'Special Handling code is invalid.';
  isAllIncluding = false;
  isAllIncludingButS = false;
  isNumericOnly = false;
  isNumericOnlyAndNumb = false;
  specialCodes: string[] = [];
  canSave = false;

  @Input() visibleModal: boolean = false;
  @Input() modalTitle: string = '';
  @Input() membershipNumber: string = '';
  @Output() visibleModalEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() updateMemberProfileEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  get CodeControl(): AbstractControl | null {
    return this.specialHandlingCodeForm.controls['codeControl'];
  }

  get DescriptionControl(): AbstractControl | null {
    return this.specialHandlingCodeForm.controls['descriptionControl'];
  }

  constructor(private fb: FormBuilder,
              private claimsMaterialApi: ClaimsMaterialApi,
              private messageBoxService: MessageBoxService,
              private loginService: LoginService,
              private datePipe: DatePipe,
              private memberInfoSvc: MemberInformationService) {
  }

  ngOnInit(): void {
    if (this.loginService.hasRole(this.allIncluding)) {
      this.specialCodes = ['1', '2', '7', '9', 'A', 'B', 'C', 'D', 'E', 'M', 'S', '0', 'V'];
      this.validator = specialHandlingCodeValidator(this.specialCodes);
      this.isAllIncluding = true;
    } else if (this.loginService.hasRole(this.allIncludingButS)) {
      this.specialCodes = ['1', '2', '7', '9', 'A', 'B', 'C', 'D', 'E', 'M', '0', 'V'];
      this.validator = specialHandlingCodeValidator(this.specialCodes);
      this.isAllIncludingButS = true;
    } else if (this.loginService.hasRole(this.numericOnly)) {
      this.specialCodes = ['1', '2', '7', '9', '0'];
      this.validator = specialHandlingCodeValidator(this.specialCodes);
      this.isNumericOnly = true;
    } else {
      this.validator = Validators.maxLength(1);
    }

    this.setForm();
    this.setErrorsMessages();
    this.checkSaveChangesButtonState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.visibleModal.currentValue) {
      this.getSpecialHandlingCodes();
    } else {
      if (this.specialHandlingCodeForm) {
        this.specialHandlingCodeForm.reset();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.codeControlSubscription) {
      this.codeControlSubscription.unsubscribe();
    }
    if (this.descriptionControlSubscription) {
      this.descriptionControlSubscription.unsubscribe();
    }
  }

  onSaveChanges(): void {
    this.callSetSpecialHandlingCode(false);
  }

  onRemoveCode(): void {
    this.callSetSpecialHandlingCode(true);
  }

  onCancel(): void {
    this.claimsMaterialApi.unlockAccount(this.membershipNumber.replace(/ /g, ''), uuid())
      .subscribe(
        () => {
          this.messageBoxService.addMessageBox('Success', MessageBoxType.SUCCESS, 'Member was unlocked.', 3000);
          this.resetForm();
        },
        () => {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Member could not be unlocked.');
          this.resetForm();
        }
      );
  }

  onAddSpecialHandlingCodeToggle(): void {
    this.addSpecialHandlingCodeToggle = !this.addSpecialHandlingCodeToggle;
  }

  setForm(): void {
    this.specialHandlingCodeForm = this.fb.group({
      codeControl: ['', [
        Validators.required,
        Validators.pattern('(?!\\s+$).+'),
        this.validator
      ]],
      descriptionControl: ['', [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern('(?!\\s+$).+')
      ]]
    });
  }

  checkSaveChangesButtonState(): void {
    this.specialHandlingCodeForm.controls['codeControl'].setValue(this.specialHandlingCodeForm.controls['codeControl'].value.toLocaleString().toUpperCase());
    this.disableWhenSpecialCode = true;

    if ((this.specialHandlingCodeValue !== ' ') && (this.specialHandlingCodeValue === this.specialHandlingCodeForm.controls['codeControl'].value)) {
      this.specialHandlingCodeForm.controls['codeControl'].setErrors({hasEnterSameSpecialHandlingCode: true});
    }
    if (this.specialHandlingCodeForm.valid) {
      this.disableWhenSpecialCode = false;
    }
    this.setErrorsMessages();
    this.canSave = this.isUserAuthorized(this.specialHandlingCodeForm.controls['codeControl'].value);
    if (this.specialHandlingCodeValue === ' ') {
      this.removeCodeToggle = false;
    }
  }

  private setErrorsMessages(): void {
    const codeValue = this.specialHandlingCodeForm.controls['codeControl'].value;
    this.isNumericOnlyAndNumb = isNaN(codeValue);
    if (codeValue === this.specialHandlingCodeValue) {
      this.codeErrorMessage = 'The special handling code entered already exists on the account. Please try again.';
    } else {
      if (this.isAllIncluding) {
        this.codeErrorMessage = 'You are authorized to edit/add a value of 1, 2, 7, 9, 0, A, B, C, D, E, M, S, V. Please try again.';
      } else if (this.isAllIncludingButS) {
        if (codeValue === 'S') {
          this.codeErrorMessage = 'You are authorized to edit/add a value of 1, 2, 7, 9, 0, A, B, C, D, E, M, V. Please try again.';
        } else {
          this.codeErrorMessage = 'You are authorized to edit/add a value of 1, 2, 7, 9, 0, A, B, C, D, E, M, V. Please try again.';
        }
      } else if (this.isNumericOnly) {
        if (this.isNumericOnlyAndNumb && this.isValid(codeValue)) {
          this.codeErrorMessage = 'You are authorized to edit/add a numeric value of 1, 2, 7, 9, 0 only. Please try again.';
        } else {
          this.codeErrorMessage = 'You are authorized to edit/add a numeric value of 1, 2, 7, 9, 0 only. Please try again.';
        }
      }
    }
  }

  private isValid(value: string): boolean {
    return ['A', 'B', 'C', 'D', 'E', 'M', 'S', 'V'].indexOf(value) !== -1;
  }

  private isUserAuthorized(value: string): boolean {
    return this.specialCodes.indexOf(value) !== -1;
  }

  private getSpecialHandlingCodes(): void {
    this.addSpecialHandlingCodeToggle = false;
    this.claimsMaterialApi.getSpecialHandlingCodes(this.membershipNumber.replace(/ /g, ''), uuid())
      .subscribe(
        (data) => {
          for (const item of data) {
            if (item.specialHandlingCode) {
              this.specialHandlingCodeValue = item.specialHandlingCode;
              this.canSave = this.isUserAuthorized(item.specialHandlingCode);

              const canSaveLocal = !this.canSave;

              if (canSaveLocal && item.specialHandlingCode !== ' ') {
                this.validator = setAlwaysError();
                this.setForm();
              }

              if (item.specialHandlingCode === ' ') {
                this.displayLastModified(item);
              } else if (item.specialHandlingCode !== ' ') {
                if (this.canSave) {
                  this.removeCodeToggle = true;
                }
                this.addSpecialHandlingCodeToggle = false;
                this.displayLastModified(item);
              }

              if (/\S/.test(item.specialHandlingCode)) {
                this.specialHandlingCodeForm.patchValue({
                  codeControl: item.specialHandlingCode,
                  descriptionControl: item.description
                });
                this.displayLastModified(item);
                this.addSpecialHandlingCodeToggle = true;
              }

            }
          }
        },
        (error) => {
          // disable maintenance buttons for any error
          this.memberInfoSvc.disableMaintenanceButton('special_handling_codes');
          // display meaningful message for error 412
          if (error.status === 412) {
            const headersRes = error.headers.get('reasoncode');
            this.memberInfoSvc.displayErrorMessage(headersRes);
          } else if (error.status === 404) {
            this.removeCodeToggle = true;
            this.addSpecialHandlingCodeToggle = false;
          }
        }
      );
  }

  private displayLastModified(item: SpecialHandlingCodesVO): void {
    this.lastModifiedBy = item.addedBy || '';
    const date = (item.dateAdded) ? this.datePipe.transform(item.dateAdded, 'MM/dd/yyyy') : '';
    this.lastModifiedOn = date as string;
  }

  private callSetSpecialHandlingCode(removeCode: boolean): void {
    if (this.CodeControl && this.CodeControl.value && this.DescriptionControl && this.DescriptionControl.value) {
      const date = this.datePipe.transform(new Date(), 'yyyy-MM-dd') as string;
      const controlValue: SpecialHandlingCodesVO = {
        specialHandlingCode: (removeCode) ? ' ' : this.CodeControl.value,
        description: (removeCode) ? ' ' : this.DescriptionControl.value,
        addedBy: this.loginService.username,
        dateAdded: date
      };

      this.claimsMaterialApi.setSpecialHandlingCode(this.membershipNumber.replace(/ /g, ''), controlValue, uuid())
        .subscribe(
          () => {
            this.messageBoxService.addMessageBox('Success', MessageBoxType.SUCCESS, 'Special Handling Code Updated', 3000);
            this.updateMemberProfileEmitter.emit(true);
            this.onCancel();
          },
          (error) => {
            if (error.status === 403) {
              this.messageBoxService.addMessageBox('Approval Needed', MessageBoxType.ERROR, 'Approval is needed to add a special handling code. A request has been made.');
            } else {
              this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Special Handling Code updates were not successful.');
            }
            this.updateMemberProfileEmitter.emit(true);
            this.onCancel();
          }
        );
    }
  }

  private resetForm(): void {
    this.specialHandlingCodeForm.markAsPristine();

    if (!this.removeCodeToggle) {
      this.specialHandlingCodeForm.patchValue({
        codeControl: '',
        descriptionControl: ''
      });
    }
    this.visibleModal = false;
    this.visibleModalEmitter.emit(this.visibleModal);
    this.removeCodeToggle = false;
    this.addSpecialHandlingCodeToggle = false;
  }
}

function specialHandlingCodeValidator(whiteList: string[]): ValidatorFn {
  return (ctr: AbstractControl): ValidationErrors | null => {
    const value = ctr.value ? ctr.value[(<string>ctr.value).length - 1] : ' ';
    if (whiteList.indexOf(value) === -1) {
      return {specialHandlingCodeValidator: true};
    }
    return null;
  };
}

function setAlwaysError(): ValidatorFn {
  return (): ValidationErrors | null => {
    return {alwaysError: true};
  };
}
