import {WsMedSupChargeLineMedcrSuplChrgBenLnChPpEntry} from './ws-med-sup-charge-line-medcr-supl-chrg-ben-ln-ch-pp-entry.model';

/**
 * Model class WsMedSupChargeLineMedcrSuplChrgBenLnTSQ
 * Path: screenbean/procclmdrugeobservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::WsMedSupChargeLineMedcrSuplChrgBenLnTSQ
 * Legacy Mapping: WS-MED-SUPP-CHARGE-LINE
 */
export class WsMedSupChargeLineMedcrSuplChrgBenLnTSQ {
  medSuppScreenNum = 0;
  medSuppRendProvName = '';
  medSuppRendProvNpi = 0;
  medSuppServiceFromDate = '';
  medSuppServiceToDate = '';
  medSuppTypeCode = '';
  medSuppTypeCodeEob = '';
  medSuppChargeAmt = 0;
  medSuppAmtApproved = 0;
  medSuppMedicarePaidAmt = 0;
  medSuppMedPaidAmountInd = '';
  medSuppGrRudPercent = 0;
  medSuppMedicDeductibleAmt = 0;
  medSuppAarpDeductibleAmt = 0;
  medSuppNextYrDeductible = 0;
  medSuppBenefitAmt = 0;
  medSuppCoinsAmt = 0;
  medSuppCopayAmt = 0;
  medSuppCovExpenseAmt = 0;
  medSuppOopAmt = 0;
  medSuppOopInd = '';
  medSuppCoinsInd = '';
  medSuppDedInd = '';
  medSuppPrevConsideredPlans: String[] = [];
  medSuppPossibleDup = '';
  medSuppDupInd = '';
  medSuppCptCode = '';
  medSuppMod1 = '';
  medSuppMod2 = '';
  medSuppMod3 = '';
  medSuppMod4 = '';
  medSuppIcdPtr1 = 0;
  medSuppIcdPtr2 = 0;
  medSuppIcdPtr3 = 0;
  medSuppIcdPtr4 = 0;
  medSuppPlaceOfService = '';
  medSuppNoPayInd = 0;
  medSuppHaInd = '';
  medSuppMedicareAssnInd = '';
  medSuppBillProvKey = 0;
  medSuppPpCnt = 0;
  medSuppPlanCode = '';
  medSuppPlanInd = '';
  medSuppTosServiceCode = '';
  medSuppTosTypeCode = '';
  medSuppOopYear = 0;
  medSuppOopPlan = '';
  medSuppOopPlanEffDate = '';
  medSuppPriorPlan = '';
  medSuppPriorPlanInd = '';
  medSuppChPpEntrys: WsMedSupChargeLineMedcrSuplChrgBenLnChPpEntry[] = [];
}
