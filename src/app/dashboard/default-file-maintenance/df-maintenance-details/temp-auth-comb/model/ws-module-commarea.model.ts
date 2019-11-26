/**
 * Model class WsModuleCommarea
 * Path: screenbean/operauthcombdflt
 * Model: com::uhc::aarp::fox::domain::screenbean::operauthcombdflt::WsModuleCommarea
 * Legacy Mapping: WS-MODULE-COMMAREA
 */
import {ComAuthorityCombinations} from './com-authority-combinations.model';

export class WsModuleCommarea {
  comAuthorityCombinations: ComAuthorityCombinations[] = [];
  warningMsgSentSw = '';
  firstMapChangesSw = '';
  lastAuthCombos = '';
  maintTermId = '';
  commareaPos = 0;
  verifAuthCombos = '';
}
