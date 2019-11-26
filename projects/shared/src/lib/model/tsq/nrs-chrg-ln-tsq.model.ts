import {NrsChrgPpEntry} from './nrs-chrg-pp-entry.model';

/**
 * Model class NrsChrgLnTSQ
 * Path: bean/tsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::NrsChrgLnTSQ
 * Legacy Mapping: NC-CHARGE-LN
 */
export class NrsChrgLnTSQ {
  ncScreenNum = 0;
  ncRendProvName = '';
  ncRendProvNpi = 0;
  ncServiceFromDate = 0;
  ncServiceToDate = 0;
  ncNoOfShifts = 0;
  ncNoOfHours = 0;
  ncChargeAmt = 0;
  ncPreExistingInd = '';
  ncPrevConsideredPlans: string[] = [];
  ncPossibleDup = '';
  ncDupInd = '';
  ncCptCode = '';
  ncMod1 = '';
  ncMod2 = '';
  ncMod3 = '';
  ncMod4 = '';
  ncIcdPtr1 = 0;
  ncIcdPtr2 = 0;
  ncIcdPtr3 = 0;
  ncIcdPtr4 = 0;
  ncNoPayPlanCode = '';
  ncNoPayInd = 0;
  ncPpCnt = 0;
  ncChPpEntrys: NrsChrgPpEntry[] = [];
  ncServiceCode = '';
  ncTypeCode = '';
}
