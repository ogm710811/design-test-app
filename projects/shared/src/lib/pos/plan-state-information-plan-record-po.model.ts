import {PlanStateInformationCombAggGrpPO} from './plan-state-information-comb-agg-grp-po.model';
import {PlanStateInformationDedAggByTosPO} from './plan-state-information-ded-agg-by-tos-po.model';
import {PlanStateInformationTosGrpsPO} from './plan-state-information-tos-grps-po.model';

/**
 * Model class PlanStateInformationPlanRecordPO
 * Path: common/pos
 * Model: com::uhc::aarp::fox::domain::common::entities::PlanStateInformationPlanRecord
 */
export class PlanStateInformationPlanRecordPO {
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
  psifCombAggGrp: PlanStateInformationCombAggGrpPO[] = [];
  psifDedAggyTos: PlanStateInformationDedAggByTosPO[] = [];
  psifTosGrps: PlanStateInformationTosGrpsPO[] = [];
}
