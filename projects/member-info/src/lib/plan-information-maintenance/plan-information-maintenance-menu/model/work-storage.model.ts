import { SpaceErrorMsg } from './space-error-msg.model';
import { WsDelMessage } from './ws-del-message.model';
import { WsDelMessage2 } from './ws-del-message2.model';
import { WsDelMessage3 } from './ws-del-message3.model';
import { WsDelMessage4 } from './ws-del-message4.model';
import { WsMedConstKey } from './ws-med-const-key.model';
import { WsPlanStateKey1 } from './ws-plan-state-key1.model';
import { WsPlanStateKey2 } from './ws-plan-state-key2.model';
import { WsPlanStateKey5 } from './ws-plan-state-key5.model';
import { WsVerifyMsg } from './ws-verify-msg.model';

/**
 * Model class WorkStorage
 * Path: screenbean/planinfomntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::planinfomntmenu::WorkStorage
 * Legacy Mapping: WORK-AREAS-COMP
 */
export class WorkStorage {
  wsResponse = '';
  wsCommareaLength = 0;
  wsSecurity = '';
  holdState = '';
  wsSelection = '';
  wsProgram = '';
  wsReadNotfnd = '';
  wsMedConstKey = new WsMedConstKey();
  wsPlanStateKey1 = new WsPlanStateKey1();
  wsPlanStateKey2 = new WsPlanStateKey2();
  wsPlanStateKey5 = new WsPlanStateKey5();
  wsSplit = '';
  workDate = '';
  wsDelMessage = new WsDelMessage();
  wsDelMessage2 = new WsDelMessage2();
  wsDelMessage3 = new WsDelMessage3();
  wsDelMessage4 = new WsDelMessage4();
  wsVerifyMsg = new WsVerifyMsg();
  spaceErrorMsg = new SpaceErrorMsg();
  wsState = '';
  wsTos = '';
  wsAgeIndicator = '';
  wsStopDate = '';
  wsPlanCode = '';
  wsPlanInd = '';
  stateSub = 0;
  stateFoundInd = '';
  planTosEmpty = '';
  planStateEmpty = '';
  medConstEmpty = '';
  tosEmpty = '';
  differentPlanInd = '';
}
