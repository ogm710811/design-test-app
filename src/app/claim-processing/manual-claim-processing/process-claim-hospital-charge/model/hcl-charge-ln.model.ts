import {HclChPpEntry} from './hcl-ch-pp-entry.model';
import {HclPrevConsideredPlans} from './hcl-prev-considered-plans.model';

/**
 * Model class HclChargeLn
 * Path: screenbean/procclmhospchrg/hospchargedata
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmhospchrg::hospChargeData::HclChargeLn
 * Legacy Mapping: HCL-CHARGE-LN
 */
export class HclChargeLn {
  hclScreenNum = 0;
  hclProvType = '';
  hclServiceType = '';
  hclBillProvKey = 0;
  hclAcceptCode1 = '';
  hclAcceptCode2 = '';
  hclServiceFromDate = 0;
  hclServiceToDate = 0;
  hclServiceDays = 0;
  hclPreExistingInd = '';
  hclChargeAmt = 0;
  hclDtOfAccident = 0;
  hclIcuFromDate = 0;
  hclIcuToDate = 0;
  hclIcuDays = 0;
  hclDtOfSurgery = 0;
  hclProviderPercent = 0;
  hclMedIhd = '';
  hclMed1Days = 0;
  hclMed2Days = 0;
  hclMed3Days = 0;
  hclMedLtrDays = 0;
  hclDischargeInd = '';
  hclSnf1Days = 0;
  hclSnf2Days = 0;
  hclSnf3Days = 0;
  hclLtrOption = '';
  hclExcludedPlan1 = '';
  hclExcludedPlan2 = '';
  hclPrevConsideredPlans: HclPrevConsideredPlans[] = [];
  hclPossibleDup = '';
  hclDupInd = '';
  hclIcdPtr1 = 0;
  hclIcdPtr2 = 0;
  hclIcdPtr3 = 0;
  hclIcdPtr4 = 0;
  hclNoPayPlanCode = '';
  hclNoPayInd = 0;
  hclChPpCnt = 0;
  hclChPpEntrys: HclChPpEntry[] = [];
  hclProvName = '';
  hclProvZip = '';
  hclProvSName = '';
}
