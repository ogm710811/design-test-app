import { OvSetQualityInfo } from './ov-set-quality-info.model';
import { OvSqExLocs } from './ov-sq-ex-locs.model';

/**
 * Model class OvSetQualityData
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::OvSetQualityData
 * Legacy Mapping: OV-SET-QUALITY-DATA
 */
export class OvSetQualityData {
  ovSetQualityInfo = new OvSetQualityInfo();
  ovSqExLocs = new OvSqExLocs();
  ovSqVqrPctAny = 0;
  ovSqVqrPct2OrMore = 0;
}
