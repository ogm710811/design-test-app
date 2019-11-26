import { ProviderSegment } from './provider-segment.model';
import {ProviderSegmentHeader} from './provider-segment-header.model';

/**
 * Model class CondensedProvFileRecord
 * Path: screenbean/procclmsrvceob/condensedprovfilerecord
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmsrvceob::CondensedProvFileRecord::CondensedProvFileRecord
 * Legacy Mapping: THE-COND-PROV-SEGMENT
 */
export class CondensedProvFileRecord {
  providerSegment = new ProviderSegment();
  providerSegmentHeader = new ProviderSegmentHeader();
}
