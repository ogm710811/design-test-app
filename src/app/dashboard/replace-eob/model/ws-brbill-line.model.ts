import { WsBRPpEntry } from './ws-brpp-entry.model';
import { WsBRSmEntry } from './ws-brsm-entry.model';

/**
 * Model class WsBRBillLine
 * Path: screenbean/eobrepl
 * Model: com::uhc::aarp::fox::domain::screenbean::eobrepl::WsBRBillLine
 * Legacy Mapping: WS-B-R-BILL-LINE
 */
export class WsBRBillLine {
  wsBRBlhKey = 0;
  wsBRChrgScreenNum = 0;
  wsBRChrgTblInd = '';
  wsBRChrgKey = 0;
  wsBRChrgLnNum = 0;
  wsBRBillLnNum = 0;
  wsBRErrSignInd = '';
  wsBRRendPrvNm = '';
  wsBRRendPrvNpi = 0;
  wsBRSrvCd = '';
  wsBRTypeCd = '';
  wsBRSrvFromDt = 0;
  wsBRSrvToDt = 0;
  wsBRSrvAccum1 = 0;
  wsBRSrvAccum2 = 0;
  wsBRHspSnfDaysInd = '';
  wsBRSubmitChrgAmt = 0;
  wsBRChrgAmt = 0;
  wsBRBenPerdNum = 0;
  wsBRBenPerdDays = 0;
  wsBRProcCd = '';
  wsBRMcarePaidAmt = 0;
  wsBRMcareAprvdAmt = 0;
  wsBRIncrlDt = 0;
  wsBRPartbDedAmt = 0;
  wsBRAarpDedAmt = 0;
  wsBRNextYrDeductible = 0;
  wsBRPctPd = 0;
  wsBRMcareAsgnInd = '';
  wsBRAsgnInd = '';
  wsBRBenAmt = 0;
  wsBRDailyBenAmt = 0;
  wsBRPreExistInd = '';
  wsBRCvrdXpnceAmt = 0;
  wsBRCptCd = '';
  wsBRProcMod1 = '';
  wsBRProcMod2 = '';
  wsBRProcMod3 = '';
  wsBRProcMod4 = '';
  wsBRHaInd = '';
  wsBRNoPayInd = 0;
  wsBRBillProvKey = '';
  wsBRCopay = 0;
  wsBROopAmt = 0;
  wsBROopInd = '';
  wsBRRemarkCode = 0;
  wsBRPpCnt = 0;
  wsBRPpEntrys: WsBRPpEntry[] = [];
  wsBRSmEntrys: WsBRSmEntry[] = [];
  wsBRPlanCd = '';
  wsBRPlanInd = '';
  wsBRPreExistPlan = '';
  wsBRPreExistPlanInd = '';
  wsBROopYear = 0;
  wsBROopPlan = '';
  wsBROopPlanEffDate = 0;
}
