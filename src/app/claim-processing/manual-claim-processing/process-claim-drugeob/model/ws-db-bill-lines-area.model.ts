import {BLTempStorQueue} from '../bean/tsq/bltempstor/bltemp-stor-queue.model';
import {ClmDbBLTempStorQueue} from './clmdbtempstor1/clm-db-bltemp-stor-queue.model';
import {DrugBillLineBLTempStorQueue} from './drugbilllinestempstor/drug-bill-line-bltemp-stor-queue.model';

/**
 * Model class WsDbBillLinesArea
 * Path: screenbean/procclmdrugeobservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::WsDbBillLinesArea
 * Legacy Mapping: WS-DB-BILL-LINES-AREA
 */
export class WsDbBillLinesArea {
  tsqDbBlRec = new BLTempStorQueue();
  drugDbLines: DrugBillLineBLTempStorQueue[] = [];
  clmDbBlRec = new ClmDbBLTempStorQueue();
}
