import {BLTempStorQueue, HhcChrgLnTSQ} from '@fox/shared';
import {ABRBillsArea} from './abrbills-area.model';
import {ClaimTempStorage} from './claim-temp-storage.model';
import {CmnIOWrkArea} from './cmn-iowrk-area.model';
import {ExcludedInfo} from './excluded-info.model';
import {ForeignEligPlans} from './foreign-elig-plans.model';
import {PlanData1} from './plan-data1.model';
import {PlanData2} from './plan-data2.model';
import {WsPlanCodeTable} from './ws-plan-code-table.model';

/**
 * Model class WorkStorage
 * Path: screenbean/procclmhhcoohfgncov
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmhhcoohfgncov::WorkStorage
 * Legacy Mapping: WORK-AREAS
 */
export class WorkStorage {
  commandEnteredInd = '';
  modCommLength = 0;
  billCommLength = 0;
  claimQueueLength = 0;
  editSub = 0;
  outputSub = 0;
  saveSub = 0;
  compressSub = 0;
  decimalInd = '';
  validCharInd = '';
  compressErrorInd = '';
  wsIcdCode = '';
  wsIcdMapField1i = '';
  wsIcdMapField2i = '';
  wsIcdMapField3i = '';
  wsIcdCheckIndicator = '';
  wsIcdCicsExepInd = '';
  icdCodeValueInd = '';
  icdCodeErrorInd = '';
  icdCodeError2Ind = '';
  holdChRecNbr = 0;
  screenDate = '';
  screenDate2 = '';
  workDate = 0;
  saveSerDate = 0;
  saveLastFcFromDateYmd = 0;
  saveSerFromYmd = '';
  wkSrvDateYmd = '';
  saveSerToYmd = '';
  tosSerFromYmd = '';
  tosSerToYmd = '';
  saveTripStartYmd = '';
  saveTermDate = 0;
  save90TermDate = 0;
  saveEffDate = 0;
  saveEffDatePreEx = 0;
  saveTermDateMdy = 0;
  earliestEffDate = 0;
  latestTermDate = 0;
  beforeEffInd = '';
  afterTermInd = '';
  refDateArea = '';
  totalRefDd = 0;
  foreignMaxDays = 0;
  foreignWaitPeriod = 0;
  relatedTripNo = 0;
  wsLifetimePaidVisits = 0;
  wsDailyBenefit = 0;
  wsPaidVisits = 0;
  serviceDate = 0;
  dob = 0;
  insuredAge = 0;
  wsNoPayPlan = '';
  wsPlanFound = '';
  saveProvider = '';
  saveProvider9 = 0;
  wkDollarPlan = '';
  ageIndA = '';
  ageIndB = '';
  wsServFDate8 = '';
  wsServTDate8 = '';
  wsPlanEffDate6 = 0;
  wsPlanEffDate8 = '';
  wsPlanTermDate6 = 0;
  wsPlanTermDate8 = '';
  wkPlanEffDate = 0;
  wkPlanTermDate = 0;
  wkTestEffDate = 0;
  wkTestTermDate = 0;
  wkScreenSerDate = 0;
  benIncreasePlanInd = '';
  holdFyy = 0;
  holdTyy = 0;
  holdSpan = 0;
  bneJulYy = 0;
  bneJulDdd = 0;
  srfJulYy = 0;
  srfJulDdd = 0;
  bnsJulYy = 0;
  bnsJulDdd = 0;
  srtJulYy = 0;
  srtJulDdd = 0;
  remDays = 0;
  s1 = 0;
  s2 = 0;
  adjustDays = 0;
  saveDays = 0;
  errMsg = '';
  errCnt = 0;
  foreignCoverageHeading = '';
  excludedPlan = '';
  yearDivide = 0;
  leapChk = 0;
  savePlan = '';
  saveLagDays = 0;
  holdCautionNumber = 0;
  holdCautionVariable = '';
  wsDbDateFormat = '';
  wsTsqDateFormat = '';
  wsTsqDateFormat9 = 0;
  wsPlanCodeTables: WsPlanCodeTable[] = [];
  sub = 0;
  sub1 = 0;
  sub2 = 0;
  sub3 = 0;
  sub4 = 0;
  subz = 0;
  confSub = 0;
  initSub = 0;
  ddpSub = 0;
  psub = 0;
  sub7 = 0;
  foundSub = 0;
  sub254 = 0;
  screenSub = 0;
  eligSub = 0;
  securitySub = 0;
  planSub = 0;
  baseSub = 0;
  billSub = 0;
  pointerSub = 0;
  tableSub = 0;
  entrySub = 0;
  stSub1 = 0;
  stSub2 = 0;
  stSub3 = 0;
  hhTsqCt = 0;
  sortCtr1 = 0;
  sortCtr2 = 0;
  confCtr = 0;
  screenPlanCtr = 0;
  histSub = 0;
  serviceSub = 0;
  typeSub = 0;
  plSub = 0;
  plSub2 = 0;
  tosSub = 0;
  holdSub = 0;
  mapSub = 0;
  wsNopayCnt = 0;
  wsChargeCnt = 0;
  wsHhTsqResp = 0;
  wsBlTsqResp = 0;
  wsNopaySw = '';
  checkingBillsInd = '';
  endOfHistoryInd = '';
  haveReadTempStorageInd = '';
  firstTimeInd = '';
  invalidProInd = '';
  dateErr = '';
  termedPlanInd = '';
  ageRestrictionInd = '';
  pe1PlanInd = '';
  pe2PlanInd = '';
  servFromGoodInd = '';
  validExcludedPlanInd = '';
  calYrDaInd = '';
  calYrFcInd = '';
  oldFcPlanInd = '';
  newFcPlanInd = '';
  planFoundInd = '';
  fcInd2 = '';
  tosMatchInd = '';
  allowEligChargeInd = '';
  typeOfChargeInd = '';
  tosErrorInd = '';
  providerErrorInd = '';
  serFromErrorInd = '';
  serToErrorInd = '';
  spanErrorInd = '';
  annivErrorInd = '';
  nosErrorInd = '';
  elChargeErrorInd = '';
  chargeErrorInd = '';
  noPayErrorInd = '';
  noPayPlErrorInd = '';
  expenseErrorInd = '';
  preExistErrorInd = '';
  rtYearErrorInd = '';
  excludedPlanErrorInd = '';
  consistSerErrorInd = '';
  consSerAgeSplitErrInd = '';
  consistSerSplitErrorInd = '';
  serFStartDtErrInd = '';
  serviceTripStartErrInd = '';
  bencalcNopayErrInd = '';
  fcType260SplitInd = '';
  fcCal60WarningInd = '';
  fcSpan1st2MonthsInd = '';
  inconsistentFcDatesInd = '';
  validExcludedPlansInd = '';
  spanEffErrorInd = '';
  afterTermErrorInd = '';
  consistTypeError1Ind = '';
  consistTypeError1aInd = '';
  consistTypeError2Ind = '';
  consistTypeError3Ind = '';
  consistTypeError4Ind = '';
  consistServiceError1Ind = '';
  consistServiceError2Ind = '';
  consistServiceError3Ind = '';
  consistServiceError4Ind = '';
  termAfter89ErrorInd = '';
  nosError1Ind = '';
  nosError2Ind = '';
  nosError3Ind = '';
  nosError4Ind = '';
  nosError5Ind = '';
  chargeError1Ind = '';
  chargeError2Ind = '';
  consistPreErrorTermInd = '';
  consistPreExistErrorInd = '';
  consistPreExistMsgInd = '';
  maxPerProcErrorInd = '';
  serDErrorInd = '';
  serDT3ErrorInd = '';
  consistErrErrorInd = '';
  consistErrInd = '';
  fserviceFound = '';
  fcPlanFound = '';
  fcPlan2Found = '';
  fcPlan3Found = '';
  planEFound = '';
  planDDpFound = '';
  excludedPlanInd = '';
  tsqHhEofInd = '';
  tsqBlEofInd = '';
  csrChrgEofInd = '';
  csrIcdcEofInd = '';
  csrExclEofInd = '';
  bpWarningInd = '';
  fcInd = '';
  duplicateFoundInd = '';
  noPayPlanInd = '';
  alphanumericInd1 = '';
  alphanumericInd2 = '';
  doItAgainInd = '';
  mapPlanFoundInd = '';
  mapPlanInd = '';
  espPlanInd = '';
  validExcludedPlanTable = '';
  wsProvider = '';
  wsTsqItem = 0;
  wsTsqNumItems = 0;
  screenDateMm = '';
  screenDateDd = '';
  screenDateYy = '';
  screenDate2Mm = '';
  screenDate2Dd = '';
  screenDate2Yy = '';
  workDateMm = 0;
  workDateDd = 0;
  workDateYy = 0;
  saveSerDateYy1 = 0;
  saveSerDateYy2 = 0;
  saveSerDateMm = 0;
  saveSerDateDd = 0;
  saveSerDateYy = '';
  serFromYy = 0;
  serFromMm = 0;
  serFromDd = 0;
  wkSrvYy = 0;
  wkSrvMm = 0;
  wkSrvDd = 0;
  serToYy = 0;
  serToMm = 0;
  serToDd = 0;
  tosSerFromYy = 0;
  tosSerFromMm = 0;
  tosSerFromDd = 0;
  tosSerToYy = 0;
  tosSerToMm = 0;
  tosSerToDd = 0;
  monthSaved = 0;
  daySaved = 0;
  yearSaved = 0;
  totRefDdExtra = 0;
  totRefDd = 0;
  fcPlanEffDate = 0;
  fcPlanTermDate = 0;
  fcPlanWaitPer = 0;
  wkPlanPos1 = '';
  wkPlanPos2 = '';
  wsPlanInd = '';
  wsPlanCode1 = '';
  wsPlanCode2 = '';
  wkServiceCode = '';
  wkTypeCode = '';
  wkEffMm = 0;
  wkEffDd = 0;
  wkSerToMm = 0;
  wkSerToDd = 0;
  wkSerFromMm = 0;
  wkSerFromDd = 0;
  fcMaxDays = 0;
  filler64 = '';
  consistErrSerFromMm = '';
  consistErrSlash1 = '';
  consistErrSerFromYy = '';
  consistErrDash = '';
  consistErrSerToMm = '';
  consistErrSlash2 = '';
  consistErrSerToYy = '';
  fclineTripNo = 0;
  fclineFromDate = '';
  fclineToDate = '';
  fclineBenefitPaid = '';
  wsTosPlanKey = '';
  wsTosAssocKey = '';
  wsTosServiceKey = '';
  excludedInfos: ExcludedInfo[] = [];
  wsScreenCpt = '';
  wsScreenMod1 = '';
  wsScreenMod2 = '';
  wsMembership = '';
  wsAssociation = '';
  wsInsuredCode = '';
  hhohChargeLineList: HhcChrgLnTSQ[] = [];
  claimTempStorage = new ClaimTempStorage();
  blTempStorQueueList: BLTempStorQueue[] = [];
  queueItemNo = 0;
  cmnIOWrkArea = new CmnIOWrkArea();
  sbrBillsArea = new ABRBillsArea();
  planData1s: PlanData1[] = [];
  planData2s: PlanData2[] = [];
  lagFromDays = '';
  wsTosToDateJul = '';
  wsTosFromDateJul = '';
  xctlCall = '';
  wsNoPayPlanCode: string[] = [];
  foreignEligPlans: ForeignEligPlans[] = [];

  public setDecimalAlreadyEntered(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.decimalInd = initValue;
  }

  public setValidCharEntered(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.validCharInd = initValue;
  }

  public setCompressError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.compressErrorInd = initValue;
  }

  public setIcdCheckFail(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.wsIcdCheckIndicator = initValue;
  }

  public setIcdCheckPass(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.wsIcdCheckIndicator = initValue;
  }

  public setIcdCicsExepFail(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.wsIcdCicsExepInd = initValue;
  }

  public setIcdCicsExepPass(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.wsIcdCicsExepInd = initValue;
  }

  public setIcdCodesNotEntered(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.icdCodeValueInd = initValue;
  }

  public setFirstIcdCodeError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.icdCodeErrorInd = initValue;
  }

  public setFirstIcdCodeError2(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.icdCodeError2Ind = initValue;
  }

  public setOver65A(): void {
    let initValue: string = '';
    //
    initValue = '0';
    //
    this.ageIndA = initValue;
  }

  public setUnder65A(): void {
    let initValue: string = '';
    //
    initValue = '1';
    //
    this.ageIndA = initValue;
  }

  public setOver65B(): void {
    let initValue: string = '';
    //
    initValue = '0';
    //
    this.ageIndB = initValue;
  }

  public setUnder65B(): void {
    let initValue: string = '';
    //
    initValue = '1';
    //
    this.ageIndB = initValue;
  }

  public setCheckingBills(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.checkingBillsInd = initValue;
  }

  public setEndOfHistory(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.endOfHistoryInd = initValue;
  }

  public setHaveReadTempStorage(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.haveReadTempStorageInd = initValue;
  }

  public setFirstTime(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.firstTimeInd = initValue;
  }

  public setInvalidProvider(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.invalidProInd = initValue;
  }

  public setInvalidDate(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.dateErr = initValue;
  }

  public setTermedPlanFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.termedPlanInd = initValue;
  }

  public setAgeRestricted(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.ageRestrictionInd = initValue;
  }

  public setPe1PlanFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.pe1PlanInd = initValue;
  }

  public setPe2PlanFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.pe2PlanInd = initValue;
  }

  public setServFromDateGood(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.servFromGoodInd = initValue;
  }

  public setValidExcludedPlan(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.validExcludedPlanInd = initValue;
  }

  public setCalYrFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.calYrDaInd = initValue;
  }

  public setCalYrFcFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.calYrFcInd = initValue;
  }

  public setOldFcPlanFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.oldFcPlanInd = initValue;
  }

  public setNewFcPlanFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.newFcPlanInd = initValue;
  }

  public setPlanFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.planFoundInd = initValue;
  }

  public setTosMatchFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.tosMatchInd = initValue;
  }

  public setAllowEligCharge(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.allowEligChargeInd = initValue;
  }

  public setFirstTosError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.tosErrorInd = initValue;
  }

  public setFirstProviderError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.providerErrorInd = initValue;
  }

  public setFirstSerFromError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.serFromErrorInd = initValue;
  }

  public setFirstSerToError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.serToErrorInd = initValue;
  }

  public setFirstSpanError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.spanErrorInd = initValue;
  }

  public setFirstAnnivError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.annivErrorInd = initValue;
  }

  public setFirstNosError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.nosErrorInd = initValue;
  }

  public setFirstElChargeError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.elChargeErrorInd = initValue;
  }

  public setFirstChargeError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.chargeErrorInd = initValue;
  }

  public setFirstNoPayError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.noPayErrorInd = initValue;
  }

  public setFirstNoPayPlError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.noPayPlErrorInd = initValue;
  }

  public setFirstExpenseError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.expenseErrorInd = initValue;
  }

  public setFirstPreExistError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.preExistErrorInd = initValue;
  }

  public setFirstRTYearError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.rtYearErrorInd = initValue;
  }

  public setFirstExcludedPlanError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.excludedPlanErrorInd = initValue;
  }

  public setFirstConsistSerError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.consistSerErrorInd = initValue;
  }

  public setFirstConsSerAgeSplitErr(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.consSerAgeSplitErrInd = initValue;
  }

  public setFirstConsistSerSplitError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.consistSerSplitErrorInd = initValue;
  }

  public setFirstSerFStartDtErr(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.serFStartDtErrInd = initValue;
  }

  public setFirstServiceTripStartErr(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.serviceTripStartErrInd = initValue;
  }

  public setBencalcNopayErr(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.bencalcNopayErrInd = initValue;
  }

  public setFirstFcType260Split(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.fcType260SplitInd = initValue;
  }

  public setFirstFcCal60Warning(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.fcCal60WarningInd = initValue;
  }

  public setFirstFcSpan1st2Months(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.fcSpan1st2MonthsInd = initValue;
  }

  public setFirstInconsistentFcDates(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.inconsistentFcDatesInd = initValue;
  }

  public setValidExcludedPlans(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.validExcludedPlansInd = initValue;
  }

  public setFirstSpanEffError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.spanEffErrorInd = initValue;
  }

  public setFirstAfterTermError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.afterTermErrorInd = initValue;
  }

  public setFirstConsistTypeError1(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.consistTypeError1Ind = initValue;
  }

  public setFirstConsistTypeError1a(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.consistTypeError1aInd = initValue;
  }

  public setFirstConsistTypeError2(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.consistTypeError2Ind = initValue;
  }

  public setFirstConsistTypeError3(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.consistTypeError3Ind = initValue;
  }

  public setFirstConsistTypeError4(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.consistTypeError4Ind = initValue;
  }

  public setFirstConsistServiceError1(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.consistServiceError1Ind = initValue;
  }

  public setFirstConsistServiceError2(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.consistServiceError2Ind = initValue;
  }

  public setFirstConsistServiceError3(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.consistServiceError3Ind = initValue;
  }

  public setFirstConsistServiceError4(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.consistServiceError4Ind = initValue;
  }

  public setFirstTermAfter89Error(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.termAfter89ErrorInd = initValue;
  }

  public setFirstNosError1(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.nosError1Ind = initValue;
  }

  public setFirstNosError2(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.nosError2Ind = initValue;
  }

  public setFirstNosError3(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.nosError3Ind = initValue;
  }

  public setFirstNosError4(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.nosError4Ind = initValue;
  }

  public setFirstNosError5(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.nosError5Ind = initValue;
  }

  public setFirstChargeError1(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.chargeError1Ind = initValue;
  }

  public setFirstChargeError2(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.chargeError2Ind = initValue;
  }

  public setFirstConsistPreErrorTerm(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.consistPreErrorTermInd = initValue;
  }

  public setFirstConsistPreExistError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.consistPreExistErrorInd = initValue;
  }

  public setFirstConsistPreExistMsg(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.consistPreExistMsgInd = initValue;
  }

  public setMaxPerProcError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.maxPerProcErrorInd = initValue;
  }

  public setSerDError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.serDErrorInd = initValue;
  }

  public setSerDT3Error(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.serDT3ErrorInd = initValue;
  }

  public setFirstConsistErrError(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.consistErrErrorInd = initValue;
  }

  public setTsqHhEof(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.tsqHhEofInd = initValue;
  }

  public setTsqHhNoEof(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.tsqHhEofInd = initValue;
  }

  public setTsqBlEof(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.tsqBlEofInd = initValue;
  }

  public setTsqBlNoEof(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.tsqBlEofInd = initValue;
  }

  public setCsrChrgEof(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.csrChrgEofInd = initValue;
  }

  public setCsrChrgNoEof(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.csrChrgEofInd = initValue;
  }

  public setCsrIcdcEof(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.csrIcdcEofInd = initValue;
  }

  public setCsrIcdcNoEof(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.csrIcdcEofInd = initValue;
  }

  public setCsrExclEof(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.csrExclEofInd = initValue;
  }

  public setCsrExclNoEof(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.csrExclEofInd = initValue;
  }

  public setDuplicateFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.duplicateFoundInd = initValue;
  }

  public setValidNoPayPlan(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.noPayPlanInd = initValue;
  }

  public setInvalidNoPayPlan(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.noPayPlanInd = initValue;
  }

  public setValidSpace1(): void {
    let initValue: string = '';
    //
    initValue = ' ';
    //
    this.alphanumericInd1 = initValue;
  }

  public setValidAlpha1(): void {
    let initValue: string = '';
    //
    initValue = 'A';
    //
    this.alphanumericInd1 = initValue;
  }

  public setValidNumeric1(): void {
    let initValue: string = '';
    //
    initValue = '0';
    //
    this.alphanumericInd1 = initValue;
  }

  public setValidSpace2(): void {
    let initValue: string = '';
    //
    initValue = ' ';
    //
    this.alphanumericInd2 = initValue;
  }

  public setValidAlpha2(): void {
    let initValue: string = '';
    //
    initValue = 'A';
    //
    this.alphanumericInd2 = initValue;
  }

  public setValidNumeric2(): void {
    let initValue: string = '';
    //
    initValue = '0';
    //
    this.alphanumericInd2 = initValue;
  }

  public setMapPlanFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.mapPlanFoundInd = initValue;
  }

  public setMapPlanY(): void {
    let initValue: string = '';
    //
    initValue = 'Y0';
    //
    this.mapPlanInd = initValue;
  }

  public setMapPlanZ(): void {
    let initValue: string = '';
    //
    initValue = 'Z0';
    //
    this.mapPlanInd = initValue;
  }

  public setMapPlanX(): void {
    let initValue: string = '';
    //
    initValue = 'X0';
    //
    this.mapPlanInd = initValue;
  }

  public setMapPlan9(): void {
    let initValue: string = '';
    //
    initValue = 'X9';
    //
    this.mapPlanInd = initValue;
  }

  public setEspPlan(): void {
    let initValue: string = '';
    //
    initValue = 'JB';
    //
    this.espPlanInd = initValue;
  }
}
