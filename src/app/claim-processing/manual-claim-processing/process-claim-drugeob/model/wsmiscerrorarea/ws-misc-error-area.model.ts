import {ErrScreenMsg} from './err-screen-msg.model';
import {WsJesMsg} from './ws-jes-msg.model';

/**
 * Model class WsMiscErrorArea
 * Path: screenbean/procclmdrugeobservice/wsmiscerrorarea
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::wsmiscerrorarea::WsMiscErrorArea
 * Legacy Mapping: WS-MISC-ERROR-AREA
 */
export class WsMiscErrorArea {
  errScreenMsg = new ErrScreenMsg();
  wsJesMsg = new WsJesMsg();
}
