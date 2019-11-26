import {ESPPlanTable} from './espplan-table.model';

/**
 * Model class ExSpousePlanSeg
 * Path: bean/compas
 * Model: com::uhc::aarp::fox::domain::bean::compas::ExSpousePlanSeg
 * Legacy Mapping: EX-SPOUSE-PLAN-SEG
 */
export class ExSpousePlanSeg {
  esPPlanCtr = 0;
  esPFiller = '';
  esPPlanTables: ESPPlanTable[] = [];
}
