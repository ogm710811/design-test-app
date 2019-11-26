import {NoPayChrgBenPpEntry} from './no-pay-chrg-ben-pp-entry.model';

/**
 * Model class NoPayChrgBenLnTSQ
 * Path: bean/tsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::NoPayChrgBenLnTSQ
 * Legacy Mapping: NP-CHARGE-LN
 */
export class NoPayChrgBenLnTSQ {
  npScreenNum = 0;
  npRendProvName = '';
  npRendProvNpi = 0;
  npServiceFromDate = 0;
  npServiceToDate = 0;
  npChargeAmt = 0;
  npCptCode = '';
  npMod1 = '';
  npMod2 = '';
  npMod3 = '';
  npMod4 = '';
  npIcdPtr1 = 0;
  npIcdPtr2 = 0;
  npIcdPtr3 = 0;
  npIcdPtr4 = 0;
  npBillProvKey = 0;
  npNoPayInd = 0;
  npHaInd = '';
  npPpCnt = 0;
  npChPpEntrys: NoPayChrgBenPpEntry[] = [];
  npPlanCode = '';
  npPlanInd = '';
  npServiceCode = '';
  npTypeCode = '';
}
