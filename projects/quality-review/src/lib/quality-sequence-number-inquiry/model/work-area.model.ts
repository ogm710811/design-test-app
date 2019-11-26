import { BinaryCnts } from './binary-cnts.model';
import { Indicators } from './indicators.model';
import { Messages } from './messages.model';
import { MiscInfo } from './misc-info.model';
import { PackedCnts } from './packed-cnts.model';
import { RecordKeys } from './record-keys.model';
import { TableForSeqnoAndClaimNum } from './table-for-seqno-and-claim-num.model';

/**
 * Model class WorkArea
 * Path: screenbean/qltyseqnbrinq
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyseqnbrinq::WorkArea
 * Legacy Mapping: WORK-AREA
 */
export class WorkArea {
  binaryCnts = new BinaryCnts();
  packedCnts = new PackedCnts();
  indicators = new Indicators();
  miscInfo = new MiscInfo();
  messages = new Messages();
  recordKeys = new RecordKeys();
  tableForSeqnoAndClaimNums: TableForSeqnoAndClaimNum[] = [];
}
