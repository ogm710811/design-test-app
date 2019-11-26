/**
 * Model class QcaProcessingFields
 * Path: bean/qualcommarea
 * Model: com::uhc::aarp::fox::domain::bean::qualcommarea::QcaProcessingFields
 * Legacy Mapping: QCA-PROCESSING-FIELDS
 */
export class QcaProcessingFields {
  command = '';
  processingInd = '';
  qualityClaimNo = 0;
  claimRrdsRrn = 0;
  claimSub = 0;
  errorMessageFor75 = '';
  lockedDb = '';
  updateRequest = '';
  errors: string[] = [];
}
