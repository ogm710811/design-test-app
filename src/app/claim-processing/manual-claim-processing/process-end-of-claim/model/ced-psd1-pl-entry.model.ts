import { CedPsd1BmEntry } from './ced-psd1-bm-entry.model';
import { CedPsd1PlanLeEntry } from './ced-psd1-plan-le-entry.model';

/**
 * Model class CedPsd1PlEntry
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::CedPsd1PlEntry
 * Legacy Mapping: CED-PSD1-PL-ENTRY
 */
export class CedPsd1PlEntry {
  cedPsd1PlanCompas = '';
  cedPsd1PlanBase = '';
  cedPsd1CertState = '';
  cedPsd1PlanProductType = '';
  cedPsd1PlanProductCategory = '';
  cedPsd1PlanStartDate = '';
  cedPsd1PlanTermDate = '';
  cedPsd1PlanTermReason = '';
  cedPsd1PlanConservation = '';
  cedPsd1PlanEmployerId = '';
  cedPsd1PlanEmployerType = '';
  cedPsd1PeSubsidizedStart = '';
  cedPsd1PeSubsidizedStop = '';
  cedPsd1PlLegalEntryCntr = 0;
  cedPsd1PlanLeEntrys: CedPsd1PlanLeEntry[] = [];
  cedPsd1BmCounter = 0;
  cedPsd1BmEntrys: CedPsd1BmEntry[] = [];
  cedPsd1PlanCode = '';
  cedPsd1PlanInd = '';
}
