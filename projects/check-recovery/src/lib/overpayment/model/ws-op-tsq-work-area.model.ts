import {WsOpTsqName} from './ws-op-tsq-name.model';
import {WsOpTsqRecord} from './ws-op-tsq-record.model';

/**
 * Model class WsOpTsqWorkArea
 * Path: screenbean/clmovpaysel
 * Model: com::uhc::aarp::fox::domain::screenbean::clmovpaysel::WsOpTsqWorkArea
 * Legacy Mapping: WS-OP-TSQ-WORK-AREA
 */
export class WsOpTsqWorkArea {
  wsOpTsqItem = 0;
  wsOpTsqResp = 0;
  wsOpTsqName = new WsOpTsqName();
  wsOpTsqRecord = new WsOpTsqRecord();
}
