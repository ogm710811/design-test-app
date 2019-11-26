import { MyWorkingStorage } from './my-working-storage.model';
import { OperatorJobDef } from './operator-job-def.model';
import { SearchOperValue } from './search-oper-value.model';
import { WsOpcommRecord } from './ws-opcomm-record.model';

/**
 * Model class WorkStorage
 * Path: screenbean/operauthlmtdflt
 * Model: com::uhc::aarp::fox::domain::screenbean::operauthlmtdflt::WorkStorage
 */
export class WorkStorage {
  myWorkingStorage = new MyWorkingStorage();
  searchOperValue = new SearchOperValue();
  wsOpcommRecord = new WsOpcommRecord();
  dfhMapSaveArea = '';
  dfhLinkageSwitch = '';
  holdCaution = '';
  opCommRecord = '';
  opCommLocs = '';
  operatorJobDef = new OperatorJobDef();
  wsStartCommArea = '';
}
