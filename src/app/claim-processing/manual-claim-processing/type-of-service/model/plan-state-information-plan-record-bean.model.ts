import {PlanStateInformationCombAggGrpPO} from '../../../common/pos/plan-state-information-comb-agg-grp-po.model';
import {PlanStateInformationDedAggByTosPO} from '../../../common/pos/plan-state-information-ded-agg-by-tos-po.model';
import {PlanStateInformationTosGrpsPO} from '../../../common/pos/plan-state-information-tos-grps-po.model';
import {PlanStateInformationDedAggByTosBean} from './plan-state-information-ded-agg-by-tos-bean.model';
import {PlanStateInformationTosGrpsBean} from './plan-state-information-tos-grps-bean.model';
/**
 * Model class PlanStateInformationPlanRecordBean
 * Path: screenbean/procclmtos/beansws
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmtos::beansWs::PlanStateInformationPlanRecordBean
 */
export class PlanStateInformationPlanRecordBean {
  typeCode = 0;
  planCode = '';
  planInd = '';
  planTypeCode = '';
  pecePeriod = 0;
  planBeneIncInd = '';
  benePeriodDays = 0;
  combPlanDedInd = '';
  combPlanDed = 0;
  combPlanAggAgeInd = '';
  lagUnd65Days = 0;
  lagOvr65Days = 0;
  maintJournalType = '';
  dedAggActivityCode = '';
  filler = '';
  psifPlanRecordSk = 0;
  psifDedAggyTos: PlanStateInformationDedAggByTosBean[] = [];
  psifTosGrps: PlanStateInformationTosGrpsBean[] = [];
}
