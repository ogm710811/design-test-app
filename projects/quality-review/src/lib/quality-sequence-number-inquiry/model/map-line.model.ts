import { MapClaimNumber } from './map-claim-number.model';

/**
 * Model class MapLine
 * Path: screenbean/qltyseqnbrinq
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyseqnbrinq::MapLine
 * Legacy Mapping: MAP-LINE
 */
export class MapLine {
  mapClaimNumber = new MapClaimNumber();
  mapExaminerName = '';
  mapIonsId = 0;
  mapSeqno = 0;
  mapLoc = 0;
}
