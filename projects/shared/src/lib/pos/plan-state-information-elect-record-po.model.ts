import {PlanStateInformationElecStCdPO} from './plan-state-information-elec-st-cd-po.model';

/**
 * Model class PlanStateInformationElectRecordPO
 * Path: common/pos
 * Model: com::uhc::aarp::fox::domain::common::entities::PlanStateInformationElectRecord
 */
export class PlanStateInformationElectRecordPO {
  typeCode = 0;
  electKey = '';
  filler = '';
  psifElectRecordSk = 0;
  planStElectStCd: PlanStateInformationElecStCdPO[] = [];
}
