import {AfterViewInit, Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatMenuTrigger} from '@angular/material';
import {Router} from '@angular/router';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {
  AccountMembershipResponseVO,
  MemberApi,
  ReferencesApi, ReferenceValueVO,
  ResourceOfAccountMembershipResponseVO,
  ResourceOfMemberLookupProcessInfo,
  ResourceOfMemberLookupTaskVO
} from '@fox/rest-clients';
import {Observable, of as observableOf, Subscription} from 'rxjs/index';
import {dashboardUrlDefault, HotkeyDirective} from '@fox/shared';
import * as uuid from 'uuid';
import {MemberLookupDropdownModel} from '../member-lookup-queue/member-lookup-dropdown.model';
import {ClaimData} from '../potential-matches/claim-data.model';
import {PotentialMatchesService} from '../potential-matches/potential-matches.service';
import {ManualMemberMatchModel} from './potential-matches-actions.model';

@Component({
  selector: 'fox-potential-matches-actions',
  templateUrl: './potential-matches-actions.component.html',
  styleUrls: ['./potential-matches-actions.component.css']
})
export class PotentialMatchesActionsComponent implements AfterViewInit, OnDestroy {

  @Input() queueType: string;
  @Input() trackingId: string;
  @Input() event: Event;
  @Input() showButtons: boolean = true;
  @ViewChild(MatMenuTrigger) lookupOptions: MatMenuTrigger;
  showDialog: boolean = false;
  showBypassModal: boolean = false;
  showBypassReasonRequiredAlert: boolean = false;
  bypassReasonText: string = '';
  bypassReasonDropdown: string = 'none';
  cancelCmdHotkey: Hotkey | undefined;
  bypassCmdHotkey: Hotkey | undefined;
  previousCompletedCmdHotkey: Hotkey | undefined;
  manualMatchCmdHotkey: Hotkey | undefined;
  modalView: boolean = false;
  isSelectedMember: boolean = false;
  isDesc?: boolean;
  column?: string;
  direction?: number;
  manualMemberSearchForm: FormGroup;
  memberNumber = new FormControl('');
  medicareNumber = new FormControl('');
  firstName = new FormControl('');
  lastName = new FormControl('');
  state = new FormControl('');
  dateOfBirth = new FormControl('');
  statesList = new Array();
  searchResultsFound: boolean = false;
  baseState: boolean = true;
  memberListResultSet: ManualMemberMatchModel[] | undefined;
  selectedMember: string;
  private userVal = '';

  @Input()
  get user(): string {
    return this.userVal;
  }

  set user(u: string) {
    this.userVal = u;
    this.fetchNextClaim(false);
  }

  get claim(): ClaimData {
    return this.potentialMatchSvc.claim;
  }

  get previousClaimNumber(): string | undefined {
    return this.potentialMatchSvc.previousClaimNumber;
  }

  constructor(private potentialMatchSvc: PotentialMatchesService,
              private router: Router,
              private hotkeySvc: HotkeysService,
              private fb: FormBuilder,
              private referenceApi: ReferencesApi,
              private memberApi: MemberApi) {
    this.initializeManualMemberSearchForm();
    this.getStateDropdownValues();
  }

  ngAfterViewInit(): void {
    if (this.showButtons) {
      this.cancelCmdHotkey = HotkeyDirective.registerHotkey(this.hotkeySvc, 'alt+l', (): boolean => {
        if (this.claim.claimTrackingId) {
          if (this.lookupOptions) {
            this.lookupOptions.closeMenu();
          }
          this.onClickCancel();
        }
        // return false to prevent event bubbling
        return false;
      }, 'Cancel Lookup');

      this.manualMatchCmdHotkey = HotkeyDirective.registerHotkey(this.hotkeySvc, 'alt+m', (): boolean => {
        if (this.claim.claimTrackingId) {
          if (this.lookupOptions) {
            this.lookupOptions.closeMenu();
          }
          this.modalView = true;
        }
        // return false to prevent event bubbling
        return false;
      }, 'Manual Match');

      this.bypassCmdHotkey = HotkeyDirective.registerHotkey(this.hotkeySvc, 'alt+y', (): boolean => {
        if (this.claim.claimTrackingId) {
          if (this.lookupOptions) {
            this.lookupOptions.closeMenu();
          }
          this.bypassModal();
        }
        // return false to prevent event bubbling
        return false;
      }, 'Bypass Lookup');

      this.previousCompletedCmdHotkey = HotkeyDirective.registerHotkey(this.hotkeySvc, 'alt+p', (): boolean => {
        if (this.previousClaimNumber) {
          if (this.lookupOptions) {
            this.lookupOptions.closeMenu();
          }
          this.showDialog = !this.showDialog;
        }
        // return false to prevent event bubbling
        return false;
      }, 'View Previous Completed Claim');
    }

  }

  ngOnDestroy(): void {
    if (this.cancelCmdHotkey) {
      this.hotkeySvc.remove(this.cancelCmdHotkey);
    }
    if (this.manualMatchCmdHotkey) {
      this.hotkeySvc.remove(this.manualMatchCmdHotkey);
    }
    if (this.bypassCmdHotkey) {
      this.hotkeySvc.remove(this.bypassCmdHotkey);
    }
    if (this.previousCompletedCmdHotkey) {
      this.hotkeySvc.remove(this.previousCompletedCmdHotkey);
    }
  }

  onClickCancel(): void {
    let obs: Observable<ResourceOfMemberLookupProcessInfo> = observableOf({});

    if ('MAIN' === this.queueType) {
      obs = this.potentialMatchSvc.cancelClaim();
    }

    obs.subscribe(() => {
      this.router.navigateByUrl(dashboardUrlDefault).then();
    });
    this.trackingId = '';
  }

  bypassModal(): void {
    this.showBypassModal = true;
    this.showBypassReasonRequiredAlert = false;
    this.bypassReasonText = '';
    this.bypassReasonDropdown = 'none';
  }

  processSaveBypass(): void {
    if (this.bypassReasonDropdown === 'none') {
      this.showBypassReasonRequiredAlert = true;
    } else if (this.bypassReasonDropdown === 'Other' && this.bypassReasonText.length === 0) {
      this.showBypassReasonRequiredAlert = true;
    } else {
      this.bypassClaim();
      this.showBypassModal = !this.showBypassModal;
    }
  }

  bypassClaim(): void {
    let reason: string = '';
    if (this.bypassReasonDropdown === 'Other') {
      reason = this.bypassReasonText;
    } else {
      reason = this.bypassReasonDropdown;
    }

    if ('BYPASS' === this.queueType) {
      this.potentialMatchSvc.doLocalBypass(reason);
    }

    const obs: Observable<ResourceOfMemberLookupTaskVO> = this.potentialMatchSvc.bypassClaim(reason);
    if (obs) {
      obs.subscribe(() => {
        this.fetchNextClaim(true);
      });
    }
  }

  trackByIndex(index: number, item: ManualMemberMatchModel): string {
    return item.memberNumber.toString();
  }

  manualMemberModalVisible(): void {
    this.initializeManualMemberSearchForm();
    this.modalView = true;
  }

  resetManualModal(): void {
    this.modalView = false;
    this.baseState = true;
    this.manualMemberSearchForm.reset();
    this.memberListResultSet = [];
    this.searchResultsFound = false;
    this.isSelectedMember = false;
    this.selectedMember = '';
    this.isDesc = undefined;
    this.column = undefined;
    this.direction = undefined;
  }

  memProfile(memNum: string): void {
    memNum = memNum.replace(/ /g, '');
    const url = '/#/member-information/member-profile/' + memNum;
    const win = window.open('_blank');
    if (win) {
      win.location.assign(url);
    }
  }

  searchMember(): void {
    this.baseState = false;
    this.memberListResultSet = [];
    this.isSelectedMember = false;
    this.selectedMember = '';
    this.searchResultsFound = false;

    if (this.memberNumber.value.length === 9) {
      this.memberApi.getMemberByNineDigitAccountNumber(this.memberNumber.value, uuid()).subscribe(response => {
        if (response._embedded && response._embedded.items) {
          this.processSearchResults(response._embedded.items);
        }
      }, e => {
        if (e.status === 404) {
          this.searchResultsFound = false;
        }
      });
    }

    if (this.memberNumber.value.length === 11) {
      this.memberApi.getMemberByMemberNumber(this.memberNumber.value, uuid()).subscribe(response => {
        this.searchResultsFound = true;
        this.memberListResultSet = [];
        const mappedItem: ManualMemberMatchModel = new ManualMemberMatchModel();
        const manualMemberData: AccountMembershipResponseVO = response;
        if (manualMemberData && manualMemberData.memberDetails && manualMemberData.mailToAddress && manualMemberData.memberDetails.aarpMembershipNumber
          && manualMemberData.memberDetails.memberName && manualMemberData.memberDetails.householdId && manualMemberData.mailToAddress.address && manualMemberData.mdmMemHeaderDetails) {
          mappedItem.memberNumber = manualMemberData.memberDetails.aarpMembershipNumber.membershipNumber + ' ' + manualMemberData.memberDetails.aarpMembershipNumber.associationId + ' ' + manualMemberData.memberDetails.householdId[0].insuredCode;
          mappedItem.medicareNumber = manualMemberData.memberDetails.medicareId ? manualMemberData.memberDetails.medicareId : '';
          mappedItem.lastName = manualMemberData.memberDetails.memberName.lastName ? manualMemberData.memberDetails.memberName.lastName : '';
          mappedItem.firstName = manualMemberData.memberDetails.memberName.firstName ? manualMemberData.memberDetails.memberName.firstName : '';
          mappedItem.dateOfBirth = manualMemberData.memberDetails.dateOfBirth ? manualMemberData.memberDetails.dateOfBirth : '';
          mappedItem.state = manualMemberData.mailToAddress.address.stateProvinceCode ? manualMemberData.mailToAddress.address.stateProvinceCode : '';
          mappedItem.memRecNo = manualMemberData.mdmMemHeaderDetails.memRecNo ? manualMemberData.mdmMemHeaderDetails.memRecNo : 0;
        }
        this.memberListResultSet.push(mappedItem);
      }, e => {
        if (e.status === 404) {
          this.searchResultsFound = false;
        }
      });
    }
  }

  processSearchResults(input: ResourceOfAccountMembershipResponseVO[]): void {
    this.searchResultsFound = true;
    this.memberListResultSet = [];
    this.memberListResultSet = input.map(item => {
      const mappedItem: ManualMemberMatchModel = new ManualMemberMatchModel();
      if (item.memberDetails && item.memberDetails.aarpMembershipNumber && item.memberDetails.householdId && item.memberDetails.memberName
        && item.memberDetails.address && item.mdmMemHeaderDetails) {
        mappedItem.memberNumber = item.memberDetails.aarpMembershipNumber.membershipNumber + ' ' + item.memberDetails.aarpMembershipNumber.associationId + ' ' + item.memberDetails.householdId[0].insuredCode;
        mappedItem.medicareNumber = item.memberDetails.medicareId ? item.memberDetails.medicareId : '';
        mappedItem.lastName = item.memberDetails.memberName.lastName ? item.memberDetails.memberName.lastName : '';
        mappedItem.firstName = item.memberDetails.memberName.firstName ? item.memberDetails.memberName.firstName : '';
        mappedItem.dateOfBirth = item.memberDetails.dateOfBirth ? item.memberDetails.dateOfBirth : '';
        mappedItem.memRecNo = item.mdmMemHeaderDetails.memRecNo ? item.mdmMemHeaderDetails.memRecNo : 0;
        const address = item.memberDetails.address[0];
        if (address.address && address.address.stateProvinceCode) {
          mappedItem.state = address.address.stateProvinceCode;
        } else {
          mappedItem.state = '';
        }
      }
      return mappedItem;
    });
  }

  onSelectMember(mdmRecNo: string): void {
    this.isSelectedMember = true;
    this.selectedMember = mdmRecNo;
  }

  manualMemberMatch(): void {
    const obs: Observable<ResourceOfMemberLookupTaskVO> = this.potentialMatchSvc.manualMatch(this.selectedMember);
    if (obs) {
      obs.subscribe(() => {
        this.fetchNextClaim(true);
      });
      this.resetManualModal();
    }
  }

  sort(property: string): void {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  private fetchNextClaim(bypass: boolean): Subscription {
    this.potentialMatchSvc.clearTable();
    if (this.queueType && (!this.showButtons || bypass)) {
      switch (this.queueType) {
        case ('BYPASS'):
          return this.potentialMatchSvc.fetchNextBypassClaimForUser(this.user);
        case ('MAIN'):
          return this.potentialMatchSvc.fetchNextClaim();
        default:
          break;
      }
    }
    return observableOf({}).subscribe();
  }

  private initializeManualMemberSearchForm(): void {
    this.manualMemberSearchForm = this.fb.group({
      memberNumber: this.memberNumber,
      medicareNumber: this.medicareNumber,
      firstName: this.firstName,
      lastName: this.lastName,
      state: this.state,
      dateOfBirth: this.dateOfBirth
    });
  }

  private getStateDropdownValues(): void {
    this.referenceApi.listCategoryCodes('DOCUMENT_PAGE_REFERENCES', uuid()).subscribe(resp => {
      let groupName: string;
      let dropdownItem: MemberLookupDropdownModel;
      resp.forEach((record: ReferenceValueVO) => {
        if (record.id === 0) {
          groupName = record.description || '';
        } else {
          dropdownItem = {
            dropdownItemValue: record.code || '',
            dropdownItemDesc: record.description || '',
            dropdownItemGroup: groupName || ''
          };

          if (groupName === 'MEMBER_STATE') {
            this.statesList.push(dropdownItem);
          }
        }
      });
    });
  }
}
