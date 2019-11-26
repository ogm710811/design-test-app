import {UlPlanEffDate} from './ul-plan-eff-date.model';
import {UlPlanTermDate} from './ul-plan-term-date.model';
/**
 * Model class UlPlanTable
 * Path: screenbean/procclmtos/beansws
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmtos::beansWs::UlPlanTable
 * Legacy Mapping: UL-PLAN-TABLE
 */
export class UlPlanTable {
  ulPlanEffDate = new UlPlanEffDate();
  ulPlanTermDate = new UlPlanTermDate();
}
