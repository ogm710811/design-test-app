import {WsOpTbl} from './ws-op-tbl.model';

/**
 * Model class WsOpFields
 * Path: screenbean/clmovpaysel
 * Model: com::uhc::aarp::fox::domain::screenbean::clmovpaysel::WsOpFields
 * Legacy Mapping: WS-OP-FIELDS
 */
export class WsOpFields {
  wsOpTbl = new WsOpTbl();
  wsOpNumOfRecs = 0;
  wsOpSelectedRec = 0;
  wsOpSortTypes: string[] = [];
  wsOpAmt1 = 0;
  wsOpAmt2 = 0;
}
