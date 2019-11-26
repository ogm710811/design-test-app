import { CedPsd1MsEntry } from './ced-psd1-ms-entry.model';

/**
 * Model class CedPsd1MedicaidSuspension
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::CedPsd1MedicaidSuspension
 * Legacy Mapping: CED-PSD1-MEDICAID-SUSPENSION
 */
export class CedPsd1MedicaidSuspension {
  cedPsd1MsCounter = 0;
  cedPsd1MsEntrys: CedPsd1MsEntry[] = [];
}
