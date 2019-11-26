import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {
  AccountMembershipResponseVO,
  ClaimsMaterialApi
} from '@fox/rest-clients';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {
  CancelConfirmModal,
  MessageBoxService,
  MessageBoxType,
  ModalComponent
} from '@fox/shared';
import {EditAggregateService} from '../edit-aggregate.service';

export interface AggregateYear {
  openEditAggregateModal: boolean;
  year: string;
}

@Component({
  selector: 'fox-aggregate-year-selection-modal',
  templateUrl: './aggregate-year-selection-modal.component.html',
  styleUrls: ['./aggregate-year-selection-modal.component.css']
})
export class AggregateYearSelectionModalComponent extends CancelConfirmModal<void> {
  selectedYear: string = 'Lifetime';
  selectedYearControl = new FormControl(this.selectedYear);
  nextClicked: boolean = false;

  @ViewChild('modal') modal?: ModalComponent<void>;
  @Input() memberProfile: AccountMembershipResponseVO = new AccountMembershipResponseVO();
  @Output() aggregateYear: EventEmitter<AggregateYear> = new EventEmitter();

  aggregateYears: string[] = [];
  @Input()
  set aggregateYearArr(value: string[]) {
    this.aggregateYears = value;
  }

  constructor(private accountLock: ClaimsMaterialApi,
              private messageBoxService: MessageBoxService,
              private editAggregateService: EditAggregateService) {
    super();
  }

  selectedAggregateYear(): void {
    this.aggregateYear.emit({
      openEditAggregateModal: true,
      year: this.selectedYearControl.value
    });
    this.nextClicked = true;
    if (this.modal) {
      this.modal.closeModal('cancel');
    }
  }

  modalVisibleChange(e: any): void {
    if (this.nextClicked && !e) {
      this.selectedYearControl.setValue('Lifetime');
      this.nextClicked = false;
    } else if (!e) {
      this.unlockAccount();
      this.selectedYearControl.setValue('Lifetime');
    }
  }

  closeAggregateModal(): void {
    if (this.modal) {
      this.modal.closeModal('cancel');
    }
  }

  unlockAccount(): void {
    if (this.memberProfile && this.memberProfile.memberDetails && this.memberProfile.memberDetails.aarpMembershipNumber && this.memberProfile.memberDetails.householdId && this.memberProfile.memberDetails.householdId.length > 0) {
      const membershipNumber = (this.memberProfile.memberDetails.aarpMembershipNumber.membershipNumber + '' + this.memberProfile.memberDetails.aarpMembershipNumber.associationId + '' + this.memberProfile.memberDetails.householdId[0].insuredCode);
      this.accountLock.unlockAccount(membershipNumber, uuid()).subscribe(res => {
        this.editAggregateService.removeMemberOnSessionStorage();
        this.messageBoxService.addMessageBox('Success', MessageBoxType.SUCCESS, 'Member was unlocked.', 3000);
      }, err => {
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'The account has not been unlocked.');
      });
    }
  }
}
