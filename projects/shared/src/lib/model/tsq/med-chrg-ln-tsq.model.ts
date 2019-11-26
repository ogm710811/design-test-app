import {MedChrgPpEntry} from './med-chrg-pp-entry.model';

/**
 * Model class MedChrgLnTSQ
 * Path: bean/tsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::MedChrgLnTSQ
 * Legacy Mapping: MED-CHARGE-LN
 */
export class MedChrgLnTSQ {
  medScreenNum = 0;
  medRendProvName = '';
  medRendProvNpi = 0;
  medServiceFromDate = '';
  medServiceToDate = '';
  medNoOfVisits = 0;
  medChargeAmt = 0;
  medCoveredExpenseAmt = 0;
  medPreExistingInd = '';
  medPrevConsideredPlans: string[] = [];
  medPossibleDup = '';
  medDupInd = '';
  medCptCode = '';
  medMod1 = '';
  medMod2 = '';
  medMod3 = '';
  medMod4 = '';
  medIcdPtr1 = 0;
  medIcdPtr2 = 0;
  medIcdPtr3 = 0;
  medIcdPtr4 = 0;
  medNoPayPlanCode = '';
  medNoPayInd = 0;
  medPpCnt = 0;
  medChPpEntrys: MedChrgPpEntry[] = [];
  medServiceCode = '';
  medTypeCode = '';
}
