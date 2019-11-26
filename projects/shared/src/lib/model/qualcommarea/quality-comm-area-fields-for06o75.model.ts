import {QualityCommAreaMessages} from './quality-comm-area-messages.model';

/**
 * Model class QualityCommAreaFieldsFor06o75
 * Path: bean/qualcommarea
 * Model: com::uhc::aarp::fox::domain::bean::qualcommarea::QualityCommAreaFieldsFor06o75
 * Legacy Mapping: QCA-FIELDS-FOR-06O75
 */
export class QualityCommAreaFieldsFor06o75 {
  errorMessageFor76 = '';
  typeOfError = '';
  claimLocation = 0;
  claimIons = 0;
  fieldsFor6o77 = '';
  qualRevalOverpymtAmt = 0;
  lastUpdateRequest = '';
  lastClmNo = '';
  lastQualNo = '';
  totReviewed = 0;
  totSuspended = 0;
  startTime = 0;
  qualityRevalDisbPct = 0;
  qualityRevalSuspPct = 0;
  patientNumber = '';
  letterPlans: string[] = [];
  specialMemos: string[] = [];
  insuredNotes: string[] = [];
  claimNote = '';
  messages: QualityCommAreaMessages[] = [];
  screenNo = 0;
  chrgScreenNo = 0;
  chargeFromDate = 0;
  chargeToDate = 0;
  moreDupsInd = '';
  billAs: string[] = [];
  numOfDups: number[] = [];
}
