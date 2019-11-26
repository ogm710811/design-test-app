import {QrrMessages} from './qrr-messages.model';

/**
 * Model class QrrQualityUpdateFields
 * Path: bean/qualcommarea
 * Model: com::uhc::aarp::fox::domain::bean::qualcommarea::QrrQualityUpdateFields
 * Legacy Mapping: QRR-QUALITY-UPDATE-FIELDS
 */
export class QrrQualityUpdateFields {
  qrrPatientNumber = '';
  qrrClaimNote = '';
  qrrLetterPlans: string[] = [];
  qrrMessages: number[] = [];
  messageAreas: QrrMessages[] = [];
  qrrInsuredNotes: string[] = [];
  qrrSpecialMemos: string[] = [];
}
