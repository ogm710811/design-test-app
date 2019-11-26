import {CommComm, OperFileCmnArea, OperatorFileOfAuthorityLimitCombosPO} from '@fox/shared';
import {OpcommAuthCombos} from './opcomm-auth-combos.model';
import {OperatorCommareaMiscFields} from './operator-commarea-misc-fields.model';

/**
 * Model class WsModuleCommarea
 * Path: screenbean/operauthcomb
 * Model: com::uhc::aarp::fox::domain::screenbean::operauthcomb::WsModuleCommarea
 * Legacy Mapping: WS-MODULE-COMMAREA
 */
export class WsModuleCommarea {
  mapSaveArea = '';
  linkageSwitch = '';
  operatorCommareaMiscFields = new OperatorCommareaMiscFields();
  opcommPos = 0;
  opcommAuthCombos = new OpcommAuthCombos();
  origAuthCombos: OperatorFileOfAuthorityLimitCombosPO[] = [];
  commComm = new CommComm();
  operFileCmnArea = new OperFileCmnArea();
}
