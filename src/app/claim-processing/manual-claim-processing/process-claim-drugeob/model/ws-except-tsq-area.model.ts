import {XcptChrgLnTSQ} from '../bean/tsq/xcpt-chrg-ln-tsq.model';
import {WsExceptRec} from './ws-except-rec.model';

/**
 * Model class WsExceptTsqArea
 * Path: screenbean/procclmdrugeobservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::WsExceptTsqArea
 * Legacy Mapping: WS-EXCEPT-TSQ-AREA
 */
export class WsExceptTsqArea {
  wsChargeLineExceptRec = new XcptChrgLnTSQ();
  wsExceptRecs: WsExceptRec[] = [];
}
