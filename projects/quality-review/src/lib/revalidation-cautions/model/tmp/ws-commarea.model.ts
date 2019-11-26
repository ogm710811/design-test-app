import { QcaFieldsFor06o75 } from './qca-fields-for06o75.model';
import { QualityCommArea } from './quality-comm-area.model';
import { QualityInfoRecord } from './quality-info-record.model';
import { QualityReviewRecord } from './quality-review-record.model';

/**
 * Model class WsCommarea
 * Path: screenbean/qltyrvwrvldcauti/tmp
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::tmp::WsCommarea
 * Legacy Mapping: WS-COMMAREA
 */
export class WsCommarea {
  qualityCommArea = new QualityCommArea();
  qcaFieldsFor06o75 = new QcaFieldsFor06o75();
  qualityReviewRecord = new QualityReviewRecord();
  qualityInfoRecord = new QualityInfoRecord();
}
