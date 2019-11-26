import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {ClaimsMaterialApi, TransferAccountRequestVO} from '@fox/rest-clients';
import {Subscription} from 'rxjs/Subscription';
import {
  FormatMemberNumber,
  FoxValidators,
  MessageBoxService,
  MessageBoxType
} from '@fox/shared';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {MemberInformationService} from '../../../shared/member-information.service';
import memberNumberLengthValidator = FoxValidators.memberNumberLengthValidator;

@Component({
  selector: 'fox-transfer-account-number',
  templateUrl: './account-number.component.html',
  styleUrls: ['./account-number.component.css']
})
export class AccountNumberComponent implements OnInit, OnDestroy {

  accountTransferForm: FormGroup = this.fb.group({});
  recipientMemberControlSubscription: Subscription = new Subscription();
  insuredNoteControlSubscription: Subscription = new Subscription();
  recipentMemberValue: string = '';

  @Input() showTransferAccountNumberModal: boolean = false;
  @Input() modalTitle: string = '';
  @Input() membershipNumber: string = '';
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private messageBoxService: MessageBoxService,
    private claimsMaterialApi: ClaimsMaterialApi,
    private formatMemberNumber: FormatMemberNumber,
    private memberInformationService: MemberInformationService
  ) {
  }

  ngOnInit(): void {
    this.accountTransferForm = this.fb.group({
      originatingMemberControl: [{value: this.formatMemberNumber.transform(this.membershipNumber), disabled: true}],
      recipientMemberControl: [
        '',

        [
          Validators.required,
          Validators.pattern('^[0-9 ]+$'),
          memberNumberLengthValidator
        ]
      ],
      insuredNoteControl: [
        '',
        [
          Validators.required,
          Validators.pattern('(?!\\s+$).+')
        ]
      ]
    });
  }

  ngOnDestroy(): void {
    if (this.recipientMemberControlSubscription) {
      this.recipientMemberControlSubscription.unsubscribe();
    }
    if (this.insuredNoteControlSubscription) {
      this.insuredNoteControlSubscription.unsubscribe();
    }
  }

  checkInsuredAndRecipient(): boolean {
    if (this.RecipientMemberControl && this.RecipientMemberControl.touched && (this.RecipientMemberControl.hasError('memberNumberLengthValidator') || this.RecipientMemberControl.hasError('pattern'))
    && this.InsuredNoteControl && this.InsuredNoteControl.touched && (this.InsuredNoteControl.hasError('required') || this.InsuredNoteControl.hasError('pattern'))) {
      return true;
    }
    return false;
  }

  checkInsured(): boolean {
    if (this.InsuredNoteControl && this.InsuredNoteControl.touched && (this.InsuredNoteControl.hasError('required') || this.InsuredNoteControl.hasError('pattern'))) {
      return true;
    }
    return false;
  }

  onTransfer(): void {
    this.claimsMaterialApi.getMemberMaintenanceAvail(this.membershipNumber, 'account_transfer', uuid())
      .subscribe(res => {
        this.memberInformationService.hasTransferMemberMaintAvailable = true;
        this.transferAccountMember();
      }, err => {
        this.memberInformationService.disableMaintenanceButton('account_transfer');
        if (err.status === 412) {
          const headersRes = err.headers.get('reasoncode');
          this.memberInformationService.displayErrorMessage(headersRes);
        }
        this.resetForm();
      });
  }

  transferAccountMember(): void {
    const transferAccountR: TransferAccountRequestVO = {
      newMemberNumber: (this.RecipientMemberControl) ? this.RecipientMemberControl.value.replace(/ /g, '') : '',
      insuredNote: (this.InsuredNoteControl) ? this.InsuredNoteControl.value : ''
    };

    this.claimsMaterialApi.transferAccount(this.membershipNumber, transferAccountR, uuid())
      .subscribe(
        (data) => {
          this.messageBoxService.addMessageBox('Success', MessageBoxType.SUCCESS, 'Member transferred.');
          this.onCancel();
        },
        (error) => {
          if (error.status === 403) {
            this.messageBoxService.addMessageBox('Request Submitted', MessageBoxType.ERROR, 'Authorization is required to transfer member. Your request has been submitted.');
          } else {
            this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'An error has occurred with Transfer Member. No changes have been made.');
          }
          this.onCancel();
        }
      );
  }

  onCancel(): void {
    this.claimsMaterialApi.unlockAccount(this.membershipNumber, uuid())
      .subscribe(
        (data) => {
          this.messageBoxService.addMessageBox('Success', MessageBoxType.SUCCESS, 'Member was unlocked.', 3000);
          this.resetForm();
        },
        (error) => {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Member could not be unlocked.');
          this.resetForm();
        }
      );
  }

  get RecipientMemberControl(): AbstractControl | null {
    return this.accountTransferForm.controls['recipientMemberControl'];
  }

  get InsuredNoteControl(): AbstractControl | null {
    return this.accountTransferForm.controls['insuredNoteControl'];
  }

  private resetForm(): void {
    this.accountTransferForm.markAsPristine();
    this.accountTransferForm.markAsUntouched();
    this.accountTransferForm.patchValue({
      recipientMemberControl: '',
      insuredNoteControl: ''
    });
    this.onClose.emit();
  }
}
