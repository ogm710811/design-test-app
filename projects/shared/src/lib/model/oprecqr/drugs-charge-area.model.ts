import {DChargeLine} from './dcharge-line.model';

/**
 * Model class DrugsChargeArea
 * Path: oprecqr
 * Model: com::uhc::aarp::fox::domain::oprecQR::DrugsChargeArea
 * Legacy Mapping: DRUGS-CHARGE-AREA
 */
export class DrugsChargeArea {
  dchargeLines: DChargeLine[] = [];
  dexclPlan1 = '';
  dexclPlan2 = '';
  dpattPara1 = '';
  dpattPara2 = '';
  dbenePay = '';
  dicdCodes: string[] = [];
}
