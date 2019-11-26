import { ChcQeBeginKey } from './chc-qe-begin-key.model';
import { ChcQualityKey } from './chc-quality-key.model';
import { ChcRevalidKey } from './chc-revalid-key.model';

/**
 * Model class WsChcWorkArea
 * Path: screenbean/qltyrvwrvlderrrvw
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvlderrrvw::WsChcWorkArea
 * Legacy Mapping: WS-CHC-WORK-AREA
 */
export class WsChcWorkArea {
  chcQualityKey = new ChcQualityKey();
  chcRevalidKey = new ChcRevalidKey();
  chcQeBeginKey = new ChcQeBeginKey();
}
