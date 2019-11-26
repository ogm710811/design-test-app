import {CelCicsErrMsg} from './cel-cics-err-msg.model';
import {CelRecordKey} from './cel-record-key.model';
/**
 * Model class CelCicsErrRec
 * Path: screenbean/procclmnursingchrgservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnursingchrgservice::CelCicsErrRec
 * Legacy Mapping: CEL-CICS-ERR-REC
 */
export class CelCicsErrRec {
  celRecordKey = new CelRecordKey();
  celSeparator1 = '';
  celScreenMsg = '';
  celSeparator2 = '';
  celCicsErrMsg = new CelCicsErrMsg();
  celSeparator4 = '';
  celUserId = '';
  celFreeTxtErrMsg = '';
}
