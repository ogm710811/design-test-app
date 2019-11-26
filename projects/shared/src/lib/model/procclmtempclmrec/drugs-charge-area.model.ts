import {DrugChargeLine} from './drug-charge-line.model';

/**
 * Model class DrugsChargeArea
 * Path: bean/procclmtempclmrec
 * Model: com::uhc::aarp::fox::domain::bean::procclmtempclmrec::DrugsChargeArea
 * Legacy Mapping: T-DRUGS-CHARGE-AREA
 */
export class DrugsChargeArea {
  tdChargeLines: DrugChargeLine[] = [];
  tdPattPara1 = '';
  tdExclPlan2 = '';
  tdIcdCodes: string[] = [];
  tdPattPara2 = '';
  tdExclPlan1 = '';
  tdBenePay = '';
}
