import {QrrCautionArea} from './qrr-caution-area.model';
import {QrrDuplicateBillArea} from './qrr-duplicate-bill-area.model';
import {QrrQualityUpdateFields} from './qrr-quality-update-fields.model';

/**
 * Model class QualityReviewRecord
 * Path: bean/qualcommarea
 * Model: com::uhc::aarp::fox::domain::bean::qualcommarea::QualityReviewRecord
 * Legacy Mapping: QUALITY-REVIEW-RECORD
 */
export class QualityReviewRecord {
  operatorId = 0;
  qualityId = 0;
  qualityAction = 0;
  revalidationInd = '';
  batchRequestDate = 0;
  qualityUpdateFields = new QrrQualityUpdateFields();
  dupMaximumInd = '';
  cautionArea = new QrrCautionArea();
  duplicateBillArea = new QrrDuplicateBillArea();
  location = 0;
  date = 0;
  seqNo = 0;
  claimNo = 0;
  status = '';
}
