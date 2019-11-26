import {WdrBnPpEntry} from './wdr-bn-pp-entry.model';

/**
 * Model class WdrBenLnTSQ
 * Path: screenbean/procclmdrugeobservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::WdrBenLnTSQ
 * Legacy Mapping: DRUG-BENEFIT-LINE
 */
export class WdrBenLnTSQ {
  drugChargeLine = 0;
  drugBenefitAmt = 0;
  drugDeductibleAmt = 0;
  drugNextYrDeductible = 0;
  drugCovExpenseAmt = 0;
  drugPercentPaid = 0;
  drugBnPpCnt = 0;
  drugPlanCd = '';
  drugPlanInd = '';
  drugPriorPlan = '';
  drugPriorPlanInd = '';
  drugBnPpEntrys: WdrBnPpEntry[] = [];
}
