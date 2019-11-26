import { QirAltIndex1 } from './qir-alt-index1.model';
import { QirOrigQualErrs } from './qir-orig-qual-errs.model';
import { QirOrigQualReas } from './qir-orig-qual-reas.model';
import { QirRecQualErrs } from './qir-rec-qual-errs.model';
import { QirRecQualReas } from './qir-rec-qual-reas.model';

/**
 * Model class QirClaimInformation
 * Path: screenbean/qltyrvwrvldcauti/tmp
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::tmp::QirClaimInformation
 * Legacy Mapping: QIR-CLAIM-INFORMATION
 */
export class QirClaimInformation {
  qirDateProcessed = 0;
  qirDateSuspended = 0;
  qirAltIndex1 = new QirAltIndex1();
  qirOrigLocation = 0;
  qirOrigElevatedQuality = '';
  qirOrigActualLevel = 0;
  qirOrigQualReas = new QirOrigQualReas();
  qirOrigQualErrs = new QirOrigQualErrs();
  qirRecIons = 0;
  qirRecLocation = 0;
  qirRecQualReas = new QirRecQualReas();
  qirRecQualErrs = new QirRecQualErrs();
}
