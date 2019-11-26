import {XpndDedAggrSegTable} from './xpnd-ded-aggr-seg-table.model';

/**
 * Model class XpndDedAggrSeg
 * Path: bean/commonarea
 * Model: com::uhc::aarp::fox::domain::bean::commonarea::XpndDedAggrSeg
 * Legacy Mapping: EX-DEDUCT-AGGR-SEG
 */
export class XpndDedAggrSeg {
  deductAggrCtr = 0;
  deductAggrTables: XpndDedAggrSegTable[] = [];
}
