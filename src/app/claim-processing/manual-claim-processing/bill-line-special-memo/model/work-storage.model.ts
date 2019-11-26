import {D2BillLineNum} from './d2-bill-line-num.model';
import {Table1} from './table1.model';

/**
 * Model class WorkStorage
 * Path: screenbean/blspecmemo
 * Model: com::uhc::aarp::fox::domain::screenbean::blspecmemo::WorkStorage
 * Legacy Mapping: DONE-SW
 */
export class WorkStorage {
  doneSw = '';
  firstTimeTroughSw = '';
  errorSw = '';
  writePgmTsqInd = '';
  commandEnteredInd = '';
  wsTextEntredInd = '';
  wsRestoreReq = '';
  wsFieldAttr = '';
  sub1 = 0;
  sub2 = 0;
  wsReturnPgm = '';
  wsTempCnt = 0;
  wsValidPgm = '';
  mapPlanInd = '';
  wsTempBlIdNum = 0;
  wsNumDate = 0;
  wsFromMmyy = '';
  wsToMmyy = '';
  wkPlan = '';
  wkPlanInd = '';
  d2PlanCode = '';
  d2ProvName = '';
  d2SrvcDate = '';
  d2ChargeAmount = 0;
  d2CptCode = '';
  d2CptMod = '';
  d2NpInd = '';
  d2Hdr01 = '';
  d2PatternId = 0;
  d2Hdr02 = '';
  d2BillLineId = 0;
  wsTsqEobTermid = '';
  wsTsqEobScreen = '';
  wsR52Termid = '';
  wsR53Termid = '';
  wsR54Termid = '';
  wsTsqItemno = 0;
  tsqNumitems = 0;
  wsPgmTsqTermid = '';
  table1s: Table1[] = [];
  filler1 = '';
  ocuaCurrPgm = '';
  ocuaCicsRespCode = 0;
  ocuaCicsRespCodeD = 0;
  eobType = '';
}
