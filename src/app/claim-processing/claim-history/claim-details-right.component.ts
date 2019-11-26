import {TitleCasePipe} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {
  ClaimHistMaintEligibilityVO,
  ClaimHistoryApi,
  ClaimHistorySendReplaceEobRaEligibleVO
} from '@fox/rest-clients';
import {
  BadgeColors,
  BadgeIcons,
  BadgeSettings,
  BadgeTemplates,
  BadgeTextDescriptions,
  claimHistoryIwriteFeature,
  claimHistoryMaintenanceFeature,
  FeatureFlagService,
  LoginService,
  MessageBoxService,
  MessageBoxType,
  PageHeaderRightComponent,
  PageHeaderService
} from '@fox/shared';
import * as moment from 'moment-timezone';
import * as uuid from 'uuid';
import {IWriteLetterService} from '@fox/member-info';
import {MaintenanceEligibility} from './claim-history-enums/maintenance-eligibility';
import {SendReplaceEobResultModel} from './claim-history-models/send-replace-eob-result.model';

@Component({
  templateUrl: './claim-details-right.component.html',
  styleUrls: ['./claim-details-right.component.css'],
})

export class ClaimDetailsRightComponent implements PageHeaderRightComponent, OnInit {
  @Input() data: any;
  isIwriteDisabled: boolean = false;
  isMaintenanceDisabled: boolean = true;
  claimNumber: string = '';
  isCrossRefActive: boolean = false;
  isUpdateEobActive: boolean = false;
  isTransferClaimActive: boolean = false;
  isSuspend: boolean = false;
  isReactive: boolean = false;
  isClaimDeleted: boolean = false;
  memberNum: string = '';
  isIWriteFailure: boolean = false;
  sendReplaceModalVisible: boolean = false;
  enableSendReplace: boolean = false;
  responseMsg: string = '';

  sendReplaceEobResultSet: SendReplaceEobResultModel[] = [];
  sendReplaceEobResult: ClaimHistorySendReplaceEobRaEligibleVO;
  eobModalTitle: string = '';
  eobModalType: string = '';
  isEobActive: boolean = false;
  isRaActive: boolean = false;
  isSendEobActive: boolean = false;
  isSendRaActive: boolean = false;
  isReplaceEobActive: boolean = false;
  isReplaceRaActive: boolean = false;
  isStatusDisbursed: boolean = false;
  isMaintMenuActive: boolean = true;
  isMaintenanceDisabledTemp: boolean = true;

  recordLocked: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.recordLocked,
    badgeClasses: ['bd-chip-icon-text'],
    text: BadgeTextDescriptions.recordLocked,
    iconClasses: [BadgeIcons.recordLocked]
  };

  get hasReleaseDisabledMaintenance(): boolean {
    return this.featureFlagSvc.isFeatureDisabled('F2302');
  }

  get hasReleaseDisabledIwrite(): boolean {
    return this.featureFlagSvc.isFeatureDisabled('F4277');
  }

  constructor(
    private featureFlagSvc: FeatureFlagService,
    private claimHistorySearchApi: ClaimHistoryApi,
    private iWriteLetterSrv: IWriteLetterService,
    private messageBoxService: MessageBoxService,
    private loginSvc: LoginService,
    private titlecasePipe: TitleCasePipe,
    private pageHeaderService: PageHeaderService
  ) {
  }

  ngOnInit(): void {
    this.isSendEobActive = this.loginSvc.hasOpSendEob;
    this.isSendRaActive = this.loginSvc.hasOpSendRa;
    this.isReplaceEobActive = this.loginSvc.hasOpReplaceEob;
    this.isReplaceRaActive = this.loginSvc.hasOpReplaceRa;
    this.claimNumber = this.data.claimNumber;
    this.memberNum = this.data.memberNum;
    this.isIwriteDisabled = this.hasReleaseDisabledIwrite;
    this.isMaintenanceDisabledTemp = this.hasReleaseDisabledMaintenance;
    this.isStatusDisbursed = this.data.isStatusDisbursed;
    this.isSendEobActive = this.isSendEobActive;
    this.checkMaintenanceEligibility();
  }

  checkMaintenanceEligibility(): void {
    this.claimHistorySearchApi.getClaimHistMaintEligibility(uuid(), +this.claimNumber)
      .subscribe(maintenanceEligibilityResult => {
        if (maintenanceEligibilityResult) {
          if (maintenanceEligibilityResult.eligibleAccountLockStatus === MaintenanceEligibility.FALSE) {
            this.pageHeaderService.badgeParams.push(this.recordLocked);
          }
          if (!this.isMaintenanceDisabledTemp) {
            this.isMaintenanceNotEligible(maintenanceEligibilityResult);
          }
          this.isMaintenanceDisabled = this.isMaintenanceDisabledTemp;
        }
      }, (e) => {
        if (e.status === 412) {
          this.messageBoxService.reset();
          const errMsg = e.headers.get('message');
          this.messageBoxService.addMessageBox('Warning', MessageBoxType.ACTIVE, errMsg);
        }
      });
  }

  isMaintenanceNotEligible(maintenanceEligibilityResult: ClaimHistMaintEligibilityVO): boolean {
    if (maintenanceEligibilityResult.migratedToFox === MaintenanceEligibility.TRUE
      && maintenanceEligibilityResult.eligibleSpecialHandlingCode === MaintenanceEligibility.TRUE
      && maintenanceEligibilityResult.eligibleQualityCode === MaintenanceEligibility.TRUE
      && maintenanceEligibilityResult.eligibleAccountLockStatus === MaintenanceEligibility.TRUE) {
      if (maintenanceEligibilityResult.eligibleCrossReferenceMaint === MaintenanceEligibility.TRUE) {
        this.isCrossRefActive = true;
      }
      if (maintenanceEligibilityResult.eligibleUpdateEOB === MaintenanceEligibility.TRUE) {
        this.isUpdateEobActive = true;
      }
      if (maintenanceEligibilityResult.eligibleTransferClaim === MaintenanceEligibility.TRUE) {
        this.isTransferClaimActive = true;
      }
      if (maintenanceEligibilityResult.eligibleReactivateClaim === MaintenanceEligibility.TRUE) {
        this.isReactive = true;
      }
      if (maintenanceEligibilityResult.eligibleDeleteClaim === MaintenanceEligibility.TRUE) {
        this.isClaimDeleted = true;
      }
      if (maintenanceEligibilityResult.eligibleSuspendSameDay === MaintenanceEligibility.TRUE) {
        this.isSuspend = true;
      }
      return false;
    } else {
      return true;
    }
  }

  generateLetter(indicator): void {
    this.iWriteLetterSrv.memberNumber = this.memberNum;
    this.iWriteLetterSrv.claimNumber = this.claimNumber;
    this.iWriteLetterSrv.templateName = indicator;
    this.iWriteLetterSrv.generateLetter();
  }

  determineSendReplaceEobRaEligibility(sendReplaceIndicator): void {
    this.sendReplaceModalVisible = false;
    this.enableSendReplace = false;
    this.responseMsg = '';
    this.messageBoxService.reset();
    const res = this.claimHistorySearchApi.determineSendReplaceEobRaEligibility(+this.claimNumber, uuid(), sendReplaceIndicator);
    res.subscribe(eligibilityCheckResult => {
      if (eligibilityCheckResult) {
        this.processEobResult(eligibilityCheckResult);
      }
    }, (e) => {
      this.sendReplaceModalVisible = false;
      if (e.status === 404) {
        this.messageBoxService.addMessageBox('No results found', MessageBoxType.ERROR, sendReplaceIndicator + ' EOB');
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

  menuClicked(item): void {
    this.pageHeaderService.emitBtnClickEvent(item);
  }

  get isF2284Enabled(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F2284');
  }

  get isF2303Enabled(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F2303');
  }

  get isF2286Enabled(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F2286');
  }

  get isF2288Enabled(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F2288');
  }

  get isF2287Enabled(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F2287');
  }

  get isF2598Enabled(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F2598');
  }
}
