import {ClaimEligibilityData} from './claim-eligibility-data.model';
import {ClaimEligibilityHeader} from './claim-eligibility-header.model';
import {ClaimEligibilityTsqItems} from './claim-eligibility-tsq-items.model';

/**
 * Model class ClaimEligibilityTsQueue
 * Path: bean/tsq/eligibility
 * Model: com::uhc::aarp::fox::domain::bean::tsq::eligibility::ClaimEligibilityTsQueue
 * Legacy Mapping: CLAIM-ELIGIBILITY-TS-QUEUE
 */
export class ClaimEligibilityTsQueue {
  claimEligibilityHeader = new ClaimEligibilityHeader();
  claimEligibilityData = new ClaimEligibilityData();
  claimEligibilityTsqItems = new ClaimEligibilityTsqItems();
}
