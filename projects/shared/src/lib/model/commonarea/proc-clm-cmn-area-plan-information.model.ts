import {ProcClmCmnAreaPlanTosInformation} from './proc-clm-cmn-area-plan-tos-information.model';

/**
 * Model class ProcClmCmnAreaPlanInformation
 * Path: bean/commonarea
 * Model: com::uhc::aarp::fox::domain::bean::commonarea::ProcClmCmnAreaPlanInformation
 */
export class ProcClmCmnAreaPlanInformation {
  planCode = '';
  planCodeInd = '';
  compasPlanCode = '';
  compasPlanCodeInd = '';
  basePlanCode = '';
  basePlanCodeInd = '';
  planEffectiveDate = 0;
  planTermDate = 0;
  planCompasTermDate = 0;
  planTermReason = '';
  planExtendTermDate = 0;
  planType = '';
  planPeMonths = 0;
  planBenefIncreaseInd = '';
  planBenefPerDays = 0;
  planDeductFlag1 = '';
  planAggr1Flag1 = '';
  planAggr1Flag2 = '';
  planAggr1 = 0;
  planAggr2Flag1 = '';
  planAggr2Flag2 = '';
  planAggrAgeInd = '';
  planHLDeductFlag1 = '';
  planHLAggr1Flag1 = '';
  planHLAggr1Flag2 = '';
  planHLAggr1 = 0;
  planHLAggr2Flag1 = '';
  planHLAggr2Flag2 = '';
  planSDeductFlag1 = '';
  planSAggr1Flag1 = '';
  planSAggr1Flag2 = '';
  planSAggr1 = 0;
  planWDeductFlag1 = '';
  planWAggr1Flag1 = '';
  planWAggr1Flag2 = '';
  planMDeductFlag1 = '';
  planMAggr1Flag1 = '';
  planMAggr1Flag2 = '';
  planXDeductFlag1 = '';
  planXAggr1Flag1 = '';
  planXAggr1Flag2 = '';
  planXAggr1 = 0;
  planRDeductFlag1 = '';
  planRDeduct = 0;
  planRDedCarryFlag = '';
  planRAggr1Flag1 = '';
  planRAggr1Flag2 = '';
  planDDeductFlag1 = '';
  planDDeduct = 0;
  planDAggr1Flag1 = '';
  planDAggr1Flag2 = '';
  planDAggr1 = 0;
  planFDeductFlag1 = '';
  planFWaitPer = 0;
  planFAggr1Flag1 = '';
  planFAggr1Flag2 = '';
  planFAggr1 = 0;
  planBDeductFlag1 = '';
  planBDeduct = 0;
  planBDedCarryFlag = '';
  planBAggr1Flag1 = '';
  planBAggr1Flag2 = '';
  planTosInfo: ProcClmCmnAreaPlanTosInformation[] = [];
  planLagUnd65Days = 0;
  planLagOvr65Days = 0;
  planBDeductR = '';
}
