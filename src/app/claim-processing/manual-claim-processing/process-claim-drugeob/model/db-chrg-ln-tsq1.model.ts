/**
 * Model class DbChrgLnTSQ1
 * Path: screenbean/procclmdrugeobservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::DbChrgLnTSQ1
 * Legacy Mapping: WS-DRUG-CHARGE-LINE
 */
import {DrugChrgLnChPpEntry} from '@fox/shared';

export class DbChrgLnTSQ1 {
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
  drugChPpEntrys: DrugChrgLnChPpEntry[] = [];
}
