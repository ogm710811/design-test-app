import {ProviderSegmentHeader} from './provider-segment-header.model';
import {ProviderSegment} from './provider-segment.model';

/**
 * Model class CondensedProvFileRecord
 * Path: screenbean/procclmmedsuppartbeob
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmmedsuppartbeob::CondensedProvFileRecord
 * Legacy Mapping: THE-COND-PROVIDER-FILE
 */
export class CondensedProvFileRecord {
  providerSegment = new ProviderSegment();
  providerSegmentHeader = new ProviderSegmentHeader();
}
