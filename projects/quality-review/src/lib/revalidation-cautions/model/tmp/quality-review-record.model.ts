import { QrrCautionArea } from './qrr-caution-area.model';
import { QrrDuplicateBillArea } from './qrr-duplicate-bill-area.model';
import { QrrQualityUpdateFields } from './qrr-quality-update-fields.model';
import { QrrWholeClaimNumber } from './qrr-whole-claim-number.model';
import { QualReviewKey } from './qual-review-key.model';

/**
 * Model class QualityReviewRecord
 * Path: screenbean/qltyrvwrvldcauti/tmp
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::tmp::QualityReviewRecord
 * Legacy Mapping: QUALITY-REVIEW-RECORD
 */
export class QualityReviewRecord {
  qualReviewKey = new QualReviewKey();
  qrrWholeClaimNumber = new QrrWholeClaimNumber();
  qrrOperatorId = 0;
  qrrQualityId = 0;
  qrrQualityAction = 0;
  qrrRevalidationInd = '';
  qrrBatchRequestDate = 0;
  qrrQualityUpdateFields = new QrrQualityUpdateFields();
  filler76 = '';
  qrrDupMaximumInd = '';
  qrrCautionArea = new QrrCautionArea();
  qrrDuplicateBillArea = new QrrDuplicateBillArea();
  filler78 = '';
}
