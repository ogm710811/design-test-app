import { CedDepdAddressHistory } from './ced-depd-address-history.model';
import { CedDepdPlansBody } from './ced-depd-plans-body.model';

/**
 * Model class CedDependentData
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::CedDependentData
 * Legacy Mapping: CED-DEPENDENT-DATA
 */
export class CedDependentData {
  cedDepdItemName = '';
  cedDepdInsuredCode = '';
  cedDepdLastName = '';
  cedDepdFirstName = '';
  cedDepdMiddleInitial = '';
  cedDepdTitleCode = '';
  cedDepdNameSuffix = '';
  cedDepdGenderCode = '';
  cedDepdBirthDate = '';
  cedDepdLanguageInd = '';
  cedDepdInsTermReason = '';
  cedDepdInsTermDate = '';
  cedDepdSponsorDodInd = '';
  cedDepdAddressInd = '';
  cedDepdPlansBody = new CedDepdPlansBody();
  cedDepdAddressHistory = new CedDepdAddressHistory();
  cedDepdStreetAddr1 = '';
  cedDepdStreetAddr2 = '';
  cedDepdCity = '';
  cedDepdStateCode = '';
  cedDepdAreaCode = '';
  cedDepdNumber = '';
  cedDepdZip5 = '';
  cedDepdZip4 = '';
}
