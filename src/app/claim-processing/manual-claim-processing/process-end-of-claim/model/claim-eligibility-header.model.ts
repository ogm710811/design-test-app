import { ClaimEligibilityTsqName } from './claim-eligibility-tsq-name.model';

/**
 * Model class ClaimEligibilityHeader
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::ClaimEligibilityHeader
 * Legacy Mapping: CLAIM-ELIGIBILITY-HEADER
 */
export class ClaimEligibilityHeader {
  claimEligibilityTsqName = new ClaimEligibilityTsqName();
  cehTimeStamp = 0;
  cehIonsId = '';
  cehTermId = '';
  cehItemCount = 0;
  cehFiller = '';
}
