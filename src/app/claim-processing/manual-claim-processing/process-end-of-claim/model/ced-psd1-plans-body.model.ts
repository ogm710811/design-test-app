import { CedPsd1PlEntry } from './ced-psd1-pl-entry.model';

/**
 * Model class CedPsd1PlansBody
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::CedPsd1PlansBody
 * Legacy Mapping: CED-PSD1-PLANS-BODY
 */
export class CedPsd1PlansBody {
  cedPsd1PdDisabledInd = '';
  cedPsd1BenefitModInd = '';
  cedPsd1PlCounter = 0;
  cedPsd1PlEntrys: CedPsd1PlEntry[] = [];
}
