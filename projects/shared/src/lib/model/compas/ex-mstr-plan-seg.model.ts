import {EMPPlanTable} from './empplan-table.model';

/**
 * Model class ExMstrPlanSeg
 * Path: bean/compas
 * Model: com::uhc::aarp::fox::domain::bean::compas::ExMstrPlanSeg
 * Legacy Mapping: EX-MSTR-PLAN-SEG
 */
export class ExMstrPlanSeg {
  emPPlanCtr = 0;
  emPFiller = '';
  emPPlanTables: EMPPlanTable[] = [];
}
