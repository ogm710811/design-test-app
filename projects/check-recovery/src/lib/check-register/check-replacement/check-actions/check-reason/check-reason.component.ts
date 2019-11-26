import {
  Component, Input, OnInit, OnDestroy
} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CheckRecoveryService} from '../../../../shared/check-recovery.service';
import {Subscription} from 'rxjs';
import { CheckDetailState } from '../../check-detail.state';

@Component({
  selector: 'fox-check-reason',
  templateUrl: './check-reason.component.html',
  styleUrls: ['./check-reason.component.css']
})
export class CheckReasonComponent implements OnInit, OnDestroy {
  dropdownOptionsForReplaceReason = [
    {value: 1, label: '1. Lost Check'},
    {value: 2, label: '2. Deceased insured'},
    {value: 3, label: '3. Account Paid in Full'},
    {value: 4, label: '4. Stale-dated'},
    {value: 5, label: '5. Incorrect payee'},
    {value: 6, label: '6. Overpayment'},
    {value: 7, label: '7. Incorrect Address'},
    {value: 8, label: '8. Wrong provider'},
    {value: 9, label: '9. Damaged check'},
    {value: 10, label: '10. Assignment of Benefits Received'},
    {value: 11, label: '11. Survey Letter'},
    {value: 12, label: '12. Other'}
  ];
  dropdownOptionsForCheck = [
    {value: 1, label: 'No'},
    {value: 2, label: 'Yes'},
  ];
  isOtherReasonSelected: boolean = false;
  checkActionFormSubscription?: Subscription;
  modalSubmissionSubscription?: Subscription;

  @Input() parent: FormGroup = this.fb.group({});
  @Input()
  set isProvider(e) {
    this._isProvider = e;
  }
  get isProvider(): boolean {
    return this._isProvider;
  }
  get checkboxClass(): string {
    if (!this.isProvider && this.isOtherReasonSelected) {
      return 'text-area-other-reason-no-provider';
    } else if (!this.isProvider && !this.isOtherReasonSelected) {
      return 'container-checkbox-no-provider';
    } else if (this.isProvider && this.isOtherReasonSelected) {
      return 'text-area-other-reason-is-provider';
    } else if (this.isProvider && !this.isOtherReasonSelected) {
      return 'container-checkbox-is-provider';
    } else {
      return '';
    }
  }
  private _isProvider = false;

  constructor(
    public state: CheckDetailState,
    private fb: FormBuilder,
    private checkRecoveryService: CheckRecoveryService
  ) { }

  ngOnInit(): void {
    this.checkActionFormSubscription = this.checkRecoveryService.checkActionFormGroupBehaviorSubject.subscribe(isFormReset => {
      if (isFormReset) {
        this.isOtherReasonSelected = false;
        (this.parent.controls.checkReplaceReason as FormGroup).controls.checkReasonOtherDesc.clearValidators();
      }
    });
    this.modalSubmissionSubscription = this.state.memberSelectedBehaviorSubject.subscribe(isSubmitted => {
      if (isSubmitted) {
        this.isOtherReasonSelected = false;
        (this.parent.controls.checkReplaceReason as FormGroup).controls.checkReasonOtherDesc.clearValidators();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.checkActionFormSubscription) {
      this.checkActionFormSubscription.unsubscribe();
    }
    if (this.modalSubmissionSubscription) {
      this.modalSubmissionSubscription.unsubscribe();
    }
  }

  onOptionsForReplaceReasonChange(e: any): void {
    if (e) {
      this.checkRecoveryService.checkActionFormGroupBehaviorSubject.next(false);
    }
    if (e === 12) {
      this.isOtherReasonSelected = true;
      // This Form Group was set up incorrectly, which causes the inner FormGroup to be cast as an Abstract Control instead of just FormGroup
      (this.parent.controls.checkReplaceReason as FormGroup).controls.checkReasonOtherDesc.setValidators(Validators.required);
    } else {
      this.isOtherReasonSelected = false;
      (this.parent.controls.checkReplaceReason as FormGroup).controls.checkReasonOtherDesc.clearValidators();
      (this.parent.controls.checkReplaceReason as FormGroup).controls.checkReasonOtherDesc.reset();
    }
  }

  checkReplaceNotation(e: any): void {
    if (e) {
      this.parent.patchValue({
        checkReplaceReason: {
          checkReplaceNotation: 'For patient details on RA visit our website at aarpprovideronlinetool.uhc.com'
        }
      });
    } else {
      this.parent.patchValue({
        checkReplaceReason: {
          checkReplaceNotation: ''
        }
      });
    }
  }
}
