import {PlanStateInformationElecStCdPO} from '../../../common/pos/plan-state-information-elec-st-cd-po.model';
import {PlanStateInformationElecStCdBean} from './plan-state-information-elec-st-cd-bean.model';
/**
 * Model class PlanStateInformationElectRecordBean
 * Path: screenbean/procclmtos/beansws
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmtos::beansWs::PlanStateInformationElectRecordBean
 */
export class PlanStateInformationElectRecordBean {
  typeCode = 0;
  electKey = '';
  filler = '';
  psifElectRecordSk = 0;
  planStElectStCd: PlanStateInformationElecStCdBean[] = [];
}
