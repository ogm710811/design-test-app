/**
 * Model class MsChargeLine
 * Path: oprecqr
 * Model: com::uhc::aarp::fox::domain::oprecQR::MsChargeLine
 * Legacy Mapping: MS-CHARGE-LINE
 */
export class MsChargeLine {
  msProvName = '';
  msServFromDt = new Date();
  msServToDt = new Date();
  msPlanCode = '';
  msType = '';
  msTypeEob = '';
  msAmtApproved = 0;
  msMedicarePmt = 0;
  msPartBDed = 0;
  msDeductible = 0;
  msNextYrDeduct = 0;
  msBenefitAmt = 0;
  msChargeAmt = 0;
  msCovExpense = 0;
  msRemarks = 0;
  msPriorPlan = '';
  msPreExisting = '';
  msMedicareAssnInd = '';
  msMessages: number[] = [];
  msPrevConsider = '';
  msPossDup = '';
  msMedicarePmtInd = '';
}
