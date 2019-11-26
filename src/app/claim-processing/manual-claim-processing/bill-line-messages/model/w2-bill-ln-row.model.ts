import {W2BillLnCol} from './w2-bill-ln-col.model';

/**
 * Model class W2BillLnRow
 * Path: screenbean/blmessages
 * Model: com::uhc::aarp::fox::domain::screenbean::blmessages::W2BillLnRow
 * Legacy Mapping: W2-BILL-LN-ROW
 */
export class W2BillLnRow {
  w2BillLnCols: W2BillLnCol[] = [];
  colNdx = 0;
}
