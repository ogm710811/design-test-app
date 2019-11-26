import { JSortFldsClaimHistMaint } from './jsort-flds-claim-hist-maint.model';
import { JSortFldsControlFileMaint } from './jsort-flds-control-file-maint.model';

/**
 * Model class JHeader
 * Path: screenbean/opertranssecur
 * Model: com::uhc::aarp::fox::domain::screenbean::opertranssecur::JHeader
 * Legacy Mapping: J-HEADER
 */
export class JHeader {
  joperCode = '';
  jterminalId = '';
  jtransCode = '';
  jsortFldsControlFileMaint = new JSortFldsControlFileMaint();
  jsortFldsClaimHistMaint = new JSortFldsClaimHistMaint();
}
