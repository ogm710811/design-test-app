import {PlanStateInformationPlanRecordPO} from './plan-state-information-plan-record-po.model';

/**
 * Model class PlanStateInformationCombAggGrpPO
 * Path: common/pos
 * Model: com::uhc::aarp::fox::domain::common::entities::PlanStateInformationCombAggGrp
 */
export class PlanStateInformationCombAggGrpPO {
  psifCombAggGrpSk = 0;
  psifPlanRecord = new PlanStateInformationPlanRecordPO();
  combAggInd1 = '';
  combAggInd2 = '';
  combAgg = 0;
}
