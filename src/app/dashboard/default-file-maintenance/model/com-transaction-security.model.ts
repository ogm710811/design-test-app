import { ComClaimHistory } from './com-claim-history.model';
import { ComMoreQualitySecurity } from './com-more-quality-security.model';

/**
 * Model class ComTransactionSecurity
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::ComTransactionSecurity
 * Legacy Mapping: COM-TRANSACTION-SECURITY
 */
export class ComTransactionSecurity {
  comProcessClaim = '';
  comQualityReview = '';
  comReferralApproval = '';
  comOperatorStats = '';
  comClaimNoAssign = '';
  comResolveClaimNo = '';
  comEobReplacement = '';
  comClaimHistory = new ComClaimHistory();
  comMoreQualitySecurity = new ComMoreQualitySecurity();
}
