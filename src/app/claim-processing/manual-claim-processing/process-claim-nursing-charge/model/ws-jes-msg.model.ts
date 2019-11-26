import {JesVariableMsg1} from './jes-variable-msg1.model';
import {JesVariableMsg2} from './jes-variable-msg2.model';
import {WsGenJesMsg} from './ws-gen-jes-msg.model';
import {WsUcpsJesMsg} from './ws-ucps-jes-msg.model';
/**
 * Model class WsJesMsg
 * Path: screenbean/procclmnursingchrgservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnursingchrgservice::WsJesMsg
 * Legacy Mapping: WS-JES-MSG
 */
export class WsJesMsg {
  jesProgramId = '';
  jesVariableMsg = '';
  jesVariableMsg1 = new JesVariableMsg1();
  jesVariableMsg2 = new JesVariableMsg2();
  wsUcpsJesMsg = new WsUcpsJesMsg();
  wsGenJesMsg = new WsGenJesMsg();
}
