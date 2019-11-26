import {MiscInfo} from './misc-info.model';
import {WsLetterKey} from './ws-letter-key.model';

/**
 * Model class WorkStorage
 * Path: screenbean/delcmnctservice
 * Model: com::uhc::aarp::fox::domain::screenbean::delcmnctservice::WorkStorage
 * Legacy Mapping: WORK-AREA
 */
export class WorkStorage {
  wsResponseCode = 0;
  wsLetterKey = new WsLetterKey();
  dateYmd = 0;
  holdDate9 = 0;
  miscInfo = new MiscInfo();
  holdStatus = '';
  commandEnteredInd = '';
}
