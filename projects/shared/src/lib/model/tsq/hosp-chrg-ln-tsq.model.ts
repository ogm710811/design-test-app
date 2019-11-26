import {HospChrgLnChPpEntry} from './hosp-chrg-ln-ch-pp-entry.model';
import {HospChrgLnPrevConsideredPlans} from './hosp-chrg-ln-prev-considered-plans.model';

/**
 * Model class HospChrgLnTSQ
 * Path: bean/tsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::HospChrgLnTSQ
 * Legacy Mapping: WS-HOSP-CHARGE-LINE
 */
export class HospChrgLnTSQ {
  hscreenNum = 0;
  hprovType = '';
  hserviceType = '';
  hbillProvKey = 0;
  hacceptCode1 = '';
  hacceptCode2 = '';
  hserviceFromDate = 0;
  hserviceToDate = 0;
  hserviceDays = 0;
  hpreExistingInd = '';
  hchargeAmt = 0;
  hdtOfAccident = 0;
  hicuFromDate = '';
  hicuToDate = '';
  hicuDays = 0;
  hdtOfSurgery = 0;
  hproviderPercent = 0;
  hmedIhd = '';
  hmed1Days = 0;
  hmed2Days = 0;
  hmed3Days = 0;
  hmedLtrDays = 0;
  hdischargeInd = '';
  hsnf1Days = 0;
  hsnf2Days = 0;
  hsnf3Days = 0;
  hltrOption = '';
  hexcludedPlan1 = '';
  hexcludedPlan2 = '';
  hpossibleDup = '';
  hdupInd = '';
  hicdPtr1 = 0;
  hicdPtr2 = 0;
  hicdPtr3 = 0;
  hicdPtr4 = 0;
  hnoPayPlanCode = '';
  hnoPayInd = 0;
  hchPpCnt = 0;
  hprovName = '';
  hprovZip = '';
  hprovSName = '';
  hchPpEntrys: HospChrgLnChPpEntry[] = [];
  hprevConsideredPlans: HospChrgLnPrevConsideredPlans[] = [];
}
