import {CommSqCombos} from '@fox/shared';

/**
 * Model class OperDfltCmnArea
 * Path: screenbean/setqltycombdflt
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltycombdflt::OperDfltCmnArea
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
  firstTimeReadRec = '';
  commSaveTermId = '';
}
