import {HospBenPpEntry} from './hosp-ben-pp-entry.model';

/**
 * Model class HospBenLnTSQ
 * Path: bean/tsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::HospBenLnTSQ
 * Legacy Mapping: H-BENEFIT-LINE
 */
export class HospBenLnTSQ {
  hchargeLine = 0;
  hserviceCd = '';
  htypeCd = '';
  hdailyBenefitAmt = 0;
  hdailyBenefitAmtR = 0;
  hbenefitAmt = 0;
  hcovExpenseAmt = 0;
  hdeductibleAmt = 0;
  hoopAmt = 0;
  hoopInd = '';
  hrelatedSignal = '';
  hincurralDate = 0;
  hfromDate = '';
  htoDate = '';
  hdays = 0;
  hbenPerNo = 0;
  hbenPerDays = 0;
  hpercentPaid = 0;
  hltrOpt = '';
  hhspSnfDaysInd = '';
  hhaInd = '';
  hbnRemarkCode = 0;
  hbnPpCnt = 0;
  hbnPpTable = '';
  hplanCd = '';
  hplanInd = '';
  hoopYear = 0;
  hoopPlan = '';
  hoopPlanEffDate = 0;
  hpriorPlan = '';
  hpriorPlanInd = '';
  hbnPpEntrys: HospBenPpEntry[] = [];
}
