import {CedDependentData} from './ced-dependent-data.model';
import {CedHouseholdItem} from './ced-household-item.model';
import {CedPreviousSpouseData} from './ced-previous-spouse-data.model';
import {CedPrimaryInsuredData} from './ced-primary-insured-data.model';
import {CedSpouseInsuredData} from './ced-spouse-insured-data.model';

/**
 * Model class ClaimEligibilityData
 * Path: bean/tsq/eligibility
 * Model: com::uhc::aarp::fox::domain::bean::tsq::eligibility::ClaimEligibilityData
 * Legacy Mapping: CLAIM-ELIGIBILITY-DATA
 */
export class ClaimEligibilityData {
  cedHouseholdItem = new CedHouseholdItem();
  cedPrimaryInsuredData = new CedPrimaryInsuredData();
  cedSpouseInsuredData = new CedSpouseInsuredData();
  cedPreviousSpouseData = new CedPreviousSpouseData();
  cedDependentData = new CedDependentData();
}
