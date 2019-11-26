import {OperatorFileOfAuthorityLimitCombosPO} from '@fox/shared';
import {OperItem} from './oper-item.model';
import {WsTables} from './ws-tables.model';

/**
 * Model class WorkStorage
 * Path: screenbean/operauthcomb
 * Model: com::uhc::aarp::fox::domain::screenbean::operauthcomb::WorkStorage
 * Legacy Mapping: WORK-AREA
 */
export class WorkStorage {
  wsTables = new WsTables();
  lastMaintDate = '';
  maintIons = 0;
  wsDate = 0;
  wsStartDate = '';
  wsEndDate = '';
  holdDate = '';
  reformatDate = '';
  holdYearCalc = 0;
  hold3 = 0;
  hold2 = 0;
  protectFieldsInd = '';
  fileIoCond = '';
  compressInd = '';
  journalType = '';
  screenError = '';
  fieldInd = '';
  wsCaution = 0;
  wsNumber = 0;
  operItemIndicator = '';
  wsVarIonsid = 0;
  wsAuthLimitTable: OperatorFileOfAuthorityLimitCombosPO[] = [];
  sub = 0;
  row = 0;
  row1 = 0;
  wscommPos = 0;
  journalLen = 0;
  rbaFld = 0;
  wsIons = 0;
  searchOperLevel = 0;
  searchOperPos = '';
  operItems: OperItem[] = [];
  operIndex = 0;
  trnCompleted = '';
}
