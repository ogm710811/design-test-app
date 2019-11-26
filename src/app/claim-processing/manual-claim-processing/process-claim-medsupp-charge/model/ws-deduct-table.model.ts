import {WsDeductPtBInfo} from './ws-deduct-pt-binfo.model';

/**
 * Model class WsDeductTable
 * Path: screenbean/procclmmedsupptbchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmmedsupptbchrg::WsDeductTable
 * Legacy Mapping: WS-DEDUCT-TABLE
 */
export class WsDeductTable {
  wsDeductStartDate = 0;
  wsDeductEndDate = 0;
  wsDeductPtBInfo = new WsDeductPtBInfo();
}
