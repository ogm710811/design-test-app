import { CedHhldAddressHistory } from './ced-hhld-address-history.model';
import { CedUcpsAddressHistory } from './ced-ucps-address-history.model';

/**
 * Model class CedHouseholdItem
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::CedHouseholdItem
 * Legacy Mapping: CED-HOUSEHOLD-ITEM
 */
export class CedHouseholdItem {
  cedHhldItemName = '';
  cedHhldHouseholdId = 0;
  cedHhldPaidThruDate = '';
  cedHhldGraceStatusCode = '';
  cedHhldGraceNotificationDt = '';
  cedHhldEmployerInd = '';
  cedHhldDependentInd = 0;
  cedHhldAddressStartDt = '';
  cedUcpsAddressHistory = new CedUcpsAddressHistory();
  cedHhldAddressHistory = new CedHhldAddressHistory();
  cedHhldPrevHouseholdId = 0;
  cedHhldPrevAccountNo = 0;
  cedHhldStreetAddr1 = '';
  cedHhldStreetAddr2 = '';
  cedHhldCity = '';
  cedHhldStateCode = '';
  cedHhldAreaCode = '';
  cedHhldNumber = '';
  cedHhldZip5 = '';
  cedHhldZip4 = '';
}
