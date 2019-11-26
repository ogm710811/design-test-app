import {MsChargeLine} from './ms-charge-line.model';

/**
 * Model class MedSuppChargeArea
 * Path: oprecqr
 * Model: com::uhc::aarp::fox::domain::oprecQR::MedSuppChargeArea
 * Legacy Mapping: MED-SUPP-CHARGE-AREA
 */
export class MedSuppChargeArea {
  msChargeLines: MsChargeLine[] = [];
  msExclPlan1 = '';
  msExclPlan2 = '';
  msPattPara1 = '';
  msPattPara2 = '';
  msBenePayPlan = '';
  msIcdCodes: string[] = [];
}
