import { QirAltIndex2 } from './qir-alt-index2.model';
import { QirQOrigRevalErrs } from './qir-qorig-reval-errs.model';
import { QirQRecRevalErrs } from './qir-qrec-reval-errs.model';
import { QirQualKey } from './qir-qual-key.model';

/**
 * Model class QirQualityInformation
 * Path: screenbean/qltyrvwrvldcauti/tmp
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::tmp::QirQualityInformation
 * Legacy Mapping: QIR-QUALITY-INFORMATION
 */
export class QirQualityInformation {
  qirQualKey = new QirQualKey();
  qirAltIndex2 = new QirAltIndex2();
  qirQOrigLocation = 0;
  qirQOrigRevalErrs = new QirQOrigRevalErrs();
  qirQRecIons = 0;
  qirQRecLocation = 0;
  qirQRecRevalErrs = new QirQRecRevalErrs();
}
