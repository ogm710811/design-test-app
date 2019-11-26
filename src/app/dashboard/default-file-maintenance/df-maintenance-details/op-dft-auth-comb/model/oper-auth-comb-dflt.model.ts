/**
 * Model class OperAuthCombDflt
 * Path: screenbean/operauthcombdflt
 * Model: com::uhc::aarp::fox::domain::screenbean::operauthcombdflt::OperAuthCombDflt
 */
import {ComboTable} from './combo-table.model';

export class OperAuthCombDflt {
  func = '';
  desc = '';
  authLevel = '';
  authLevelVal = '';
  maintDate = '';
  pos = '';
  posVal = '';
  ion = '';
  xlds = '';
  xl = '';
  vlit = '';
  vrep = '';
  errMsg = '';
  comboTable: ComboTable[] = [];
  cvAuthExLocs: Array<string> = [];
}
