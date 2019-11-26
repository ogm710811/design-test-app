import { ComCommLetterTransactions } from './com-comm-letter-transactions.model';
import { ComControlFile } from './com-control-file.model';
import { ComHicFile } from './com-hic-file.model';
import { ComTransactionSecurity } from './com-transaction-security.model';

/**
 * Model class ComSecurityCodes
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::ComSecurityCodes
 * Legacy Mapping: COM-SECURITY-CODES
 */
export class ComSecurityCodes {
  comTransactionSecurity = new ComTransactionSecurity();
  comCommLetterTransactions = new ComCommLetterTransactions();
  comControlFile = new ComControlFile();
  comHicFile = new ComHicFile();
  comClaimType = '';
}
