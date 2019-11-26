import { BlPpEntry } from './bl-pp-entry.model';
import { BlSmEntry } from './bl-sm-entry.model';

/**
 * Model class BlBillLine
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::BlBillLine
 * Legacy Mapping: BL-BILL-LINE
 */
export class BlBillLine {
  blBlhKey = 0;
  blChrgScreenNum = 0;
  blChrgTblInd = '';
  blChrgKey = 0;
  blChrgLnNum = 0;
  blBillLnNum = 0;
  blErrSignInd = '';
  blRendPrvNm = '';
  blRendPrvNpi = 0;
  blSrvCd = '';
  blTypeCd = '';
  blSrvFromDt = 0;
  blSrvToDt = 0;
  blSrvAccum1 = 0;
  blSrvAccum2 = 0;
  blHspSnfDaysInd = '';
  blSubmitChrgAmt = 0;
  blChrgAmt = 0;
  blBenPerdNum = 0;
  blBenPerdDays = 0;
  blProcCd = '';
  blMcarePaidAmt = 0;
  blMcareAprvdAmt = 0;
  blIncrlDt = 0;
  blPartbDedAmt = 0;
  blAarpDedAmt = 0;
  blNextYrDeductible = 0;
  blPctPd = 0;
  blMcareAsgnInd = '';
  blAsgnInd = '';
  blBenAmt = 0;
  blDailyBenAmt = 0;
  blPreExistInd = '';
  blCvrdXpnceAmt = 0;
  blCptCd = '';
  blProcMod1 = '';
  blProcMod2 = '';
  blProcMod3 = '';
  blProcMod4 = '';
  blHaInd = '';
  blNoPayInd = 0;
  blBillProvKey = '';
  blCopay = 0;
  blOopAmt = 0;
  blOopInd = '';
  blRemarkCode = 0;
  blPpCnt = 0;
  blPpEntrys: BlPpEntry[] = [];
  blSmEntrys: BlSmEntry[] = [];
  blPlanCd = '';
  blPlanInd = '';
  blPreExistPlan = '';
  blPreExistPlanInd = '';
  blOopYear = 0;
  blOopPlan = '';
  blOopPlanEffDate = 0;
  blBlPpVar02 = '';
  blBlPpVar04 = '';
  blBlPpVar01 = '';
  blBlPpVar03 = '';
  blBlPpVar05 = '';
  blBlPpVar06 = '';
}
