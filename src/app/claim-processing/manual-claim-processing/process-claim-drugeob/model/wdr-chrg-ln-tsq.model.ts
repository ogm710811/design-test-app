import {WdrChrgLnChPpEntry} from './wdr-chrg-ln-ch-pp-entry.model';

/**
 * Model class WdrChrgLnTSQ
 * Path: screenbean/procclmdrugeobservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::WdrChrgLnTSQ
 * Legacy Mapping: WS-DRUG-CHARGE-LINE
 */
export class WdrChrgLnTSQ {
  drugScreenNum = 0;
  drugRendProvName = '';
  drugPharmacyType = '';
  drugServiceFromDate = '';
  drugServiceToDate = '';
  drugEligibleChargeAmt = 0;
  drugDrugName = '';
  drugNdcNumber = '';
  drugPreExistingInd = '';
  drugGt31Ind = '';
  drugPrevConsideredPlans: String[] = [];
  drugPossibleDup = '';
  drugDupInd = '';
  drugNoPayPlanCode = '';
  drugNoPayInd = 0;
  drugPpCnt = 0;
  drugChPpEntrys: WdrChrgLnChPpEntry[] = [];
}
