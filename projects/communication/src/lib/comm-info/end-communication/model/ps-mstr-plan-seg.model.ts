import {PsPlanTable} from './ps-plan-table.model';

/**
 * Model class PsMstrPlanSeg
 * Path: screenbean/commcontrolendcomm
 * Model: com::uhc::aarp::fox::domain::screenbean::commcontrolendcomm::PsMstrPlanSeg
 * Legacy Mapping: PS-MSTR-PLAN-SEG
 */
export class PsMstrPlanSeg {
  psPlanCtr = 0;
  psPlanTables: PsPlanTable[] = [];
  psFiller = '';
}
