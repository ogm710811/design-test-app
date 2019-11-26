import {DrugBnPpEntry} from './drug-bn-pp-entry.model';

/**
 * Model class DrugBenLnTSQ
 * Path: bean/tsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::DrugBenLnTSQ
 * Legacy Mapping: DRUG-BENEFIT-LINE
 */
export class DrugBenLnTSQ {
  drugChargeLine = 0;
  drugBenefitAmt = 0;
  drugDeductibleAmt = 0;
  drugNextYrDeductible = 0;
  drugCovExpenseAmt = 0;
  drugPercentPaid = 0;
  drugBnPpCnt = 0;
  drugBnPpEntrys: DrugBnPpEntry[] = [];
  drugPlanCd = '';
  drugPlanInd = '';
  drugPriorPlan = '';
  drugPriorPlanInd = '';
}
