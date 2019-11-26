import {EDAMedSuppFields} from './edamed-supp-fields.model';
import {XpndDedAggrSegYearTable} from './xpnd-ded-aggr-seg-year-table.model';

/**
 * Model class XpndDedAggrSegTable
 * Path: bean/commonarea
 * Model: com::uhc::aarp::fox::domain::bean::commonarea::XpndDedAggrSegTable
 * Legacy Mapping: E-D-A-DEDUCT-AGGR-TABLE
 */
export class XpndDedAggrSegTable {
  upwardPtr = 0;
  basicPtr = 0;
  planCode = '';
  lastMaintDate = 0;
  nextPtr = 0;
  planLifeAggr = 0;
  snfBenPerAggr = 0;
  lifeMentalAggr = 0;
  benPerLifeAggr = 0;
  yearTables: XpndDedAggrSegYearTable[] = [];
  edaMedSuppField = new EDAMedSuppFields();
}
