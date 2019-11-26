import {PlanStateInformationGrpAggrPO} from './plan-state-information-grp-aggr-po.model';
import {PlanStateInformationPlanRecordPO} from './plan-state-information-plan-record-po.model';

/**
 * Model class PlanStateInformationDedAggByTosPO
 * Path: common/pos
 * Model: com::uhc::aarp::fox::domain::common::entities::PlanStateInformationDedAggByTos
 */
export class PlanStateInformationDedAggByTosPO {
  psifDedAggByTosSk = 0;
  psifPlanRecord = new PlanStateInformationPlanRecordPO();
  grpDedInd = '';
  grpDed = 0;
  grpDedCrrInd = '';
  grpWaitPrd = 0;
  psifGrpAggr: PlanStateInformationGrpAggrPO[] = [];
}
