import {Injectable} from '@angular/core';
import {AccountMembershipResponseVO, MemberApi, PagedResourcesOfResourceOfSearchMemberVO} from '@fox/rest-clients';
import {MessageBoxService, MessageBoxType} from '@fox/shared';
import {Observable, Subject} from 'rxjs';
import * as uuidConst from 'uuid';
import {SearchClaimSummaryFormModel} from '../eob-information/claims-summary-form/search-claim-summary-form.model';
import {SearchEobStatementFormModel} from '../eob-information/eob-statements-form/search-eob-statements-form.model';
import {MemberDataItem} from '../search/member-search-new-version/member-search.component';

const uuid = uuidConst;

@Injectable({
  providedIn: 'root'
})
export class MemberInformationService {

  savedMemberSearchResult: MemberDataItem[] = [];
  memberSearchPageSize: number = 0;
  memberSearchDataLengthInput: number = 0;
  memberSearchPageTotal: number = 0;
  currentMemberSearchPage: number = 0;
  eobStatementData: SearchEobStatementFormModel = new SearchEobStatementFormModel();
  drugSummaryData: SearchClaimSummaryFormModel = new SearchClaimSummaryFormModel();
  tabIndex: number = 0;
  claimsService = false;
  drugs = false;
  preserveData = false;
  memberProfile = new Subject<AccountMembershipResponseVO>();
  memberProfileChanges$ = this.memberProfile.asObservable();
  showMemberSearchBoolean = false;
  hasAggregateMaintAvailable: boolean = true;
  hasTransferMemberMaintAvailable: boolean = true;
  hasSHCodeMaintAvailable: boolean = true;

  constructor(private searchMemberApi: MemberApi,
              private messageBoxService: MessageBoxService) {}

  changeMemberProfile(memberPro: AccountMembershipResponseVO): void {
    this.memberProfile.next(memberPro);
  }

  getSearchMember(membershipNumber: string, minScore: string, firstName: string, lastName: string): Observable<PagedResourcesOfResourceOfSearchMemberVO> {
    return this.searchMemberApi.searchMember(minScore, membershipNumber, firstName, lastName, undefined, undefined, undefined, undefined, uuid());
  }

  getMemberByMemberNumber(membershipNumber: string): Observable<AccountMembershipResponseVO> {
    return this.searchMemberApi.getMemberByMemberNumber(membershipNumber, uuid());
  }

  displayErrorMessage(headersRes: string): void {
    if (headersRes === '100') {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Maintenance could not be performed. Member is not migrated.');
    } else if (headersRes === '200') {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Maintenance could not be performed. Member has a quality code.');
    } else if (headersRes === '300') {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Maintenance could not be performed. Member has a special handling code.');
    } else if (headersRes === '400') {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Maintenance could not be performed. Member is currently locked.');
    } else if (headersRes === '500') {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Maintenance could not be performed. Member does not have claim history.');
    } else if (headersRes === '600') {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'There was an error submitting the aggregate maintenance request. Please try again.');
    }
  }

  disableMaintenanceButton(maintenanceType: string): void {
    if (maintenanceType === 'account_transfer') {
      this.hasTransferMemberMaintAvailable = false;
    } else if (maintenanceType === 'special_handling_codes') {
      this.hasSHCodeMaintAvailable = false;
    } else if (maintenanceType === 'aggregate') {
      this.hasAggregateMaintAvailable = false;
    }
  }
}
