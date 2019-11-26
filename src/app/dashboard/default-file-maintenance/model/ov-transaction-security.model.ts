import { OvClaimHistory } from './ov-claim-history.model';
import { OvCommLetterTransactions } from './ov-comm-letter-transactions.model';
import { OvControlFile } from './ov-control-file.model';
import { OvElectronicClaim } from './ov-electronic-claim.model';
import { OvHicFile } from './ov-hic-file.model';
import { OvIcdAccess } from './ov-icd-access.model';
import { OvMoreQualitySecurity } from './ov-more-quality-security.model';

/**
 * Model class OvTransactionSecurity
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::OvTransactionSecurity
 * Legacy Mapping: OV-TRANSACTION-SECURITY
 */
export class OvTransactionSecurity {
  ovProcessClaim = '';
  ovQualityReview = '';
  ovReferralApproval = '';
  ovOperatorStats = '';
  ovClaimNoAssign = '';
  ovResolveClaimNo = '';
  ovEobReplacement = '';
  ovClaimHistory = new OvClaimHistory();
  ovMoreQualitySecurity = new OvMoreQualitySecurity();
  ovCommLetterTransactions = new OvCommLetterTransactions();
  ovControlFile = new OvControlFile();
  ovElectronicClaim = new OvElectronicClaim();
  ovHicFile = new OvHicFile();
  ovIcdAccess = new OvIcdAccess();
  filler8 = '';
}
