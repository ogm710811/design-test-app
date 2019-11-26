import { CedDepdAhEntry } from './ced-depd-ah-entry.model';

/**
 * Model class CedDepdAddressHistory
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::CedDepdAddressHistory
 * Legacy Mapping: CED-DEPD-ADDRESS-HISTORY
 */
export class CedDepdAddressHistory {
  cedDepdAhCounter = 0;
  cedDepdAhEntrys: CedDepdAhEntry[] = [];
}
