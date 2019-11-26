import {HhChargeLine} from './hh-charge-line.model';

/**
 * Model class HomeHlthOutHospChargeArea
 * Path: oprecqr
 * Model: com::uhc::aarp::fox::domain::oprecQR::HomeHlthOutHospChargeArea
 * Legacy Mapping: HOME-HLTH-OUT-HOSP-CHARGE-AREA
 */
export class HomeHlthOutHospChargeArea {
  hhChargeLines: HhChargeLine[] = [];
  hhExcludedPlan1 = '';
  hhExcludedPlan2 = '';
  hhPattPara1 = '';
  hhPattPara2 = '';
  hhBenePay = '';
  hhIcdCodes: string[] = [];
}
