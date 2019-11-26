import { QrrAllMessages } from './qrr-all-messages.model';
import { QrrInsuredNoteArea } from './qrr-insured-note-area.model';
import { QrrLetterPlans } from './qrr-letter-plans.model';
import { QrrMessageArea } from './qrr-message-area.model';
import { QrrSpecialMemoArea } from './qrr-special-memo-area.model';

/**
 * Model class QrrQualityUpdateFields
 * Path: screenbean/qltyrvwrvldcauti/tmp
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::tmp::QrrQualityUpdateFields
 * Legacy Mapping: QRR-QUALITY-UPDATE-FIELDS
 */
export class QrrQualityUpdateFields {
  qrrPatientNumber = '';
  qrrLetterPlans = new QrrLetterPlans();
  qrrAllMessages = new QrrAllMessages();
  qrrMessageArea = new QrrMessageArea();
  qrrSpecialMemoArea = new QrrSpecialMemoArea();
  qrrInsuredNoteArea = new QrrInsuredNoteArea();
  qrrClaimNote = '';
}
