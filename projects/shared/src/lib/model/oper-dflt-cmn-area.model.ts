import {CommSqCombos} from './comm-sq-combos.model';

/**
 * Model class OperDfltCmnArea
 * Path: bean
 * Model: com::uhc::aarp::fox::domain::bean::OperDfltCmnArea
 * Legacy Mapping: WS-MODULE-COMMAREA
 */
export class OperDfltCmnArea {
  cvcomSelection = '';
  cvcomType = '';
  cvcomValue = '';
  cvcomMaintStatus = '';
  cvcomVerifySwitch = '';
  cvcomReturnStatus = '';
  commRowCount = 0;
  commSaveCombos = '';
  commSavePosition = 0;
  commSqComboFields: CommSqCombos[] = [];
}
