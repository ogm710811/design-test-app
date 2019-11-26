import {MedcrSuplChrgBenLnChPpEntry} from './medcr-supl-chrg-ben-ln-ch-pp-entry.model';

/**
 * Model class MedcrSuplChrgBenLnTSQ
 * Path: bean/tsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::MedcrSuplChrgBenLnTSQ
 * Legacy Mapping: WS-MED-SUPP-CHARGE-LINE
 */
export class MedcrSuplChrgBenLnTSQ {
  medSuppScreenNum = 0;
  medSuppRendProvName = '';
  medSuppRendProvNpi = 0;
  medSuppServiceFromDate = 0;
  medSuppServiceToDate = 0;
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
  medSuppPrevConsideredPlans: string[] = [];
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
  medSuppChPpEntrys: MedcrSuplChrgBenLnChPpEntry[] = [];
}
