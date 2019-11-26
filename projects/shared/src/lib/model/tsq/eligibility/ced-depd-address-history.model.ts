import {CedDepdAhEntry} from './ced-depd-ah-entry.model';

/**
 * Model class CedDepdAddressHistory
 * Path: bean/tsq/eligibility
 * Model: com::uhc::aarp::fox::domain::bean::tsq::eligibility::CedDepdAddressHistory
 * Legacy Mapping: CED-DEPD-ADDRESS-HISTORY
 */
export class CedDepdAddressHistory {
  cedDepdAhCounter = 0;
  cedDepdAhEntrys: CedDepdAhEntry[] = [];
}
