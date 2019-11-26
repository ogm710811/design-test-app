import { QcaAllMessages } from './qca-all-messages.model';
import { QcaInsuredNoteArea } from './qca-insured-note-area.model';
import { QcaLetterPlans } from './qca-letter-plans.model';
import { QcaMessageArea } from './qca-message-area.model';
import { QcaSpecialMemoArea } from './qca-special-memo-area.model';

/**
 * Model class QcaQualityUpdateFields
 * Path: screenbean/qltyrvwrvldcauti/tmp
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::tmp::QcaQualityUpdateFields
 * Legacy Mapping: QCA-QUALITY-UPDATE-FIELDS
 */
export class QcaQualityUpdateFields {
  qcaPatientNumber = '';
  qcaLetterPlans = new QcaLetterPlans();
  qcaAllMessages = new QcaAllMessages();
  qcaMessageArea = new QcaMessageArea();
  qcaSpecialMemoArea = new QcaSpecialMemoArea();
  qcaInsuredNoteArea = new QcaInsuredNoteArea();
  qcaClaimNote = '';
}
