import {PlanStateInformationXcptStCdPO} from './plan-state-information-xcpt-st-cd-po.model';

/**
 * Model class PlanStateInformationExceptionRecordPO
 * Path: common/pos
 * Model: com::uhc::aarp::fox::domain::common::entities::PlanStateInformationExceptionRecord
 */
export class PlanStateInformationExceptionRecordPO {
  typeCode = 0;
  exceptKey = '';
  filler = '';
  psifExceptionRecordSk = 0;
  plnStXcpt: PlanStateInformationXcptStCdPO[] = [];
}
