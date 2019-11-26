import {NrsBenPpEntry} from './nrs-ben-pp-entry.model';

/**
 * Model class NrsBenLnTSQ
 * Path: bean/tsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::NrsBenLnTSQ
 * Legacy Mapping: NC-BENEFIT-LINE
 */
export class NrsBenLnTSQ {
  ncChargeLine = 0;
  ncShifts = 0;
  ncHours = 0;
  ncCovExpenseAmt = 0;
  ncBenefitAmt = 0;
  ncDeductibleAmt = 0;
  ncBpAggregateShifts = 0;
  ncBpFirstPayment = '';
  ncPercentPaid = 0;
  ncHaInd = '';
  ncBillProvKey = 0;
  ncBnPpCnt = 0;
  ncBnPpEntrys: NrsBenPpEntry[] = [];
  ncPlanCd = '';
  ncPlanInd = '';
  ncPriorPlan = '';
  ncPriorPlanInd = '';
}
