import {
  BadgeColors,
  BadgeIconPositions,
  BadgeIcons,
  BadgeSettings,
  BadgeTemplates,
  BadgeTextDescriptions,
  CommonService,
  FeatureFlagService,
  memberInformationRoutePathEobInfo,
  memberInformationRoutePathMemberSearch,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  workQueueRoutePathRoot,
  workQueueRoutePathWorkbench
} from '@fox/shared';
import {
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  AccountMembershipResponseVO,
  ClaimsMaterialApi,
  ClaimsMemberApi,
  InsuredPlanVO,
  LetterWritingApi,
  MemberApi,
  SearchLetterRequestVO
} from '@fox/rest-clients';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {
  AggregateYear,
  AggregateYearSelectionModalComponent
} from '../../shared/aggregate-year-selection-modal/aggregate-year-selection-modal.component';
import {EditAggregateValueModalComponent} from '../../shared/edit-aggregate-value-modal/edit-aggregate-value-modal.component';
import {EditAggregateService} from '../../shared/edit-aggregate.service';
import {IWriteLetterService} from '../../shared/iwrite-letter.service';
import {MemberInformationService} from '../../shared/member-information.service';

@Component({
  selector: 'fox-member-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  memberProfile: AccountMembershipResponseVO = new AccountMembershipResponseVO(); // change to acctountVO
  membershipNumber: string = '';
  specialHandlingCode: boolean = false;
  isSpecialHCUpdated: boolean = false;
  insuredNoteNotFound: boolean = false;
  searchLetterRequest: SearchLetterRequestVO = new SearchLetterRequestVO();
  isIwriteFailure: boolean = false;
  letterWritingTab: string = 'letterWritingTab';
  specHandling: string = '';
  showTransferAccountNumberModal = false;
  showSpecialHandlingModal = false;
  isInsuredPlanStatusActive: boolean = false;
  maintenanceTypes = ['account_transfer', 'special_handling_codes', 'aggregate'];
  url: string = '../../' + memberInformationRoutePathMemberSearch;
  aggregateYear: string = '';
  aggregateYears: string[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  memberMigrated: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.memberMigrated,
    badgeClasses: ['bd-chip-icon-text'],
    text: BadgeTextDescriptions.memberMigrated,
    iconClasses: [BadgeIcons.memberMigrated],
    iconPosition: BadgeIconPositions.before
  };
  isMemberMigrated: boolean = false;
  isRecordLocked: boolean = false;

  recordLocked: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.recordLocked,
    badgeClasses: ['bd-chip-icon-text'],
    text: BadgeTextDescriptions.recordLocked,
    iconClasses: [BadgeIcons.recordLocked]
  };

  @ViewChild(AggregateYearSelectionModalComponent) yearSelectionModal?: AggregateYearSelectionModalComponent;
  @ViewChild(EditAggregateValueModalComponent) editAggregateCurrentValueModal?: EditAggregateValueModalComponent;

  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private memberSvc: MemberApi,
    private letterWritingSvc: LetterWritingApi,
    private messageBoxService: MessageBoxService,
    private claimInsuredMemberApi: ClaimsMemberApi,
    private memberInformationService: MemberInformationService,
    private claimsMaterialApi: ClaimsMaterialApi,
    private iWriteLetterSrv: IWriteLetterService,
    private editAggregateSrv: EditAggregateService,
    private featureFlagSvc: FeatureFlagService,
    private claimMemberApi: ClaimsMemberApi,
    private pageHeaderService: PageHeaderService
  ) {
  }

  get memberDateOfBirth(): string {
    if (this.memberProfile && this.memberProfile.memberDetails) {
      return this.memberProfile.memberDetails.dateOfBirth || '';
    } else {
      return '';
    }
  }

  get displayStatus(): string {
    return this.isInsuredPlanStatusActive ? 'Active' : 'Inactive';
  }

  get hasAggregateMaintAvailable(): boolean {
    return this.memberInformationService.hasAggregateMaintAvailable;
  }

  get hasSHCodeMaintAvailable(): boolean {
    return this.memberInformationService.hasSHCodeMaintAvailable;
  }

  get hasTransferMemberMaintAvailable(): boolean {
    return this.memberInformationService.hasTransferMemberMaintAvailable;
  }

  get toggleMemberMigrationStatusFeature(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F3545');
  }

  get toggleMemberSpecialHandlingCodeFeature(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F3646');
  }

  get toggleLockAccountServiceFeature(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F4072');
  }

  get toggleMemberMaintenanceAvailabilityFeature(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F3513');
  }

  getMemberNumber(): number | undefined {
    if (this.memberProfile && this.memberProfile.memberDetails && this.memberProfile.memberDetails.aarpMembershipNumber && this.memberProfile.memberDetails.aarpMembershipNumber.membershipNumber) {
      return this.memberProfile.memberDetails.aarpMembershipNumber.membershipNumber;
    }
    return;
  }

  getAssocId(): number | undefined {
    if (this.memberProfile && this.memberProfile.memberDetails && this.memberProfile.memberDetails.aarpMembershipNumber && this.memberProfile.memberDetails.aarpMembershipNumber.associationId) {
      return this.memberProfile.memberDetails.aarpMembershipNumber.associationId;
    }
    return;
  }

  getInsuredCode(): string {
    if (this.memberProfile && this.memberProfile.memberDetails && this.memberProfile.memberDetails.householdId && this.memberProfile.memberDetails.householdId[0] && this.memberProfile.memberDetails.householdId[0].insuredCode) {
      return this.memberProfile.memberDetails.householdId[0].insuredCode;
    }
    return '';
  }

  ngOnInit(): void {
    this.pageHeaderService.hasMaintApprovalDetails = false;
    this.sub = this.route.params.subscribe(params => {
      if (params['membershipNumber']) {
        const memberRecordRouteParam = params['membershipNumber'];
        this.membershipNumber = memberRecordRouteParam;
        setTimeout(() => {
          this.appInit(memberRecordRouteParam);
        }, 3000);
      }
    });
    this.memberInformationService.showMemberSearchBoolean = this.router.routerState.snapshot.url.indexOf('mp=true') !== -1;

    const eobParam = this.route.snapshot.queryParamMap.get('eob');
    if (eobParam === 'true') {
      this.url = '../../' + memberInformationRoutePathEobInfo;
    }

    this.memberInformationService.preserveData = this.router.routerState.snapshot.url.indexOf('eob=true') !== -1;

    if (this.route.snapshot.queryParamMap.get('workItems') === '/' + workQueueRoutePathRoot + '/' + workQueueRoutePathWorkbench) {
      this.url = this.route.snapshot.queryParamMap.get('workItems') || this.url;
    }
  }

  ngOnDestroy(): void {
    this.memberInformationService.showMemberSearchBoolean =
      (this.router.routerState.snapshot.url.indexOf(memberInformationRoutePathMemberSearch) >= 0);
    this.memberInformationService.preserveData =
      (this.router.routerState.snapshot.url.indexOf(memberInformationRoutePathEobInfo) >= 0);

    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  appInit(membershipNumber: string): void {
    if (membershipNumber) {
      this.memberSvc.getMemberByMemberNumber(membershipNumber, uuid())
        .subscribe(res => {
          this.memberProfile = res;
          if (this.memberProfile.insuredPlan) {
            this.setInsuredPlanStatus(this.memberProfile.insuredPlan);
          }
          this.memberInformationService.changeMemberProfile(this.memberProfile);
          if (res && this.toggleMemberSpecialHandlingCodeFeature) {
            this.specialHandlingCodeForMemberProfile();
          }
        });

      if (this.toggleMemberMigrationStatusFeature) {
        this.claimMemberApi.getMigrationStatus(uuid(), membershipNumber)
          .pipe(takeUntil(this.destroy$))
          .subscribe(res => {
            if (res.memberMigrated) {
              this.isMemberMigrated = res.memberMigrated;
            }
          }, err => {
          });
      }

      if (this.toggleLockAccountServiceFeature) {
        this.claimsMaterialApi.getLockAccountStatus(membershipNumber, uuid())
          .pipe(takeUntil(this.destroy$))
          .subscribe(res => {
            if (res.lockStatus === 'LOCKED') {
              this.isRecordLocked = true;
            }
          }, err => {
          });
      }

      if (this.toggleMemberMaintenanceAvailabilityFeature) {
        this.getMemberMaintenanceAvails();
      }
    }
  }

  setInsuredPlanStatus(ip: InsuredPlanVO[]): void {
    ip.forEach(elem => {
      this.isInsuredPlanStatusActive = elem.planStatus === 'A';
    });
  }

  displayActiveMsg(e: any): void {
    this.specialHandlingCode = true;
  }

  displayInsuredNoteNotFoundMsg(e: any): void {
    this.insuredNoteNotFound = true;
  }

  getMemberMaintenanceAvails(): void {
    this.maintenanceTypes.forEach(maintenanceType => {
      this.claimsMaterialApi.getMemberMaintenanceAvail(this.membershipNumber, maintenanceType, uuid())
        .subscribe(res => {
          this.memberInformationService.hasAggregateMaintAvailable = true;
          this.memberInformationService.hasSHCodeMaintAvailable = true;
          this.memberInformationService.hasTransferMemberMaintAvailable = true;
        }, err => {
          this.memberInformationService.disableMaintenanceButton(maintenanceType);
          if (err.status === 412) {
            const headersRes = err.headers.get('reasoncode');
            this.memberInformationService.displayErrorMessage(headersRes);
          }
        });
    });
  }

  generateLetter(): void {
    this.iWriteLetterSrv.memberProfile = this.memberProfile;
    this.iWriteLetterSrv.generateLetter();
  }

  searchLetter(): void {
    this.messageBoxService.reset();
    let membershipNumber: number = 0;
    if (this.memberProfile.memberDetails && this.memberProfile.memberDetails.aarpMembershipNumber && this.memberProfile.memberDetails.aarpMembershipNumber.associationId) {
      const householdIds = this.memberProfile.memberDetails.householdId;
      let insuredCode;
      if (householdIds && householdIds.length > 0 && householdIds[0].insuredCode) {
        insuredCode = householdIds[0].insuredCode;
      }
      membershipNumber = Number(String(this.memberProfile.memberDetails.aarpMembershipNumber.membershipNumber)
        + String(this.memberProfile.memberDetails.aarpMembershipNumber.associationId)
        + insuredCode);
    }
    this.searchLetterRequest = {membershipNumber: ('00000000000' + membershipNumber.toString()).slice(-11)};
    this.letterWritingSvc.searchLetter(this.searchLetterRequest, uuid(), 'response').subscribe(response => {
      if (response.body && response.status === 201) {
        const lwt = window.open(response.body.searchResultURL, this.letterWritingTab);
        if (lwt) {
          lwt.focus();
        }
      } else if (response.status === 204) {
        this.messageBoxService.addMessageBox('No Content Found', MessageBoxType.ACTIVE, 'No letter history found for this Member');
      }
    }, e => {
      if (e.status === 412) {
        this.messageBoxService.reset();
        this.messageBoxService.addMessageBox('User not authorized for iWrite', MessageBoxType.ACTIVE, 'Please request access through Secure or contact your manager');
      } else if (e.status === 500 && e.error) {
        if (this.firstThreeCharactersToNumber(e.error) === 200) {
          this.messageBoxService.reset();
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'iWrite is not available at this time, please check back later');
        } else if (this.firstThreeCharactersToNumber(e.error) === 300) {
          this.messageBoxService.reset();
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'The system to search a letter is not available at this time, please check back later');
        }
      }
    });
  }

  filterActiveInsuredPlans(): InsuredPlanVO[] {
    if (this.memberProfile && this.memberProfile.insuredPlan) {
      return this.memberProfile.insuredPlan.filter((item) => item.planStatus === 'A');
    }
    return [];
  }

  updateSpecialHandlingCodeForEnrollment(e: boolean): void {
    this.isSpecialHCUpdated = e;
  }

  specialHandlingCodeForMemberProfile(): void {
    if (this.memberProfile && this.memberProfile.memberDetails
      && this.memberProfile.memberDetails.aarpMembershipNumber
      && this.memberProfile.memberDetails.householdId && this.memberProfile.memberDetails.householdId.length > 0) {
      const membershipNumber = (this.memberProfile.memberDetails.aarpMembershipNumber.membershipNumber + ''
        + this.memberProfile.memberDetails.aarpMembershipNumber.associationId + ''
        + this.memberProfile.memberDetails.householdId[0].insuredCode);
      this.claimInsuredMemberApi.specialHandlingCodes(membershipNumber, uuid()).subscribe(res => {
        if (res && res.length) {
          this.specHandling = res[0].specialHandlingCode || '';
        }
      });
    }
  }

  onGetMemberMaintenanceAvail(maintenanceType: string): void {
    this.claimsMaterialApi.getMemberMaintenanceAvail(this.membershipNumber, maintenanceType, uuid())
      .subscribe(
        (data) => {
          this.lockAccount(maintenanceType);
        }, (err) => {
          // disable maintenance buttons for any error
          this.memberInformationService.disableMaintenanceButton(maintenanceType);
          // display meaningful message for error 412
          if (err.status === 412) {
            const headersRes = err.headers.get('reasoncode');
            this.memberInformationService.displayErrorMessage(headersRes);
          } else {
            this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Maintenance service is not available at this time.');
          }
        }
      );
  }

  onCloseTransferAccountNumberForm(): void {
    this.showTransferAccountNumberModal = !this.showTransferAccountNumberModal;
  }

  onSpecialHandlingModalClose(event: boolean): void {
    this.showSpecialHandlingModal = !this.showSpecialHandlingModal;
  }

  lockAccount(maintenanceType: string): void {
    const maintLockAccountResult = this.editAggregateSrv.lockAccount(this.memberProfile);
    maintLockAccountResult.lockAccountResult
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (res.lockStatus === 'LOCKED') {
          this.editAggregateSrv.setMemberOnSessionStorage(maintLockAccountResult.membershipNumber);
          if (maintenanceType === 'account_transfer') {
            this.showTransferAccountNumberModal = !this.showTransferAccountNumberModal;
          } else if (maintenanceType === 'special_handling_codes') {
            this.showSpecialHandlingModal = !this.showSpecialHandlingModal;
          } else if (maintenanceType === 'aggregate') {
            this.openYearSelectionModal(true);
          }
        }
      }, err => {
        if (err.status === 400) {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Member is currently locked and maintenance cannot be performed.');
        } else {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'The account has not been locked. Please close out and try again.');
        }
      });
  }

  openYearSelectionModal(e: any): void {
    if (e) {
      this.editAggregateSrv.getAggregateYears(this.memberProfile).pipe(
        takeUntil(this.destroy$))
        .subscribe(ys => {
          this.aggregateYears = ys;
          if (this.yearSelectionModal) {
            this.yearSelectionModal.openModal();
          }
        });
    }
  }

  selectedAggregateYear(value: AggregateYear): void {
    if (value.openEditAggregateModal && this.editAggregateCurrentValueModal) {
      this.aggregateYear = value.year;
      this.editAggregateCurrentValueModal.openModal();
    }
  }

  getAggregateNewValuesOnTable(e: any): void {
    if (e) {
      this.editAggregateSrv.getYears(this.memberProfile);
    }
  }

  isF4275Enabled(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F4275');
  }

  private firstThreeCharactersToNumber(error: string): number | undefined {
    return Number(error.substring(0, 3));
  }
}
