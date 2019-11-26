import {T5Tab} from './t5-tab.model';
import {Tab1Row} from './tab1-row.model';
import {Tab3} from './tab3.model';
import {Tab4} from './tab4.model';
import {W2BillLnRow} from './w2-bill-ln-row.model';
import {WkPlan} from './wk-plan.model';
import {WsBillLnRow} from './ws-bill-ln-row.model';
import {WsFromMmyy} from './ws-from-mmyy.model';
import {WsTempPpEntry} from './ws-temp-pp-entry.model';
import {WsToMmyy} from './ws-to-mmyy.model';

/**
 * Model class WorkStorage
 * Path: screenbean/blmessages
 * Model: com::uhc::aarp::fox::domain::screenbean::blmessages::WorkStorage
 */
export class WorkStorage {
  sub2 = 0;
  sub1 = 0;
  wsValidModulesIds = '';
  wsReturnPgm = '';
  wsSubsttPp = '';
  wsErrInd = '';
  wsAstVal = '';
  tsqSub = 0;
  addCautionSw = '';
  doneSw = '';
  firstTimeThroughSw = '';
  cursorSetInd = '';
  wsAstFoundInd = '';
  wsTempSub = 0;
  wsValidAstPpIds = '';
  wsValidSpecMemoVal = '';
  mapPlanInd = '';
  firstTimeInd = '';
  wsFromMmyy = new WsFromMmyy();
  wsToMmyy = new WsToMmyy();
  wkPlan = new WkPlan();
  wkPlanInd = '';
  wsHoldT3 = 0;
  wsTempNumPp = 0;
  wsTempSmNum = 0;
  wsNumDate = 0;
  wsTsqItemno = 0;
  tsqNumitems = 0;
  wsTempPpSubstitude = '';
  wsTempPpIds: string[] = [];
  wsTempPpEntry = new WsTempPpEntry();
  t1Sub = 0;
  t2Sub = 0;
  t1DataInd = '';
  t1TableLimit = 0;
  tab1Rows: Tab1Row[] = [];
  t1SmTxtTsqInd = '';
  t1SmIndTsqInd = '';
  t1PpTsqInd = '';
  t3Sub = 0;
  t3TotPpCnt = 0;
  tab3s: Tab3[] = [];
  t3ColAstCnts: number[] = [];
  t3BlMsgCnts: number[] = [];
  t4Sub = 0;
  t1DispGraceMsg1 = '';
  t1DispGraceMsg2 = '';
  tab4s: Tab4[] = [];
  t5Tabs: T5Tab[] = [];
  d1PlanCode = '';
  d1ProvName = '';
  d1SrvcDate = 0;
  d1ChargeAmount = 0;
  d1CptCode = '';
  d1CptMod = '';
  d1BillLineId = 0;
  temp = '';
  w2BillLnRows: W2BillLnRow[] = [];
  linNdx = 0;
  wsBillLnRows: WsBillLnRow[] = [];
  linIdx = 0;
}
