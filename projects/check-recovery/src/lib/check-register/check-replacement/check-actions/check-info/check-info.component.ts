import {
  Component, Input, OnInit
} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {CheckRegisterInfo} from '../check-actions.component';
import {delay, takeUntil} from 'rxjs/operators';
import {CheckDetailState} from '../../check-detail.state';
import {Subject} from 'rxjs';
import {CheckRecoveryService} from '../../../../shared/check-recovery.service';
import {CheckIdsVO} from '@fox/rest-clients';

@Component({
  selector: 'fox-check-info',
  templateUrl: './check-info.component.html',
  styleUrls: ['./check-info.component.css']
})
export class CheckInfoComponent implements OnInit {
  readOnlyFields = {
    providerTIN: {
      label: 'TIN'
    },
    providerNPI: {
      label: 'NPI'
    },
    memberNumber: {
      label: 'Member #'
    },
    addressOne: {
      label: 'Address Line 1'
    },
    addressTwo: {
      label: 'Address Line 2'
    },
    addressThree: {
      label: 'Address Line 3'
    },
    addressCity: {
      label: 'City'
    },
    addressState: {
      label: 'State'
    },
    addressZip: {
      label: 'Zip'
    },
  };
  copyCheckRegisterInfo: CheckRegisterInfo = new CheckRegisterInfo();
  checkIds: CheckIdsVO = new CheckIdsVO();

  @Input() parent: FormGroup = this.fb.group({});
  @Input() checkRegisterInfo: CheckRegisterInfo = new CheckRegisterInfo();
  @Input()
  set isProvider(e) {
    this._isProvider = e;
  }
  get isProvider(): boolean {
    return this._isProvider;
  }

  get tinValue(): number {
    return this.checkRegisterInfo && this.checkRegisterInfo.tin
        ? this.checkRegisterInfo.tin : -1;
  }

  get npiValue(): number {
    return this.checkRegisterInfo && this.checkRegisterInfo.npi
        ? this.checkRegisterInfo.npi : -1;
  }

  get accountNumberValue(): string {
    return this.checkRegisterInfo && this.checkRegisterInfo.accountNumber
        ? this.checkRegisterInfo.accountNumber : '';
  }

  get addressLineOneValue(): string {
    return this.checkRegisterInfo && this.checkRegisterInfo.addressLine1
        ? this.checkRegisterInfo.addressLine1 : '';
  }

  get addressLineTwoValue(): string {
    return  this.checkRegisterInfo && this.checkRegisterInfo.addressLine2
        ? this.checkRegisterInfo.addressLine2 : '';
  }

  get addressLineThreeValue(): string {
    return this.checkRegisterInfo && this.checkRegisterInfo.addressLine3
        ? this.checkRegisterInfo.addressLine3 : '';
  }

  get cityValue(): string {
    return this.checkRegisterInfo && this.checkRegisterInfo.city
        ? this.checkRegisterInfo.city : '';
  }

  get stateValue(): string {
    return this.checkRegisterInfo && this.checkRegisterInfo.state
        ? this.checkRegisterInfo.state : '';
  }

  get zipValue(): string {
    return this.checkRegisterInfo && this.checkRegisterInfo.zip
        ? this.checkRegisterInfo.zip : '';
  }

  private _isProvider = false;
  private _unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    public state: CheckDetailState,
    private checkRecoveryService: CheckRecoveryService
  ) { }

  ngOnInit(): void {
    this.checkIds = this.checkRecoveryService.checkIds;

    // multiple replacement
    if (this.checkIds && this.checkIds.checkid) {
      if (this.checkIds.checkid.length) {
        this.checkRegisterInfo.addressLine1 = '';
        this.checkRegisterInfo.addressLine2 = '';
        this.checkRegisterInfo.addressLine3 = '';
        this.checkRegisterInfo.city = '';
        this.checkRegisterInfo.state = '';
        this.checkRegisterInfo.zip = '';
      }
      this.checkRecoveryService.checkIds.checkid = [];
    }

    this.copyCheckRegisterInfo = Object.assign({}, this.checkRegisterInfo);
    this.state.memberSelectedBehaviorSubject
      .pipe(
        delay(300),
        takeUntil(this._unsubscribe$)
      )
      .subscribe(res => {
        if (res && this.state.selectedMember) {
          const selectedMember = this.state.selectedMember;
          if (selectedMember) {
            this.checkRegisterInfo.addressLine1 = selectedMember.addressLine1 ? selectedMember.addressLine1 : '';
            this.checkRegisterInfo.addressLine2 = selectedMember.addressLine2 ? selectedMember.addressLine2 : '';
            this.checkRegisterInfo.addressLine3 = '';
            this.checkRegisterInfo.city = selectedMember.city ? selectedMember.city : '';
            this.checkRegisterInfo.state = selectedMember.state ? selectedMember.state : '';
            this.checkRegisterInfo.zip = selectedMember.zip ? selectedMember.zip : '';
          }
        }
      });

    this.checkRecoveryService.checkActionFormGroupBehaviorSubject
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe(isFormReset => {
      if (isFormReset) {
        this.checkRegisterInfo.addressLine1 = this.copyCheckRegisterInfo.addressLine1 ? this.copyCheckRegisterInfo.addressLine1 : '';
        this.checkRegisterInfo.addressLine2 = this.copyCheckRegisterInfo.addressLine2 ? this.copyCheckRegisterInfo.addressLine2 : '';
        this.checkRegisterInfo.addressLine3 = this.copyCheckRegisterInfo.addressLine3 ? this.copyCheckRegisterInfo.addressLine3 : '';
        this.checkRegisterInfo.city = this.copyCheckRegisterInfo.city ? this.copyCheckRegisterInfo.city : '';
        this.checkRegisterInfo.state = this.copyCheckRegisterInfo.state ? this.copyCheckRegisterInfo.state : '';
        this.checkRegisterInfo.zip = this.copyCheckRegisterInfo.zip ? this.copyCheckRegisterInfo.zip : '';
      }
    });
  }
}
