import {MedBnPpEntry} from './med-bn-pp-entry.model';

/**
 * Model class MedBenLnTSQ
 * Path: bean/tsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::MedBenLnTSQ
 * Legacy Mapping: MED-BENEFIT-LINE
 */
export class MedBenLnTSQ {
  medChargeLine = 0;
  medBenefitAmt = 0;
  medCovExpenseAmt = 0;
  medDeductibleAmt = 0;
  medCovVisits = 0;
  medPercentPaid = 0;
  medHaInd = '';
  medBillProvKey = 0;
  medBnPpCnt = 0;
  medBnPpEntrys: MedBnPpEntry[] = [];
  medPlanCd = '';
  medPlanInd = '';
  medPriorPlan = '';
  medPriorPlanInd = '';
}
