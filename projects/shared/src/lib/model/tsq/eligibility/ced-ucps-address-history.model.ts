import {CedUcpsAhEntry} from './ced-ucps-ah-entry.model';

/**
 * Model class CedUcpsAddressHistory
 * Path: bean/tsq/eligibility
 * Model: com::uhc::aarp::fox::domain::bean::tsq::eligibility::CedUcpsAddressHistory
 * Legacy Mapping: CED-UCPS-ADDRESS-HISTORY
 */
export class CedUcpsAddressHistory {
  cedUcpsAhCounter = 0;
  cedUcpsAhEntrys: CedUcpsAhEntry[] = [];
}
