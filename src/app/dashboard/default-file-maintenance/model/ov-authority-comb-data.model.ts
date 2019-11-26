import { OvAuthCombExLocs } from './ov-auth-comb-ex-locs.model';
import { OvAuthCombPlans } from './ov-auth-comb-plans.model';
import { OvAuthorityCombinations } from './ov-authority-combinations.model';

/**
 * Model class OvAuthorityCombData
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::OvAuthorityCombData
 * Legacy Mapping: OV-AUTHORITY-COMB-DATA
 */
export class OvAuthorityCombData {
  ovAuthorityCombinations = new OvAuthorityCombinations();
  ovAuthCombPlans = new OvAuthCombPlans();
  ovAuthCombExLocs = new OvAuthCombExLocs();
}
