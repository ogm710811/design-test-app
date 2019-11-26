
import {AuthorityJrlRecord} from './authority-jrl-record.model';
import {JournalRec} from './journal-rec.model';
import {AuthorityKey} from './authority-key.model';
import {LesDefIons} from './les-def-ions.model';
import {LesSecDefKey} from './les-sec-def-key.model';
import {LesSecOperKey} from './les-sec-oper-key.model';
import {QualityComboJrlRecord} from './quality-combo-jrl-record.model';
import {QualityJrlRecord} from './quality-jrl-record.model';
import {TransSecurJrlRecord} from './trans-secur-jrl-record.model';
import {VariousIndicators} from './various-indicators.model';
import {WsNewAuthorityInfo} from './ws-new-authority-info.model';
import {WsOldAuthorityInfo} from './ws-old-authority-info.model';
import {WsOrigAuthInfo} from './ws-orig-auth-info.model';

/**
 * Model class WorkStorage
 * Path: screenbean/operauthlimit
 * Model: com::uhc::aarp::fox::domain::screenbean::operauthlimit::WorkStorage
 * Legacy Mapping: ALL-OF-MY-WORKING-STORAGE
 */
export class WorkStorage {
  thisIsWs = '';
  holdSub = 0;
  sub = 0;
  journalRecLen = 0;
  ajrlRecLen = 0;
  tjrlRecLen = 0;
  qjrlRecLen = 0;
  acjrlRecLen = 0;
  qcjrlRecLen = 0;
  rbaFld = 0;
  numberCautions = 0;
  numberDefaultCautions = 0;
  holdNonPays = 0;
  wsIons = 0;
  wsResponseCode = 0;
  moreDefaultCautionsInd = '';
  moreCautionsInd = '';
  matchDefaultInd = '';
  highlightCautionInd = '';
  sameAuthLevelInd = '';
  defaultFoundInd = '';
  lesDefFoundInd = '';
  dummyOperatorRecord = '';
  wsLesName = '';
  hold3Pos = '';
  variousIndicators = new VariousIndicators();
  authorityKey = new AuthorityKey();
  lesSecDefKey = new LesSecDefKey();
  lesSecOperKey = new LesSecOperKey();
  lesDefIons = new LesDefIons();
  expandCautionsR = '';
  expand3Pos = 0;
  expand6Pos = 0;
  exp6Pos: number[] = [];
  holdAmount = '';
  formatedAmount = '';
  expandIons = 0;
  displayDate = '';
  holdDate = '';
  reformatDate = '';
  lastDayOfTheMonth = '';
  eachMonth = '';
  holdYearCalc = 0;
  leapResult = '';
  wsOldAuthorityInfo = new WsOldAuthorityInfo();
  wsNewAuthorityInfo = new WsNewAuthorityInfo();
  wsOrigAuthInfo = new WsOrigAuthInfo();
  wsVariableInfo = '';
  journalRec = new JournalRec();
  authorityJrlRecord = new AuthorityJrlRecord();
  qualityComboJrlRecord = new QualityComboJrlRecord();
  transSecurJrlRecord = new TransSecurJrlRecord();
  qualityJrlRecord = new QualityJrlRecord();
  operItemIndicator = '';

}
