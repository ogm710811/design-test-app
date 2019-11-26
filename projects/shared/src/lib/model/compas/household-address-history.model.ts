import {HahAhEntry} from './hah-ah-entry.model';

/**
 * Model class HouseholdAddressHistory
 * Path: bean/compas
 * Model: com::uhc::aarp::fox::domain::bean::compas::HouseholdAddressHistory
 * Legacy Mapping: HOUSEHOLD-ADDRESS-HISTORY
 */
export class HouseholdAddressHistory {
  hahAhCounter = 0;
  hahAhEntrys: HahAhEntry[] = [];
}
