import {WsPctPlanCode} from './ws-pct-plan-code.model';

/**
 * Model class WsPctPlanData
 * Path: screenbean/procclmdrugchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugchrg::WsPctPlanData
 * Legacy Mapping: WS-PCT-PLAN-DATA
 */
export class WsPctPlanData {
  wsPctPlanCode = new WsPctPlanCode();
  wsPctPlanInd = '';
}
