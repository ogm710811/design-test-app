import {CommArea, Dfhcommarea, PlanInfoCmnArea} from '@fox/shared';
import {DfhCommonArea} from './dfhcommonarea.model';
import {Rpdma36} from './rpdma36.model';
import {WorkStorage} from './work-storage.model';
import {WsDelMessage} from './ws-del-message.model';
import {WsDelMessage2} from './ws-del-message2.model';
import {WsDelMessage3} from './ws-del-message3.model';
import {WsDelMessage4} from './ws-del-message4.model';
import {WsMedConstKey} from './ws-med-const-key.model';
import {WsPlanStateKey1} from './ws-plan-state-key1.model';
import {WsPlanStateKey2} from './ws-plan-state-key2.model';
import {WsPlanStateKey5} from './ws-plan-state-key5.model';
import {WsVerifyMsg} from './ws-verify-msg.model';

/**
 * Model class Container
 * Path: screenbean/planinfomntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::planinfomntmenu::Container
 */
export class Container {
  commArea = new CommArea();
  dfhCommArea = new DfhCommonArea();
  dfh = new Dfhcommarea();
  screenBean = new Rpdma36();
  workStorage = new WorkStorage();
  wsDelMessage = new WsDelMessage();
  commonArea = new PlanInfoCmnArea();
  wsDelMessage2 = new WsDelMessage2();
  wsDelMessage3 = new WsDelMessage3();
  wsDelMessage4 = new WsDelMessage4();
  wsMedConstKey = new WsMedConstKey();
  wsPlanStateKey1 = new WsPlanStateKey1();
  wsPlanStateKey2 = new WsPlanStateKey2();
  wsPlanStateKey5 = new WsPlanStateKey5();
  wsVerifyMsg = new WsVerifyMsg();
}
