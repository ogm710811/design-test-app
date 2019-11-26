import { PvSetQualityCombinations } from './pv-set-quality-combinations.model';
import { PvSetQualityInfo } from './pv-set-quality-info.model';
import { PvTemplRecordKey } from './pv-templ-record-key.model';

/**
 * Model class PvTemplateRecord
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::PvTemplateRecord
 * Legacy Mapping: PV-TEMPLATE-RECORD
 */
export class PvTemplateRecord {
  pvTemplRecordKey = new PvTemplRecordKey();
  pvMaintIons = 0;
  pvMaintDate = 0;
  pvSetQualityInfo = new PvSetQualityInfo();
  pvSetQualityCombinations = new PvSetQualityCombinations();
}
