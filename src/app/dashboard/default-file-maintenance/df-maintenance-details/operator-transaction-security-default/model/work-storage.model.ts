import { OperItem } from './oper-item.model';
import { WsConsistencyMessage } from './ws-consistency-message.model';
import { WsConsistencyMessage2 } from './ws-consistency-message2.model';
import { WsMessage1 } from './ws-message1.model';
import { WsMessage2 } from './ws-message2.model';
import { WsModuleCommarea } from './ws-module-commarea.model';

/**
 * Model class WorkStorage
 * Path: screenbean/opertranssecurdflt
 * Model: com::uhc::aarp::fox::domain::screenbean::opertranssecurdflt::WorkStorage
 */
export class WorkStorage {
  sub = 0;
  rbaFld = 0;
  journalRecLen = 0;
  rpdiskcvRecLen = 0;
  expandIons = 0;
  refDate = 0;
  refDateR = '';
  displayDate = '';
  errorSwitch = '';
  subType = '';
  wsAttributeValue = '';
  lastVerifyValue = '';
  lastDefaultRecord = '';
  wsFileName = '';
  wsMap = '';
  wsReply = '';
  rpdiskcvNotFound = '';
  wsMessage3 = '';
  dummyDefaultRecord = '';
  operItemIndicator = '';
  wsMsg11 = '';
  wsMsg12 = 0;
  wsMsg13 = '';
  wsMsg14 = '';
  wsMsg21 = '';
  wsMsg22 = 0;
  wsMsg23 = '';
  wsMsg24 = '';
  wsConsistencyMsg1 = '';
  wsConsistencyMsg21 = '';
  wsConsistencyMsg22 = '';
  wsRecordType = '';
  wsMenuSelection = '';
  wsMenuType = '';
  wsLevel = '';
  wsPosition = '';
  wsVarKey = '';
  journalHeader = '';
  oldTransSecurJournal = '';
  newTransSecurJournal = '';
  wsModuleCommarea = new WsModuleCommarea();
  wsLevelPosition = '';
  wsMessage1 = new WsMessage1();
  wsMessage2 = new WsMessage2();
  wsConsistencyMessage = new WsConsistencyMessage();
  wsConsistencyMessage2 = new WsConsistencyMessage2();
  searchOperLevel = 0;
  searchOperPos = '';
  operItems: OperItem[] = [];
  operIndex = 0;
  operCode = '';
  operName = '';
  callingProgram = '';
}
