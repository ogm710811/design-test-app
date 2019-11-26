import { AuthorityKey } from './authority-key.model';
import { JHeader } from './jheader.model';
import { JournalRec } from './journal-rec.model';
import { OperItem } from './oper-item.model';
import { OperatorCommareaMiscFields } from './operator-commarea-misc-fields.model';
import { SearchOperValue } from './search-oper-value.model';
import { WsConsistencyMessage } from './ws-consistency-message.model';
import { WsConsistencyMessage2 } from './ws-consistency-message2.model';
import { WsVariableInfo } from './ws-variable-info.model';

/**
 * Model class WorkStorage
 * Path: screenbean/opertranssecur
 * Model: com::uhc::aarp::fox::domain::screenbean::opertranssecur::WorkStorage
 */
export class WorkStorage {
  rbaFld = 0;
  journalRecLen = 0;
  expandIons = 0;
  wsConsistencyMessage = new WsConsistencyMessage();
  wsConsistencyMessage2 = new WsConsistencyMessage2();
  refDate = 0;
  refDateR = '';
  displayDate = '';
  errorSwitch = '';
  lastVerifyValue = '';
  subType = '';
  protectFieldsInd = '';
  matchDefaultInd = '';
  defaultFoundInd = '';
  wsVariableInfo = new WsVariableInfo();
  dummyOperatorRecord = '';
  journalRec = new JournalRec();
  authorityKey = new AuthorityKey();
  operItemIndicator = '';
  searchOperValue = new SearchOperValue();
  operatorCommareaMiscFields = new OperatorCommareaMiscFields();
  jheader = new JHeader();
  wsStartCommarea = '';
  operItems: OperItem[] = [];
  operIndex = 0;
  defaultFound = '';
  defaultNotFound = '';
  matchDefault = '';
  operItemFound = '';
  trnCompleted = '';
}
