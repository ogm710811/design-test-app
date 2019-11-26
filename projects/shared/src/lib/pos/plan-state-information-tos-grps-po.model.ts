import {PlanStateInformationPlanRecordPO} from './plan-state-information-plan-record-po.model';

/**
 * Model class PlanStateInformationTosGrpsPO
 * Path: common/pos
 * Model: com::uhc::aarp::fox::domain::common::entities::PlanStateInformationTosGrps
 */
export class PlanStateInformationTosGrpsPO {
  psifTosGrpsSk = 0;
  psifPlanRecord = new PlanStateInformationPlanRecordPO();
  plnTosCd = '';
  ageInd = 0;
  procScr = 0;
  beneCalcInd = '';
  stInd = '';
}
