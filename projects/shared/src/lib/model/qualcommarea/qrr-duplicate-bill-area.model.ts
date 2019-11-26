import {QrrDuplicateBills} from './qrr-duplicate-bills.model';

/**
 * Model class QrrDuplicateBillArea
 * Path: bean/qualcommarea
 * Model: com::uhc::aarp::fox::domain::bean::qualcommarea::QrrDuplicateBillArea
 * Legacy Mapping: QRR-DUPLICATE-BILL-AREA
 */
export class QrrDuplicateBillArea {
  qrrDupBillCtr = 0;
  qrrDuplicateBills: QrrDuplicateBills[] = [];
}
