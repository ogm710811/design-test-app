import { TClaimNumber } from './tclaim-number.model';
import { TSeqnoAndLoc } from './tseqno-and-loc.model';

/**
 * Model class TableForSeqnoAndClaimNum
 * Path: screenbean/qltyseqnbrinq
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyseqnbrinq::TableForSeqnoAndClaimNum
 * Legacy Mapping: TABLE-FOR-SEQNO-AND-CLAIM-NUM
 */
export class TableForSeqnoAndClaimNum {
  tseqnoAndLoc = new TSeqnoAndLoc();
  tClaimNumer = new TClaimNumber();
  tclaimNumberRedef = 0;
}
