import {NursingChargeLine} from './nursing-charge-line.model';

/**
 * Model class NursingChargeArea
 * Path: bean/procclmtempclmrec
 * Model: com::uhc::aarp::fox::domain::bean::procclmtempclmrec::NursingChargeArea
 * Legacy Mapping: T-NURSING-CHARGE-AREA
 */
export class NursingChargeArea {
  tnChargeLines: NursingChargeLine[] = [];
  tnBenePay = '';
  tnExclPlan2 = '';
  tnPattPara2 = '';
  tnPattPara1 = '';
  tnIcdCodes: string[] = [];
  tnExclPlan1 = '';
}
