import { EBRPpEntry } from './ebrpp-entry.model';
import { EBRSmEntry } from './ebrsm-entry.model';

/**
 * Model class EBRBillLine
 * Path: screenbean/eobrepl
 * Model: com::uhc::aarp::fox::domain::screenbean::eobrepl::EBRBillLine
 * Legacy Mapping: E-B-R-BILL-LINE
 */
export class EBRBillLine {
  ebRBlhKey = 0;
  ebRChrgScreenNum = 0;
  ebRChrgTblInd = '';
  ebRChrgKey = 0;
  ebRChrgLnNum = 0;
  ebRBillLnNum = 0;
  ebRErrSignInd = '';
  ebRRendPrvNm = '';
  ebRRendPrvNpi = 0;
  ebRSrvCd = '';
  ebRTypeCd = '';
  ebRSrvFromDt = 0;
  ebRSrvToDt = 0;
  ebRSrvAccum1 = 0;
  ebRSrvAccum2 = 0;
  ebRHspSnfDaysInd = '';
  ebRSubmitChrgAmt = 0;
  ebRChrgAmt = 0;
  ebRBenPerdNum = 0;
  ebRBenPerdDays = 0;
  ebRProcCd = '';
  ebRMcarePaidAmt = 0;
  ebRMcareAprvdAmt = 0;
  ebRIncrlDt = 0;
  ebRPartbDedAmt = 0;
  ebRAarpDedAmt = 0;
  ebRNextYrDeductible = 0;
  ebRPctPd = 0;
  ebRMcareAsgnInd = '';
  ebRAsgnInd = '';
  ebRBenAmt = 0;
  ebRDailyBenAmt = 0;
  ebRPreExistInd = '';
  ebRCvrdXpnceAmt = 0;
  ebRCptCd = '';
  ebRProcMod1 = '';
  ebRProcMod2 = '';
  ebRProcMod3 = '';
  ebRProcMod4 = '';
  ebRHaInd = '';
  ebRNoPayInd = 0;
  ebRBillProvKey = '';
  ebRCopay = 0;
  ebROopAmt = 0;
  ebROopInd = '';
  ebRRemarkCode = 0;
  ebRPpCnt = 0;
  ebRPpEntrys: EBRPpEntry[] = [];
  ebRSmEntrys: EBRSmEntry[] = [];
  ebRPlanCd = '';
  ebRPlanInd = '';
  ebRPreExistPlan = '';
  ebRPreExistPlanInd = '';
  ebROopYear = 0;
  ebROopPlan = '';
  ebROopPlanEffDate = 0;
}
