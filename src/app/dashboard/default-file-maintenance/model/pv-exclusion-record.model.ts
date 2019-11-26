import { PvExcludedDivisionRecord } from './pv-excluded-division-record.model';
import { PvExcludedLocationRecord } from './pv-excluded-location-record.model';

/**
 * Model class PvExclusionRecord
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::PvExclusionRecord
 * Legacy Mapping: PV-EXCLUSION-RECORD
 */
export class PvExclusionRecord {
  pvExclusionType = '';
  pvExcludedDivisionRecord = new PvExcludedDivisionRecord();
  pvExcludedLocationRecord = new PvExcludedLocationRecord();
}
