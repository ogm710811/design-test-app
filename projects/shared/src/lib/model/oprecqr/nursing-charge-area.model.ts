import {NChargeLine} from './ncharge-line.model';

/**
 * Model class NursingChargeArea
 * Path: oprecqr
 * Model: com::uhc::aarp::fox::domain::oprecQR::NursingChargeArea
 * Legacy Mapping: NURSING-CHARGE-AREA
 */
export class NursingChargeArea {
  nchargeLines: NChargeLine[] = [];
  nexclPlan1 = '';
  nexclPlan2 = '';
  npattPara1 = '';
  npattPara2 = '';
  nbenePay = '';
  nicdCodes: string[] = [];
}
