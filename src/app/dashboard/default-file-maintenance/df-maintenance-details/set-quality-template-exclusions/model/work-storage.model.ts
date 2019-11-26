import { Mod43Commarea } from './mod43-commarea.model';
import { OrigLocationTableR } from './orig-location-table-r.model';
import { UpdtLocationTableR } from './updt-location-table-r.model';
import { ValidDivTable } from './valid-div-table.model';
import { WsCompFields } from './ws-comp-fields.model';
import { WsIndicators } from './ws-indicators.model';
import { WsMessages } from './ws-messages.model';

/**
 * Model class WorkStorage
 * Path: screenbean/setqltytmpltxcls
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltytmpltxcls::WorkStorage
 * Legacy Mapping: WS-FIELDS
 */
export class WorkStorage {
  wsCompFields = new WsCompFields();
  validDivCtr = 0;
  exclDivCtr = 0;
  origLocCtr = 0;
  updtLocCtr = 0;
  origLocationTable = '';
  origLocationTableR = new OrigLocationTableR();
  updtLocationTable = '';
  updtLocationTableR = new UpdtLocationTableR();
  validDivTable = new ValidDivTable();
  wsIndicators = new WsIndicators();
  wsMessages = new WsMessages();
  mod42Commarea = '';
  mod43Commarea = new Mod43Commarea();
  message = '';
}
