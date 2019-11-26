import {MedChargeLine} from './med-charge-line.model';

/**
 * Model class MedicalChargeArea
 * Path: bean/procclmtempclmrec
 * Model: com::uhc::aarp::fox::domain::bean::procclmtempclmrec::MedicalChargeArea
 * Legacy Mapping: T-MEDICAL-CHARGE-AREA
 */
export class MedicalChargeArea {
  tmChargeLines: MedChargeLine[] = [];
  tmPattPara2 = '';
  tmIcdCodes: string[] = [];
  tmPattPara1 = '';
  tmBenePay = '';
  tmExclPlan2 = '';
  tmExclPlan1 = '';
}
