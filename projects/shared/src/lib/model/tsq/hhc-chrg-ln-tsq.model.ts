import {HhcChrgPpEntry} from './hhc-chrg-pp-entry.model';

/**
 * Model class HhcChrgLnTSQ
 * Path: bean/tsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::HhcChrgLnTSQ
 * Legacy Mapping: HHOH-CHARGE-LN
 */
export class HhcChrgLnTSQ {
  hhohScreenNum = 0;
  hhohRendProvName = '';
  hhohRendProvNpi = 0;
  hhohServiceFromDate = '';
  hhohServiceToDate = '';
  hhohNoOfServices = 0;
  hhohChargeAmt = 0;
  hhohEligibleChargeAmt = 0;
  hhohPreExistingInd = '';
  hhohPrevConsideredPlans: string[] = [];
  hhohPossibleDup = '';
  hhohDupInd = '';
  hhohCptCode = '';
  hhohMod1 = '';
  hhohMod2 = '';
  hhohMod3 = '';
  hhohMod4 = '';
  hhohIcdPtr1 = 0;
  hhohIcdPtr2 = 0;
  hhohIcdPtr3 = 0;
  hhohIcdPtr4 = 0;
  hhohNoPayPlanCode = '';
  hhohNoPayInd = 0;
  hhohPpCnt = 0;
  hhohChPpEntrys: HhcChrgPpEntry[] = [];
  hhohServiceCode = '';
  hhohTypeCode = '';
}
