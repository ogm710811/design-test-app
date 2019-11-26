import { StateInfo } from './state-info.model';
import { TosInfo } from './tos-info.model';

/**
 * Model class PlanStateInfoMnt
 * Path: screenbean/planstateinfomnt
 * Model: com::uhc::aarp::fox::domain::screenbean::planstateinfomnt::PlanStateInfoMnt
 * Legacy Mapping: FILLER
 */
export class PlanStateInfoMnt {
  title = '';
  recType = '';
  state = '';
  ind = '';
  stopDt = '';
  tosFields: TosInfo[] = [];
  stateInfos: StateInfo[] = [];
  errorMsg = '';
  titleFlag = false;
}
