import {HoChargeLine} from './ho-charge-line.model';

/**
 * Model class HospChargeArea
 * Path: bean/procclmtempclmrec
 * Model: com::uhc::aarp::fox::domain::bean::procclmtempclmrec::HospChargeArea
 * Legacy Mapping: T-HOSP-CHARGE-AREA
 */
export class HospChargeArea {
  thoChargeLines: HoChargeLine[] = [];
  thoLtrOptions = '';
  thoPattPara2 = '';
  thoPattPara1 = '';
  thoIcdCodes: string[] = [];
}
