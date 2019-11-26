/**
 * Model class WsWorkFields
 * Path: screenbean/procclmdrugeobservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::WsWorkFields
 * Legacy Mapping: WS-WORK-FIELDS
 */
export class WsWorkFields {
  interestInd = '';
  nextPgm = '';
  wsPlanCode = '';
  scrhPlan = '';
  wsSqlcode = '0';
  holdPlanCode = '';
  theClaimNo = '';
  wsInsDobMdy = new Date();
  holdCautionNum = 0;
  cautionFound = '';
  holdComboReason = '';
  holdDFromDate = +0;
  holdDToDate = +0;
  holdEditAmt = '';
  holdDate = new Date();
  reformatDate = new Date();
  refEffDate = 0;
  refTermDate = 0;
  holdCurrDate = 0;
  holdFromDate = 0;
  holdToDate = 0;
  holdLateFromDate = 0;
  workToDate = 0;
  wsSpecialPayeeAggr = 0;
  wkMaxAmtAssignee = 0;
  wsMaxAssignee = 0;
  maxAmount = 0;
  totalTsqItems = 0;
  totalLines = 0;
  totalYs = 0;
  billCtr = 0;
  benefitLineCtr = 0;
  drugChargesNopayTotal = 0;
  autoDedMsg = 0;
  holdMemoLineCnt = 0;
  emptySpecLineCnt = 0;
  modCommLength = 0;
  tsItemNo = 0;
  holdRecNbr = 0;
  hldPlanPos1 = '';
  hldPlanPos2 = '';
  wsServiceCode = '';
  wsTypeCode = '';
  membNo = 0;
  assocNo = 0;
  insCode = 0;
  nonbypassCautionReason = '';
  nonbypassPlanReason = '';
  nonbypassTosReason = '';
  nonbypassDosReason = '';
  nonbypassStateReason = '';
  nonbypassAcceptReason = '';
  nonbypassBuwCaution = '';
  planValued = '';
  tosValued = '';
  dosValued = '';
  stateValued = '';
  acceptValued = '';
  cautionValued = '';
  buwMaxDrugLines = +9;
}
