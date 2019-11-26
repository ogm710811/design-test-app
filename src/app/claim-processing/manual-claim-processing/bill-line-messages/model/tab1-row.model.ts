import {T1PpId} from './t1-pp-id.model';

/**
 * Model class Tab1Row
 * Path: screenbean/blmessages
 * Model: com::uhc::aarp::fox::domain::screenbean::blmessages::Tab1Row
 * Legacy Mapping: TAB1-ROW
 */
export class Tab1Row {
  t1NpInd = '';
  tab1PpData = '';
  t1PpIds: T1PpId[] = [];
  t1Sm1Num = 0;
  t1Sm2Num = 0;
}
