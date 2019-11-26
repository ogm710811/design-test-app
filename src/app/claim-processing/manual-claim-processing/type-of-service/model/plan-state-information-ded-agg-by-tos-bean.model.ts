import {PlanStateInformationPlanRecordPO} from '../../../common/pos/plan-state-information-plan-record-po.model';
import {PlanStateInformationGrpAggrBean} from './plan-state-information-grp-aggr-bean.model';
/**
 * Model class PlanStateInformationDedAggByTosBean
 * Path: screenbean/procclmtos/beansws
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmtos::beansWs::PlanStateInformationDedAggByTosBean
 */
export class PlanStateInformationDedAggByTosBean {
  psifDedAggByTosSk = 0;
  psifPlanRecord = new PlanStateInformationPlanRecordPO();
  grpDedInd = '';
  grpDed = 0;
  grpDedCrrInd = '';
  grpWaitPrd = 0;
  psifGrpAggr: PlanStateInformationGrpAggrBean[] = [];
}
