import {CicsErrorMessage} from './cics-error-message.model';
import {WsCicsErrorMsg} from './ws-cics-error-msg.model';
import {WsUcpsTsqName} from './ws-ucps-tsq-name.model';

/**
 * Model class WsCicsWorkArea
 * Path: screenbean/procclmhospchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmhospchrg::WsCicsWorkArea
 * Legacy Mapping: WS-CICS-WORK-AREA
 */
export class WsCicsWorkArea {
  wsCicsErrorMsg = new WsCicsErrorMsg();
  cicsErrorMessage = new CicsErrorMessage();
  wsTsqItemno = 0;
  wsCicsResp = 0;
  wsMapName = '';
  wsReturnId = '';
  wsSendMapInd = '';
  wsUcpsTsqName = new WsUcpsTsqName();
}
