import { RpdiskcqKey } from './rpdiskcq-key.model';
import { RpdiskohKey } from './rpdiskoh-key.model';
import { RpdiskqrKey } from './rpdiskqr-key.model';

/**
 * Model class RecordKeys
 * Path: screenbean/qltyseqnbrinq
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyseqnbrinq::RecordKeys
 * Legacy Mapping: RECORD-KEYS
 */
export class RecordKeys {
  rpdiskohKey = new RpdiskohKey();
  rpdiskqrKey = new RpdiskqrKey();
  rpdiskcqKey = new RpdiskcqKey();
}
