import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClaimHistoryApi, ResourceOfClaimHistoryDetailVO} from '@fox/rest-clients';
import * as uuid from 'uuid';
import {MemberInformationService} from '@fox/member-info';
import {MemberCardSet} from '../../../../claim-history-models/member-card.model';
import {TransferClaimResultModel} from '../../../../claim-history-models/transfer-claim-result.model';
import {ClaimHistoryComponent} from '../../../../claim-history.component';

@Component({
  selector: 'fox-transfer-claim-search-modal',
  templateUrl: './transfer-claim-search-modal.component.html',
  styleUrls: ['./transfer-claim-search-modal.component.css']
})

export class TransferClaimSearchModalComponent {

  @Input() transferClaimSearchModalVisible: boolean;
  @Input() claimDetails: ResourceOfClaimHistoryDetailVO;
  @Input() memberDetails: MemberCardSet;
  @Input() claimNumber: string;
  @Input() dos: string;

  @Output() transferClaimModalVisibleChange = new EventEmitter<boolean>();
  @Output() cancelTransferClaim: EventEmitter<'cancel'> = new EventEmitter<'cancel'>();
  @Output() confirmTransferClaim: EventEmitter<'confirm'> = new EventEmitter<'confirm'>();
  @Output() transferClaimSuccessMsg = new EventEmitter<boolean>();
  @Output() transferClaimFailMsg = new EventEmitter<boolean>();
  @Output() responseMsg = new EventEmitter<string>();

  transferClaimResult: TransferClaimResultModel[] = [];
  memberSearchFormGroup: FormGroup;
  nameRegex = /^[A-Za-z'-]+$/;
  memberNumberRegex = /^[0-9]*$/;
  selectedMemberDetails: TransferClaimResultModel;
  hideSearchSection: boolean = false;
  isDataDisplay: boolean = false;
  isSelectEnable: boolean = false;
  isConfirmTransfer: boolean = false;

  memberNumInput: string = '';
  firstNameInput: string = '';
  lastNameInput: string = '';

  constructor(private fb: FormBuilder, private memberSvc: MemberInformationService,
              private claimHistorySearchApi: ClaimHistoryApi) {
    this.memberSearchForm();
  }

  memberSearchForm(): void {
    this.memberSearchFormGroup = this.fb.group({
      memberFormControl: ['', [Validators.minLength(9), Validators.maxLength(11), Validators.pattern(this.memberNumberRegex)]],
      memberFirstNameFormControl: ['', [Validators.minLength(1), Validators.maxLength(25), Validators.pattern(this.nameRegex)]],
      memberLastNameFormControl: ['', [Validators.minLength(1), Validators.maxLength(35), Validators.pattern(this.nameRegex)]]
    });
  }

  checkIfFormFilled(): boolean {
    const values = this.memberSearchFormGroup.value;
    return !!(ClaimHistoryComponent.removeWhitespace(values.memberFormControl) ||
      (ClaimHistoryComponent.removeWhitespace(values.memberFirstNameFormControl) && ClaimHistoryComponent.removeWhitespace(values.memberLastNameFormControl)));
  }

  memberResultTable(): void {

    this.hideSearchSection = false;
    this.isDataDisplay = false;
    this.isConfirmTransfer = false;
    this.isSelectEnable = false;

    const values = this.memberSearchFormGroup.value;
    const membershipNumber = values.memberFormControl;
    const firstName = values.memberFirstNameFormControl;
    const lastName = values.memberLastNameFormControl;

    if (values.memberFormControl || (values.memberFormControl && values.memberFirstNameFormControl) || (values.memberFormControl && values.memberLastNameFormControl) ||
      (values.memberFormControl && values.memberFirstNameFormControl && values.memberLastNameFormControl) ||
      (values.memberFirstNameFormControl && values.memberLastNameFormControl)) {

      this.memberSvc.getSearchMember(membershipNumber, '1', firstName, lastName).subscribe(searchResult => {

        if (searchResult && searchResult._embedded && searchResult._embedded.items) {
          const mappedItem: TransferClaimResultModel[] = [];
          const memberData = searchResult._embedded.items;

          if (memberData.length > 0) {
            for (let i = 0; i < memberData.length; i++) {
              const memberItem = this.getMemberItem(memberData, i);
              mappedItem.push(memberItem);
            }
          }
          this.transferClaimResult = mappedItem;
          this.isDataDisplay = true;
        } else if (searchResult === 404) {
          this.hideSearchSection = true;
        } else {

        }

      }, (e) => {
        if (e.status === 404) {
          this.hideSearchSection = true;
        }
      });
    }
  }

  getMemberItem(memberData, i): any {
    return {
      'memberNum': memberData[i].identifiers!.aarpMembershipNumber + ` ` + memberData[i].identifiers!.aarpAssociationId + ` ` + memberData[i].identifiers!.aarpInsuredCd,
      'memberAccountNo': memberData[i].identifiers!.aarpMembershipNumber + memberData[i].identifiers!.aarpAssociationId + memberData[i].identifiers!.aarpInsuredCd,
      'medicareId': memberData[i].identifiers!.medicareId,
      'lastName': memberData[i].name!.lastName,
      'firstName': memberData[i].name!.firstName,
      'middleName': memberData[i].name!.middleName!
    };
  }

  cancelTransferClaimModal(): void {
    this.cancelTransferClaim.emit('cancel');
    this.newMemberSearch();
  }

  newMemberSearch(): void {
    this.hideSearchSection = false;
    this.isDataDisplay = false;
    this.isConfirmTransfer = false;
    this.isSelectEnable = false;
    this.memberNumInput = '';
    this.firstNameInput = '';
    this.lastNameInput = '';
  }

  transferClaim(): void {
    this.isConfirmTransfer = true;
    this.isDataDisplay = false;
    this.hideSearchSection = true;
  }

  postTransferClaim(): void {

    const memberNum = this.selectedMemberDetails.memberAccountNo;
    const res = this.claimHistorySearchApi.transferClaim(+this.claimNumber, memberNum, uuid(), 'response');
    res.subscribe(response => {
      if (response) {
        const msg = response.headers.get('message');
        if (msg !== null) {
          this.responseMsg.emit(msg);
        }
        this.transferClaimSuccessMsg.emit(true);
        this.confirmTransferClaim.emit('confirm');
        this.newMemberSearch();
      }
    }, (e) => {
      const msg = e.headers.get('message');
      if (msg !== null) {
        this.responseMsg.emit(msg);
      }
      this.transferClaimFailMsg.emit(true);
      this.confirmTransferClaim.emit('confirm');
      this.newMemberSearch();
    });
  }

}
