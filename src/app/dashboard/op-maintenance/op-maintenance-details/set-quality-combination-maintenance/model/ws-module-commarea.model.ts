import {CommComm, OperatorFilePO, OperInfoCmnArea} from '@fox/shared';
import {CommSqComboFields} from '../model/comm-sq-combo-fields.model';
import {CommSqCombos} from '../model/comm-sq-combos.model';

/**
 * Model class WsModuleCommarea
 * Path: screenbean/setqltycomb
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltycomb::WsModuleCommarea
 * Legacy Mapping: WS-MODULE-COMMAREA
 */
export class WsModuleCommarea {
  commSqComboFields = new CommSqComboFields();
  mapSaveArea = '';
  linkageSwitch = '';
  commRowCount = 0;
  commSaveCombos: CommSqCombos[] = [];
  commSavePosition = 0;
  commSaveTermId = '';
  firstTimeReadRec = '';
  commComm = new CommComm();
  operatorFile = new OperatorFilePO();
  operInfoCmnArea = new OperInfoCmnArea();
}
