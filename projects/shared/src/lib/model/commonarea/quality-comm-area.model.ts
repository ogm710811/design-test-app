import {QcaMiscellaneousFields} from './qca-miscellaneous-fields.model';
import {QcaProcessingFields} from './qca-processing-fields.model';
import {QcaRestartQrFields} from './qca-restart-qr-fields.model';
import {QcaScreenDisplayFields} from './qca-screen-display-fields.model';

/**
 * Model class QualityCommArea
 * Path: bean/qualcommarea
 * Model: com::uhc::aarp::fox::domain::bean::qualcommarea::QualityCommArea
 * Legacy Mapping: QUALITY-COMM-AREA
 */
export class QualityCommArea {
  qltyRvwCmnAreaProcessingFields = new QcaProcessingFields();
  qltyRvwCmnAreaScreenDisplayFields = new QcaScreenDisplayFields();
  qltyRvwCmnAreaRestartQrFields = new QcaRestartQrFields();
  qltyRvwCmnAreaMiscellaneousFields = new QcaMiscellaneousFields();
  linkageSwitch = '';
}
