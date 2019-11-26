import {CedDepdAddressHistory} from './ced-depd-address-history.model';
import {CedDepdPlansBody} from './ced-depd-plans-body.model';

/**
 * Model class CedDependentData
 * Path: bean/tsq/eligibility
 * Model: com::uhc::aarp::fox::domain::bean::tsq::eligibility::CedDependentData
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
  cedDepdZip5 = '';
  cedDepdZip4 = '';
  cedDepdAreaCode = '';
  cedDepdNumber = '';
}
