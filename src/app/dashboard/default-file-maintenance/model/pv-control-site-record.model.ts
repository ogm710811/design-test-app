import { PvSiteGroups } from './pv-site-groups.model';

/**
 * Model class PvControlSiteRecord
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::PvControlSiteRecord
 * Legacy Mapping: PV-CONTROL-SITE-RECORD
 */
export class PvControlSiteRecord {
  pvSiteGroups = new PvSiteGroups();
  pvAssignmentDate = 0;
}
