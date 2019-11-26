import { QrrDupTos } from './qrr-dup-tos.model';

/**
 * Model class QrrDuplicateBillTable
 * Path: screenbean/qltyrvwrvldcauti/tmp
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::tmp::QrrDuplicateBillTable
 * Legacy Mapping: QRR-DUPLICATE-BILL-TABLE
 */
export class QrrDuplicateBillTable {
  qrrDupBillType = 0;
  qrrDupChargeLineNo = 0;
  qrrDupReply = '';
  qrrDupClaimNumber = 0;
  qrrDupPlan = '';
  qrrDupTos = new QrrDupTos();
  qrrDupProviderName = '';
  qrrDupFromDate = 0;
  qrrDupToDate = 0;
  qrrDupNumber1 = 0;
  qrrDupNumber2 = 0;
  qrrDupChargeAmount = 0;
  qrrDupPreExisting = '';
  qrrDupAssignInd = '';
  qrrDupMedPayAmt = 0;
  qrrDupMedAppAmt = 0;
  qrrDupPartBDeduct = 0;
  qrrEcTotalBillAmt = 0;
  qrrCptCode = '';
  qrrGroupName = '';
  qrrBillLnBen = 0;
  qrrRpsRxNo = '';
  qrrRpsFillNo = '';
  qrrRpsTotalBillAmt = 0;
}
