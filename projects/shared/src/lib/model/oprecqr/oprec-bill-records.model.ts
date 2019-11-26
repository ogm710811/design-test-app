/**
 * Model class OprecBillRecords
 * Path: oprecqr
 * Model: com::uhc::aarp::fox::domain::oprecQR::OprecBillRecords
 */
export class OprecBillRecords {
  planCode = '';
  serviceCode = '';
  typeCode = '';
  billProvName = '';
  billIncurralDate = new Date();
  billServiceFromDate = new Date();
  billServiceToDate = new Date();
  number1 = 0;
  number2 = 0;
  benefitPeriodDays = 0;
  benefitAmt = 0;
  manualBenefit = '';
  perDayBenefit = 0;
  eombDate = new Date();
  medicareApprovedAmt = 0;
  medicarePaymentAmt = 0;
  deductibleAmt = 0;
  partBDeduct = 0;
  coveredExpense = 0;
  percentPaid = 0;
  remarkCode = '';
  billAssignInd = '';
  chargeAmt = 0;
  uPAmount = 0;
  procedureCode = '';
  medicareAssignInd = '';
  firstOrRelated = '';
  preExistPlanCode = '';
  chargeLine = 0;
}
