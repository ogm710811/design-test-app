import { WsSaveVarTab } from './ws-save-var-tab.model';

/**
 * Model class WsSaveVarArea
 * Path: screenbean/messagemnt
 * Model: com::uhc::aarp::fox::domain::screenbean::messagemnt::WsSaveVarArea
 * Legacy Mapping: WS-SAVE-VAR-AREA
 */
export class WsSaveVarArea {
  wsVarSub = 0;
  wsSaveVarTabs: WsSaveVarTab[] = [];
}
