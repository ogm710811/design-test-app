import {JesVariableMsg1} from './jes-variable-msg1.model';
import {JesVariableMsg2} from './jes-variable-msg2.model';
import {WsGenJesMsg} from './ws-gen-jes-msg.model';
import {WsUcpsJesMsg} from './ws-ucps-jes-msg.model';

/**
 * Model class WsJesMsg
 * Path: screenbean/procclmdrugeobservice/wsmiscerrorarea
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::wsmiscerrorarea::WsJesMsg
 * Legacy Mapping: WS-JES-MSG
 */
export class WsJesMsg {
  wsGenJesMsg = new WsGenJesMsg();
  jesVariableMsg2 = new JesVariableMsg2();
  jesVariableMsg1 = new JesVariableMsg1();
  wsUcpsJesMsg = new WsUcpsJesMsg();
  jesProgramId = '';
  jesVariableMsg = '';
}
