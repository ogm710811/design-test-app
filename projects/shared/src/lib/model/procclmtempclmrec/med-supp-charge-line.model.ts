/**
 * Model class MedSuppChargeLine
 * Path: bean/procclmtempclmrec
 * Model: com::uhc::aarp::fox::domain::bean::procclmtempclmrec::MedSuppChargeLine
 * Legacy Mapping: T-MS-CHARGE-LINE
 */
export class MedSuppChargeLine {
  tmsProvName = '';
  tmsServFromDt = '';
  tmsServToDt = '';
  tmsPlanCode = '';
  tmsType = '';
  tmsTypeEob = '';
  tmsAmtApproved = 0;
  tmsMedicarePmt = 0;
  tmsPartBDed = 0;
  tmsDeduct = 0;
  tmsNextYrDeduct = 0;
  tmsBeneAmt = 0;
  tmsChargeAmt = 0;
  tmsChargeAmtR = '';
  tmsCovExpense = 0;
  tmsRemarks = 0;
  tmsPriorPlan = '';
  tmsPreExist = '';
  tmsMedicareAssnInd = '';
  tmsPossDup = '';
  tmsPrevConPlans: string[] = [];
  tmsMessages: number[] = [];
}
