import {BLTempStorQueue, XpndClmBasicSeg} from '@fox/shared';
import {CelCicsErrRec} from './cel-cics-err-rec.model';
import {CelRecordKey} from './cel-record-key.model';
import {EobDtl01} from './eob-dtl01.model';
import {EobHdr01} from './eob-hdr01.model';
import {MapCommandLine} from './map-command-line.model';
import {QcaProcessingFields} from './qca-processing-fields.model';
import {QrHdr01} from './qr-hdr01.model';
import {QualityCommArea} from './quality-comm-area.model';
import {Rpd06o55Link} from './rpd06o55-link.model';
import {Rpdmaa5Tab} from './rpdmaa5-tab.model';
import {RqrHdr01} from './rqr-hdr01.model';
import {Tab1ScreenDtl} from './tab1-screen-dtl.model';
import {Table1} from './table1.model';
import {WsPgmTsqRec} from './ws-pgm-tsq-rec.model';
import {WsTempText} from './ws-temp-text.model';

/**
 * Model class WorkStorage
 * Path: screenbean/rvwblmessages
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwblmessages::WorkStorage
 * Legacy Mapping: WS-DATE-FIELD
 */
export class WorkStorage {
  firstTimeTroughSw = '';
  wsReturnPgm = '';
  hdrDoneSw = '';
  doneAlignSw = '';
  commandEnteredInd = '';
  wsScrnHdr = '';
  sub1 = 0;
  sub2 = 0;
  tsqSub = 0;
  wsTempCnt = 0;
  mapPlanInd = '';
  wsTsqEobTermid = '';
  wsTsqEobScreen = '';
  wsR53Termid = '';
  wsInitTsqTermid = '';
  wsTsqItemno = 0;
  wsTextItemno = 0;
  wsNumitems = 0;
  wsPgmTsqTermid = '';
  wsDataTsqTermid = '';
  table1 = new Table1();
  rpdmaa5Tabs: Rpdmaa5Tab[] = [];
  maa5ErrL = 0;
  maa5ErrA = '';
  maa5ErrMsg = '';
  t1ReturnModule = '';
  t1CallFromId = '';
  t1ProcessingInd = '';
  t1MbrId = '';
  t1ClaimId = '';
  t1UctranstSaved = 0;
  t1LinkLen = 0;
  t1CurrScreen = 0;
  t1TotalScreens = 0;
  t1SaveScreen = '';
  protNorm = '';
  protNormMdt = '';
  protBrt = '';
  protBrtMdt = '';
  protDrk = '';
  protDrkMdt = '';
  protNumDrk = '';
  protNumDrkMdt = '';
  aa5pf7f = '';
  aa5pf8f = '';
  celCicsErrRec = new CelCicsErrRec();
  ocuaCurrPgm = '';
  ocuaCicsRespCode = 0;
  ocuaCicsRespCodeD = 0;
  wsTempMsg1 = '';
  wsTempMsg2 = '';
  r53BillLine = new BLTempStorQueue();
  wsValidPgm = '';
  exbasicclaimseg = new XpndClmBasicSeg();
  wsTempMsgs: string[] = [];
  qcaprocessingfields = new QcaProcessingFields();
  table1screendtl: Tab1ScreenDtl[] = [];
  celRecKey = new CelRecordKey();
  eobHdr01 = new EobHdr01();
  rqurHdr01 = new RqrHdr01();
  qrhdr01 = new QrHdr01();
  eobDtl01 = new EobDtl01();
  wstempText = new WsTempText();
  qualityCommArea = new QualityCommArea();
  mapCommandLine = new MapCommandLine();
  wspgmtsqrec = new WsPgmTsqRec();
  rpd06o55Link = new Rpd06o55Link();
}
