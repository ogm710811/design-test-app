import { WsErrorsReasons } from './ws-errors-reasons.model';
import { WsScreenDateRange } from './ws-screen-date-range.model';

/**
 * Model class WsDisplayFields
 * Path: screenbean/qltyrvwrvlderrrvw
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvlderrrvw::WsDisplayFields
 * Legacy Mapping: WS-DISPLAY-FIELDS
 */
export class WsDisplayFields {
  wsIonsId = 0;
  wsClaimNum = 0;
  wsErrorsReasons = new WsErrorsReasons();
  wsDate = new Date();
  wsScreenDateRange = new WsScreenDateRange();
}
