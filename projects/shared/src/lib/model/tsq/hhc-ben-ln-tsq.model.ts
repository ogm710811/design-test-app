import {HhcBenPpEntry} from './hhc-ben-pp-entry.model';

/**
 * Model class HhcBenLnTSQ
 * Path: bean/tsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::HhcBenLnTSQ
 * Legacy Mapping: HHOH-BENEFIT-LINE
 */
export class HhcBenLnTSQ {
  hhohChargeLine = 0;
  hhohDeductibleAmt = 0;
  hhohBenefitAmt = 0;
  hhohCovExpenseAmt = 0;
  hhohPercentPaid = 0;
  hhohHaInd = '';
  hhohBillProvKey = 0;
  hhohBnPpCnt = 0;
  hhohBnPpEntrys: HhcBenPpEntry[] = [];
  hhohPlanCd = '';
  hhohPlanInd = '';
  hhohPriorPlan = '';
  hhohPriorPlanInd = '';
}
