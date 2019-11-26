import {ServiceTypeCode} from './service-type-code.model';

/**
 * Model class BillRecords
 * Path: bean/procclmtempclmrec
 * Model: com::uhc::aarp::fox::domain::bean::procclmtempclmrec::BillRecords
 * Legacy Mapping: T-BILL-RECORDS
 */
export class BillRecords {
  tplanCode = '';
  tserviceTypeCode = new ServiceTypeCode();
  tbillProvName = '';
  tbillIncDate = 0;
  tbillServFromDate = 0;
  tbillServToDate = 0;
  tnumber1 = 0;
  tnumber2 = 0;
  tbenePeriodDays = 0;
  tbeneAmt = 0;
  tmanBene = '';
  tperDayBene = 0;
  tperDayBeneR = 0;
  teombDate = 0;
  tmedApprovedAmt = 0;
  tmedPaymentAmt = 0;
  tdeductAmt = 0;
  tpartBDeduct = 0;
  tcovExpense = 0;
  tpercentPaid = 0;
  tremarkCode = '';
  tremarkCodeR = 0;
  tbillAssignInd = '';
  tchargeAmt = 0;
  tuPAmount = 0;
  tprocCode = '';
  tmedicareAssignInd = '';
  tfirstOrRel = '';
  tpreExistPlan = '';
  tchargeLine = 0;
}
