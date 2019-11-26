import {BLTempStorQueue, NoPayChrgBenLnTSQ, ProcClmTempClmRec} from '@fox/shared';

/**
 * Model class WsFields
 * Path: screenbean/procclmnopayeob
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnopayeob::WsFields
 * Legacy Mapping: WS-FIELDS
 */
export class WsFields {
  startOfWs = '';
  claimLocation = '';
  commandEnteredInd = '';
  firstUnassignBillLine = '';
  unassignBillLines = '';
  assignBillLines = '';
  splitAssignInd = '';
  thereIsAnAssignment = '';
  endOfTsqSw = '';
  foundClmSw = '';
  clearInd = '';
  theClaimNo = '';
  holdDate = 0;
  reformatDate = 0;
  insDobMdy = 0;
  holdCurrDate = 0;
  holdFromDate = 0;
  holdToDate = 0;
  holdLateFromDate = 0;
  workToDate = 0;
  sub = 0;
  sub1 = 0;
  screenSub = 0;
  chrgSub = 0;
  msub = 0;
  saveSub = 0;
  holdSplitSub = 0;
  sub120 = 0;
  claimSub = 0;
  suspSub = 0;
  tsItemNo = 0;
  totalLines = 0;
  totalYs = 0;
  wsClaimNumber = '';
  claimSplit = '';
  membNo = 0;
  acctNo = 0;
  insCode = 0;
  wsTsqQueue = '';
  wsTsqFunction = '';
  tsTermId = '';
  wsNpItemNum = 0;
  wsNpTsqNumItems = 0;
  wsNpTsqTermId = '';
  wsBlItemNum = 0;
  wsBlTsqNumItems = 0;
  wsBlTsqTermId = '';
  wsAssignInd = '';
  billCtr = 0;
  wsEobBillCtrN = 0;
  noPayChrgBenLnTSQ: NoPayChrgBenLnTSQ[] = [];
  blTempStorQueue: BLTempStorQueue[] = [];
  procClmTempClmRec = new ProcClmTempClmRec();
}
