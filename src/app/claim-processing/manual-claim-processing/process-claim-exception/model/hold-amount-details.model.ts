import {HoldAmount} from './hold-amount.model';
import {HoldPlanAmounts} from './hold-plan-amounts.model';

/**
 * Model class HoldAmountDetails
 * Path: screenbean/procclmxcptchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmxcptchrg::holdAmountDetails
 * Legacy Mapping: WS-CETSQ-WORK-AREA
 */
export class HoldAmountDetails {
  holdAmount = new HoldAmount();
  holdPlanAmounts: HoldPlanAmounts[] = [];
  holdScrnEligChrg9 = 0;
  holdPlanAggr = 0;
  hapMapEspPlanInd = '';
  copayProcessingInd = '';
  pf5ValidKeyInd = '';
  anyPlanEnteredInd = '';
  matchScheduledBenInd = '';
  matchTosInd = '';
  wsTosCode = '';
  wsEspBeneAmt = 0;
  wsHmRespCode = 0;
  wsProvider = '';
  saveProvider = '';
  holdMaximum1 = 0;
  holdMaximum2 = 0;
  wkCharge1 = 0;
  wkChargeDec = '';
  wkCharge2 = 0;
  hmBenefitCptCode = '';
  hmBenefitPlanCode = '';
  hmBenefitTosInd = '';
  hmBenefitAmount = '';
  hmBenefitComment = '';
  hmBenBytes: string[] = [];
  wsHmBenefitAmtDisp = 0;
  wsHmBenefitAmt = 0;
  wkMaximum = '';
}
