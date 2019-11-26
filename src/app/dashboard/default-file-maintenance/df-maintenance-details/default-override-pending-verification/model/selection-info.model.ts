import { SelValue } from './sel-value.model';

/**
 * Model class SelectionInfo
 * Path: screenbean/dfltovrdpendverfservice
 * Model: com::uhc::aarp::fox::domain::screenbean::dfltovrdpendverfservice::SelectionInfo
 * Legacy Mapping: SELECTION-INFO
 */
export class SelectionInfo {
  selSelection = '';
  selType = '';
  selValue = new SelValue();
  selValueNum = 0;
  selOperIons = 0;
  selOsaInd = '';
  selMaintStatus = '';
}
