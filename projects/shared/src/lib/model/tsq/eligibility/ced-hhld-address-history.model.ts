import {CedHhldAhEntry} from './ced-hhld-ah-entry.model';

/**
 * Model class CedHhldAddressHistory
 * Path: bean/tsq/eligibility
 * Model: com::uhc::aarp::fox::domain::bean::tsq::eligibility::CedHhldAddressHistory
 * Legacy Mapping: CED-HHLD-ADDRESS-HISTORY
 */
export class CedHhldAddressHistory {
  cedHhldAhCounter = 0;
  cedHhldAhEntrys: CedHhldAhEntry[] = [];
}
