import { OvSetQualityTemplComb } from './ov-set-quality-templ-comb.model';
import { OvSetQualityTemplInfo } from './ov-set-quality-templ-info.model';

/**
 * Model class OvSetQualityTemplateData
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::OvSetQualityTemplateData
 * Legacy Mapping: OV-SET-QUALITY-TEMPLATE-DATA
 */
export class OvSetQualityTemplateData {
  ovSetQualityTemplInfo = new OvSetQualityTemplInfo();
  ovSetQualityTemplComb = new OvSetQualityTemplComb();
  ovSqtUpdateType = '';
}
