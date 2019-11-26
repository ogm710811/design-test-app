import { OvAuthExLocs } from './ov-auth-ex-locs.model';
import { OvAuthorityLimits } from './ov-authority-limits.model';

/**
 * Model class OvAuthorityLimitsData
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::OvAuthorityLimitsData
 * Legacy Mapping: OV-AUTHORITY-LIMITS-DATA
 */
export class OvAuthorityLimitsData {
  ovAuthorityLimits = new OvAuthorityLimits();
  ovAuthExLocs = new OvAuthExLocs();
}
