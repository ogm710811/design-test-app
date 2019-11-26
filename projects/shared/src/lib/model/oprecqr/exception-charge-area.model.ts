import {EChargeLine} from './echarge-line.model';

/**
 * Model class ExceptionChargeArea
 * Path: oprecqr
 * Model: com::uhc::aarp::fox::domain::oprecQR::ExceptionChargeArea
 * Legacy Mapping: EXCEPTION-CHARGE-AREA
 */
export class ExceptionChargeArea {
  echargeLines: EChargeLine[] = [];
  epattPara1 = '';
  epattPara2 = '';
  eicdCodes: string[] = [];
}
