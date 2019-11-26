import { QcaAddressLines } from './qca-address-lines.model';
import { QcaInsuredPlanTable } from './qca-insured-plan-table.model';

/**
 * Model class QcaScreenDisplayFields
 * Path: screenbean/qltyrvwrvldcauti/tmp
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::tmp::QcaScreenDisplayFields
 * Legacy Mapping: QCA-SCREEN-DISPLAY-FIELDS
 */
export class QcaScreenDisplayFields {
  qcaClaimNo = '';
  qcaQualityNo = '';
  qcaAccountNo = '';
  qcaAddressLines = new QcaAddressLines();
  filler50 = '';
  qcaPlanLine1 = '';
  qcaPlanLine2 = '';
  qcaPlanLine3 = '';
  qcaPlanLine4 = '';
  qcaPlanLine5 = '';
  qcaAdminNote = '';
  qcaNoOfPlans = 0;
  qcaInsuredPlanTable = new QcaInsuredPlanTable();
}
