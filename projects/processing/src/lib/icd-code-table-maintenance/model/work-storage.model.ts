
import { SaveIcdData } from './save-icd-data.model';

/**
 * Model class WorkStorage
 * Path: screenbean/icdcodemnt
 * Model: com::uhc::aarp::fox::domain::screenbean::icdcodemnt::WorkStorage
 * Legacy Mapping: WS-VALUES
 */
export class WorkStorage {
  commandEnteredInd = '';
  ionsIdKeyHold = 0;
  ionsId = 0;
  examinerName = '';
  operatorKey = 0;
  twoSpaces = '';
  selection = '';
  wsRespCode = 0;
  rbaFld = 0;
  wsIcd4 = '';
  wsIcd5 = '';
  wsIcd6 = '';
  wsIcd7 = '';
  wsIcd1 = '';
  wsIcd2 = '';
  wsIcd3 = '';
  wsUpdtMsgIcd = '';
  wsIsrtMsgIcd = '';
  wsUpdtSqlcode = '';
  wsIsrtSqlcode = '';
  wsSelectSqlcode = '';
  wsRpdiskoiError = '';
  saveIcdData = new SaveIcdData();
  t1UctranstSaved = 0;
  icdTableChg = '';
  icdTableAdd = '';

}
