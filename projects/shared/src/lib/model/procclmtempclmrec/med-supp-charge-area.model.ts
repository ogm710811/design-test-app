import {MedSuppChargeLine} from './med-supp-charge-line.model';

/**
 * Model class MedSuppChargeArea
 * Path: bean/procclmtempclmrec
 * Model: com::uhc::aarp::fox::domain::bean::procclmtempclmrec::MedSuppChargeArea
 * Legacy Mapping: T-MED-SUPP-CHARGE-AREA
 */
export class MedSuppChargeArea {
  tmsChargeLines: MedSuppChargeLine[] = [];
  tmsExclPlan1 = '';
  tmsExclPlan2 = '';
  tmsMedicarePmtInds: string[] = [];
  tmsPattPara1 = '';
  tmsPattPara2 = '';
  tmsIcdCodes: string[] = [];
  tmsBenePayPlan = '';
}
