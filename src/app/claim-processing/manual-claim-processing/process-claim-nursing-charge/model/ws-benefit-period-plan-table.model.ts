import {WsBpPlanLine} from './ws-bp-plan-line.model';
/**
 * Model class WsBenefitPeriodPlanTable
 * Path: screenbean/procclmnursingchrgservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnursingchrgservice::WsBenefitPeriodPlanTable
 * Legacy Mapping: WS-BENEFIT-PERIOD-PLAN-TABLE
 */
export class WsBenefitPeriodPlanTable {
  wsBpPlanCtr = 0;
  wsBpPlanLines: WsBpPlanLine[] = [];
}
