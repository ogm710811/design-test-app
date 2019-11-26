import {ExceptChargeLine} from './except-charge-line.model';

/**
 * Model class ExceptChargeArea
 * Path: bean/procclmtempclmrec
 * Model: com::uhc::aarp::fox::domain::bean::procclmtempclmrec::ExceptChargeArea
 * Legacy Mapping: T-EXCEPT-CHARGE-AREA
 */
export class ExceptChargeArea {
  teChargeLines: ExceptChargeLine[] = [];
  tePattPara1 = '';
  tePattPara2 = '';
  teIcdCodes: string[] = [];
}
