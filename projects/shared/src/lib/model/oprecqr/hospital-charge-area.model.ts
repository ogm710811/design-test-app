import {HoChargeLine} from './ho-charge-line.model';

/**
 * Model class HospitalChargeArea
 * Path: oprecqr
 * Model: com::uhc::aarp::fox::domain::oprecQR::HospitalChargeArea
 * Legacy Mapping: HOSPITAL-CHARGE-AREA
 */
export class HospitalChargeArea {
  hoChargeLines: HoChargeLine[] = [];
  hoLtrOptions: string[] = [];
  hoPattPara1 = '';
  hoPattPara2 = '';
  hoIcdCodes: string[] = [];
}
