import {DrugChrgLnTSQ} from '@fox/shared';
import {BenCalcTsError} from './ben-calc-ts-error.model';
import {BenModRxFullMessage} from './ben-mod-rx-full-message.model';
import {BencalcNopayErrMsg} from './bencalc-nopay-err-msg.model';
import {ConsistSerDatesLine} from './consist-ser-dates-line.model';
import {ErisaSpanDatesMessage} from './erisa-span-dates-message.model';
import {ErrorLine} from './error-line.model';
import {InvalidNdcMsgA} from './invalid-ndc-msg-a.model';
import {InvalidNdcMsgB} from './invalid-ndc-msg-b.model';
import {PlanData1} from './plan-data1.model';
import {PlanData2} from './plan-data2.model';
import {TableMaxError} from './table-max-error.model';
import {TempStorageError} from './temp-storage-error.model';
import {TempStorageError1} from './temp-storage-error1.model';
import {TempStorageError2} from './temp-storage-error2.model';
import {ValidExcludedPlanTable} from './valid-excluded-plan-table.model';
import {WsAdtnlDrugInfo} from './ws-adtnl-drug-info.model';
import {WsBenModEndMessage} from './ws-ben-mod-end-message.model';
import {WsDrTsqName} from './ws-dr-tsq-name.model';
import {WsEcQueueName} from './ws-ec-queue-name.model';
import {WsLink7o20TsqName} from './ws-link7o20-tsq-name.model';
import {WsPlanCodeData} from './ws-plan-code-data.model';
import {WsPlanCodeTable} from './ws-plan-code-table.model';
import {WsQueueName} from './ws-queue-name.model';
import {ZLineScreeningErrMsg} from './zline-screening-err-msg.model';

/**
 * Model class WorkStorage
 * Path: screenbean/procclmdrugchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugchrg::WorkStorage
 * Legacy Mapping: DATE-WORK-AREA
 */
export class WorkStorage {
  screenDate = '';
  screenDate2 = '';
  workDate = 0;
  medSelEffDate = 0;
  medSelTermDate = 0;
  saveSerDate = 0;
  saveSerFromYmd = '';
  saveSerToYmd = '';
  tosSerFromYmd = '';
  tosSerToYmd = '';
  wsServiceFrom = 0;
  wsServiceTo = 0;
  saveTermDate = 0;
  save90TermDate = 0;
  saveEffDate = 0;
  savePeceEffDate = 0;
  saveTermDateMdy = 0;
  earliestEffDate = 0;
  latestTermDate = 0;
  wsDbDateFormat = '';
  wsTsqDateFormat = '';
  wsPlanCodeData = new WsPlanCodeData();
  wsPlanCodeTable = new WsPlanCodeTable();
  beforeEffInd = '';
  afterTermInd = '';
  nopaySpaceInd1 = '';
  nopaySpaceInd2 = '';
  caution92Ind = '';
  planTermedInd = '';
  matchFoundInd = '';
  consistSerDateInd = '';
  wsChargeLines = 0;
  consistSerDatesLine = new ConsistSerDatesLine();
  excludedPlan = '';
  yearDivide = 0;
  leapChk = 0;
  savePlan = '';
  saveLagDays = 0;
  holdCautionNumber = 0;
  holdCautionVariable = '';
  wsEnteredNdcX = '';
  wsEnteredNdc9 = 0;
  wsMinimumNdc = 0;
  wsResp = 0;
  ceTsqItem = 0;
  ceTsqResponse = 0;
  claimQueueLength = 0;
  holdRecNbr = 0;
  wsQueueItemno = 0;
  wsQueueName = new WsQueueName();
  wsEcQueueName = new WsEcQueueName();
  electClaimInd = '';
  billSub = 0;
  bmSub = 0;
  bmSub2 = 0;
  claimSub = 0;
  confCtr = 0;
  confSub = 0;
  deductSub = 0;
  eligSub = 0;
  erSub = 0;
  foundSub = 0;
  initSub = 0;
  planSub = 0;
  pointerSub = 0;
  recSub = 0;
  screenSub = 0;
  securitySub = 0;
  sortCtr1 = 0;
  sortCtr2 = 0;
  stSub1 = 0;
  stSub2 = 0;
  stSub3 = 0;
  sub = 0;
  sub1 = 0;
  sub2 = 0;
  sub3 = 0;
  sub4 = 0;
  sub5 = 0;
  sub6 = 0;
  sub7 = 0;
  suba = 0;
  plSub = 0;
  tableSub = 0;
  esub = 0;
  dsub = 0;
  psub = 0;
  drChrgLineCtr = 0;
  invalidProInd = '';
  ndcOrNameEnteredInd = '';
  invalidDrugInd = '';
  noPayPlanInd = '';
  dateErr = '';
  validExcludedPlanInd = '';
  providerErrorInd = '';
  pharmacyErrorInd = '';
  serFromErrorInd = '';
  serToErrorInd = '';
  chargeErrorInd = '';
  typeErrorInd = '';
  typeZEnteredInd = '';
  zlineScreeningErrInd = '';
  noPayErrorInd = '';
  noPayPlErrorInd = '';
  allLinesNoPayInd = '';
  bencalcNopayErrInd = '';
  preExistErrorInd = '';
  ndcEcRnfInd = '';
  ndcErrorInd = '';
  drugNameErrorInd = '';
  gt31ErrorInd = '';
  excludedPlanErrorInd = '';
  validExcludedPlansInd = '';
  deductCarryErrorInd = '';
  planeAfterTermErrorInd = '';
  afterTermErrorInd = '';
  confinementSpanErrorInd = '';
  preExistSplitErrorInd = '';
  spanEffErrorInd = '';
  tosDateErrorInd = '';
  excludedPlanInd = '';
  tsqDrugEofInd = '';
  csrChrgEofInd = '';
  csrExclEofInd = '';
  duplicateFoundInd = '';
  preExistingInd = '';
  erisaDatesSpanInd = '';
  pf8ValidKeyInd = '';
  benModErrorInd = '';
  validPlanInd = '';
  benModPlanInd = '';
  benModRxIndicator = '';
  mapPlanInd = '';
  mapRxEffective = '';
  msRxEffective = '';
  errorLine = new ErrorLine();
  hubCriticalErrorMessage = '';
  erisaSpanDatesMessage = new ErisaSpanDatesMessage();
  benModRxNotFoundMessage = '';
  benModRxSplitMessage = '';
  benModRxFullMessage = new BenModRxFullMessage();
  bmMapRxBeforeMessage = '';
  bmMapRxSpanMessage = '';
  invalidNdcMsgA = new InvalidNdcMsgA();
  invalidNdcMsgB = new InvalidNdcMsgB();
  zlineScreeningErrMsg = new ZLineScreeningErrMsg();
  tempStorageError = new TempStorageError();
  tempStorageError1 = new TempStorageError1();
  tempStorageError2 = new TempStorageError2();
  bencalcNopayErrMsg = new BencalcNopayErrMsg();
  wsBenModEndMessage = new WsBenModEndMessage();
  benCalcTsError = new BenCalcTsError();
  tableMaxError = new TableMaxError();
  wsTsqItem = 0;
  wsTsqNumItems = 0;
  wsTsqItemD = 0;
  wsTsqNumItemsD = 0;
  wsMembership = '';
  wsAssociation = '';
  wsInsuredCode = '';
  wsDrItemNum = 0;
  wsDrTsqNumItems = 0;
  wsDrTsqName = new WsDrTsqName();
  tsqDrugEofIndFlag = '';
  drugChargeList: DrugChrgLnTSQ[] = [];
  benCalcNopayErrInd = '';
  enteredNdc9 = 0;
  sub8 = 0;
  wsServiceCode = '';
  wsTypeCode = '';
  wkDollarPlan = '';
  filler1 = '';
  planData1s: PlanData1[] = [];
  planData2s: PlanData2[] = [];
  errMsg = '';
  errCnt = 0;
  validExcludedPlanTable = new ValidExcludedPlanTable();
  wsAdtnlDrugInfos: WsAdtnlDrugInfo[] = [];
  wsDrugNamePos: string[] = [];
  wsGregDate = 0;
  wsGregDateYmd = 0;
  wsGregDate1Ymd = 0;
  wsJulDate = 0;
  wsAbrBillToDateJul = '';
  wsAbrBillToDateJulNum = 0;
  saveBillFromMdy = '';
  saveBillFromMdyNum = 0;
  saveBillToMdy = '';
  saveBillToMdyNum = 0;
  saveBillFromYmd = '';
  saveBillToYmd = '';
  wsTosFromDateJulian = '';
  wsTosFromDateJulianNum = 0;
  wsFromDate = '';
  wsFromDateNum = 0;
  abRJulFromDate = '';
  abRJulFromDateNum = 0;
  abRJulToDate = '';
  abRJulToDateNum = 0;
  sbRJulFromDate = '';
  sbRJulFromDateNum = 0;
  julianFromDate = 0;
  julianToDate = 0;
  wsToDate = '';
  wsToDateNum = 0;
  sbRJulToDate = '';
  sbRJulToDateNum = 0;
  lagFromDate = '';
  lagFromDateNum = 0;
  wsYy = 0;
  wsTosToDateJulian = '';
  wsTosToDateJulianNum = 0;
  holdBillPlanCode = '';
  holdBillSvcFromDate = 0;
  holdBillSvcToDate = 0;
  wsBmStartDate = '';
  wsBmStopDate = '';
  wsDosFromCymd = '';
  wsDosToCymd = '';
  saveCurrDateYmd = '';
  holdServiceFromDate = '';
  wkPlan = '';
  wsLink7o20TsqItem = 0;
  wsLink7o20TsqName = new WsLink7o20TsqName();
}
