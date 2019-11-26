import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {DepositApi, ResourceOfManualDepositVO} from '@fox/rest-clients';
import {FoxValidators, LoginService, MessageBoxService, MessageBoxType} from '@fox/shared';
import * as momentConst from 'moment';
import * as uuidConst from 'uuid';
const moment = momentConst;
const uuid = uuidConst;
import {CheckRecoveryService} from '../shared/check-recovery.service';
import {DepositDateIsBeforeDateReceived, FormDateGreaterThanCurrentDate} from './manual-entry.validator';
import usdValidator = FoxValidators.usdValidator;

@Component({
  selector: 'fox-ui-manual-entry',
  templateUrl: './manual-entry.component.html',
  styleUrls: ['./manual-entry.component.css']
})
export class ManualEntryComponent {

  @ViewChild('formDirective') formDirective: NgForm = new NgForm([], []);

  dataSource = new MatTableDataSource();
  manualDepositEntryFormGroup: FormGroup = this.fb.group({});

  dateReceivedFormControl = new FormControl('', [
    Validators.required,
    FormDateGreaterThanCurrentDate
  ]);

  depositDateFromFormControl = new FormControl('', [
    Validators.required,
    FormDateGreaterThanCurrentDate
  ]);

  depositAmountFormControl = new FormControl('', [
    usdValidator,
    Validators.required
  ]);

  checkNumberFormControl = new FormControl('', [
    Validators.required
  ]);

  showConfirmationModal: boolean = false;
  manualDepositSuccessMsg: boolean = false;
  isError: boolean = false;
  errorMsg: string = '';

  constructor(private checkSvc: CheckRecoveryService, private loginSvc: LoginService,
              private fb: FormBuilder, private queueDetailsApi: DepositApi, private messageBoxService: MessageBoxService) {

    this.initManualDepositEntryForm();
  }

  initManualDepositEntryForm(): void {
    this.manualDepositEntryFormGroup = this.fb.group({
      'depositDatesForm': this.fb.group({
        'dateReceived': this.dateReceivedFormControl,
        'depositDate': this.depositDateFromFormControl
      }, {validator: DepositDateIsBeforeDateReceived}),

      'depositAmount': this.depositAmountFormControl,
      'depositCategory': [''],
      'checkNumber': this.checkNumberFormControl
    });
  }

  removeWhitespace(sourceString: string): string | null {
    if (sourceString) {
      return sourceString.trim();
    } else {
      return null;
    }
  }

  checkIfFormFilled(): boolean {
    const values = this.manualDepositEntryFormGroup.value;

    if (this.removeWhitespace(values.depositDatesForm.dateReceived) && this.removeWhitespace(values.depositDatesForm.depositDate) &&
      this.removeWhitespace(values.depositAmount) && this.removeWhitespace(values.depositCategory) &&
      this.removeWhitespace(values.checkNumber)) {

      if (this.manualDepositEntryFormGroup.valid) {
        return true;
      }
    }

    return false;
  }

  manualDepositSubmit(formControl: FormGroup): void {

    if (this.checkIfFormFilled()) {

      this.dataSource.data = [];
      const formvalue = formControl.value;

      const reqPayload: any = {
        'dateReceived': moment(formvalue.depositDatesForm.dateReceived, 'MM/DD/YYYY').format('YYYY-MM-DD'),
        'depositDate': moment(formvalue.depositDatesForm.depositDate, 'MM/DD/YYYY').format('YYYY-MM-DD'),
        'depositAmount': formvalue.depositAmount,
        'depositCategory': formvalue.depositCategory,
        'checkNumber': formvalue.checkNumber,
        'verifiedBy': this.loginSvc.loginState.username
      };

      for (const i in reqPayload) {
        if (reqPayload[i]) {
          reqPayload[i] = reqPayload[i].replace(/(^\s+|\s+$)/g, '');
        }
      }

      this.submitRequest(reqPayload);
    }
  }

  submitRequest(reqPayload: ResourceOfManualDepositVO): void {

    this.isError = false;
    this.manualDepositSuccessMsg = false;
    this.errorMsg = '';

    this.checkSvc.submitManualDeposit(reqPayload).subscribe((manualDeposit: ResourceOfManualDepositVO) => {

      this.manualDepositSuccessMsg = true;
      this.clearForm();
      manualDeposit.depositId = manualDeposit.depositId ? manualDeposit.depositId : 0;
      this.submitQueueDetails(manualDeposit.depositId);
    }, (e) => {

      if (e.status === 403) {
        this.errorMsg = 'You are not authorized to submit a manual deposit';
      }

      this.isError = true;

    });

  }

  submitQueueDetails(depositSummaryId: number): void {
    this.queueDetailsApi.getQueueDetails(depositSummaryId, uuid()).subscribe(res => {
    }, (e) => {
      this.messageBoxService.addMessageBox('Something went wrong', MessageBoxType.ERROR,
        'Please proceed with new queue deposit');
    });
  }

  clearForm(): void {
    this.formDirective.resetForm();
    this.manualDepositEntryFormGroup.reset();
  }

  showConfirmationModalFn(): void {
    this.showConfirmationModal = true;
  }

  confirmSubmit(): void {
    this.showConfirmationModal = false;
    this.messageBoxService.empty();
    this.manualDepositSubmit(this.manualDepositEntryFormGroup);
  }

}
