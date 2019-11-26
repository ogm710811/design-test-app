/**
 * Model class WsModuleCommarea
 * Path: screenbean/operauthlimit
 * Model: com::uhc::aarp::fox::domain::screenbean::operauthlimit::WsModuleCommarea
 * Legacy Mapping: WS-MODULE-COMMAREA
 */
import {OperatorCommareaMiscFields} from '../../../model/operator-commarea-misc-fields.model';
import {OperatorPlans} from './operator-plans.model';

export class WsModuleCommarea {
  mapSaveArea = '';
  linkageSwitch = '';
  operatorCommareaMiscFields = new OperatorCommareaMiscFields();
  operatorPlans = new OperatorPlans();
  origAuthInfo = '';
  origAuthLevel = '';
}
