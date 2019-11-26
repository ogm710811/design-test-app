import {TitleCasePipe} from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Injector,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {
  ClaimHistoryApi,
  ClaimHistoryAuditVO,
  ClaimHistorySendReplaceEobRaEligibleVO,
  ClaimNoteVO,
  CrossReferenceApi,
  EobUpdateBillLineVO,
  EobUpdateVO,
  PagedResourcesOfResourceOfClaimBillLineDetailsVO,
  PagedResourcesOfResourceOfClaimHistoryClaimMessagesVO,
  ResourceOfClaimBillLineDetailsVO,
  ResourceOfClaimHistoryClaimMessagesVO,
  ResourceOfClaimHistoryDetailVO,
  ResourceOfCrossReferenceVO,
  UpdateItemVO
} from '@fox/rest-clients';
import {
  BadgeColors,
  BadgeIcons,
  BadgeSettings,
  BadgeTemplates,
  BadgeTextDescriptions,
  claimHistoryMaintenanceFeature,
  claimProcessingRoutePathHistory,
  claimProcessingRoutePathMaintenanceApproval,
  claimProcessingRoutePathRoot,
  CommonService,
  FeatureFlagService,
  HeaderRightItem,
  LoginService,
  MessageBoxService,
  MessageBoxType,
  NotifyFooter,
  PageHeaderService,
  PaginatorNonMaterialComponent,
  qualityReviewRoutePathQualityMiscInfo
} from '@fox/shared';
import * as moment from 'moment-timezone';
import {Subscription} from 'rxjs';
import * as uuid from 'uuid';
import {IWriteLetterService, MemberInformationService} from '@fox/member-info';
import {ClaimHistorySearchService} from '../../shared/claim-history-search.service';
import {MaintenanceApprovalService} from '../../shared/maintenance-approval.service';
import {TooltipDefinitionService} from '../../shared/tooltip-definition.service';
import {ClaimDetailsRightComponent} from '../claim-details-right.component';
import {ClaimHistoryResultSet} from '../claim-history-models/claim-history-result.model';
import {MemberCardSet} from '../claim-history-models/member-card.model';
import {SendReplaceEobResultModel} from '../claim-history-models/send-replace-eob-result.model';
import {UpdateEobBilllineModel} from '../claim-history-models/update-eob-billline.model';
import {EobUpdateModel} from '../claim-history-models/update-eob.model';
import {UpdateItemModel} from '../claim-history-models/update-item.model';

@Component({
  selector: 'fox-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['../claim-history.component.css']
})
export class ClaimDetailsComponent implements OnInit, OnDestroy {

  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();

  specialHandle: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.specialHC,
    badgeClasses: ['bd-chip-icon-text'],
    text: BadgeTextDescriptions.specialHC,
    iconClasses: [BadgeIcons.specialHC]
  };

  claimDetails: ResourceOfClaimHistoryDetailVO;
  claimNoteDetails: ClaimNoteVO;
  memberDetails: MemberCardSet;
  billLinesResultSet: ResourceOfClaimBillLineDetailsVO[] = [];
  crossReferenceResultSet: ResourceOfCrossReferenceVO[] = [];
  sendReplaceEobResult: ClaimHistorySendReplaceEobRaEligibleVO;
  sendReplaceEobResultSet: SendReplaceEobResultModel[] = [];
  claimAuditDetails: ClaimHistoryAuditVO;

  billLineResultSetUpdateEob: ResourceOfClaimBillLineDetailsVO[] = [];
  savedClaimHistoryResult: Array<ClaimHistoryResultSet> = [];

  eobUpdateReqBody: EobUpdateVO;
  updateItem: UpdateItemVO;
  eobUpdateBillLine: EobUpdateBillLineVO;
  eobBillLineArr: EobUpdateBillLineVO[];

  claimNumber: string = '';
  memberNumber: string = '';
  memberNum: string = '';
  dos: string = '';
  noOFClaims: string = '';
  eobType: string = '';
  command: string = '';
  billLineTitle: string = '';
  claimNote: string = '';
  suspendReason: string = '';
  qualityErrorCode: string = '';
  eobModalTitle: string = '';
  eobModalType: string = '';
  responseMsg: string = '';
  exceptionInd: string = 'N';

  billLinesPageSize = 10;
  billLinesDataLengthInput;
  billLinesPageTotal = 0;
  currentbillLinesPage = 0;

  billLinesResultIsDesc: boolean = false;
  billLinesSortColumn: string = 'billLineNumber';
  billLineType: string = '';

  isDataDisplay: boolean = false;
  isMemberDataDisplay: boolean = false;
  isBillLinesDisplay: boolean = false;
  isAchPayment: boolean = false;
  isStatusDisbursed: boolean = false;

  sendReplaceModalVisible: boolean = false;
  updateEobModalVisible: boolean = false;
  enableSendReplace: boolean = false;
  transferClaimSearchModalVisible: boolean = false;
  deleteClaimModalVisible: boolean = false;
  reactivateModalVisible: boolean = false;
  suspendClaimModalVisible: boolean = false;

  isEobType: boolean = false;
  isEobDrug: boolean = false;
  isEobNoPay: boolean = false;
  isEobMed: boolean = false;
  isEobHos: boolean = false;
  isEobSvc: boolean = false;
  isClaimNote: boolean = false;
  isClaimAudit: boolean = false;
  isSuccess: boolean = false;
  isSpecialHandle: boolean = false;
  isSuspend: boolean = false;
  isReactive: boolean = false;
  isClaimDeleted: boolean = false;

  isCrossRefDataDisplay: boolean = false;
  crossRefLength: number = 0;
  lastPressed: number = 0;

  isMaintMenuActive: boolean = true; // accessible role is yet to be decided
  url: string = '../../' + claimProcessingRoutePathHistory;
  maintenanceUrl: string = '../../' + claimProcessingRoutePathMaintenanceApproval;
  qrurl: string = '/quality-review/' + qualityReviewRoutePathQualityMiscInfo;
  isSendEobActive: boolean = false;
  isSendRaActive: boolean = false;
  isReplaceEobActive: boolean = false;
  isReplaceRaActive: boolean = false;
  isEobActive: boolean = false;
  isRaActive: boolean = false;
  isMaintenanceDisabled: boolean = false;

  isCrossRefActive: boolean = false;
  isUpdateEobActive: boolean = false;
  isTransferClaimActive: boolean = false;
  claimMessagesResult: ResourceOfClaimHistoryClaimMessagesVO[] = [];
  viewData: ResourceOfClaimHistoryClaimMessagesVO[] = [];
  claimMessagesIsDesc: boolean = false;
  claimMessagesSortColumn: string = 'patParaNum';

  dataLengthInput: number = 0;
  pageTotal: number = 0;
  @ViewChild(PaginatorNonMaterialComponent) paginator: PaginatorNonMaterialComponent;
  isIwriteDisabled: boolean = false;

  private _currentNavSubscription: Subscription;
  private _btnClickedSubscription: Subscription;
  private _sendReplaceEligibilitySubscription: Subscription;
  private _suspendReasonQualitySubscription: Subscription;
  private _ClaimHistorySubscription: Subscription;
  private _getByMemberSubscription: Subscription;
  private _processBillLinesSubscription: Subscription;
  private _claimMessageSubscription: Subscription;
  private _routeParamSubs?: Subscription;
  private _queryParamSubs?: Subscription;

  get hasReleaseDisabledMaintenance(): boolean {
    return this.featureFlagSvc.isFeatureDisabled(claimHistoryMaintenanceFeature);
  }

  constructor(
    private route: ActivatedRoute,
    private commonSvc: CommonService,
    private router: Router,
    private claimSvc: ClaimHistorySearchService,
    private memberSvc: MemberInformationService,
    private toolTip: TooltipDefinitionService,
    private crossRefernceApi: CrossReferenceApi,
    private loginSvc: LoginService,
    private titlecasePipe: TitleCasePipe,
    private messageBoxService: MessageBoxService,
    private requestSvc: MaintenanceApprovalService,
    private notificationFooter: NotifyFooter,
    private iWriteLetterSrv: IWriteLetterService,
    private featureFlagSvc: FeatureFlagService,
    public pageHeaderService: PageHeaderService,
    private claimHistorySearchApi: ClaimHistoryApi,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {

    const routeSnapshot = this.route.snapshot;
    const initialPathParams = routeSnapshot.params;
    this.onPathParamChange(initialPathParams);
    this.pageHeaderService.tabs = ['Overview', 'Bill Lines', 'Cross References', 'Notes', 'Audit Log'];
    this.pageHeaderService.currentNav = 1;

    if (this._routeParamSubs) {
      this._routeParamSubs.unsubscribe();
    }
    this._routeParamSubs = this.route.params.subscribe(params => {
      this.onPathParamChange(params);
    });

    if (this._queryParamSubs) {
      this._queryParamSubs.unsubscribe();
    }
    this._queryParamSubs = this.route.queryParams.subscribe(qParams => {
      this.onQueryParamChange(qParams);
    });

    if (this._currentNavSubscription) {
      this._currentNavSubscription.unsubscribe();
    }
    this._currentNavSubscription = this.pageHeaderService.currentNavChange.subscribe(currentNav => {
      this.onCurrentNavChange();
    });

    this.claimSvc.claimDetailVisited = false;

    this.isSendEobActive = this.loginSvc.hasOpSendEob;
    this.isSendRaActive = this.loginSvc.hasOpSendRa;
    this.isReplaceEobActive = this.loginSvc.hasOpReplaceEob;
    this.isReplaceRaActive = this.loginSvc.hasOpReplaceRa;

  }

  onPathParamChange(params: Params): void {
    if (params['claimNumber']) {
      const claimNumberRouteParam = params['claimNumber'];
      this.claimNumber = claimNumberRouteParam;
      this.init(claimNumberRouteParam);
    }
    const routeSnapshot = this.route.snapshot;
    const snapshotQueryParams = routeSnapshot.queryParams;
    this.onQueryParamChange(snapshotQueryParams);

    this.pageHeaderService.customTitle = 'Claim #' + this.claimNumber;
    this.pageHeaderService.currentNav = 1;
    this.onCurrentNavChange();
  }

  onQueryParamChange(qParams: Params): void {
    if (qParams['eobType']) {
      const eobTypeRouteParam = qParams['eobType'];
      this.eobType = eobTypeRouteParam;
      this.assignEobflags(this.eobType);
      this.lastPressed = 1;
      this.pageHeaderService.currentNav = 2;
      this.billLineType = 'entered';
      this.currentbillLinesPage = 0;
      this.getBillLinesDetails();
    }
    if (qParams['command']) {
      const commandeRouteParam = qParams['command'];
      this.command = commandeRouteParam;
      if (qParams['command'] === 'RM') {
        this.requestSvc.requestDetailVisited = true;
      }
    }
  }

  onCurrentNavChange(): void {
    this.onTabChange();
    this.cdRef.detectChanges();
  }

  init(claimNumber): void {
    if (claimNumber) {
      this.isClaimNote = false;
      this.claimSvc.getSingleClaimDetails(claimNumber).subscribe(response => {
        this.processResult(response);
      }, (e) => {
        this.router.navigate(
          [claimProcessingRoutePathRoot, claimProcessingRoutePathHistory],
          {queryParams: {'claimNumid': claimNumber, 'showNotFound': 'true'}});
      });
    }
  }

  processResult(response: ResourceOfClaimHistoryDetailVO): void {
    if (response) {
      if (response.specialHandlingCode && response.specialHandlingCode.trim()) {
        if (!this.isSpecialHandle) {
          this.pageHeaderService.badgeParams.push(this.specialHandle);
        }
        this.isSpecialHandle = true;
      }
      this.claimDetails = response;
      if (this.claimDetails && this.claimDetails.claimHistoryStatusCode) {
        const statusCode = this.claimDetails.claimHistoryStatusCode;
        if (statusCode === 'D') {
          this.isStatusDisbursed = true;
        }
      }

      if (response.claimDosFromDate && response.claimDosToDate) {
        this.dos = moment.tz(response.claimDosFromDate, 'America/Chicago').format('MM/DD/YYYY') + ' - ' +
          moment.tz(response.claimDosToDate, 'America/Chicago').format('MM/DD/YYYY');
      }
      if (response.claimHistoryMember) {
        this.memberNum = response.claimHistoryMember.aarpMembershipNumber ? response.claimHistoryMember.aarpMembershipNumber : '';
      }
      if (response.eobType) {
        this.eobType = response.eobType;
        this.assignEobflags(this.eobType);
        if (this.command === 'QR') {
          this.lastPressed = 1;
          this.billLineType = 'entered';
          this.currentbillLinesPage = 0;
          this.getBillLinesDetails();
        }
      }
      if (response.achPaymentInd) {
        this.isAchPayment = (response.achPaymentInd === 'Y');
      }

      this.isDataDisplay = true;
      this.claimSvc.claimDetailVisited = true;

      if (response.claimHistoryMember && response.claimHistoryMember.aarpMembershipNumber) {
        const membershipNum = response.claimHistoryMember.aarpMembershipNumber;

        if (response.claimHistoryMember.totalClmCount) {
          this.noOFClaims = response.claimHistoryMember.totalClmCount;
        }

        const mappedItem: MemberCardSet = new MemberCardSet();
        this._getByMemberSubscription = this.memberSvc.getMemberByMemberNumber(membershipNum).subscribe(memberResult => {
          if (memberResult && memberResult.memberDetails && memberResult.insuredPlan) {
            if (memberResult.memberDetails.memberName) {
              mappedItem.lastName = memberResult.memberDetails.memberName.lastName ? memberResult.memberDetails.memberName.lastName : '';
              mappedItem.firstName = memberResult.memberDetails.memberName.firstName ? memberResult.memberDetails.memberName.firstName : '';
              mappedItem.middleName = memberResult.memberDetails.memberName.middleName ? memberResult.memberDetails.memberName.middleName : '';
              mappedItem.suffix = memberResult.memberDetails.memberName.suffix ? memberResult.memberDetails.memberName.suffix : '';
            }
            mappedItem.dateOfBirth = memberResult.memberDetails.dateOfBirth;
            mappedItem.dateOfDeath = memberResult.memberDetails.dateOfDeath;
            mappedItem.medicareId = memberResult.memberDetails.medicareId;
            mappedItem.aarpMembershipNumber = this.splitMemberNum(this.memberNum);
            mappedItem.memberNumber = this.memberNum;

            const setPlanCode = new Set();
            for (let i = 0; i < memberResult.insuredPlan.length; i++) {
              setPlanCode.add(memberResult.insuredPlan[i].planCode);
              if (i === 0) {
                mappedItem.effectivePlans = memberResult.insuredPlan[i].planCode;
              } else {
                if (setPlanCode.has(memberResult.insuredPlan[i].planCode)) {
                  mappedItem.effectivePlans = mappedItem.effectivePlans + ', ' + memberResult.insuredPlan[i].planCode;
                }
              }
            }
            this.isMemberDataDisplay = true;
          } else if (memberResult === 404) {
            mappedItem.lastName = '';
            mappedItem.firstName = '';
            mappedItem.middleName = '';
            mappedItem.dateOfBirth = '';
            mappedItem.dateOfDeath = '';
            mappedItem.medicareId = '';
            mappedItem.effectivePlans = '';
          }
        }, (e) => {
          mappedItem.lastName = '';
          mappedItem.firstName = '';
          mappedItem.middleName = '';
          mappedItem.dateOfBirth = '';
          mappedItem.dateOfDeath = '';
          mappedItem.medicareId = '';
          mappedItem.effectivePlans = '';
        });
        this.memberDetails = mappedItem;
      }

      this.pageHeaderService.headerRightItem = new HeaderRightItem(
        ClaimDetailsRightComponent,
        {
          claimNumber: this.claimNumber,
          memberNumber: this.memberNumber,
          memberNum: this.memberNum,
          isStatusDisbursed: this.isStatusDisbursed,
          isSendEobActive: this.isSendEobActive
        },
        this.componentFactoryResolver,
        this.injector);

      this._btnClickedSubscription = this.pageHeaderService.getBtnClickEmitter().subscribe(item => {
        switch (item) {
          case 'send-eob':
            this.determineSendReplaceEobRaEligibility('SEND');
            break;
          case 'replace-eob':
            this.determineSendReplaceEobRaEligibility('REPLACE');
            break;
          case 'add-cross-ref':
            this.linkToAddCrossReference();
            break;
          case 'update-eob':
            this.updateEob();
            break;
          case 'transfer-claim':
            this.displayTransferClaim();
            break;
          case 'reactivate-claim':
            this.showReactiveClaim();
            break;
          case 'suspend-claim':
            this.showSuspendClaim();
            break;
          case 'delete-claim':
            this.showDeleteClaim();
            break;
        }
      });
    }

    if (this.lastPressed === 0) {
      this.getClaimMessages();
    }
  }

  onTabChange(): void {
    this.notificationFooter.setNotificationFooter(this.pageHeaderService.currentNav);
    if (this.pageHeaderService.currentNav === 2) {
      this.billLineType = 'entered';
      this.isEobType = false;
      this.currentbillLinesPage = 0;
      this.getBillLinesDetails();
    } else if (this.pageHeaderService.currentNav === 3) {
      this.isCrossRefDataDisplay = false;
      this.getCrossReferenceDetails();
    } else if (this.pageHeaderService.currentNav === 4) {
      this.getClaimNote();
    } else if (this.pageHeaderService.currentNav === 5) {
      this.getClaimHistoryAudit();
    }
  }

  selectedMember($event): void {
    this.billLineType = $event;
    this.getBillLinesDetails();
  }

  getCrosRefPostDelete(successFlag: boolean): void {
    this.isSuccess = successFlag;
    if (this.isSuccess) {
      this.getCrossReferenceDetails();
    }
  }

  getClaimHistoryAudit(): void {
    this.isClaimAudit = false;
    const res = this.claimHistorySearchApi.getClaimHistoryAudit(
      +this.claimNumber,
      uuid()
    );

    this._suspendReasonQualitySubscription = res.subscribe(auditResult => {
      if (auditResult) {
        this.claimAuditDetails = auditResult;
        this.getSuspendReasonAndQualityErrorCode();
        this.isClaimAudit = true;
      }
    }, (e) => {

    });
  }

  getCrosRefPostAdd(successFlag: boolean): void {
    this.isSuccess = successFlag;
    if (this.isSuccess) {
      this.getCrossReferenceDetails();
    }
  }

  getCrossReferenceDetails(): void {
    this.crossRefLength = 0;
    const res = this.crossRefernceApi.getCrossReference(
      +this.claimNumber,
      uuid()
    );

    res.subscribe(crossReferenceResult => {
      if (crossReferenceResult && crossReferenceResult._embedded && crossReferenceResult._embedded.items) {
        this.crossReferenceResultSet = crossReferenceResult._embedded.items;
        this.crossRefLength = this.crossReferenceResultSet.length;
        this.isCrossRefDataDisplay = true;
      } else {
        this.isCrossRefDataDisplay = false;
      }
    }, (e) => {

      if (e.status === 404) {
        this.isCrossRefDataDisplay = false;
      }
    });
  }

  getSuspendReasonAndQualityErrorCode(): void {

    const auditResult = this.claimAuditDetails;
    let suspRes = '';
    let qualityErrCode = '';
    if (auditResult.suspendReason1 && auditResult.suspendReason1.trim().length > 0) {
      suspRes = auditResult.suspendReason1;
    }
    if (auditResult.suspendReason2 && auditResult.suspendReason2.trim().length > 0) {
      if (suspRes !== '') {
        suspRes = suspRes + ', ' + auditResult.suspendReason2;
      } else {
        suspRes = auditResult.suspendReason2;
      }
    }
    if (auditResult.suspendReason3 && auditResult.suspendReason3.trim().length > 0) {
      if (suspRes !== '') {
        suspRes = suspRes + ', ' + auditResult.suspendReason3;
      } else {
        suspRes = auditResult.suspendReason3;
      }
    }
    if (auditResult.suspendReason4 && auditResult.suspendReason4.trim().length > 0) {
      if (suspRes !== '') {
        suspRes = suspRes + ', ' + auditResult.suspendReason4;
      } else {
        suspRes = auditResult.suspendReason4;
      }
    }
    if (auditResult.suspendReason5 && auditResult.suspendReason5.trim().length > 0) {
      if (suspRes !== '') {
        suspRes = suspRes + ', ' + auditResult.suspendReason5;
      } else {
        suspRes = auditResult.suspendReason5;
      }
    }

    this.suspendReason = suspRes;

    if (auditResult.qualityErrorCode1 && auditResult.qualityErrorCode1.trim().length > 0) {
      qualityErrCode = auditResult.qualityErrorCode1;
    }
    if (auditResult.qualityErrorCode2 && auditResult.qualityErrorCode2.trim().length > 0) {
      if (qualityErrCode !== '') {
        qualityErrCode = qualityErrCode + ', ' + auditResult.qualityErrorCode2;
      } else {
        qualityErrCode = auditResult.qualityErrorCode2;
      }
    }
    if (auditResult.qualityErrorCode3 && auditResult.qualityErrorCode3.trim().length > 0) {
      if (qualityErrCode !== '') {
        qualityErrCode = qualityErrCode + ',  ' + auditResult.qualityErrorCode3;
      } else {
        qualityErrCode = auditResult.qualityErrorCode3;
      }
    }
    if (auditResult.qualityErrorCode4 && auditResult.qualityErrorCode4.trim().length > 0) {
      if (qualityErrCode !== '') {
        qualityErrCode = qualityErrCode + ', ' + auditResult.qualityErrorCode4;
      } else {
        qualityErrCode = auditResult.qualityErrorCode4;
      }
    }
    if (auditResult.qualityErrorCode5 && auditResult.qualityErrorCode5.trim().length > 0) {
      if (qualityErrCode !== '') {
        qualityErrCode = qualityErrCode + ', ' + auditResult.qualityErrorCode5;
      } else {
        qualityErrCode = auditResult.qualityErrorCode5;
      }
    }
    this.qualityErrorCode = qualityErrCode;
  }

  getBillLinesDetails(): void {
    if (this.eobType) {
      const res = this.claimHistorySearchApi.listBillLineDetails(
        +this.claimNumber,
        this.eobType,
        this.billLineType,
        uuid(),
        this.billLinesPageSize,
        this.currentbillLinesPage,
        this.billLinesSortColumn,
        this.billLinesResultIsDesc ? 'DSC' : 'ASC');

      this._processBillLinesSubscription = res.subscribe(billLinesResult => {
        if (billLinesResult && billLinesResult.page) {
          this.processBillLinesResult(billLinesResult);
          this.isBillLinesDisplay = true;
        } else {
          this.isBillLinesDisplay = false;
        }
      }, (e) => {
        this.billLinesResultSet = [];
        this.isBillLinesDisplay = false;
      });
    } else {
      this.isBillLinesDisplay = false;
    }
  }

  processBillLinesResult(billLinesResult: PagedResourcesOfResourceOfClaimBillLineDetailsVO): void {
    if (billLinesResult && billLinesResult._embedded && billLinesResult._embedded.items &&
      billLinesResult.page && billLinesResult.page.number !== undefined && billLinesResult.page.totalPages) {

      this.billLinesResultSet = billLinesResult._embedded.items;

      this.billLinesDataLengthInput = billLinesResult.page.totalElements;
      this.currentbillLinesPage = billLinesResult.page.number;
      this.billLinesPageTotal = billLinesResult.page.totalPages;
    }

  }

  billLineTypeChange(): void {
    this.isEobType = (this.billLineType === 'eob');
    this.getBillLinesDetails();
  }

  splitMemberNum(memberNum): string {
    const memNum = memberNum.substring(0, 9);
    const asscociationCode = memberNum.substring(9, 10);
    const houseId = memberNum.substring(10, 11);
    return memNum + ' ' + asscociationCode + ' ' + houseId;
  }

  assignEobflags(data): void {
    this.isEobDrug = false;
    this.isEobNoPay = false;
    this.isEobMed = false;
    this.isEobHos = false;
    this.isEobSvc = false;
    const claimEobType = data;
    switch (claimEobType) {
      case 'M/PAY':
        this.isEobMed = true;
        this.billLineTitle = 'Med Supp';
        break;
      case 'M/NP':
        this.isEobMed = true;
        this.billLineTitle = 'Med Supp';
        break;
      case 'NP':
        this.isEobNoPay = true;
        this.billLineTitle = 'No Pay';
        break;
      case 'R/ORG':
        this.isEobDrug = true;
        this.billLineTitle = 'Drug';
        break;
      case 'R/ADJ':
        this.isEobDrug = true;
        this.billLineTitle = 'Drug';
        break;
      case 'R/PAY':
        this.isEobDrug = true;
        this.billLineTitle = 'Drug';
        break;
      case 'R/NP':
        this.isEobDrug = true;
        this.billLineTitle = 'Drug';
        break;
      case 'H/NP':
        this.isEobHos = true;
        this.billLineTitle = 'Hospital';
        break;
      case 'H/PAY':
        this.isEobHos = true;
        this.billLineTitle = 'Hospital';
        break;
      case 'S/PAY':
        this.isEobSvc = true;
        this.billLineTitle = 'Services';
        break;
      case 'S/NP':
        this.isEobSvc = true;
        this.billLineTitle = 'Services';
        break;
    }
  }

  determineSendReplaceEobRaEligibility(sendReplaceIndicator): void {

    this.sendReplaceModalVisible = false;
    this.enableSendReplace = false;
    this.responseMsg = '';
    this.messageBoxService.reset();

    const res = this.claimHistorySearchApi.determineSendReplaceEobRaEligibility(+this.claimNumber, uuid(), sendReplaceIndicator);

    this._sendReplaceEligibilitySubscription = res.subscribe(eligibilityCheckResult => {
      if (eligibilityCheckResult) {
        this.processEobResult(eligibilityCheckResult);
      }
    }, (e) => {
      this.sendReplaceModalVisible = false;
      if (e.status === 404) {
        this.messageBoxService.addMessageBox('No results found', MessageBoxType.ERROR, sendReplaceIndicator + ' EOB');
      }
      if (e.status === 412) {
        this.messageBoxService.reset();
        const errMsg = e.headers.get('message');
        this.messageBoxService.addMessageBox('Replace EOB/RA', MessageBoxType.ERROR, errMsg);
      }
    });
  }

  processEobResult(eligibilityCheckResult: ClaimHistorySendReplaceEobRaEligibleVO): void {
    this.sendReplaceEobResultSet = [];
    this.sendReplaceEobResult = eligibilityCheckResult;
    if (this.sendReplaceEobResult) {

      if (this.sendReplaceEobResult.sendReplaceIndicator) {
        this.eobModalType = this.sendReplaceEobResult.sendReplaceIndicator;
        this.eobModalTitle = this.titlecasePipe.transform(this.eobModalType) + ' EOB';

        if (this.eobModalType === 'SEND') {
          this.isEobActive = this.isSendEobActive;
          this.isRaActive = this.isSendRaActive;
        }

        if (this.eobModalType === 'REPLACE') {
          this.isEobActive = this.isReplaceEobActive;
          this.isRaActive = this.isReplaceRaActive;
        }
      }

      const mappedItem: SendReplaceEobResultModel = new SendReplaceEobResultModel();

      mappedItem.claimNumber = this.sendReplaceEobResult.claimNumber ? this.sendReplaceEobResult.claimNumber : 0;
      mappedItem.claimType = this.sendReplaceEobResult.claimTypeIndicator ? this.sendReplaceEobResult.claimTypeIndicator : '';
      mappedItem.status = this.sendReplaceEobResult.claimHistoryStatus ? this.sendReplaceEobResult.claimHistoryStatus : '';
      mappedItem.icdCode = this.sendReplaceEobResult.primaryIcdCode ? this.sendReplaceEobResult.primaryIcdCode : '';
      mappedItem.eobIndicator = this.sendReplaceEobResult.sendReplaceEobEligible ? this.sendReplaceEobResult.sendReplaceEobEligible : '';
      mappedItem.raIndicator = this.sendReplaceEobResult.sendReplaceRaEligible ? this.sendReplaceEobResult.sendReplaceRaEligible : '';
      mappedItem.typeIndicator = this.sendReplaceEobResult.sendReplaceIndicator ? this.sendReplaceEobResult.sendReplaceIndicator : '';

      if (this.sendReplaceEobResult.claimDosFromDate && this.sendReplaceEobResult.claimDosToDate) {
        mappedItem.dos = moment.tz(this.sendReplaceEobResult.claimDosFromDate, 'America/Chicago').format('MM/DD/YYYY') + ' - ' +
          moment.tz(this.sendReplaceEobResult.claimDosToDate, 'America/Chicago').format('MM/DD/YYYY');
      }
      this.sendReplaceEobResultSet[0] = mappedItem;

      this.enableSendReplace = (this.sendReplaceEobResultSet[0].eobIndicator === 'Y' || this.sendReplaceEobResultSet[0].raIndicator === 'Y');

      this.sendReplaceModalVisible = true;
    }
  }

  cancelSendReplace(): void {
    this.sendReplaceModalVisible = false;
  }

  confirmSendReplace(): void {
    this.sendReplaceModalVisible = false;
  }

  sendReplaceSuccessMsg(display: boolean): void {
    if (display) {
      const title = this.eobModalTitle + '/RA';
      this.messageBoxService.addMessageBox(title, MessageBoxType.SUCCESS, this.responseMsg);
    }
  }

  sendReplaceFailMsg(display: boolean): void {
    if (display) {
      const title = this.eobModalTitle + '/RA';
      this.messageBoxService.reset();
      this.messageBoxService.addMessageBox(title, MessageBoxType.ERROR, this.responseMsg);
    }
  }

  linkToAddCrossReference(): void {
    this.lastPressed = 2;
    this.pageHeaderService.currentNav = 3;
  }

  changePosition(origin?: number | null, position?: number | null): void {
    if (position === null || position === undefined) {
      this.lastPressed = 0;
    } else {
      this.lastPressed += position;
    }
  }

  updateEob(): void {
    if (this.eobType) {
      this.claimSvc.getBillLines(+this.claimNumber,
        this.eobType,
        'eob',
        this.billLinesPageSize,
        this.currentbillLinesPage,
        this.billLinesSortColumn,
        this.billLinesResultIsDesc ? 'DSC' : 'ASC').subscribe(billLinesResult => {
        if (billLinesResult && billLinesResult._embedded && billLinesResult._embedded.items &&
          billLinesResult.page && billLinesResult.page.number !== undefined && billLinesResult.page.totalPages) {
          this.billLineResultSetUpdateEob = billLinesResult._embedded.items;
          this.getEobUpdateModel();
          this.updateEobModalVisible = true;
        }
      }, (e) => {

      });
    } else {
      this.messageBoxService.addMessageBox('The claim is not having any eob type', MessageBoxType.ACTIVE, this.responseMsg);
    }
  }

  getEobUpdateModel(): void {
    this.eobBillLineArr = [];
    this.eobUpdateReqBody = new EobUpdateModel();
    this.updateItem = new UpdateItemModel();
    if (this.claimDetails !== undefined) {
      this.updateItem.oldValue = this.claimDetails.primaryIcdCode;
      this.updateItem.newValue = this.claimDetails.primaryIcdCode;
      this.eobUpdateReqBody.primaryIcd = this.updateItem;
    }
    if (this.billLineResultSetUpdateEob[0].eobExceptionScreenInd !== undefined) {
      this.updateItem = new UpdateItemModel();
      this.updateItem.oldValue = this.getEobExceptionScreenInd(this.billLineResultSetUpdateEob[0].eobExceptionScreenInd);
      this.updateItem.newValue = this.getEobExceptionScreenInd(this.billLineResultSetUpdateEob[0].eobExceptionScreenInd);
      this.eobUpdateReqBody.exceptionInd = this.updateItem;
      this.exceptionInd = this.updateItem.newValue;
    }

    this.billLineResultSetUpdateEob.forEach(data => {

      this.eobUpdateBillLine = new UpdateEobBilllineModel();
      this.eobUpdateBillLine.billLineKey = data.eobBillLineKey;
      this.eobUpdateBillLine.billLineChAcctPartNum = data.eobBillLineChAcctPartNum;
      this.eobUpdateBillLine.billLineNum = data.eobBillLineNumber;
      this.updateItem = new UpdateItemModel();
      this.updateItem.oldValue = data.eobDosFromDate;
      this.updateItem.newValue = data.eobDosFromDate;
      this.eobUpdateBillLine.billLineDosFrom = this.updateItem;
      this.updateItem = new UpdateItemModel();
      this.updateItem.oldValue = data.eobDosToDate;
      this.updateItem.newValue = data.eobDosToDate;
      this.eobUpdateBillLine.billLineDosTo = this.updateItem;
      this.updateItem = new UpdateItemModel();
      this.updateItem.oldValue = data.eobSrvAccum1;
      this.updateItem.newValue = data.eobSrvAccum1;
      this.eobUpdateBillLine.billLineSrvAccum1 = this.updateItem;
      this.updateItem = new UpdateItemModel();
      this.updateItem.oldValue = data.eobSrvAccum2;
      this.updateItem.newValue = data.eobSrvAccum2;
      this.eobUpdateBillLine.billLineSrvAccum2 = this.updateItem;
      this.updateItem = new UpdateItemModel();
      this.updateItem.oldValue = data.eobBenefitPeriodNum;
      this.updateItem.newValue = data.eobBenefitPeriodNum;
      this.eobUpdateBillLine.billLineBenefitPeriodNum = this.updateItem;
      this.updateItem = new UpdateItemModel();
      this.updateItem.oldValue = data.eobBenefitPeriodDay;
      this.updateItem.newValue = data.eobBenefitPeriodDay;
      this.eobUpdateBillLine.billLineBenefitPeriodDays = this.updateItem;
      this.updateItem = new UpdateItemModel();
      this.updateItem.oldValue = data.eobServiceCode;
      this.updateItem.newValue = data.eobServiceCode;
      this.eobUpdateBillLine.billLineServiceCode = this.updateItem;
      this.updateItem = new UpdateItemModel();
      this.updateItem.oldValue = data.eobTypeCode;
      this.updateItem.newValue = data.eobTypeCode;
      this.eobUpdateBillLine.billLineTypeCode = this.updateItem;
      if (this.isEobHos) {
        this.updateItem = new UpdateItemModel();
        this.updateItem.oldValue = data.eobDateOfAccident;
        this.updateItem.newValue = data.eobDateOfAccident;
        this.eobUpdateBillLine.billLineDateOfAccident = this.updateItem;
      }
      this.eobBillLineArr.push(this.eobUpdateBillLine);
    });
    this.eobUpdateReqBody.items = this.eobBillLineArr;
  }

  getEobExceptionScreenInd(actualValue): string {
    let eobExceptionScreenInd = 'N';
    if (actualValue === '0' || actualValue === '1') {
      eobExceptionScreenInd = 'N';
    }

    if (actualValue === '3' || actualValue === '4') {
      eobExceptionScreenInd = 'Y';
    }
    return eobExceptionScreenInd;
  }

  cancelUpdateEob(): void {
    this.updateEobModalVisible = false;
  }

  confirmUpdateEob(): void {
    this.updateEobModalVisible = false;
  }

  displayTransferClaim(): void {
    this.transferClaimSearchModalVisible = true;
  }

  cancelSearchModal(): void {
    this.transferClaimSearchModalVisible = false;
  }

  confirmSearchModal(): void {
    this.transferClaimSearchModalVisible = false;
  }

  transferClaimSuccessMsg(display: boolean): void {
    if (display) {
      this.messageBoxService.addMessageBox('Transfer Claim Successful', MessageBoxType.SUCCESS, this.responseMsg, 5000);
    }
    this.init(this.claimNumber);
  }

  transferClaimFailMsg(display: boolean): void {
    if (display) {
      this.messageBoxService.addMessageBox('Transfer Claim Unsuccessful', MessageBoxType.ERROR, this.responseMsg);
    }
  }

  reactivateOrSuspndClmSuccessMsg(display: boolean): void {
    if (display) {
      this.init(this.claimNumber);
      this.messageBoxService.reset();
      this.messageBoxService.addMessageBox('Operation Successful', MessageBoxType.SUCCESS, this.responseMsg, 6000);
      window.scrollTo(0, 0);
      this.linkToOverView();
    }
  }

  setClaimHistStatusCd(status: string): void {
    this.savedClaimHistoryResult = this.claimSvc.savedClaimHistoryResult;
    if (this.savedClaimHistoryResult.length > 0) {
      this.savedClaimHistoryResult.forEach(item => {
        if (item.claimNumber === this.claimNumber) {
          item.status = status;
          item.statusDescr = this.toolTip.getToolTipStatusDescr(status);
        }
      });
      this.claimSvc.savedClaimHistoryResult = this.savedClaimHistoryResult;
    }
  }

  reactivateOrSuspndClmFailMsg(display: boolean): void {
    if (display) {
      this.messageBoxService.reset();
      this.messageBoxService.addMessageBox('Operation Unsuccessful', MessageBoxType.ERROR, this.responseMsg);
      window.scrollTo(0, 0);
    }
  }

  showDeleteClaim(): void {
    this.claimNote = '';
    this.claimNoteDetails = {
      claimNoteId: 0
    };
    this.isClaimNote = false;
    if (this.claimDetails && this.claimDetails.claimNoteId !== 0) {
      this.getClaimNote();
    } else {
      this.claimNote = '';
    }
    this.deleteClaimModalVisible = true;
  }

  cancelDeleteClaim(): void {
    this.deleteClaimModalVisible = false;
  }

  confirmDeleteClaim(): void {
    this.deleteClaimModalVisible = false;
  }

  deleteClmSuccessMsg(display: boolean): void {
    if (display) {
      this.init(this.claimNumber);
      this.messageBoxService.reset();
      this.messageBoxService.addMessageBox('Operation Successful', MessageBoxType.SUCCESS, this.responseMsg, 6000);
      window.scrollTo(0, 0);
      this.linkToOverView();

    }
  }

  deleteClmFailMsg(display: boolean): void {
    if (display) {
      this.messageBoxService.reset();
      this.messageBoxService.addMessageBox('Operation Unsuccessful', MessageBoxType.ERROR, this.responseMsg);
      window.scrollTo(0, 0);
    }
  }

  showReactiveClaim(): void {
    this.reactivateModalVisible = true;
  }

  confirmReactiveClaimModal(): void {
    this.reactivateModalVisible = false;
  }

  cancelReactivateClaim(): void {
    this.reactivateModalVisible = false;
  }

  showSuspendClaim(): void {
    this.suspendClaimModalVisible = true;
  }

  cancelSuspendClaim(): void {
    this.suspendClaimModalVisible = false;
  }

  confirmSuspendClaimModal(): void {
    this.suspendClaimModalVisible = false;
  }

  getClaimNote(): void {
    const claimNoteID = this.claimDetails.claimNoteId;
    this.isClaimNote = (claimNoteID !== 0);
    if (this.isClaimNote) {
      this.claimSvc.getClaimNotes(claimNoteID).subscribe(response => {
        this.claimNoteDetails = response;
        this.claimNote = (this.claimNoteDetails.claimNote !== undefined) ? this.claimNoteDetails.claimNote.replace(/\n/g, '<br />') : '';
      }, (e) => {

      });
    }
  }

  updateEobSuccessMsg(display: boolean): void {
    if (display) {
      this.init(this.claimNumber);
      this.messageBoxService.reset();
      this.messageBoxService.addMessageBox('Operation Successful', MessageBoxType.SUCCESS, this.responseMsg, 6000);
      window.scrollTo(0, 0);
    }
  }

  updateEobFailMsg(display: boolean): void {
    if (display) {
      this.messageBoxService.reset();
      this.messageBoxService.addMessageBox('Operation Failed', MessageBoxType.ERROR, this.responseMsg);
      window.scrollTo(0, 0);
    }
  }

  getToggleValue(): void {
    this.billLinesResultSet = [];
    this.isEobType = (this.billLineType === 'eob');
    this.getBillLinesDetails();
  }

  linkToOverView(): void {
    this.lastPressed = 0;
    this.tabChange.emit(this.lastPressed);
  }

  getClaimMessages(): void {

    const res = this.claimHistorySearchApi.getClaimHistoryClaimMessages(+this.claimNumber, uuid(),
      this.claimMessagesSortColumn, this.claimMessagesIsDesc ? 'DSC' : 'ASC');

    this._claimMessageSubscription = res.subscribe(claimMsgResult => {
      if (claimMsgResult) {
        this.processClaimMessagesResult(claimMsgResult);
      }
    }, (e) => {
      this.claimMessagesResult = [];
    });
  }

  processClaimMessagesResult(claimMsgResult: PagedResourcesOfResourceOfClaimHistoryClaimMessagesVO): void {
    if (claimMsgResult && claimMsgResult._embedded && claimMsgResult._embedded.items) {
      this.claimMessagesResult = claimMsgResult._embedded.items;
      this.dataLengthInput = this.claimMessagesResult.length;
      this.viewData = this.claimMessagesResult.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.pageTotal = Math.ceil(this.claimMessagesResult.length / this.paginator.pageSize);
    }
  }

  generateLetter(indicator): void {
    this.iWriteLetterSrv.memberNumber = this.memberNum;
    this.iWriteLetterSrv.claimNumber = this.claimNumber;
    this.iWriteLetterSrv.templateName = indicator;
    this.iWriteLetterSrv.generateLetter();
  }

  updateClaimNoteId($event): void {
    this.claimDetails.claimNoteId = $event;
  }

  ngOnDestroy(): void {
    this.pageHeaderService.currentNav = 1;
    if (this._currentNavSubscription) {
      this._currentNavSubscription.unsubscribe();
    }
    if (this._btnClickedSubscription) {
      this._btnClickedSubscription.unsubscribe();
    }
    if (this._sendReplaceEligibilitySubscription) {
      this._sendReplaceEligibilitySubscription.unsubscribe();
    }
    if (this._suspendReasonQualitySubscription) {
      this._suspendReasonQualitySubscription.unsubscribe();
    }
    if (this._ClaimHistorySubscription) {
      this._ClaimHistorySubscription.unsubscribe();
    }
    if (this._getByMemberSubscription) {
      this._getByMemberSubscription.unsubscribe();
    }
    if (this._processBillLinesSubscription) {
      this._processBillLinesSubscription.unsubscribe();
    }
    if (this._routeParamSubs) {
      this._routeParamSubs.unsubscribe();
    }
    if (this._queryParamSubs) {
      this._queryParamSubs.unsubscribe();
    }
  }
}
