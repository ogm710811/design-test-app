import { CedUcpsAhEntry } from './ced-ucps-ah-entry.model';

/**
 * Model class CedUcpsAddressHistory
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::CedUcpsAddressHistory
 * Legacy Mapping: CED-UCPS-ADDRESS-HISTORY
 */
export class CedUcpsAddressHistory {
  cedUcpsAhCounter = 0;
  cedUcpsAhEntrys: CedUcpsAhEntry[] = [];
}
