import {PlanStateInformationPlanRecordPO} from '../../../common/pos/plan-state-information-plan-record-po.model';
/**
 * Model class PlanStateInformationTosGrpsBean
 * Path: screenbean/procclmtos/beansws
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmtos::beansWs::PlanStateInformationTosGrpsBean
 */
export class PlanStateInformationTosGrpsBean {
  psifTosGrpsSk = 0;
  psifPlanRecord = new PlanStateInformationPlanRecordPO();
  plnTosCd = '';
  ageInd = 0;
  procScr = 0;
  beneCalcInd = '';
  stInd = '';
}
