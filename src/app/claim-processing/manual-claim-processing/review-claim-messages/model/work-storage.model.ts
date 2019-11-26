import {BLTempStorQueue} from '@fox/shared';
import {QrDtl01} from './qr-dtl01.model';
import {RchDtl01} from './rch-dtl01.model';
import {RchDtl02} from './rch-dtl02.model';
import {RqrDtl01} from './rqr-dtl01.model';
import {RvwClmHistEntClmCombClm} from './rvw-clm-hist-ent-clm-comb-clm.model';
import {Table1} from './table1.model';
import {WsPgmTsqRec} from './ws-pgm-tsq-rec.model';
import {WsTempTextArea} from './ws-temp-text-area.model';

/**
 * Model class WorkStorage
 * Path: screenbean/rvwclmmsgtext
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwclmmsgtext::WorkStorage
 * Legacy Mapping: COMMAND-ENTERED-IND
 */
export class WorkStorage {
  commandEnteredInd = '';
  doneSw = '';
  wsRecordType = 0;
  wsNumitems = 0;
  filler1 = '';
  filler2 = '';
  wsInitTsqTermid = '';
  wsR56Termid = '';
  wsTsqItemno = 0;
  wsTempMsg1 = '';
  t1ReturnModule = '';
  t1Rpd07o10PfKey = '';
  t1MbrId = '';
  t1ClaimId = '';
  t1UctranstSaved = 0;
  t1LinkLen = 0;
  t1Sub1 = 0;
  t1Sub2 = 0;
  t1CurrScreen = 0;
  t1Dtl = '';
  t1ProcessingInd = '';
  sub1 = 0;
  sub2 = 0;
  wsTempCnt = 0;
  wsReturnPgm = '';
  table1 = new Table1();
  wsTempMsg2 = '';
  tsqSub = 0;
  t1CallFromId = '';
  wsTsqEobTermid = '';
  wsTsqEobScreen = '';
  filler3 = '';
  wsTsqEobTermid1 = '';
  wsTsqEobScreen1 = '';
  filler4 = '';
  wsValidPgm = '';
  firstTimeTroughSw = '';
  wsPgmTsqTermid = '';
  wsTempTextArea = new WsTempTextArea();
  wsPgmTsqRec = new WsPgmTsqRec();
  blTempStorQueue: BLTempStorQueue[] = [];
  rvwClmHistEntClmCombClm = new RvwClmHistEntClmCombClm();
  oEobType = '';
  rchDtl01 = new RchDtl01();
  rchDtl02 = new RchDtl02();
  qrDtl01 = new QrDtl01();
  rqrDtl01 = new RqrDtl01();
}
