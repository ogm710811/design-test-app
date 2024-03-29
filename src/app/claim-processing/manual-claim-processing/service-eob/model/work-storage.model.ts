import {
  BLTempStorQueue,
  HhcBenLnTSQ,
  HhcChrgLnTSQ,
  HospBenLnTSQ,
  HospChrgLnTSQ,
  MedBenLnTSQ,
  MedChrgLnTSQ,
  MedcrSuplChrgBenLnTSQ,
  NrsBenLnTSQ,
  NrsChrgLnTSQ,
  XcptChrgLnTSQ
} from '@fox/shared';
import {AuthorityReasons} from './authority-reasons.model';
import {FieldsValued} from './fields-valued.model';
import {MaxBillLines} from './max-bill-lines.model';
import {NonbypassReasons} from './nonbypass-reasons.model';
import {ScrhTos} from './scrh-tos.model';
import {WkPlan} from './wk-plan.model';
import {WsPlanEffDate} from './ws-plan-eff-date.model';
import {WsTos} from './ws-tos.model';

/**
 * Model class WorkStorage
 * Path: screenbean/procclmsrvceob
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmsrvceob::WorkStorage
 * Legacy Mapping: WS-FIELDS
 */
export class WorkStorage {
  wsBillSvcDate = 0;
  wsEffDate = 0;
  wsPlanEffDate = new WsPlanEffDate();
  holdComboReason = '';
  commandEnteredInd = '';
  buwAssignInd = '';
  buwIrsInd = '';
  buwRefundInd = '';
  buwTosInd = '';
  buwPatParValued = '';
  asterikAssignInd = '';
  diffProvFound = '';
  unassignWarningInd = '';
  diffUnassignFoundInd = '';
  wsAssignSaveInd = '';
  b4B5TsExistsInd = '';
  wsBillProvKey = '';
  wsAssignInd = '';
  modCommLength = 0;
  tsItemNo = 0;
  holdRecNbr = 0;
  wsSpecialPayeeAggr = 0;
  maxAmount = 0;
  wsMaxAssignee = 0;
  buwMinAmount = 0;
  maxBillLines = new MaxBillLines();
  numOfLines = 0;
  wsChargeCtr = 0;
  messageFileKey = 0;
  totalLines = 0;
  specMemLineCtr = 0;
  benefitLineCtr = 0;
  wsEobBillCtrS = 0;
  billCtr = 0;
  serviceBenLinesCtr = 0;
  totalNumBillLines = 0;
  medvisChargesNopayTotal = 0;
  nurscareChargesNopayTotal = 0;
  homhealthChargesNopayTotal = 0;
  exceptChargesNopayTotal = 0;
  billLineTsqLineCtr = 0;
  holdFromDate = '';
  holdToDate = '';
  holdLateFromDate = '';
  holdCurrDate = '';
  refEffDate = '';
  refTermDate = '';
  wsPlanCode = '';
  wkPlan = new WkPlan();
  wsTos = new WsTos();
  wsChargeSubscript = 0;
  wsCptIcdMsg0 = '';
  fromDate = '';
  fromDate2 = '';
  fromDate3 = 0;
  toDate = '';
  toDate2 = '';
  toDate3 = 0;
  totalYs = 0;
  holdPlanCode = '';
  accumNcEligChrg = 0;
  holdCautionNumber = 0;
  cautionFound = '';
  nonbypassReasons = new NonbypassReasons();
  fieldsValued = new FieldsValued();
  wsExceptChgLine = '';
  csub2 = 0;
  suspSub = 0;
  billLineSub = 0;
  csub4 = 0;
  startLineSub = 0;
  authSub = 0;
  ltcSub = 0;
  eligSub = 0;
  planSub = 0;
  autoSub = 0;
  billSub = 0;
  securitySub = 0;
  msgCtnSub = 0;
  csub3 = 0;
  csub = 0;
  showSub = 0;
  csub6 = 0;
  daSub = 0;
  beneSub = 0;
  sub160 = 0;
  yearSub = 0;
  sub95 = 0;
  tableSub = 0;
  sub = 0;
  specSub = 0;
  sub1 = 0;
  chargeSub = 0;
  sub29a = 0;
  msgSub = 0;
  startNumber = 0;
  scrhSub = 0;
  screenSub = 0;
  csub7 = 0;
  tosSub = 0;
  csub5 = 0;
  dedSub = 0;
  subY1 = 0;
  securitySub1 = 0;
  carrySub = 0;
  csub9 = 0;
  buwSub = 0;
  sub2 = 0;
  sub3 = 0;
  sub875 = 0;
  holdSplitSub = 0;
  sub170 = 0;
  sub120 = 0;
  csub8 = 0;
  csub1 = 0;
  assignSub = 0;
  varySub = 0;
  blSub = 0;
  wsResp = 0;
  tsqResp = 0;
  wkMaxAmtAssignee = 0;
  holdAssnTotBene = 0;
  holdMaxAmtAssignee = 0;
  holdTotalBenefit = 0;
  holdDeductible = 0;
  autoDedMsg = 0;
  holdAssigneeAdj = 0;
  holdMemoLineCnt = 0;
  holdBuwAmount = 0;
  holdNextYrDeduct = 0;
  holdTotInterestAmt = 0;
  holdAdjustment = 0;
  holdTotal = 0;
  emptySpecLineCnt = 0;
  holdAllAssigneeAmts = 0;
  holdIrsAmount = 0;
  endOfTsqSw = '';
  foundClmSw = '';
  unassignBillLines = '';
  adjWarningInd = '';
  scrhPlan = '';
  activePlanWasFound = '';
  oldInd = '';
  planFoundInd = '';
  assignBillLines = '';
  mind = '';
  intStillAssignY = '';
  rtosInd = '';
  caution55AppliesInd = '';
  spaceInAssignInd = '';
  firstPayQualFlag = '';
  buwFoundInd = '';
  nurscareNopay = '';
  exceptNopay = '';
  msTermInd = '';
  doCarryover = '';
  loadWithY1BillLineInd = '';
  errorFlag = '';
  dedType = '';
  firstTime = '';
  firstPayFlag = '';
  medvisNopay = '';
  aggrInd = '';
  scrhTos = new ScrhTos();
  shiftsFlag = '';
  thisIsAdjClmInd = '';
  tosFoundInd = '';
  homhealthNopay = '';
  wbasicKey = 0;
  wsegmentId = '';
  waction = 0;
  wcioIonsId = 0;
  wclaimBatchNo = '';
  wreturnMessage = '';
  wcioLocation = 0;
  werrorCondition = '';
  wreturnCde = '';
  wcommand = '';
  wcioSubSystemInd = '';
  wnewBasicKey = 0;
  wsChRecNbr = 0;
  filler1 = '';
  wsQueueItemno = 0;
  tsSub = 0;
  saveItemno = 0;
  filler2 = '';
  claimQueueLength = 0;
  wsTermid = '';
  authorityReasons = new AuthorityReasons();
  filler1Auth = '';
  duplicateFoundInd = '';
  icSub = 0;
  specPlanFoundInd = '';
  rpdiskcvFoundInd = '';
  hospitalIntChgInd = '';
  sendNonBypassableInd = '';
  medsuppIntChgInd = '';
  hospitalEobSubTotalWs = 0;
  medsuppEobSubTotalWs = 0;
  mapPlanInd = '';
  wsMedSuppChargeLines: MedcrSuplChrgBenLnTSQ[] = [];
  wsTsqNameVar = '';
  wsItemNum = 0;
  wsTsqTermid = '';
  wsHospRecs: HospChrgLnTSQ[] = [];
  hBenefitLine: HospBenLnTSQ[] = [];
  returnBoolean = false;
  holdEditAmt = '';
  holdMemoLines: string[] = [];
  wsPrevConsiderPlans: string[] = [];
  reformatDate = '';
  holdDate = '';
  holdExpCurrDate = '';
  wsInsDobMdy = 0;
  workDate = '';
  wsTodate = '';
  holdYear = '';
  carryoverYr = 0;
  messageLines: string[] = [];
  messagePercent = 0;
  messageLineX = '';
  theMessageKey = 0;
  wsMedRecs: MedChrgLnTSQ[] = [];
  wsMedBenRecs: MedBenLnTSQ[] = [];
  wsNcBenRec: NrsBenLnTSQ[] = [];
  wsHhohChargeRecs: HhcChrgLnTSQ[] = [];
  wsHhohBenRecs: HhcBenLnTSQ[] = [];
  wsNcChargeRec: NrsChrgLnTSQ[] = [];
  wsExceptRecs: XcptChrgLnTSQ[] = [];
  wsBillLineRecs: BLTempStorQueue[] = [];
}
