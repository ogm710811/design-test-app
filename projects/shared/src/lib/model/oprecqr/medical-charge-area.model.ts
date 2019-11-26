import {MChargeLine} from './mcharge-line.model';

/**
 * Model class MedicalChargeArea
 * Path: oprecqr
 * Model: com::uhc::aarp::fox::domain::oprecQR::MedicalChargeArea
 * Legacy Mapping: MEDICAL-CHARGE-AREA
 */
export class MedicalChargeArea {
  mchargeLines: MChargeLine[] = [];
  mexclPlan1 = '';
  mexclPlan2 = '';
  mpattPara1 = '';
  mpattPara2 = '';
  mbenePay = '';
  micdCodes: string[] = [];
}
