import {WsExceptRecXcptChPpEntry} from './ws-except-rec-xcpt-ch-pp-entry.model';

/**
 * Model class WsExceptRecXcptChrgLnTSQ
 * Path: screenbean/procclmdrugeobservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::WsExceptRecXcptChrgLnTSQ
 * Legacy Mapping: EXCEPT-CHARGE-LN
 */
export class WsExceptRecXcptChrgLnTSQ {
  exceptScreenNum = 0;
  exceptRendProvName = '';
  exceptRendProvNpi = 0;
  exceptServiceFromDate = 0;
  exceptServiceToDate = 0;
  exceptNoOfServices = 0;
  exceptChargeAmt = 0;
  exceptEligibleChargeAmt = 0;
  exceptDeductibleAmt = 0;
  exceptMedicarePaymentAmt = 0;
  exceptCopayAmt = 0;
  exceptCopayAmtX = '';
  exceptBenefitAmt = 0;
  exceptPercentRate = 0;
  exceptPrevConsideredInd = '';
  exceptPrevConsideredPlans: String[] = [];
  exceptPossibleDup = '';
  exceptDupInd = '';
  exceptCptCode = '';
  exceptMod1 = '';
  exceptMod2 = '';
  exceptMod3 = '';
  exceptMod4 = '';
  exceptIcdPtr1 = 0;
  exceptIcdPtr2 = 0;
  exceptIcdPtr3 = 0;
  exceptIcdPtr4 = 0;
  exceptNoPayInd = 0;
  exceptHaInd = '';
  exceptBillProvKey = 0;
  exceptPpCnt = 0;
  exceptChPpEntrys: WsExceptRecXcptChPpEntry[] = [];
  exceptPlanCode = '';
  exceptPlanInd = '';
  exceptServiceCode = '';
  exceptTypeCode = '';
}
