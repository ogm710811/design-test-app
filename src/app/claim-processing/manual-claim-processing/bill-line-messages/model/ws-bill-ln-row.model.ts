import {WsBillLnCol} from './ws-bill-ln-col.model';

/**
 * Model class WsBillLnRow
 * Path: screenbean/blmessages
 * Model: com::uhc::aarp::fox::domain::screenbean::blmessages::WsBillLnRow
 * Legacy Mapping: WS-BILL-LN-ROW
 */
export class WsBillLnRow {
  wsBillLnCols: WsBillLnCol[] = [];
  colIdx = 0;
}
