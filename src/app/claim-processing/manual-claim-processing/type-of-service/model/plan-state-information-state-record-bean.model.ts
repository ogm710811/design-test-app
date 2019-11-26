/**
 * Model class PlanStateInformationStateRecordBean
 * Path: screenbean/procclmtos/beansws
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmtos::beansWs::PlanStateInformationStateRecordBean
 */
import {PlanStateInformationTosGrpPO} from '@fox/shared';

export class PlanStateInformationStateRecordBean {
  typeCode = 0;
  stateCode = '';
  caut60Ind = '';
  caut60StopDate = new Date();
  filler = '';
  psifStateRecordSk = 0;
  psifTosGrp = new PlanStateInformationTosGrpPO();
}
