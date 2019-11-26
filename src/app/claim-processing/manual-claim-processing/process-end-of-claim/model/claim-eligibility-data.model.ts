import { CedDependentData } from './ced-dependent-data.model';
import { CedHouseholdItem } from './ced-household-item.model';
import { CedPreviousSpouseData } from './ced-previous-spouse-data.model';
import { CedPrimaryInsuredData } from './ced-primary-insured-data.model';
import { CedSpouseInsuredData } from './ced-spouse-insured-data.model';

/**
 * Model class ClaimEligibilityData
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::ClaimEligibilityData
 * Legacy Mapping: CLAIM-ELIGIBILITY-DATA
 */
export class ClaimEligibilityData {
  cedHouseholdItem = new CedHouseholdItem();
  cedPrimaryInsuredData = new CedPrimaryInsuredData();
  cedSpouseInsuredData = new CedSpouseInsuredData();
  cedPreviousSpouseData = new CedPreviousSpouseData();
  cedDependentData = new CedDependentData();
}
