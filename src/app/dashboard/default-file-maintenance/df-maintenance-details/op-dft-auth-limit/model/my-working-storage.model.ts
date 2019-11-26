import { DisplayDate } from './display-date.model';
import { Hold3Pos } from './hold3-pos.model';
import { MenuValue } from './menu-value.model';
import { ReformatDate } from './reformat-date.model';
import { SearchOperValue } from './search-oper-value.model';
import { VariousIndicators } from './various-indicators.model';
import { VerificationKey } from './verification-key.model';
import { WsVariableInfo } from './ws-variable-info.model';

/**
 * Model class MyWorkingStorage
 * Path: screenbean/operauthlmtdflt
 * Model: com::uhc::aarp::fox::domain::screenbean::operauthlmtdflt::MyWorkingStorage
 * Legacy Mapping: MY-WORKING-STORAGE
 */
export class MyWorkingStorage {
  thisIsWs = '';
  holdSub = 0;
  sub = 0;
  sub1 = 0;
  sortSub1 = 0;
  sortSub2 = 0;
  sortSub3 = 0;
  journalRecLen = 0;
  cvRecLen = 0;
  rbaFld = 0;
  totCautions = 0;
  sortCtr1 = 0;
  sortCtr2 = 0;
  menuValue = new MenuValue();
  hold3Pos = new Hold3Pos();
  variousIndicators = new VariousIndicators();
  verificationKey = new VerificationKey();
  expandCautions = 0;
  expand3Pos = 0;
  expand6Pos = 0;
  holdAmount = '';
  formatedAmount = '';
  expandIons = 0;
  unpackIons = 0;
  displayDate = new DisplayDate();
  reformatDate = '';
  wsVariableInfo = new WsVariableInfo();
  verifyRecord = '';
  operItemIndicator = '';
  searchOperValue = new SearchOperValue();
}
