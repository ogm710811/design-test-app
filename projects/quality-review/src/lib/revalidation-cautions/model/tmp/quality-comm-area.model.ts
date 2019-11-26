import { QcaMiscellaneousFields } from './qca-miscellaneous-fields.model';
import { QcaProcessingFields } from './qca-processing-fields.model';
import { QcaRestartQrFields } from './qca-restart-qr-fields.model';
import { QcaScreenDisplayFields } from './qca-screen-display-fields.model';

/**
 * Model class QualityCommArea
 * Path: screenbean/qltyrvwrvldcauti/tmp
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::tmp::QualityCommArea
 * Legacy Mapping: QUALITY-COMM-AREA
 */
export class QualityCommArea {
  mapSaveArea = '';
  linkageSwitch = '';
  qcaProcessingFields = new QcaProcessingFields();
  qcaScreenDisplayFields = new QcaScreenDisplayFields();
  qcaRestartQrFields = new QcaRestartQrFields();
  qcaMiscellaneousFields = new QcaMiscellaneousFields();
}
