import {AuthorityMessage} from './authority-message.model';
import {BlockedPlansInd} from './blocked-plans-ind.model';
import {ChargeTableCounter} from './charge-table-counter.model';
import {ClaimDisplay} from './claim-display.model';
import {ContestabilityCautionLine} from './contestability-caution-line.model';
import {ErisaCaution43Message} from './erisa-caution43-message.model';
import {EspPlans} from './esp-plans.model';
import {GracePeriodCaution} from './grace-period-caution.model';
import {MedicaidCautionLine} from './medicaid-caution-line.model';
import {MedicaidCautionLine2} from './medicaid-caution-line2.model';
import {NonAuthorizedLine} from './non-authorized-line.model';
import {NonSupportedLine} from './non-supported-line.model';
import {OverrideKey} from './override-key.model';
import {ReturnCdeErrorMessage} from './return-cde-error-message.model';
import {RpdiskqbNotfndMsg} from './rpdiskqb-notfnd-msg.model';
import {SaveCharges} from './save-charges.model';
import {ShcErrorMsg1} from './shc-error-msg1.model';
import {ShcErrorMsg2} from './shc-error-msg2.model';
import {ShcErrorMsg3} from './shc-error-msg3.model';
import {StateCaution} from './state-caution.model';
import {SuspendCaution} from './suspend-caution.model';
import {SuspendCommunCaution} from './suspend-commun-caution.model';
import {SuspendMsg} from './suspend-msg.model';
import {TheClaimNo} from './the-claim-no.model';
import {UlHoldCoveragePeriod} from './ul-hold-coverage-period.model';
import {UlPlanTable} from './ul-plan-table.model';
import {WsJulianDateFields} from './ws-julian-date-fields.model';
import {WsPlanCodeData} from './ws-plan-code-data.model';
import {WsPlanTosInformation} from './ws-plan-tos-information.model';
import {WsQueueName} from './ws-queue-name.model';
import {WsTsqCriticalErrorMsg} from './ws-tsq-critical-error-msg.model';
import {WsTsqErrorMsg} from './ws-tsq-error-msg.model';
import {WsUtsqName} from './ws-utsq-name.model';
/**
 * Model class WorkArea
 * Path: screenbean/procclmtos/beansws
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmtos::beansWs::WorkArea
 * Legacy Mapping: WORK-AREA
 */
export class WorkArea {
  commandEnteredInd = '';
  clearEnteredInd = '';
  pf4Ind = '';
  pf6Ind = '';
  errorInd = '';
  planIsFound = '';
  planIsOld = '';
  planIsOldCheckDone = '';
  firstTimeThruInd = '';
  dontCautionInd = '';
  dontSendCaut50 = '';
  wsPrevPlan = '';
  mapPlanFound = '';
  texasFound = '';
  preventivePlanFound = '';
  abortClaim = '';
  blockedPlansInds: BlockedPlansInd[] = [];
  activePlanBlocked = '';
  activePlanNotBlocked = '';
  partActivePlanBlocked = '';
  dosPriorBlockedPlan = '';
  paragr1500Done = '';
  paragr4755Done = '';
  paragr5170Done = '';
  paragr5171Done = '';
  dontSendNonbypassPlanMsg = '';
  authPlanCtr = 0;
  duplicateFound = '';
  cautionFound = '';
  sentComboMessage = '';
  readRpdiskdu = '';
  readRpdiskdg = '';
  wsQuotient = 0;
  wsRemainder = 0;
  wsMonth = 0;
  wsLeapYear = 0;
  wsCcyy = 0;
  wsYear = 0;
  wsInterestDays = 0;
  wsQueueName = new WsQueueName();
  wsUtsqName = new WsUtsqName();
  wsTimelySubDateMm = 0;
  planCount = 0;
  wsLeCautionMax = 0;
  wsHubPlanEffectDate = '';
  wsHubPlanEffDateCcyymmdd = '';
  wsHubPlanTermDate = '';
  wsHubPlanTermDateCcyymmdd = '';
  wsMedServFromCcyymmdd = '';
  wsMedServToCcyymmdd = '';
  wsMedicaidDate = '';
  wsMsStartDate = '';
  wsMsStopDate = '';
  wsClaimServFromDate = '';
  wsClaimServToDate = '';
  wsErisaDispStartDate = '';
  wsErisaDispStopDate = '';
  holdPlan = '';
  saveLagDays = 0;
  standardPlan = '';
  holdCautionNumber = 0;
  holdCautionVariable = '';
  wsPEMonths = 0;
  screenDate = '';
  screenDate2 = '';
  planEffDateYmd = '';
  planEffDateYmd1 = '';
  planEffDateYmd2 = '';
  planTermDateYyyymmdd = '';
  planExtendTermDateYmd = '';
  wsPlanExtendTermDateMdy = '';
  serviceFromDateYyyymmdd = '';
  serviceToDateYmd = '';
  tobServiceFromCcyymmdd = '';
  tobServiceToCcyymmdd = '';
  wsJulianDateCcyyddd = '';
  wsGregDateCcyy = '';
  wsGregDateYymmdd = '';
  wsMedselectDataCcyymmdd = '';
  wsUhcMedselectStartDate = '';
  wsPlanEffDateMdy = '';
  wsPlanEffDateMdyR = '';
  wsPlanTermDateMdy = '';
  wsPlanTermDateMdyR = '';
  wsPlanEffDateCcyymmdd = '';
  wsPlanTermDateCcyymmdd = '';
  workDateFromCcyymmdd = '';
  workDateToCcyymmdd = '';
  wsGraceMmddyy = '';
  workDobCymd = '';
  workDateCymd = '';
  workDate = '';
  workDate2 = '';
  dateYymmdd = '';
  date2Yymmdd = '';
  contestableEndDate = '';
  refDateArea = '';
  holdComCurrentDate = '';
  curJulianDate = '';
  lesJulDate = '';
  lesGregDate = '';
  wsIntegTermDate = '';
  wsIntegServFromDate = '';
  diffDays = 0;
  link7o20BmDateS8 = 0;
  link7o20BmDateE8 = 0;
  nyPecePlanEffDate = '';
  nyPecePlanTermDate = '';
  nyBuyInd = '';
  nyServInd = '';
  wsAddrDepdInd = '';
  wsAddrHistState = '';
  wsAddrHistStartCcyymmdd = '';
  wsAddrHistStopCcyymmdd = '';
  saveYear1 = 0;
  saveYear2 = 0;
  savePlanEffDatePlusOne = 0;
  dob = 0;
  age = 0;
  saveAlternateIndex = 0;
  claimNumDays = 0;
  yearDivide = 0;
  leapChk = 0;
  leapYr = 0;
  saveSuspendLocation = 0;
  wsSuspClaimsCnt = 0;
  wsSuspCorrCnt = 0;
  wsStateCautionCnt = 0;
  wsState = '';
  wsHhState = '';
  determin65 = 0;
  wsYy = 0;
  wsTosSw = '';
  onlyLtcSw = '';
  workTosStartDate = '';
  workTosStopDate = '';
  haveReadInd = '';
  whEffectiveDate = 0;
  whTermDate = 0;
  whExtendTermDate = 0;
  whTermReason = '';
  wsTosPlanType = '';
  foundTosB = '';
  foundTosS = '';
  tosMatch = '';
  onlyExcptProcess = '';
  wsFound = '';
  wsCaut60 = '';
  completeInd = '';
  wsAddrHistExceptTos = '';
  wsPoint2s: number[] = [];
  wsPlanTosInformations: WsPlanTosInformation[] = [];
  wsPlanCodeData = new WsPlanCodeData();
  wkPlan = '';
  espPlans: EspPlans[] = [];
  wsErisaPosApply = '';
  benModIndicator = '';
  wsMedsupPlan = '';
  wsDispCaution42 = '';
  wsDispCaution43 = '';
  primeClaimNo9 = 0;
  wsConvYymm = 0;
  wsBuildAcctNo = '';
  wsBuildClmNo = '';
  wsUnder65Ind = '';
  wsHbTypeSw = '';
  theClaimNo = new TheClaimNo();
  claimDisplay = new ClaimDisplay();
  wsLocationSite = 0;
  wsTempLocations = 0;
  profChargeCntComplete = '';
  chargeTableCounter = new ChargeTableCounter();
  holdTime = '';
  startTimeInMinutes = 0;
  endTimeInMinutes = 0;
  totalMinutes = 0;
  workPlanCode1 = '';
  workPlanCode2 = '';
  stateCaution = new StateCaution();
  suspendCaution = new SuspendCaution();
  suspendCommunCaution = new SuspendCommunCaution();
  gracePeriodCaution = new GracePeriodCaution();
  erisaCaution43Message = new ErisaCaution43Message();
  wsTsqCriticalErrorMsg = new WsTsqCriticalErrorMsg();
  wsTsqErrorMsg = new WsTsqErrorMsg();
  nonSupportedLine = new NonSupportedLine();
  nonAuthorizedLine = new NonAuthorizedLine();
  authorityMessage = new AuthorityMessage();
  shcErrorMsg1 = new ShcErrorMsg1();
  shcErrorMsg2 = new ShcErrorMsg2();
  shcErrorMsg3 = new ShcErrorMsg3();
  contestabilityCautionLine = new ContestabilityCautionLine();
  screenMsg = '';
  saveTosSelection = 0;
  saveTosSelectionR = '';
  medicaidCautionLine = new MedicaidCautionLine();
  medicaidCautionLine2 = new MedicaidCautionLine2();
  saveCharges = new SaveCharges();
  lowestSaveCharge = '';
  wsSelection = '';
  returnCdeErrorMessage = new ReturnCdeErrorMessage();
  rpdiskqbNotfndMsg = new RpdiskqbNotfndMsg();
  suspendMsg = new SuspendMsg();
  espSub = 0;
  espSub1 = 0;
  leCautionSub = 0;
  leReSub = 0;
  msSub = 0;
  peSub = 0;
  pseSub = 0;
  seSub = 0;
  timelySub = 0;
  tobPlanSub = 0;
  subMonth = 0;
  subYear = 0;
  planBrightInd = '';
  tosBrightInd = '';
  mapRxBrightInd = '';
  serviceErrorInd = '';
  endOfHistoryInd = '';
  claimFoundInd = '';
  readingBillsInd = '';
  aciQueueExistsInd = '';
  lookForSuspClaimsInd = '';
  haveReadTempStorageInd = '';
  errorPlanInd = '';
  dateErr = '';
  invalidChargeInd = '';
  inconsistentChargeInd = '';
  displayScreenInd = '';
  ageInd = '';
  preExistInd = '';
  sendSelectionCautionInd = '';
  matchingSelectionFndInd = '';
  suspMatchFoundInd = '';
  communNotFoundInd = '';
  letterNotFoundInd = '';
  planNotTermedInd = '';
  rpdiskcvFoundInd = '';
  sendHospRiderWarningInd = '';
  hospRiderInd = '';
  mapPlanInd = '';
  espPlanInd = '';
  checkIfHapPlan = '';
  cyReadIndicator = '';
  activePpoPlanFoundInd = '';
  exceptionPlanInd = '';
  planTypeInd = '';
  planEligInd = '';
  planDatesEligInd = '';
  fromLetterParaInd = '';
  sendLeReWarningInd = '';
  wsM22icpai = '';
  wsLegalEntityCautionInd = '';
  wsTypeChargeSearchInd = '';
  finishedQueueLoopSw = '';
  wsClaimSelection = '';
  wsLegalEntityCaution = '';
  stateInterestKey = '';
  clericalStatKey = 0;
  operatorKey = 0;
  overrideKey = new OverrideKey();
  wsJulianDateFields = new WsJulianDateFields();
  ulNoCoverageInd = '';
  ulUnpaidNewEnrInd = '';
  ulUnpaidLapserInd = '';
  ulFutureTermDate = '';
  ulBypassMsgInd = '';
  ulEarliestEffDate = 0;
  ulLatestTermDate = 0;
  ulHoldSub = 0;
  ulHoldCoveragePeriods: UlHoldCoveragePeriod[] = [];
  ulPlanTables: UlPlanTable[] = [];
  wsAddedDays = 0;
  wsWhatDayItIs = 0;
  wsResultField = 0;
  wsNoOfDaysToFri = 0;
  wsNewDayTotal = 0;
  wsHoldDays = 0;
  wsHoldDaysRemainder = 0;
  wsStateIntDiff = 0;
  wsActualWorkDays = 0;
  nonbypassCautionReason = '';
  nonbypassPlanReason = '';
  nonbypassStateReason = '';
  nonbypassTosReason = '';
  nonbypassDosReason = '';
  nonbypassAcceptReason = '';
  tosValued = '';
  dosValued = '';
  cautionValued = '';
  planValued = '';
  stateValued = '';
  acceptValued = '';
  wsSk1Suffix = '';
  wsSk1Prefix = '';
  wsSk1Termid = '';
  wsQk1Suffix = '';
  wsQk1Prefix = '';
  wsQk1Termid = '';
  wsTableDateCcyymmdd = 0;
  screenTermDateMm = '';
  screenTermSlash1 = '';
  screenTermDateDd = '';
  screenTermSlash2 = '';
  screenTermDateYy = '';
  screenTermHyphen = '';
  screenTermReason = '';
  planEffectYy = 0;
  planEffectMm = 0;
  planTerminYy = 0;
  planTerminMm = 0;
  bmPlanPos1 = '';
  bmPlanPos2 = '';
  wsPlanPos1 = '';
  wsPlanPos2 = '';
  deceasedDateMessage = '';
  hospWarningMsg1 = '';
  hospWarningMsg2 = '';
  medselWarningMsg1filler1 = '';
  medselWarningMsg1filler2 = '';
  medselWarningMsg2filler1 = '';
  medselWarningMsg2filler2 = '';
  dependentSponsorDodFiller1 = '';
  dependentSponsorDodFiller2 = '';
  caution40MessageFiller1 = '';
  caution40MessageFiller2 = '';
  interestWarningLineFiller1 = '';
  interestWarningLineFiller2 = '';
  interestAssignedWarningFiller1 = '';
  interestAssignedWarningFiller2 = '';
  interestPlantypeWarningFiller1 = '';
  interestPlantypeWarningFiller2 = '';
  interestMultipleWarningFiller1 = '';
  interestMultipleWarningFiller2 = '';
  variationStateCautionFiller1 = '';
  variationStateCautionFiller2 = '';
  bloodDeductibleCautionFiller1 = '';
  bloodDeductibleCautionFiller2 = '';
  leReSplitCaution = '';
  interestCautionPromptInv = '';
  dateDenialMessage = '';
  ppoCaution45Message = '';
  eaPtdCaution44Message = '';
  erisaCaution42Message = '';
  hubCriticalErrorMessage = '';
  tsqCriticalErrorMessage = '';
  nopayWarningLine = '';
  comboMessage = '';
  planCodeKey = '';
  asscKey = '';
  clmNo1 = '';
  clmNo2 = '';
  clmNo3 = '';
  clmNo4 = '';
  clmNo5 = '';
  clmNo6 = '';
  wsGregDate = 0;
  wsGregDateYmd = 0;
  wsGregDate1Ymd = 0;
  ulServiceFromYy = 0;
  ulServiceFromMm = 0;
  ulServiceToYy = 0;
  ulServiceToMm = 0;
  ulPaidThruYy = 0;
  ulPaidThruMm = 0;

  public isErisaPosApply(): boolean {
    const erisaPosApply = false;
    let initValue: string = '';
    initValue = 'Y';
    return erisaPosApply;
  }

  public setErisaPosApply(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.wsErisaPosApply = initValue;
  }

  public isInsuredHasBenMod(): boolean {
    const insuredHasBenMod = false;
    let initValue: string = '';
    initValue = 'Y';
    return insuredHasBenMod;
  }

  public setInsuredHasBenMod(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.benModIndicator = initValue;
  }

  public isInsuredHasNoBenMod(): boolean {
    const insuredHasNoBenMod = false;
    let initValue: string = '';
    initValue = 'N';
    return insuredHasNoBenMod;
  }

  public setInsuredHasNoBenMod(): void {
    let initValue: string = '';
    initValue = 'N';
    this.benModIndicator = initValue;
  }

  public isMedsupPlanFound(): boolean {
    const medsupPlanFound = false;
    let initValue: string = '';
    initValue = 'Y';
    return medsupPlanFound;
  }

  public setMedsupPlanFound(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.wsMedsupPlan = initValue;
  }

  public isElectClaimSite(): boolean {
    let electClaimSite = false;
    let cEnableValue_0 = 0;
    let cEnableValue_1 = 0;
    let cEnableValue_2 = 0;
    let cEnableValue_3 = 0;
    let cEnableValue_4 = 0;
    let cEnableValue_5 = 0;
    cEnableValue_0 = Number(3);
    cEnableValue_1 = Number(4);
    cEnableValue_2 = Number(5);
    cEnableValue_3 = Number(6);
    cEnableValue_4 = Number(7);
    cEnableValue_5 = Number(9);
    electClaimSite = (cEnableValue_0 === this.wsLocationSite || cEnableValue_1 === this.wsLocationSite || cEnableValue_2 === this.wsLocationSite || cEnableValue_3 === this.wsLocationSite || cEnableValue_4 === this.wsLocationSite || cEnableValue_5 === this.wsLocationSite);
    return electClaimSite;
  }

  public setElectClaimSite(): void {
    let initValue: number;
    initValue = Number(3);
    this.wsLocationSite = initValue;
  }

  public isPaperClaimSite(): boolean {
    let paperClaimSite = false;
    let cEnableValue_0_cMin = 0;
    let cEnableValue_0_cMax = 0;
    let cEnableValue_1 = 0;
    cEnableValue_0_cMin = Number(0);
    cEnableValue_0_cMax = Number(2);
    cEnableValue_1 = Number(8);
    paperClaimSite = ((cEnableValue_0_cMin <= this.wsLocationSite && cEnableValue_0_cMax >= this.wsLocationSite) || cEnableValue_1 === this.wsLocationSite);
    return paperClaimSite;
  }

  public setPaperClaimSite(): void {
    let initValue: number;
    initValue = Number(0);
    this.wsLocationSite = initValue;
  }

  public isWsTempLoc(): boolean {
    let wsTempLoc = false;
    let cEnableValue_0 = 0;
    let cEnableValue_1 = 0;
    let cEnableValue_2 = 0;
    let cEnableValue_3 = 0;
    let cEnableValue_4 = 0;
    let cEnableValue_5 = 0;
    let cEnableValue_6 = 0;
    let cEnableValue_7 = 0;
    let cEnableValue_8 = 0;
    let cEnableValue_9 = 0;
    cEnableValue_0 = Number(106);
    cEnableValue_1 = Number(116);
    cEnableValue_2 = Number(126);
    cEnableValue_3 = Number(136);
    cEnableValue_4 = Number(146);
    cEnableValue_5 = Number(156);
    cEnableValue_6 = Number(166);
    cEnableValue_7 = Number(176);
    cEnableValue_8 = Number(186);
    cEnableValue_9 = Number(196);
    wsTempLoc = (cEnableValue_0 === this.wsTempLocations || cEnableValue_1 === this.wsTempLocations || cEnableValue_2 === this.wsTempLocations || cEnableValue_3 === this.wsTempLocations || cEnableValue_4 === this.wsTempLocations || cEnableValue_5 === this.wsTempLocations || cEnableValue_6 === this.wsTempLocations || cEnableValue_7 === this.wsTempLocations || cEnableValue_8 === this.wsTempLocations || cEnableValue_9 === this.wsTempLocations);
    return wsTempLoc;
  }

  public setWsTempLoc(): void {
    let initValue: number;
    initValue = Number(106);
    this.wsTempLocations = initValue;
  }

  public isEndOfHistory(): boolean {
    const endOfHistory = false;
    let initValue: string = '';
    initValue = 'Y';
    return endOfHistory;
  }

  public setEndOfHistory(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.endOfHistoryInd = initValue;
  }

  public isClaimFound(): boolean {
    const claimFound = false;
    const initValue: string = '';
    return claimFound;
  }

  public setClaimFound(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.claimFoundInd = initValue;
  }

  public isReadingBills(): boolean {
    const readingBills = false;
    let initValue: string = '';
    initValue = 'Y';
    return readingBills;
  }

  public setReadingBills(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.readingBillsInd = initValue;
  }

  public isAciQueueExists(): boolean {
    const aciQueueExists = false;
    let initValue: string = '';
    initValue = 'Y';
    return aciQueueExists;
  }

  public setAciQueueExists(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.aciQueueExistsInd = initValue;
  }

  public isAciQueueNotfnd(): boolean {
    const aciQueueNotfnd = false;
    let initValue: string = '';
    initValue = 'N';
    return aciQueueNotfnd;
  }

  public setAciQueueNotfnd(): void {
    let initValue: string = '';
    initValue = 'N';
    this.aciQueueExistsInd = initValue;
  }

  public isLookForSuspClaims(): boolean {
    const lookForSuspClaims = false;
    let initValue: string = '';
    initValue = 'Y';
    return lookForSuspClaims;
  }

  public setLookForSuspClaims(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.lookForSuspClaimsInd = initValue;
  }

  public isHaveReadTempStorage(): boolean {
    const haveReadTempStorage = false;
    let initValue: string = '';
    initValue = 'Y';
    return haveReadTempStorage;
  }

  public setHaveReadTempStorage(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.haveReadTempStorageInd = initValue;
  }

  public isHaveNotReadTempStorage(): boolean {
    const haveNotReadTempStorage = false;
    let initValue: string = '';
    initValue = 'N';
    return haveNotReadTempStorage;
  }

  public setHaveNotReadTempStorage(): void {
    let initValue: string = '';
    initValue = 'N';
    this.haveReadTempStorageInd = initValue;
  }

  public isPlanWarning(): boolean {
    const planWarning = false;
    let initValue: string = '';
    initValue = 'Y';
    return planWarning;
  }

  public setPlanWarning(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.errorPlanInd = initValue;
  }

  public isInvalidDate(): boolean {
    const invalidDate = false;
    let initValue: string = '';
    initValue = 'Y';
    return invalidDate;
  }

  public setInvalidDate(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.dateErr = initValue;
  }

  public isFirstInvalidCharge(): boolean {
    const firstInvalidCharge = false;
    let initValue: string = '';
    initValue = 'N';
    return firstInvalidCharge;
  }

  public setFirstInvalidCharge(): void {
    let initValue: string = '';
    initValue = 'N';
    this.invalidChargeInd = initValue;
  }

  public isFirstInconsistentCharge(): boolean {
    const firstInconsistentCharge = false;
    let initValue: string = '';
    initValue = 'N';
    return firstInconsistentCharge;
  }

  public setFirstInconsistentCharge(): void {
    let initValue: string = '';
    initValue = 'N';
    this.inconsistentChargeInd = initValue;
  }

  public isDisplayScreen(): boolean {
    const displayScreen = false;
    let initValue: string = '';
    initValue = 'Y';
    return displayScreen;
  }

  public setDisplayScreen(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.displayScreenInd = initValue;
  }

  public isOver65(): boolean {
    const over65 = false;
    let initValue: string = '';
    initValue = '0';
    return over65;
  }

  public setOver65(): void {
    let initValue: string = '';
    initValue = '0';
    this.ageInd = initValue;
  }

  public isUnder65(): boolean {
    const under65 = false;
    let initValue: string = '';
    initValue = '1';
    return under65;
  }

  public setUnder65(): void {
    let initValue: string = '';
    initValue = '1';
    this.ageInd = initValue;
  }

  public isPreExistPrinted(): boolean {
    const preExistPrinted = false;
    let initValue: string = '';
    initValue = 'Y';
    return preExistPrinted;
  }

  public setPreExistPrinted(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.preExistInd = initValue;
  }

  public isSendSelectionCaution(): boolean {
    const sendSelectionCaution = false;
    let initValue: string = '';
    initValue = 'Y';
    return sendSelectionCaution;
  }

  public setSendSelectionCaution(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.sendSelectionCautionInd = initValue;
  }

  public isMatchingSelectionFnd(): boolean {
    const matchingSelectionFnd = false;
    let initValue: string = '';
    initValue = 'Y';
    return matchingSelectionFnd;
  }

  public setMatchingSelectionFnd(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.matchingSelectionFndInd = initValue;
  }

  public isSuspMatchFound(): boolean {
    const suspMatchFound = false;
    let initValue: string = '';
    initValue = 'Y';
    return suspMatchFound;
  }

  public setSuspMatchFound(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.suspMatchFoundInd = initValue;
  }

  public isAllPlansTermed(): boolean {
    const allPlansTermed = false;
    let initValue: string = '';
    initValue = '';
    return allPlansTermed;
  }

  public setAllPlansTermed(): void {
    let initValue: string = '';
    initValue = '';
    this.planNotTermedInd = initValue;
  }

  public isRpdiskcvNotFound(): boolean {
    const rpdiskcvNotFound = false;
    let initValue: string = '';
    initValue = 'N';
    return rpdiskcvNotFound;
  }

  public setRpdiskcvNotFound(): void {
    let initValue: string = '';
    initValue = 'N';
    this.rpdiskcvFoundInd = initValue;
  }

  public isSendHospRiderWarning(): boolean {
    const sendHospRiderWarning = false;
    let initValue: string = '';
    initValue = 'Y';
    return sendHospRiderWarning;
  }

  public setSendHospRiderWarning(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.sendHospRiderWarningInd = initValue;
  }

  public isMapPlanX(): boolean {
    const mapPlanX = false;
    let initValue: string = '';
    initValue = 'X0';
    return mapPlanX;
  }

  public setMapPlanX(): void {
    let initValue: string = '';
    initValue = 'X0';
    this.mapPlanInd = initValue;
  }

  public isMapPlanY(): boolean {
    let mapPlanY = false;
    let cEnableValue_0 = '';
    let cEnableValue_1 = '';
    let cEnableValue_2 = '';
    let cEnableValue_3 = '';
    let cEnableValue_4 = '';
    cEnableValue_0 = 'Y0';
    cEnableValue_1 = 'Y1';
    cEnableValue_2 = 'Y2';
    cEnableValue_3 = 'Y3';
    cEnableValue_4 = 'Y4';
    mapPlanY = (cEnableValue_0 === this.mapPlanInd || cEnableValue_1 === this.mapPlanInd || cEnableValue_2 === this.mapPlanInd || cEnableValue_3 === this.mapPlanInd || cEnableValue_4 === this.mapPlanInd);
    return mapPlanY;
  }

  public setMapPlanY(): void {
    let initValue: string = '';
    initValue = 'Y0';
    this.mapPlanInd = initValue;
  }

  public isMapPlanZ(): boolean {
    let mapPlanZ = false;
    let cEnableValue_0 = '';
    let cEnableValue_1 = '';
    let cEnableValue_2 = '';
    let cEnableValue_3 = '';
    let cEnableValue_4 = '';
    cEnableValue_0 = 'Z0';
    cEnableValue_1 = 'Z1';
    cEnableValue_2 = 'Z2';
    cEnableValue_3 = 'Z3';
    cEnableValue_4 = 'Z4';
    mapPlanZ = (cEnableValue_0 === this.mapPlanInd || cEnableValue_1 === this.mapPlanInd || cEnableValue_2 === this.mapPlanInd || cEnableValue_3 === this.mapPlanInd || cEnableValue_4 === this.mapPlanInd);
    return mapPlanZ;
  }

  public setMapPlanZ(): void {
    let initValue: string = '';
    initValue = 'Z0';
    this.mapPlanInd = initValue;
  }

  public isMapPlan9(): boolean {
    let mapPlan9 = false;
    let cEnableValue_0 = '';
    let cEnableValue_1 = '';
    let cEnableValue_2 = '';
    cEnableValue_0 = 'X9';
    cEnableValue_1 = 'Y9';
    cEnableValue_2 = 'Z9';
    mapPlan9 = (cEnableValue_0 === this.mapPlanInd || cEnableValue_1 === this.mapPlanInd || cEnableValue_2 === this.mapPlanInd);
    return mapPlan9;
  }

  public setMapPlan9(): void {
    let initValue: string = '';
    initValue = 'X9';
    this.mapPlanInd = initValue;
  }

  public isEspPlan(): boolean {
    let espPlan = false;
    let cEnableValue_0 = '';
    let cEnableValue_1 = '';
    let cEnableValue_2 = '';
    let cEnableValue_3 = '';
    let cEnableValue_4 = '';
    let cEnableValue_5 = '';
    let cEnableValue_6 = '';
    let cEnableValue_7 = '';
    let cEnableValue_8 = '';
    let cEnableValue_9 = '';
    cEnableValue_0 = 'JB';
    cEnableValue_1 = 'JC';
    cEnableValue_2 = 'JD';
    cEnableValue_3 = 'JE';
    cEnableValue_4 = 'JF';
    cEnableValue_5 = 'JG';
    cEnableValue_6 = 'JH';
    cEnableValue_7 = 'JI';
    cEnableValue_8 = 'JJ';
    cEnableValue_9 = 'JK';
    espPlan = (cEnableValue_0 === this.espPlanInd || cEnableValue_1 === this.espPlanInd || cEnableValue_2 === this.espPlanInd || cEnableValue_3 === this.espPlanInd || cEnableValue_4 === this.espPlanInd || cEnableValue_5 === this.espPlanInd || cEnableValue_6 === this.espPlanInd || cEnableValue_7 === this.espPlanInd || cEnableValue_8 === this.espPlanInd || cEnableValue_9 === this.espPlanInd);
    return espPlan;
  }

  public setEspPlan(): void {
    let initValue: string = '';
    initValue = 'JB';
    this.espPlanInd = initValue;
  }

  public isHapPlan(): boolean {
    let hapPlan = false;
    let cEnableValue_0 = '';
    let cEnableValue_1 = '';
    let cEnableValue_2 = '';
    let cEnableValue_3 = '';
    let cEnableValue_4 = '';
    let cEnableValue_5 = '';
    cEnableValue_0 = 'BA';
    cEnableValue_1 = 'BB';
    cEnableValue_2 = 'BC';
    cEnableValue_3 = '@@';
    cEnableValue_4 = '##';
    cEnableValue_5 = '++';
    hapPlan = (cEnableValue_0 === this.checkIfHapPlan || cEnableValue_1 === this.checkIfHapPlan || cEnableValue_2 === this.checkIfHapPlan || cEnableValue_3 === this.checkIfHapPlan || cEnableValue_4 === this.checkIfHapPlan || cEnableValue_5 === this.checkIfHapPlan);
    return hapPlan;
  }

  public setHapPlan(): void {
    let initValue: string = '';
    initValue = 'BA';
    this.checkIfHapPlan = initValue;
  }

  public isCyWasRead(): boolean {
    const cyWasRead = false;
    let initValue: string = '';
    initValue = 'Y';
    return cyWasRead;
  }

  public setCyWasRead(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.cyReadIndicator = initValue;
  }

  public isActivePpoPlanFound(): boolean {
    const activePpoPlanFound = false;
    let initValue: string = '';
    initValue = 'Y';
    return activePpoPlanFound;
  }

  public setActivePpoPlanFound(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.activePpoPlanFoundInd = initValue;
  }

  public isActivePpoPlanNotFound(): boolean {
    const activePpoPlanNotFound = false;
    let initValue: string = '';
    initValue = 'N';
    return activePpoPlanNotFound;
  }

  public setActivePpoPlanNotFound(): void {
    let initValue: string = '';
    initValue = 'N';
    this.activePpoPlanFoundInd = initValue;
  }

  public isExceptionPlanFound(): boolean {
    const exceptionPlanFound = false;
    let initValue: string = '';
    initValue = 'Y';
    return exceptionPlanFound;
  }

  public setExceptionPlanFound(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.exceptionPlanInd = initValue;
  }

  public isExceptionPlanNotFound(): boolean {
    const exceptionPlanNotFound = false;
    let initValue: string = '';
    initValue = 'N';
    return exceptionPlanNotFound;
  }

  public setExceptionPlanNotFound(): void {
    let initValue: string = '';
    initValue = 'N';
    this.exceptionPlanInd = initValue;
  }

  public isPlanTypeFound(): boolean {
    const planTypeFound = false;
    let initValue: string = '';
    initValue = 'Y';
    return planTypeFound;
  }

  public setPlanTypeFound(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.planTypeInd = initValue;
  }

  public isPlanTypeNotFound(): boolean {
    const planTypeNotFound = false;
    let initValue: string = '';
    initValue = 'N';
    return planTypeNotFound;
  }

  public setPlanTypeNotFound(): void {
    let initValue: string = '';
    initValue = 'N';
    this.planTypeInd = initValue;
  }

  public isPlanElig(): boolean {
    const planElig = false;
    let initValue: string = '';
    initValue = 'Y';
    return planElig;
  }

  public setPlanElig(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.planEligInd = initValue;
  }

  public isPlanNotElig(): boolean {
    const planNotElig = false;
    let initValue: string = '';
    initValue = 'N';
    return planNotElig;
  }

  public setPlanNotElig(): void {
    let initValue: string = '';
    initValue = 'N';
    this.planEligInd = initValue;
  }

  public isPlanDatesElig(): boolean {
    const planDatesElig = false;
    let initValue: string = '';
    initValue = 'Y';
    return planDatesElig;
  }

  public setPlanDatesElig(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.planDatesEligInd = initValue;
  }

  public isPlanDatesNotElig(): boolean {
    const planDatesNotElig = false;
    let initValue: string = '';
    initValue = 'N';
    return planDatesNotElig;
  }

  public setPlanDatesNotElig(): void {
    let initValue: string = '';
    initValue = 'N';
    this.planDatesEligInd = initValue;
  }

  public isFromLetterPara(): boolean {
    const fromLetterPara = false;
    let initValue: string = '';
    initValue = 'Y';
    return fromLetterPara;
  }

  public setFromLetterPara(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.fromLetterParaInd = initValue;
  }

  public isSendLeReWarningYes(): boolean {
    const sendLeReWarningYes = false;
    let initValue: string = '';
    initValue = 'Y';
    return sendLeReWarningYes;
  }

  public setSendLeReWarningYes(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.sendLeReWarningInd = initValue;
  }

  public isSendLeReWarningNo(): boolean {
    const sendLeReWarningNo = false;
    let initValue: string = '';
    initValue = 'N';
    return sendLeReWarningNo;
  }

  public setSendLeReWarningNo(): void {
    let initValue: string = '';
    initValue = 'N';
    this.sendLeReWarningInd = initValue;
  }

  public isValidM22icpaiResponse(): boolean {
    let validM22icpaiResponse = false;
    let cEnableValue_0 = '';
    let cEnableValue_1 = '';
    cEnableValue_0 = 'Y';
    cEnableValue_1 = 'N';
    validM22icpaiResponse = (cEnableValue_0 === this.wsM22icpai || cEnableValue_1 === this.wsM22icpai);
    return validM22icpaiResponse;
  }

  public setValidM22icpaiResponse(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.wsM22icpai = initValue;
  }

  public isIGotLegalEntityCaution(): boolean {
    const iGotLegalEntityCaution = false;
    let initValue: string = '';
    initValue = 'Y';
    return iGotLegalEntityCaution;
  }

  public setIGotLegalEntityCaution(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.wsLegalEntityCautionInd = initValue;
  }

  public isIDontHaveLegalEntCaution(): boolean {
    const iDontHaveLegalEntCaution = false;
    let initValue: string = '';
    initValue = 'N';
    return iDontHaveLegalEntCaution;
  }

  public setIDontHaveLegalEntCaution(): void {
    let initValue: string = '';
    initValue = 'N';
    this.wsLegalEntityCautionInd = initValue;
  }

  public isDoneTypeChargeSearch(): boolean {
    const doneTypeChargeSearch = false;
    let initValue: string = '';
    initValue = 'Y';
    return doneTypeChargeSearch;
  }

  public setDoneTypeChargeSearch(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.wsTypeChargeSearchInd = initValue;
  }

  public isNotDoneTypeChargeSearch(): boolean {
    const notDoneTypeChargeSearch = false;
    let initValue: string = '';
    initValue = 'N';
    return notDoneTypeChargeSearch;
  }

  public setNotDoneTypeChargeSearch(): void {
    let initValue: string = '';
    initValue = 'N';
    this.wsTypeChargeSearchInd = initValue;
  }

  public isFinishedQueueLoop(): boolean {
    const finishedQueueLoop = false;
    let initValue: string = '';
    initValue = 'Y';
    return finishedQueueLoop;
  }

  public setFinishedQueueLoop(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.finishedQueueLoopSw = initValue;
  }

  public isNotFinishedQueueLoop(): boolean {
    const notFinishedQueueLoop = false;
    let initValue: string = '';
    initValue = 'N';
    return notFinishedQueueLoop;
  }

  public setNotFinishedQueueLoop(): void {
    let initValue: string = '';
    initValue = 'N';
    this.finishedQueueLoopSw = initValue;
  }

  public isPayClaimSelection(): boolean {
    const payClaimSelection = false;
    let initValue: string = '';
    initValue = 'Y';
    return payClaimSelection;
  }

  public setPayClaimSelection(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.wsClaimSelection = initValue;
  }

  public isNopClaimSelection(): boolean {
    const nopClaimSelection = false;
    let initValue: string = '';
    initValue = 'N';
    return nopClaimSelection;
  }

  public setNopClaimSelection(): void {
    let initValue: string = '';
    initValue = 'N';
    this.wsClaimSelection = initValue;
  }
}
