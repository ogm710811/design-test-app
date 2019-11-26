import {DrugChrgLnChPpEntry} from './drug-chrg-ln-ch-pp-entry.model';

/**
 * Model class DrugChrgLnTSQ
 * Path: bean/tsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::DrugChrgLnTSQ
 * Legacy Mapping: WS-DRUG-CHARGE-LINE
 */
export class DrugChrgLnTSQ {
  drugScreenNum = 0;
  drugRendProvName = '';
  drugPharmacyType = '';
  drugServiceFromDate = 0;
  drugServiceToDate = 0;
  drugEligibleChargeAmt = 0;
  drugDrugName = '';
  drugNdcNumber = '';
  drugPreExistingInd = '';
  drugGt31Ind = '';
  drugPrevConsideredPlans: string[] = [];
  drugPossibleDup = '';
  drugDupInd = '';
  drugNoPayPlanCode = '';
  drugNoPayInd = 0;
  drugPpCnt = 0;
  drugChPpEntrys: DrugChrgLnChPpEntry[] = [];
}
