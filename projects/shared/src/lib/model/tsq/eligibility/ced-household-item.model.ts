import {CedHhldAddressHistory} from './ced-hhld-address-history.model';
import {CedUcpsAddressHistory} from './ced-ucps-address-history.model';

/**
 * Model class CedHouseholdItem
 * Path: bean/tsq/eligibility
 * Model: com::uhc::aarp::fox::domain::bean::tsq::eligibility::CedHouseholdItem
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
  cedHhldStreetAddr1 = '';
  cedHhldStreetAddr2 = '';
  cedHhldCity = '';
  cedHhldStateCode = '';
  cedHhldZip5 = '';
  cedHhldZip4 = '';
  cedHhldAreaCode = '';
  cedHhldNumber = '';
  cedHhldPrevHouseholdId = 0;
  cedHhldPrevAccountNo = 0;
}
