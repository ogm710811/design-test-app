import { EPNameAbbrev } from './epname-abbrev.model';
import { EPPrimaryKey } from './epprimary-key.model';

/**
 * Model class EPAltIndex2
 * Path: screenbean/procclmsrvceob/condensedprovfilerecord
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmsrvceob::CondensedProvFileRecord::EPAltIndex2
 * Legacy Mapping: E-P-ALT-INDEX-2
 */
export class EPAltIndex2 {
  epDeleteIndicator2 = '';
  epProviderId = '';
  epZipAbbrev = '';
  epNameAbbrev = new EPNameAbbrev();
  epPrimaryKey = new EPPrimaryKey();
}
