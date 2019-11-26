import {WsGrGroup} from './ws-gr-group.model';

/**
 * Model class WsGrTable
 * Path: screenbean/procclmmedsupptbchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmmedsupptbchrg::WsGrTable
 * Legacy Mapping: WS-GR-TABLE
 */
export class WsGrTable {
  wsGrStartDate = 0;
  wsGrEndDate = 0;
  wsGrGroups: WsGrGroup[] = [];
  wsGrInd = '';
}
