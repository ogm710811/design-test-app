import { CedHhldAhEntry } from './ced-hhld-ah-entry.model';

/**
 * Model class CedHhldAddressHistory
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::CedHhldAddressHistory
 * Legacy Mapping: CED-HHLD-ADDRESS-HISTORY
 */
export class CedHhldAddressHistory {
  cedHhldAhCounter = 0;
  cedHhldAhEntrys: CedHhldAhEntry[] = [];
}
