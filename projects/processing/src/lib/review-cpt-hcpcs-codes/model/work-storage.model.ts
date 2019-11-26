import {DialModeCommLinkArea} from '@fox/shared';
import {RetrieveCptModiferLnkArea} from './retrieve-cpt-modifer-lnk-area.model';
import {Rpd09o70Linkage} from './rpd09o70-linkage.model';
import {Rpd9o70Input} from './rpd9o70-input.model';
import {Rpd9o70Output} from './rpd9o70-output.model';
import {WsArea} from './ws-area.model';
import {WsBenefits} from './ws-benefits.model';
import {WsMapLineStateTable} from './ws-map-line-state-table.model';
import {WsMapLineUtzTable} from './ws-map-line-utz-table.model';

/**
 * Model class WorkStorage
 * Path: screenbean/rvwcpthcpcs
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwcpthcpcs::WorkStorage
 */
export class WorkStorage {
  wsArea = new WsArea();
  wsBenefits = new WsBenefits();
  luwSub = 0;
  stateSub = 0;
  utzSub = 0;
  mapLineStSub = 0;
  mapLineUtSub = 0;
  wsMsg1 = '';
  wsMsg2 = '';
  rpd09o70Input = new Rpd9o70Input();
  rpd09o70Output = new Rpd9o70Output();
  rpd09o70Link = new Rpd09o70Linkage();
  wsMapLineStateTables: WsMapLineStateTable[] = [];
  wsMapLineUtzTables: WsMapLineUtzTable[] = [];
  finishDi316 = '';
  retrieveCPTModLnkArea = new RetrieveCptModiferLnkArea();
  dialModComArea = new DialModeCommLinkArea();
  wsLuwModule = '';
  wsLuwRc = '';
  wsLuwObject = '';
  wsLuwErrorMsg = '';
}
