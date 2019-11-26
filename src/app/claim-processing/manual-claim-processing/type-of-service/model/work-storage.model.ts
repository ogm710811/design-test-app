import {ABRBillsArea} from './abrbills-area.model';
import {ClmSrvDates} from './clm-srv-dates.model';
import {ErrorPlansTable} from './error-plans-table.model';
import {JocoControlData} from './joco-control-data.model';
import {LfDcdatday} from './lf-dcdatday.model';
import {LfDcdatoff} from './lf-dcdatoff.model';
import {Sqlerrm} from './sqlerrm.model';
import {Sqlwarn} from './sqlwarn.model';
import {SuspendLocationTable} from './suspend-location-table.model';
import {WsAciTsqName} from './ws-aci-tsq-name.model';
import {WsAciTsqRecord} from './ws-aci-tsq-record.model';
import {WsAddrHistArea} from './ws-addr-hist-area.model';
import {WsElectClaimCommarea} from './ws-elect-claim-commarea.model';
import {WsLink7o20TsqName} from './ws-link7o20-tsq-name.model';
import {WsPlanTosGroups} from './ws-plan-tos-groups.model';
import {WsPlanTosInfo} from './ws-plan-tos-info.model';
import {WsPtifKey} from './ws-ptif-key.model';
/**
 * Model class WorkStorage
 * Path: screenbean/procclmtos/beansws
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmtos::beansWs::WorkStorage
 * Legacy Mapping: WI-WORK-AREA
 */
export class WorkStorage {
  wsClmState = '';
  wsTosFound = '';
  wsWiTosValued = '';
  wsWiResidentInd = '';
  wsConvDate = '';
  waPlanEffDate = 0;
  clmSrvDates = new ClmSrvDates();
  wsFileDate = 0;
  wsPtifKey = new WsPtifKey();
  wsAddrHistArea = new WsAddrHistArea();
  wsWiPreStdTos = '';
  wsCutOffCcyymm = 0;
  holdPlanEffDt = 0;
  wsWiPreStdPlans = '';
  wsStMandatedInd = '';
  wsConvDateN = 0;
  wsFileDateCym = 0;
  wsFileDateDd = 0;
  holdPlEffCc = 0;
  holdPlEffYy = 0;
  holdPlEffMm = 0;
  waPlanEffYy = 0;
  waPlanEffMm = 0;
  wsPlanTosGroups = new WsPlanTosGroups();
  wsPlanTosInfos = new WsPlanTosInfo();
  finishDi756 = '';
  finishDi259 = '';
  finishDi821 = '';
  drugChargeTable = '';
  hospChargeTable = '';
  claimHistoryTable = '';
  profChargeTable = '';
  ahTsqResponse = 0;
  initialChRecNbr = 0;
  subHist = 0;
  ahTsqItem = 0;
  excptStSub = 0;
  blkPlan122UnderCtr = 0;
  pointerSub = 0;
  msgCtnSub = 0;
  hsub = 0;
  blkPlanOver122Ctr = 0;
  sub2 = 0;
  qbSub = 0;
  chSub = 0;
  recSub = 0;
  commSub = 0;
  tobTsItemNo = 0;
  holdChRecNbr = 0;
  authSub = 0;
  subTab = 0;
  ceTsqItem = 0;
  addrHistSub = 0;
  planTypeSub = 0;
  dosPriorEffCtr = 0;
  s3107 = 0;
  initSub = 0;
  tosSub = 0;
  sub = 0;
  planTabSub = 0;
  addrHistTosSub = 0;
  subTos = 0;
  securitySub1 = 0;
  admDb2IoCommLen = 0;
  errorSub = 0;
  screenSub = 0;
  psifTosSub = 0;
  claimQueueLength = 0;
  securitySub = 0;
  electClaimCommLen = 0;
  wsTosTabSub = 0;
  planTosSub = 0;
  sub4 = 0;
  psub = 0;
  suspSub = 0;
  wsQueueItemno = 0;
  tosDupSub = 0;
  espPlanCounter = 0;
  ahSub = 0;
  bmSub = 0;
  sub1 = 0;
  planSub = 0;
  wsQueueResp = 0;
  mrwSub = 0;
  ckPriorSub = 0;
  postHospSub = 0;
  rbaFld = 0;
  sub3204 = 0;
  stateSub = 0;
  claimSub = 0;
  sub3 = 0;
  saveChargeSub = 0;
  sub0750 = 0;
  sub4580 = 0;
  sub0700 = 0;
  sub4560 = 0;
  s3105 = 0;
  wsAciTsqItem = 0;
  wsAciTsqLength = 0;
  wsAciTsqName = new WsAciTsqName();
  lqnEibtrmid = '';
  filler2 = '';
  filler1 = '';
  suspendLocationTable = new SuspendLocationTable();
  suspendLocationEntrys: string[] = [];
  errorPlansTable = new ErrorPlansTable();
  wkY2kYyX = '';
  wsLink7o20TsqItem = 0;
  wsLink7o20TsqName = new WsLink7o20TsqName();
  chhsMcareSnfDays3Null = 0;
  chhsSrgryDtNull = 0;
  chhsMcareHspDays2Null = 0;
  chhsSrvToDtNull = 0;
  chhsMcareHspLtrDaysNull = 0;
  chhsIcuFromDtNull = 0;
  chhsMcareSnfDays2Null = 0;
  chhsSrvDaysNull = 0;
  chhsIcuDaysNull = 0;
  chhsAcdntDtNull = 0;
  chhsElgblChrgNull = 0;
  chhsMcareHspDays1Null = 0;
  chhsMcareHspDays3Null = 0;
  chhsIcuToDtNull = 0;
  chhsAsgnPrvKeyNull = 0;
  chhsMcareSnfDays1Null = 0;
  chhsMcareHspLtrOptnNull = 0;
  chhsMcareHspIhdNull = 0;
  chhsHospChrgKey = 0;
  chhsLastMaintTmst = '';
  chhsDschrgInd = '';
  chhsSrgryDt = '';
  chhsSrvFromDt = '';
  chhsMcareSnfDays1 = 0;
  chhsMcareSnfDays3 = 0;
  chhsPrvType = '';
  chhsNoPayPlanCd = '';
  chhsMcareHspLtrOptn = '';
  chhsChKey = 0;
  chhsIcuDays = 0;
  chhsIcdPntr2 = 0;
  chhsMcareHspIhd = '';
  chhsMcareHspDays2 = 0;
  chhsCreatDt = '';
  chhsMcareHspDays1 = 0;
  chhsExclPlnCd1 = '';
  chhsScreenNum = 0;
  chhsIcdPntr1 = 0;
  chhsPrvLookup = '';
  chhsSrvToDt = '';
  chhsElgblChrg = 0;
  chhsLnNum = 0;
  chhsMcareHspLtrDays = 0;
  chhsAsgnPrvKey = 0;
  chhsSrvDays = 0;
  chhsIcuToDt = '';
  chhsIcdPntr3 = 0;
  chhsChAcctPartNum = 0;
  chhsMcareSnfDays2 = 0;
  chhsPreExistInd = '';
  chhsMcareHspDays3 = 0;
  chhsBlNoPayInd = '';
  chhsExclPlnCd2 = '';
  chhsIcdPntr4 = 0;
  chhsIcuFromDt = '';
  chhsAcdntDt = '';
  chprPrvNpiNull = 0;
  chprDeductAmtNull = 0;
  chprMcarePmntAmtNull = 0;
  chprCoinsAmtNull = 0;
  chprHourCntNull = 0;
  chprChrgAmtNull = 0;
  chprMcareAprvdAmtNull = 0;
  chprSrvToDtNull = 0;
  chprMcareDeductAmtNull = 0;
  chprSrvCntNull = 0;
  chprHourCnt = 0;
  chprLastMaintTmst = '';
  chprPrvNpi = 0;
  chprCoinsInd = '';
  chprProfChrgKey = 0;
  chprIcdPntr2 = 0;
  chprProcMod2 = '';
  chprProcMod3 = '';
  chprMcareAprvdAmt = 0;
  chprDeductAmt = 0;
  chprSrvCd = '';
  chprPrvNm = '';
  chprBlNoPayInd = '';
  chprPctRate = 0;
  chprMcareAssgnInd = '';
  chprProcMod1 = '';
  chprIcdPntr1 = 0;
  chprIcdPntr3 = 0;
  chprAarpCopayAmt = 0;
  chprChAcctPartNum = 0;
  chprProcMod4 = '';
  chprCreatDt = '';
  chprIcdPntr4 = 0;
  chprSrvToDt = '';
  chprMcareDeductAmt = 0;
  chprCptCd = '';
  chprChKey = 0;
  chprScreenNum = 0;
  chprPreExistInd = '';
  chprSrvFromDt = '';
  chprChrgAmt = 0;
  chprSubmittedChrg = 0;
  chprPlanCd = '';
  chprCoinsAmt = 0;
  chprMcarePmntAmt = 0;
  chprTypeCd = '';
  chprSrvCnt = 0;
  chprLnNum = 0;
  clhsProcTypeIndNull = 0;
  clhsAssgnMaxAmtNull = 0;
  clhsAaaKeyNull = 0;
  clhsSrvToDtNull = 0;
  clhsAssgnPrvKeyNull = 0;
  clhsApprvlCdNull = 0;
  clhsDtToQltyNull = 0;
  clhsTotBenNull = 0;
  clhsDtCmpltdNull = 0;
  clhsPatNumNull = 0;
  sqlcaid = '';
  sqlext = '';
  sqlwarn = new Sqlwarn();
  sqlerrp = '';
  sqlcabc = 0;
  sqlcode = 0;
  sqlerrm = new Sqlerrm();
  sqlerrds: number[] = [];
  jocoControlTime1 = '';
  jocoControlDate1 = '';
  jocoControlTimestamp = '';
  jocoControlTime2 = '';
  jocoControlData = new JocoControlData();
  jocoControlDate2 = '';
  jocoControlDate3 = '';
  jocoProgramId = '';
  jocoControlTime2Null = 0;
  jocoControlTimestampNull = 0;
  jocoControlDate3Null = 0;
  jocoControlDate2Null = 0;
  jocoControlTime1Null = 0;
  jocoControlDate1Null = 0;
  wsElectClaimCommarea = new WsElectClaimCommarea();
  wsAciTsqRecord = new WsAciTsqRecord();
  dobSw1 = '';
  cdate1X = '';
  cdate2X = '';
  dobSw2 = '';
  dobSw3 = '';
  cdate3X = '';
  dobSw4 = '';
  cdate4X = '';
  cdate1C3 = '';
  cdate1C4 = '';
  cdate2C3 = '';
  cdate2C4 = '';
  cdate3C3 = '';
  cdate3C4 = '';
  cdate4C3 = '';
  cdate4C4 = '';
  cdate115 = '';
  cdate215 = '';
  cdate315 = '';
  cdate415 = '';
  cdate114 = '';
  cdate214 = '';
  cdate314 = '';
  cdate414 = '';
  vndatePgm2 = '';
  lfDcdatoff = new LfDcdatoff();
  vndatePgm = '';
  lfDcdatday = new LfDcdatday();
  ocuaCurrPgm = '';
  ocuaCicsRespCode = 0;
  ocuaCicsRespCodeD = 0;
  oucaIonsFiller1 = '';
  oucaIonsId = '';
  oucaIonsFiller2 = '';
  ocuaCurrDateCcyy = 0;
  ocuaCurrDateMm = 0;
  ocuaCurrDateDd = 0;
  ocuaCurrTimeHh = 0;
  ocuaCurrTimeMm = 0;
  ocuaCurrTimeSs = 0;
  ocuaCurrTimeMs = 0;
  errFiller1 = '';
  errSemCurrPgm = '';
  errFiller2 = '';
  errSemRsrce = '';
  errFiller3 = '';
  errSemStmtNo = '';
  errFiller4 = '';
  errSemResp = 0;
  errFiller5 = '';
  errSemAccount = '';
  errFiller6 = '';
  errSemClaim = '';
  celRecDate = '';
  celRecTime = '';
  celRecTaskNumber = 0;
  celRecTrnid = '';
  celSeparator1 = '';
  celScreenMsg = '';
  celSeparator2 = '';
  celFormattedErrMsg = '';
  celSeparator3 = '';
  celResp2Cd = 0;
  celSeparator4 = '';
  celUserId = '';
  celFreeTxtErrMsg = '';
  celModule = '';
  celName = '';
  celFunctionCode = '';
  celReturnCode = '';
  wsRespDisplay = 0;
  rpfyResponse = 0;
  wsResp = 0;
  wsRegionName = '';
  jesProgramId = '';
  wsJesMsgFiller = '';
  jesVariableMsg = '';
  jesFilename = '';
  jesVariableMsgTxt = '';
  jesReturnCode2 = '';
  jesVariableMsgTxt2 = '';
  jesUcpsTaskInfo = '';
  jesUcpsScreenMsg = '';
  respLabel = '';
  jesRespCode = 0;
  resp2Label = '';
  jesResp2Code = 0;
  jesMsgSep = '';
  jesGenMsgText = '';
  wsJesProgramId = '';
  wsJesWtoMsgFiller1 = '';
  wsJesWtoMsgFiller2 = '';
  wsJesIons = '';
  wsJesWtoMsgFiller3 = '';
  wsJesFilename = '';
  wsJesVariableMsgFiller1 = '';
  wsJesFunction = '';
  wsJesVariableMsgFiller2 = '';
  wsJesReturnCode = '';
  wsJesVariableMsgFiller3 = '';
  wsJesVariableMsgTxt = '';
  wcdaReturnCd = '';
  wcdaRespCode = 0;
  wcdaIonsidFiller1 = '';
  wcdaIonsId = '';
  wcdaIonsidFiller2 = '';
  wcdaProgram = '';
  wcdaFile = '';
  wcdaFncode = '';
  wcdaErrcode = '';
  wcdaExpFncode = '';
  wcdaExpReturnCode = '';
  wcdaReturnMessage = '';
  wcdaMsgAreaFiller3 = '';
  wjdProgram = '';
  wjaDb2Filler1 = '';
  wjdMessage = '';
  wjdStmnt = '';
  wjaDb2Filler2 = '';
  wjdSqlcode = 0;
  wjcDatetime = '';
  wjaCicsFiller1 = '';
  wjcMessage = '';
  wjaLogRcAreaFiller1 = '';
  wjlRc = '';
  wjaLogRcAreaFiller2 = '';
  wdeaCurrTimestmp = '';
  wdeaProgram = '';
  wdeaStmntNo = '';
  wdeaErrTxtLen = 0;
  wdeaSavedRecPos = 0;
  sqlHeadRecPos = 0;
  sqlErrLength = 0;
  wdeaSavedSqlcode = 0;
  seDate = '';
  sqlErrorLogRecFiller1 = '';
  seTime = '';
  sqlErrorLogRecFiller2 = '';
  seIonsId = '';
  sqlErrorLogRecFiller3 = '';
  seTransId = '';
  sqlErrorLogRecFiller4 = '';
  seProgram = '';
  sqlErrorLogRecFiller5 = '';
  seStmtNo = '';
  sqlErrorLogRecFiller6 = '';
  seSqlcode = 0;
  sqlErrorLogRecFiller7 = '';
  seSqlTexts: string[] = [];
  wsLuwErrorMsgFiller1 = '';
  wsLuwModule = '';
  wsLuwErrorMsgFiller2 = '';
  wsLuwRc = 0;
  wsLuwErrorMsgFiller3 = '';
  wsLuwObject = '';
  wsLuwErrorMsgFiller4 = '';
  wcioIonsId = 0;
  wcioLocation = 0;
  wcioSubSystemInd = '';
  wcommand = '';
  wsegmentId = '';
  wnewBasicKey = 0;
  wreturnCde = '';
  wreturnMessage = '';
  werrorCondition = '';
  waction = 0;
  abRBillsArea = new ABRBillsArea();
  wmemIdKey = 0;
  wassocKey = '';
  winsuredCodeKey = '';
  wdbFileInd = '';
  wdbFileKey = 0;
  wdbRecNbr = 0;
  filler3 = '';
  noMedselectMsg = false;
  netAmount = 0;
  wasMedSelectMsg = false;
  isPf5 = false;

  public isNonWiResident(): boolean {
    const nonWiResident = false;
    let initValue: string = '';
    //
    initValue = ' ';
    //
    //  nonWiResident = StringUtils.trim(this.wsWiResidentInd) === initValue;
    return nonWiResident;
  }

  public setNonWiResident(): void {
    let initValue: string = '';
    //
    initValue = ' ';
    //
    this.wsWiResidentInd = initValue;
  }

  public isWiResident(): boolean {
    const wiResident = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    //   wiResident = StringUtils.trim(this.wsWiResidentInd) === initValue;
    return wiResident;
  }

  public setWiResident(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.wsWiResidentInd = initValue;
  }

  public isValidForWiOnly(): boolean {
    let validForWiOnly = false;
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
    let cEnableValue_10 = '';
    let cEnableValue_11 = '';
    let cEnableValue_12 = '';
    //
    cEnableValue_0 = 'B0';
    //
    cEnableValue_1 = 'B5';
    //
    cEnableValue_2 = 'D1';
    //
    cEnableValue_3 = 'D2';
    //
    cEnableValue_4 = 'D3';
    //
    cEnableValue_5 = 'D4';
    //
    cEnableValue_6 = 'D6';
    //
    cEnableValue_7 = 'H8';
    //
    cEnableValue_8 = 'H9';
    //
    cEnableValue_9 = 'T2';
    //
    cEnableValue_10 = 'T3';
    //
    cEnableValue_11 = 'T8';
    //
    cEnableValue_12 = 'W6';
    //
    validForWiOnly = (cEnableValue_0 === this.wsWiPreStdTos || cEnableValue_1 === this.wsWiPreStdTos || cEnableValue_2 === this.wsWiPreStdTos || cEnableValue_3 === this.wsWiPreStdTos || cEnableValue_4 === this.wsWiPreStdTos || cEnableValue_5 === this.wsWiPreStdTos || cEnableValue_6 === this.wsWiPreStdTos || cEnableValue_7 === this.wsWiPreStdTos || cEnableValue_8 === this.wsWiPreStdTos || cEnableValue_9 === this.wsWiPreStdTos || cEnableValue_10 === this.wsWiPreStdTos || cEnableValue_11 === this.wsWiPreStdTos || cEnableValue_12 === this.wsWiPreStdTos);
    return validForWiOnly;
  }

  public setValidForWiOnly(): void {
    let initValue: string = '';
    //
    initValue = 'B0';
    //
    this.wsWiPreStdTos = initValue;
  }

  public isStateMandatedNotApplied(): boolean {
    const stateMandatedNotApplied = false;
    let initValue: string = '';
    //
    initValue = ' ';
    //
    //  stateMandatedNotApplied = StringUtils.trim(this.wsStMandatedInd) === initValue;
    return stateMandatedNotApplied;
  }

  public setStateMandatedNotApplied(): void {
    let initValue: string = '';
    //
    initValue = ' ';
    //
    this.wsStMandatedInd = initValue;
  }

  public isStateMandatedBnftsApply(): boolean {
    const stateMandatedBnftsApply = false;
    let initValue: string = '';
    //
    initValue = 'A';
    //
    // stateMandatedBnftsApply = StringUtils.trim(this.wsStMandatedInd) === initValue;
    return stateMandatedBnftsApply;
  }

  public setStateMandatedBnftsApply(): void {
    let initValue: string = '';
    //
    initValue = 'A';
    //
    this.wsStMandatedInd = initValue;
  }

  public isLeapYear0096(): boolean {
    let leapYear0096 = false;
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
    let cEnableValue_10 = '';
    let cEnableValue_11 = '';
    let cEnableValue_12 = '';
    let cEnableValue_13 = '';
    let cEnableValue_14 = '';
    let cEnableValue_15 = '';
    let cEnableValue_16 = '';
    let cEnableValue_17 = '';
    let cEnableValue_18 = '';
    let cEnableValue_19 = '';
    let cEnableValue_20 = '';
    let cEnableValue_21 = '';
    let cEnableValue_22 = '';
    let cEnableValue_23 = '';
    let cEnableValue_24 = '';
    //
    cEnableValue_0 = '00';
    //
    cEnableValue_1 = '04';
    //
    cEnableValue_2 = '08';
    //
    cEnableValue_3 = '12';
    //
    cEnableValue_4 = '16';
    //
    cEnableValue_5 = '20';
    //
    cEnableValue_6 = '24';
    //
    cEnableValue_7 = '28';
    //
    cEnableValue_8 = '32';
    //
    cEnableValue_9 = '36';
    //
    cEnableValue_10 = '40';
    //
    cEnableValue_11 = '44';
    //
    cEnableValue_12 = '48';
    //
    cEnableValue_13 = '52';
    //
    cEnableValue_14 = '56';
    //
    cEnableValue_15 = '60';
    //
    cEnableValue_16 = '64';
    //
    cEnableValue_17 = '68';
    //
    cEnableValue_18 = '72';
    //
    cEnableValue_19 = '76';
    //
    cEnableValue_20 = '80';
    //
    cEnableValue_21 = '84';
    //
    cEnableValue_22 = '88';
    //
    cEnableValue_23 = '92';
    //
    cEnableValue_24 = '96';
    //
    leapYear0096 = (cEnableValue_0 === this.wkY2kYyX || cEnableValue_1 === this.wkY2kYyX || cEnableValue_2 === this.wkY2kYyX || cEnableValue_3 === this.wkY2kYyX || cEnableValue_4 === this.wkY2kYyX || cEnableValue_5 === this.wkY2kYyX || cEnableValue_6 === this.wkY2kYyX || cEnableValue_7 === this.wkY2kYyX || cEnableValue_8 === this.wkY2kYyX || cEnableValue_9 === this.wkY2kYyX || cEnableValue_10 === this.wkY2kYyX || cEnableValue_11 === this.wkY2kYyX || cEnableValue_12 === this.wkY2kYyX || cEnableValue_13 === this.wkY2kYyX || cEnableValue_14 === this.wkY2kYyX || cEnableValue_15 === this.wkY2kYyX || cEnableValue_16 === this.wkY2kYyX || cEnableValue_17 === this.wkY2kYyX || cEnableValue_18 === this.wkY2kYyX || cEnableValue_19 === this.wkY2kYyX || cEnableValue_20 === this.wkY2kYyX || cEnableValue_21 === this.wkY2kYyX || cEnableValue_22 === this.wkY2kYyX || cEnableValue_23 === this.wkY2kYyX || cEnableValue_24 === this.wkY2kYyX);
    return leapYear0096;
  }

  public setLeapYear0096(): void {
    let initValue: string = '';
    //
    initValue = '00';
    //
    this.wkY2kYyX = initValue;
  }

  public isDob1(): boolean {
    const dob1 = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    //  dob1 = StringUtils.trim(this.dobSw1) === initValue;
    return dob1;
  }

  public setDob1(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.dobSw1 = initValue;
  }

  public isDob2(): boolean {
    const dob2 = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    //  dob2 = StringUtils.trim(this.dobSw2) === initValue;
    return dob2;
  }

  public setDob2(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.dobSw2 = initValue;
  }

  public isDob3(): boolean {
    const dob3 = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    //  dob3 = StringUtils.trim(this.dobSw3) === initValue;
    return dob3;
  }

  public setDob3(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.dobSw3 = initValue;
  }

  public isDob4(): boolean {
    const dob4 = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    // dob4 = StringUtils.trim(this.dobSw4) === initValue;
    return dob4;
  }

  public setDob4(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.dobSw4 = initValue;
  }
}
