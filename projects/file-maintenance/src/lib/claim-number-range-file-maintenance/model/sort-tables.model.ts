import { WsNonclaimDivLocTable } from './ws-nonclaim-div-loc-table.model';
import { WsScreenSaveSortTable } from './ws-screen-save-sort-table.model';
import { WsSeqNotTable } from './ws-seq-not-table.model';

/**
 * Model class SortTables
 * Path: screenbean/clmnbrrngflmnt
 * Model: com::uhc::aarp::fox::domain::screenbean::clmnbrrngflmnt::SortTables
 * Legacy Mapping: SORT-TABLES
 */
export class SortTables {
  wsSeqNotTables: WsSeqNotTable[] = [];
  wsScreenSaveSortTables: WsScreenSaveSortTable[] = [];
  wsNonclaimDivLocTables: WsNonclaimDivLocTable[] = [];
}
