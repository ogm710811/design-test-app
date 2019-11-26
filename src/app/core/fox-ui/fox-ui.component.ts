import {MediaMatcher} from '@angular/cdk/layout';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {ActivatedRoute, Data, NavigationEnd, Router, RouterEvent, UrlSegment} from '@angular/router';
import {
  checkRecoveryMenuLabelManualEntry,
  checkRecoveryRouteCommandCheckReconciliation,
  checkRecoveryRouteCommandDepositFileVerification,
  checkRecoveryRouteCommandFindCheckRegister,
  checkRecoveryRouteCommandFindDepositTRC,
  checkRecoveryRouteCommandManualEntry,
  checkRecoveryRouteCommandOverPaymentAddOrEdit,
  checkRecoveryRouteCommandOverpaymentRecovery,
  checkRecoveryRouteCommandOverpaymentSelection,
  checkRecoveryRouteLabelCheckReconciliation,
  checkRecoveryRouteLabelDepositFileVerification,
  checkRecoveryRouteLabelFindCheckRegister,
  checkRecoveryRouteLabelFindDepositTRC,
  checkRecoveryRouteLabelManualEntry,
  checkRecoveryRouteLabelOverPaymentAddOrEdit,
  checkRecoveryRouteLabelOverpaymentRecovery,
  checkRecoveryRouteLabelOverpaymentSelection,
  checkRecoveryRouteLabelRoot,
  checkRecoveryRoutePathAddOrEditOverpayment,
  checkRecoveryRoutePathCheckReconciliation,
  checkRecoveryRoutePathDepositFileVerification,
  checkRecoveryRoutePathFindCheckRegister,
  checkRecoveryRoutePathFindDepositTRC,
  checkRecoveryRoutePathManualEntry,
  checkRecoveryRoutePathOverpaymentRecovery,
  checkRecoveryRoutePathOverpaymentSelection,
  checkRecoveryRoutePathRoot,
  claimProcessingRouteCommandBypass,
  claimProcessingRouteCommandBypassMgmt,
  claimProcessingRouteCommandClaimEligibility,
  claimProcessingRouteCommandDupeClaimCheck,
  claimProcessingRouteCommandElectronicClaimVerification,
  claimProcessingRouteCommandHistory,
  claimProcessingRouteCommandMaintenanceApproval,
  claimProcessingRouteCommandManualClaimIntake,
  claimProcessingRouteCommandMemLookup,
  claimProcessingRouteCommandProviderValidation,
  claimProcessingRouteCommandSearch,
  claimProcessingRouteLabelBypass,
  claimProcessingRouteLabelBypassMgmt,
  claimProcessingRouteLabelClaimEligibility,
  claimProcessingRouteLabelDupeClaimCheck,
  claimProcessingRouteLabelHistory,
  claimProcessingRouteLabelMaintenanceApproval,
  claimProcessingRouteLabelManualClaimIntake,
  claimProcessingRouteLabelMemLookup,
  claimProcessingRouteLabelProviderValidation,
  claimProcessingRouteLabelRoot,
  claimProcessingRouteLabelSearch,
  claimProcessingRoutePathBypass,
  claimProcessingRoutePathBypassMgmt,
  claimProcessingRoutePathBypassOrig,
  claimProcessingRoutePathClaimEligibility,
  claimProcessingRoutePathDupeClaimCheck,
  claimProcessingRoutePathHistory,
  claimProcessingRoutePathMaintenanceApproval,
  claimProcessingRoutePathManualClaimIntake,
  claimProcessingRoutePathMemLookup,
  claimProcessingRoutePathMemLookupOrig,
  claimProcessingRoutePathProviderValidation,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathSearch,
  communicationRouteCommandCommInfo,
  communicationRouteCommandCommSuspended,
  communicationRouteCommandDeleteComm,
  communicationRouteCommandListComm,
  communicationRouteCommandQualityReviewComm,
  communicationRouteCommandRevComm,
  communicationRouteLabelCommInfo,
  communicationRouteLabelCommSuspended,
  communicationRouteLabelDeleteComm,
  communicationRouteLabelListComm,
  communicationRouteLabelQualityReviewComm,
  communicationRouteLabelRevComm,
  communicationRouteLabelRoot,
  communicationRoutePathCommInfo,
  communicationRoutePathDeleteComm,
  communicationRoutePathListComm,
  communicationRoutePathQualityReviewComm,
  communicationRoutePathRevComm,
  communicationRoutePathRoot,
  dashboardKeyboardShortcutHelper,
  dashboardRouteCommandCurrentStats,
  dashboardRouteCommandDefaultFile,
  dashboardRouteCommandOperatorFile,
  dashboardRouteLabelCurrentStats,
  dashboardRouteLabelDefaultFile,
  dashboardRouteLabelOperatorFile,
  dashboardRouteLabelRoot,
  dashboardRoutePathCurrentStats,
  dashboardRoutePathDefaultFile,
  dashboardRoutePathOperatorFile,
  dashboardRoutePathRoot,
  documentRepositoryRouteCommandDocumentSearch,
  documentRepositoryRouteCommandDocumentUpload,
  documentRepositoryRouteLabelDocumentSearch,
  documentRepositoryRouteLabelDocumentUpload,
  documentRepositoryRouteLabelRoot,
  documentRepositoryRoutePathDocumentSearch,
  documentRepositoryRoutePathDocumentUpload,
  documentRepositoryRoutePathRoot,
  FeatureFlagService,
  fileMaintenanceRouteCommandClaimNumberRangeFileMaintenanceMenu,
  fileMaintenanceRouteCommandMessageMaintenance,
  fileMaintenanceRouteLabelRoot,
  fileMaintenanceRoutePathClaimNumberRangeFileMaintenanceMenu,
  fileMaintenanceRoutePathMessageMaintenance,
  fileMaintenanceRoutePathRoot,
  HotkeyDirective,
  Link,
  LoginService,
  memberInformationRouteCommandEobInfo,
  memberInformationRouteCommandMemberSearch,
  memberInformationRouteCommandProviderSearch,
  memberInformationRouteLabelEobInfo,
  memberInformationRouteLabelMemberSearch,
  memberInformationRouteLabelProviderSearch,
  memberInformationRouteLabelRoot,
  memberInformationRoutePathEobInfo,
  memberInformationRoutePathMemberSearch,
  memberInformationRoutePathProviderSearch,
  memberInformationRoutePathRoot,
  MessageBoxModel,
  MessageBoxService,
  ModalService,
  NavData,
  OldPageHeaderConfig,
  PageHeaderConfigType,
  PageHeaderService,
  processingRouteCommandIcdTableMaintenance,
  processingRouteCommandlDrugInquiry,
  processingRouteCommandReviewCptHpcsCodes,
  processingRouteCommandReviewIcdCodes,
  processingRouteCommandReviewMessages,
  processingRouteLabelDrugInquiry,
  processingRouteLabelIcdTableMaintenance,
  processingRouteLabelReviewCptHcpsCodes,
  processingRouteLabelReviewIcdCodes,
  processingRouteLabelReviewMessages,
  processingRouteLabelRoot,
  processingRoutePathIcdTableMaintenance,
  processingRoutePathlDrugInquiry,
  processingRoutePathReviewCptHpcsCodes,
  processingRoutePathReviewIcdCodes,
  processingRoutePathReviewMessages,
  processingRoutePathRoot,
  qualityReviewRouteCommandQualityInformation,
  qualityReviewRouteCommandQualityReviewVolume,
  qualityReviewRouteCommandRevalidationMenu,
  qualityReviewRouteCommandRevalidationMenuQQ,
  qualityReviewRouteCommandSequenceNumberInquiry,
  qualityReviewRouteLabelRoot,
  qualityReviewRoutePathQualityInformation,
  qualityReviewRoutePathQualityReviewVolume,
  qualityReviewRoutePathRevalidationMenu,
  qualityReviewRoutePathRoot,
  qualityReviewRoutePathSequenceNumberInq,
  SectionService,
  sideMenu,
  TransferSrvService
} from '@fox/shared';
import {ModalState} from '@fox/state-management';
import {Store} from '@ngrx/store';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {Observable, Subscription, zip as observableZip} from 'rxjs';

import {map} from 'rxjs/operators';
import * as tabbable from 'tabbable';
import {HeaderComponent} from '../header/header.component';

/**
 * Top-level component for the FOX UI browser application, containing only the top-level router outlet
 */
@Component({
  selector: 'fox-ui',
  templateUrl: './fox-ui.component.html',
  styleUrls: ['./fox-ui.component.css']
})
export class FoxUiComponent implements AfterViewChecked, OnInit, OnDestroy, AfterViewInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('leftSide') leftSide: any;
  @ViewChild('sidenav') containerMenu: any;
  @ViewChild('header') header: HeaderComponent;

  isBreadcrumbHidden: boolean = false;
  divWidth: number;
  modalState: Observable<boolean>;
  sideMenu: any;
  grayMenu: any;
  hiddenWorkItems: boolean = false;
  isNewNav = false;
  pageHeaderConfig?: PageHeaderConfigType;
  hideAssertiveMessages = false;
  fullWidth = false;
  hideFooter = false;
  showFeatureFlagModal: boolean = false;

  urlTraining: string = 'https://hubconnect.uhg.com/groups/is-operations-training-and-documentation/projects/my-second-project/activity';
  urlAsk: string = 'http://askkb/';
  urlWLetters: string = 'https://iwrite-stage.uhc.com/LWA/##application/lwa_inbox_request_ap';
  urlFLetters: string = 'https://iwrite-stage.uhc.com/LWA/##application/lwa_search_claims_lette';

  links: Link[] = [];
  navigationSubscription: Subscription;
  breadcrumbSubscription: Subscription;
  hiddenHorizontallyScrollOnMenuPage = true;

  showKeyboardShortcut = false;
  isModalVisible = false;
  commandInput: string = '';

  mobileQuery: MediaQueryList;
  currentPage = dashboardRouteLabelCurrentStats;
  currentChildNav = 'Dashboard';
  currentModule = '/' + dashboardRoutePathRoot;
  dashboardConst = '/' + dashboardRoutePathRoot;
  claimConst = '/' + claimProcessingRoutePathRoot;
  checkConst = '/' + checkRecoveryRoutePathRoot;
  memberConst = '/' + memberInformationRoutePathRoot;
  processingConst = '/' + processingRoutePathRoot;
  documentConst = '/' + documentRepositoryRoutePathRoot;
  communicationConst = '/' + communicationRoutePathRoot;
  fileMaintenanceConst = '/' + fileMaintenanceRoutePathRoot;
  qualityReviewConst = '/' + qualityReviewRoutePathRoot;

  claimSearchConst = claimProcessingRoutePathSearch;
  claimHistoryConst = claimProcessingRoutePathHistory;
  duplicateClaimConst = claimProcessingRoutePathDupeClaimCheck;
  currentStatsConst = dashboardRoutePathCurrentStats;
  operatorFileConst = dashboardRoutePathOperatorFile;
  defaultFileConst = dashboardRoutePathDefaultFile;
  memberQueueConst = claimProcessingRoutePathMemLookup;
  memberQueueConstOrig = claimProcessingRoutePathMemLookupOrig;
  bypassQueueConst = claimProcessingRoutePathBypass;
  bypassQueueConstOrig = claimProcessingRoutePathBypassOrig;
  bypassManagementConst = claimProcessingRoutePathBypassMgmt;
  findCheckConst = checkRecoveryRoutePathFindCheckRegister;
  manualEntryConst = checkRecoveryRoutePathManualEntry;
  memberSearchConst = memberInformationRoutePathMemberSearch;
  providerSearchConst = memberInformationRoutePathProviderSearch;
  memberEobInfoConst = memberInformationRoutePathEobInfo;
  processingIcdTableMaintenanceConst = processingRoutePathIcdTableMaintenance;
  processingDrugInquiryConst = processingRoutePathlDrugInquiry;
  processingReviewMessageConst = processingRoutePathReviewMessages;
  processingRoutePathReviewCptHpcsCodesConst = processingRoutePathReviewCptHpcsCodes;
  processingRoutePathReviewIcdCodesConst = processingRoutePathReviewIcdCodes;
  findDepositTRCConst = checkRecoveryRoutePathFindDepositTRC;
  depositFileVerificationConst = checkRecoveryRoutePathDepositFileVerification;
  checkReconciliationConst = checkRecoveryRoutePathCheckReconciliation;
  documentSearchConst = documentRepositoryRoutePathDocumentSearch;
  documentUploadConst = documentRepositoryRoutePathDocumentUpload;
  addOrEditOverpaymentConst = checkRecoveryRoutePathAddOrEditOverpayment;
  overpaymentSelectionConst = checkRecoveryRoutePathOverpaymentSelection;
  overpaymentRecoveryConst = checkRecoveryRoutePathOverpaymentRecovery;
  commInfoConst = communicationRoutePathCommInfo;
  commRevConst = communicationRoutePathRevComm;
  commDeleteConst = communicationRoutePathDeleteComm;
  commQualityReviewConst = communicationRoutePathQualityReviewComm;
  commListConst = communicationRoutePathListComm;
  manualClaimIntakeConst = claimProcessingRoutePathManualClaimIntake;
  manualClaimProcessingConst = claimProcessingRoutePathClaimEligibility;
  maintenanceApprovalConst = claimProcessingRoutePathMaintenanceApproval;
  providerValidationConst = claimProcessingRoutePathProviderValidation;
  qualityReviewInfoConst = qualityReviewRoutePathQualityInformation;
  qualityReviewSequenceInqConst = qualityReviewRoutePathSequenceNumberInq;
  qualityReviewVolumeConst = qualityReviewRoutePathQualityReviewVolume;
  qualityReviewRevalidationConst = qualityReviewRoutePathRevalidationMenu;
  fileMaintenanceClaimNumberRangeMenuConst = fileMaintenanceRoutePathClaimNumberRangeFileMaintenanceMenu;
  fileMaintenanceMessageMaintenanceConst = fileMaintenanceRoutePathMessageMaintenance;

  claimSearchLabel = claimProcessingRouteLabelSearch;
  claimHistoryLabel = claimProcessingRouteLabelHistory;
  duplicateClaimLabel = claimProcessingRouteLabelDupeClaimCheck;
  currentStatsLabel = dashboardRouteLabelCurrentStats;
  operatorFileLabel = dashboardRouteLabelOperatorFile;
  defaultFileLabel = dashboardRouteLabelDefaultFile;
  memberQueueLabel = claimProcessingRouteLabelMemLookup;
  bypassQueueLabel = claimProcessingRouteLabelBypass;
  bypassManagementLabel = claimProcessingRouteLabelBypassMgmt;
  manualClaimIntakeLabel = claimProcessingRouteLabelManualClaimIntake;
  manualClaimProcessingLabel = claimProcessingRouteLabelClaimEligibility;
  findCheckLabel = checkRecoveryRouteLabelFindCheckRegister;
  manualEntryLabel = checkRecoveryRouteLabelManualEntry;
  manualDepositEntryLabel = checkRecoveryMenuLabelManualEntry;
  memberSearchLabel = memberInformationRouteLabelMemberSearch;
  providerSearchLabel = memberInformationRouteLabelProviderSearch;
  memberEobInfoLabel = memberInformationRouteLabelEobInfo;
  processingIcdTableMaintenanceLabel = processingRouteLabelIcdTableMaintenance;
  processingRouteLabelDrugInquiry = processingRouteLabelDrugInquiry;
  processingReviewMessageLabel = processingRouteLabelReviewMessages;
  processingRouteLabelReviewCptHcpsCodes = processingRouteLabelReviewCptHcpsCodes;
  processingRouteLabelReviewIcdCodesConst = processingRouteLabelReviewIcdCodes;
  documentSearchLabel = documentRepositoryRouteLabelDocumentSearch;
  documentUploadLabel = documentRepositoryRouteLabelDocumentUpload;
  findDepositTRCLabel = checkRecoveryRouteLabelFindDepositTRC;
  depositFileVerificationLabel = checkRecoveryRouteLabelDepositFileVerification;
  addOrEditOverPaymentLabel = checkRecoveryRouteLabelOverPaymentAddOrEdit;
  checkReconciliationLabel = checkRecoveryRouteLabelCheckReconciliation;
  overpaymentSelectionLabel = checkRecoveryRouteLabelOverpaymentSelection;
  overpaymentRecoveryLabel = checkRecoveryRouteLabelOverpaymentRecovery;
  commInfoLabel = communicationRouteLabelCommInfo;
  commSuspendedLabel = communicationRouteLabelCommSuspended;
  commRevLabel = communicationRouteLabelRevComm;
  commDeleteLabel = communicationRouteLabelDeleteComm;
  commQualityReviewLabel = communicationRouteLabelQualityReviewComm;
  commListLabel = communicationRouteLabelListComm;
  qualityReviewInfoLabel = 'QR Info';
  qualityReviewSequenceInquiryLabel = 'QR Sequence Inq';
  qualityReviewVolumeLabel = 'QR Volume';
  qualityReviewRevalidationLabel = 'QR Revalidation';
  fileMaintenanceClaimNumberRangeMenuLabel = 'Microfilm Range File';
  fileMaintenancelMessageMaintenanceLabel = 'Message File';

  maintenanceApprovalLabel = claimProcessingRouteLabelMaintenanceApproval;
  providerValidationLabel = claimProcessingRouteLabelProviderValidation;

  dashboardLabelConst = dashboardRouteLabelRoot;
  claimsLabelConst = claimProcessingRouteLabelRoot;
  checkLabelConst = checkRecoveryRouteLabelRoot;
  memberLabelConst = memberInformationRouteLabelRoot;
  documentLabelConst = documentRepositoryRouteLabelRoot;
  communicationLabelConst = communicationRouteLabelRoot;
  fileLabelConst = fileMaintenanceRouteLabelRoot;
  processingLabelConst = processingRouteLabelRoot;
  qualityReviewLabelConst = qualityReviewRouteLabelRoot;
  fileMaintenanceLabelConst = fileMaintenanceRouteLabelRoot;

  currentStatsCommandConst = dashboardRouteCommandCurrentStats;
  operatorFileCommandConst = dashboardRouteCommandOperatorFile;
  defaultFileCommandConst = dashboardRouteCommandDefaultFile;
  claimSearchCommandConst = claimProcessingRouteCommandSearch;
  claimHistoryCommandConst = claimProcessingRouteCommandHistory;
  duplicateClaimCommandConst = claimProcessingRouteCommandDupeClaimCheck;

  memLookupCommandConst = claimProcessingRouteCommandMemLookup;
  bypassCommandConst = claimProcessingRouteCommandBypass;
  bypassMgmtCommandConst = claimProcessingRouteCommandBypassMgmt;
  checkRecoveryCommandConst = checkRecoveryRouteCommandFindCheckRegister;
  manualEntryCommandConst = checkRecoveryRouteCommandManualEntry;
  memberSearchCommandConst = memberInformationRouteCommandMemberSearch;
  providerSearchCommandConst = memberInformationRouteCommandProviderSearch;
  memberEobInfoCommandConst = memberInformationRouteCommandEobInfo;
  processingRouteCommandIcdTableMaintenanceConst = processingRouteCommandIcdTableMaintenance;
  processingRouteCommandlDrugInquiryConst = processingRouteCommandlDrugInquiry;
  processingRouteCommandReviewMessageConst = processingRouteCommandReviewMessages;
  processingRouteCommandReviewCptHpcsCodesConst = processingRouteCommandReviewCptHpcsCodes;
  processingRouteCommandReviewIcdCodesConst = processingRouteCommandReviewIcdCodes;
  findDepositTRCCommandConst = checkRecoveryRouteCommandFindDepositTRC;
  depositFileVerificationCommandConst = checkRecoveryRouteCommandDepositFileVerification;
  documentSearchCommandConst = documentRepositoryRouteCommandDocumentSearch;
  documentUploadCommandConst = documentRepositoryRouteCommandDocumentUpload;
  addOrEditCommandConst = checkRecoveryRouteCommandOverPaymentAddOrEdit;
  overpaymentSelectionCommandConst = checkRecoveryRouteCommandOverpaymentSelection;
  checkReconciliationCommandConst = checkRecoveryRouteCommandCheckReconciliation;
  commInfoCommandConst = communicationRouteCommandCommInfo;
  commSuspendedCommandConst = communicationRouteCommandCommSuspended;
  commRevCommandConst = communicationRouteCommandRevComm;
  commDeleteCommandConst = communicationRouteCommandDeleteComm;
  commQualityReviewCommandConst = communicationRouteCommandQualityReviewComm;
  commListCommandConst = communicationRouteCommandListComm;
  qualityReviewInfoCommandConst = qualityReviewRouteCommandQualityInformation;
  qualityReviewSequenceInqCommandConst = qualityReviewRouteCommandSequenceNumberInquiry;
  qualityReviewVolumeCommandConst = qualityReviewRouteCommandQualityReviewVolume;
  qualityReviewRevalidationCommandConst = qualityReviewRouteCommandRevalidationMenu;
  qualityReviewRevalidationQQCommandConst = qualityReviewRouteCommandRevalidationMenuQQ;
  fileMaintenanceClaimNumberRangeMenuCommandConst = fileMaintenanceRouteCommandClaimNumberRangeFileMaintenanceMenu;
  fileMaintenanceMessageMaintenanceCommandConst = fileMaintenanceRouteCommandMessageMaintenance;

  manualClaimIntakeCommandConst = claimProcessingRouteCommandManualClaimIntake;
  manualClaimEligibilityCommandConst = claimProcessingRouteCommandClaimEligibility;
  maintenanceApprovalCommandConst = claimProcessingRouteCommandMaintenanceApproval;
  providerValidationCommandConst = claimProcessingRouteCommandProviderValidation;
  manualClaimVerfSuspCommandConst = claimProcessingRouteCommandElectronicClaimVerification;
  overpaymentRecoveryCommandConst = checkRecoveryRouteCommandOverpaymentRecovery;

  qualityReviewRoutePathRevalidationMenuConst = qualityReviewRoutePathRevalidationMenu;

  isScrollable: boolean = true;

  helpAndTraining = 'Help & Training';
  keyboardShortcutHelper = dashboardKeyboardShortcutHelper;
  private focusLastElementHotkey?: Hotkey;
  private toggleMenuHotkey?: Hotkey;
  private featureFlagModalHotkey?: Hotkey;
  private focusNextSectionHotkey?: Hotkey;
  private focusPreviousSectionHotkey?: Hotkey;
  private readonly _mobileQueryListener: () => void;

  get isLoggedIn(): boolean {
    return !!this.loginSvc.username;
  }

  get isSecurityAdmin(): boolean {
    return this.loginSvc.isSecurityAdmin;
  }

  get hasStaffRole(): boolean {
    return this.loginSvc.hasStaffRole;
  }

  get hasSupervisorRole(): boolean {
    return this.loginSvc.hasSupervisorRole;
  }

  get hasOpViewPaymentRole(): boolean {
    return this.loginSvc.hasOpViewPaymentRole;
  }

  get hasOpMaintainPaymentRole(): boolean {
    return this.loginSvc.hasOpMaintainPaymentRole;
  }

  get hasOpAuthorizePaymentRole(): boolean {
    return this.loginSvc.hasOpAuthorizePaymentRole;
  }

  get hasOpMemberProfileRole(): boolean {
    return this.loginSvc.hasOpMemberProfile;
  }

  get routeToQueueModalVisible(): boolean {
    return this.modalService.routeToQueueModalVisible;
  }

  set routeToQueueModalVisible(visible: boolean) {
    this.modalService.routeToQueueModalVisible = visible;
  }

  get saveToWorkbenchModalVisible(): boolean {
    return this.modalService.saveToWorkbenchModalVisible;
  }

  set saveToWorkbenchModalVisible(visible: boolean) {
    this.modalService.saveToWorkbenchModalVisible = visible;
  }

  get messageBoxes(): MessageBoxModel[] {
    return this.messageBoxService.get();
  }

  get toggleFeature(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F3709');
  }

  get isF4681Enabled(): boolean {
    return this.featureFlagSvc.isFeatureEnabled('F4681');
  }

  get routeValidModalVisible(): boolean {
    return this.modalService.routeValidationModalVisible;
  }

  set routeValidModalVisible(visible: boolean) {
    this.modalService.routeValidationModalVisible = visible;
  }

  get hasOpMaintainWq(): boolean {
    return this.loginSvc.hasOpMaintainWq;
  }

  constructor(
    private elementRef: ElementRef,
    private loginSvc: LoginService,
    private router: Router,
    private hotkeysService: HotkeysService,
    private modalStore: Store<ModalState>,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private sectionSvc: SectionService,
    private transferService: TransferSrvService,
    private ngZone: NgZone,
    private render: Renderer2,
    private featureFlagSvc: FeatureFlagService,
    private pageHeaderService: PageHeaderService,
    private messageBoxService: MessageBoxService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    // Activate/Deactivate some of the hotkeys when the modal is active
    this.modalState = modalStore.select('modalActive');
    this.modalState.subscribe(state => {
      if (state) {
        this.removeHotkeys();
      } else {
        this.addHotkeys();
      }
    });

    this.modalService.mainContentScrolling.subscribe(scrollable => {
      this.isScrollable = scrollable;
    });
  }

  ngOnInit(): void {
    this.sideMenu = sideMenu;
    this.addHotkeys();

    this.transferService.change.subscribe((width: any) => {
      this.divWidth = width;
    });

    this.route.queryParams.subscribe(params => {
      if (params['newNav']) {
        this.isNewNav = params['newNav'] === 'true';
      }
    });

    this.subscribeToBreadcrumbs();
    // The ActivatedRoute changes every time we navigate, and for some reason it doesn't get
    // updated. We therefore have to subscribe to changes from the router, and subscribe to the new
    // ActivatedRoute each time.
    this.navigationSubscription = this.router.events.subscribe((ev: RouterEvent) => {
      if (ev instanceof NavigationEnd) {
        this.subscribeToBreadcrumbs();
        this.isBreadcrumbHidden = (!!ev) ? ((!!ev.urlAfterRedirects) ? ev.urlAfterRedirects === `/home/menu` : false) : false;

      }
    });
  }

  isToggleFeature(name: string): boolean {
    if (name) {
      return this.featureFlagSvc.isFeatureDisabled(name);
    } else {
      return false;
    }
  }

  closeMenu(url: any): void {
    this.initializeClassBody();
    if (this.header.showMenu) {
      this.header.showMenu = false;
      this.sidenav.close().then();
    }
    if (url.command === communicationRouteCommandCommInfo
      || url.command === communicationRouteCommandDeleteComm
      || url.command === communicationRouteCommandListComm
      || url.command === communicationRouteCommandRevComm
      || url.command === communicationRouteCommandCommSuspended
      || url.command === checkRecoveryRouteCommandOverpaymentSelection
      || url.command === checkRecoveryRouteCommandOverPaymentAddOrEdit
    ) {
      this.commandInput = url.command;
      this.transferService.setStorePreviousUrl(this.router.url);
      this.modalService.routeValidationModalVisible = true;
    } else {
      this.router.navigate([url.link]);
    }
  }

  close(event: string): void {
    this.header.showMenu = false;
    this.initializeClassBody();
  }

  goToUrlTrng(): void {
    window.open(this.urlTraining, '_blank');
  }

  goToUrlAsk(): void {
    window.open(this.urlAsk, '_blank');
  }

  goToUrlWLetters(): void {
    window.open(this.urlWLetters, '_blank');
  }

  goToUrlFLetters(): void {
    window.open(this.urlFLetters, '_blank');
  }

  ngAfterViewChecked(): void {
  }

  ngAfterViewInit(): void {
    this.header.disableOrHideWorkItems = this.hiddenWorkItems;
  }

  addHotkeys(): void {
    // Throughout the application, when we press the 'end' key, we want to focus on the last element
    this.focusLastElementHotkey = HotkeyDirective.registerHotkey(this.hotkeysService, 'end', (): boolean => {
      const tabbableElements: HTMLElement[] = tabbable(this.elementRef.nativeElement);
      if (tabbableElements) {
        const lastElement: HTMLElement = tabbableElements[tabbableElements.length - 1];
        lastElement.focus();
      }
      // return false to prevent event bubbling
      return false;
    }, 'Focus on the last item currently possible on the page');

    // Throughout the application, when we press alt+w, we want to switch to the next section
    this.focusNextSectionHotkey = HotkeyDirective.registerHotkey(this.hotkeysService, 'alt+w', (): boolean => {
      this.focusRelativeSectionStart(Node.DOCUMENT_POSITION_FOLLOWING);
      // return false to prevent event bubbling
      return false;
    }, 'Focus on the next section currently possible on the page');

    // Throughout the application, when we press alt+q, we want to switch to the previous section
    this.focusPreviousSectionHotkey = HotkeyDirective.registerHotkey(this.hotkeysService, 'alt+q', (): boolean => {
      this.focusRelativeSectionStart(Node.DOCUMENT_POSITION_PRECEDING);
      // return false to prevent event bubbling
      return false;
    }, 'Focus on the previous section currently possible on the page');

    // Throughout the application, when we press alt+`, we want to toggle the main menu
    this.toggleMenuHotkey = HotkeyDirective.registerHotkey(this.hotkeysService, 'alt+`', (): boolean => {
      this.sidenav.toggle();
      this.header.showMenu = !this.header.showMenu;
      return false;
    }, 'Toggle the navigation menu visibility');

    this.featureFlagModalHotkey = HotkeyDirective.registerHotkey(this.hotkeysService, 'ctrl+alt+f', (): boolean => {
      this.showFeatureFlagModal = !this.showFeatureFlagModal;
      return false;
    });
  }

  navigateTo(module, page): void {
    this.header.onChangePage();
    this.router.navigate(['/' + module + '/' + page]).then();
    this.sidenav.close().then();
    this.header.showMenu = !this.header.showMenu;
  }

  navigateModal(module, page, commandInout): void {
    this.commandInput = commandInout;
    this.isModalVisible = true;
    this.modalService.routeValidationModalVisible = true;
    this.transferService.setStorePreviousUrl(this.router.url);
    this.sidenav.close().then();
  }

  navigationButtonClick(type: string): void {
    this.currentChildNav = type;
  }

  removeHotkeys(): void {
    if (this.focusLastElementHotkey) {
      this.hotkeysService.remove(this.focusLastElementHotkey);
    }
    if (this.focusNextSectionHotkey) {
      this.hotkeysService.remove(this.focusNextSectionHotkey);
    }
    if (this.focusPreviousSectionHotkey) {
      this.hotkeysService.remove(this.focusPreviousSectionHotkey);
    }
    if (this.toggleMenuHotkey) {
      this.hotkeysService.remove(this.toggleMenuHotkey);
    }
    if (this.featureFlagModalHotkey) {
      this.hotkeysService.remove(this.featureFlagModalHotkey);
    }
  }

  menuToggle(state: boolean): void {
    this.initializeClassBody();
    if (state) {
      this.sidenav.open().then();
      if (this.isNewNav) {
        this.render.addClass(document.body, 'new-navigation-opened');
      }
    } else {
      if (this.sidenav && this.sidenav.close) {
        this.sidenav.close().then();
      }
      if (this.isNewNav) {
        this.render.addClass(document.body, 'new-navigation-closed');
      }
    }
    this.divWidth = this.transferService.get('header');
  }

  hideWorkItems(hideWorkItems: boolean): void {
    if (!this.header) {
      this.hiddenWorkItems = hideWorkItems;
    } else {
      this.header.disableOrHideWorkItems = hideWorkItems;
    }

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.unsubscribeFromBreadcrumbs();
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
    this.removeHotkeys();
  }

  focusRelativeSectionStart(direction: Node['DOCUMENT_POSITION_PRECEDING'] | Node['DOCUMENT_POSITION_FOLLOWING']): void {
    // Assuming some firstElement's exist that are tabbable, we find which one is
    // appropriate to focus (we do nothing if none exist)
    if (this.sectionSvc.firstElements && this.sectionSvc.firstElements.length) {
      // If we have an element with focus already, then we'll want the focus to switch to the first element with
      // a source order that is after the currently focused item.
      // The tabbable function returns its array in a source-ordered way, so it's safe to use
      // array ordering as a proxy for source order.
      const currentFocus: Element = document.activeElement ? document.activeElement : document.body;

      const sectionFirstsAfterCurrent: HTMLElement[] =
        this.sectionSvc.firstElements.filter(sectionFirst => {
          // Here we filter the list to contain only elements with a source order after the
          // current focused item. We do this using the Element.compareDocumentPosition function
          // which returns a bit masked number. We apply the 'after' mask, and coerce it to a
          // boolean (0 is before current element, 1 is after)
          //
          // Note: We disable tslint bitwise operator prohibition since we need to unmask the
          // result of compareDocumentPosition
          /* tslint:disable */
          //noinspection TsLint
          return (!!(currentFocus.compareDocumentPosition(sectionFirst) & direction)) && (!(currentFocus.compareDocumentPosition(sectionFirst) & Node.DOCUMENT_POSITION_DISCONNECTED));
          /* tslint:enable */
        });
      // If any exist after current focus, switch to the first one in the list
      if (sectionFirstsAfterCurrent && sectionFirstsAfterCurrent.length) {
        const afterCurrentIndexForDirection = direction === Node.DOCUMENT_POSITION_FOLLOWING ?
          0 : sectionFirstsAfterCurrent.length - 1;
        sectionFirstsAfterCurrent[afterCurrentIndexForDirection].focus();
        return;
      }
      // If every item is after the current focused, we'll fall through and assign it to the
      // very first firstElement item (loop back around)

      const indexForDirection = direction === Node.DOCUMENT_POSITION_FOLLOWING ?
        0 : this.sectionSvc.firstElements.length - 1;
      this.sectionSvc.firstElements[indexForDirection].focus();
    }
  }

  showKeyboardShortcutsModal(event): void {
    this.showKeyboardShortcut = event;
  }

  onKeyboardShortcutsModalClose(event): void {
    this.showKeyboardShortcut = event;
  }

  private unsubscribeFromBreadcrumbs(): void {
    if (this.breadcrumbSubscription) {
      this.breadcrumbSubscription.unsubscribe();
    }
  }

  private initializeClassBody(): void {
    this.render.removeClass(document.body, 'new-navigation-opened');
    this.render.removeClass(document.body, 'new-navigation-closed');
  }

  private subscribeToBreadcrumbs(): void {
    // Cleanup the old subscription
    this.unsubscribeFromBreadcrumbs();
    this.breadcrumbSubscription = this.breadcrumbsForRoute(this.route.root).subscribe(lnks => {
      this.links = lnks.filter(l => {
        return !!l.path;
      });
      if (this.links && this.links.length) {
        if (this.links.length >= 2) {
          this.currentModule = this.links[0].path;
          this.currentPage = this.links[this.links.length - 1].label;
        } else if (this.links.length === 1) {
          this.currentModule = '';
          this.currentPage = this.links[0].label || '';
        }
      } else {
        this.currentModule = '';
        this.currentPage = '';
      }
    });
  }

  private breadcrumbsForRoute(ar: ActivatedRoute): Observable<Link[]> {
    // Watch the path of this route
    const routePath: Observable<string> = ar.url.pipe(map((segments: UrlSegment[]) => {
      return segments.join('/');
    }));
    // Watch the label of this route (specified in the xyz-routing.module.ts under data > label)
    const routeLabel: Observable<string> = ar.data.pipe(map((dat: Data) => {
      if (dat && dat.hasOwnProperty('nav')) {
        const nav: NavData = dat.nav;
        if (nav.linksToThisPath) {
          this.pageHeaderConfig = nav.linksToThisPath[0].pageHeaderConfig || {
            headerType: 'old',
            hideHeader: false,
            hideBreadcrumbs: false
          } as OldPageHeaderConfig;
          if (this.pageHeaderConfig && this.pageHeaderConfig.headerType === 'flagged') {
            if (this.featureFlagSvc.isFeatureDisabled(this.pageHeaderConfig.feature)) {
              this.pageHeaderConfig = this.pageHeaderConfig.featureDisabledConfig;
            } else {
              this.pageHeaderConfig = this.pageHeaderConfig.featureEnabledConfig;
            }
          }
          this.hideAssertiveMessages = !!nav.linksToThisPath[0].hideAssertiveMessages;
          this.fullWidth = !!nav.linksToThisPath[0].fullWidth;
          this.hideFooter = !!nav.linksToThisPath[0].hideFooter;
          return nav.linksToThisPath[0].label;
        }
      }
      return '';
    }));

    // Combine (zip) two Observables into one using a function that takes the output of each of the
    // Observables. We want to make an Observable of our Link interface, and watch for changes
    // to it.
    const routeLink: Observable<Link> =
      observableZip(routePath, routeLabel, (path: string, label: string) => {
        return <Link>{path: (path ? '/' + path : ''), label: label};
      });

    // We then want to turn the single Link into a List of Links.
    // Return an empty list if the link has no href, and a list containing only this route's link if
    // valid
    const thisLink: Observable<Link[]> = routeLink.pipe(map(lnk => {
      if (lnk && lnk.path) {
        return [lnk];
      } else {
        return [];
      }
    }));

    // Use the presence or absence of child routes to determine if we are in the base case of the
    // recursion or not.
    const kids = ar.children;
    // Return this link if we have no kids
    if (kids.length < 1) {
      return thisLink;
    } else {
      // If we have kids, make a recursive call for the first kid.
      const nextLink: Observable<Link[]> = this.breadcrumbsForRoute(kids[0]);

      // Use zip again to
      return observableZip(thisLink, nextLink, (l1, l2) => {
        return l1.concat(l2.map(l => {
          l.path = (l1.length ? l1[0].path : '') + l.path;
          return l;
        }));
      });
    }
  }
}
