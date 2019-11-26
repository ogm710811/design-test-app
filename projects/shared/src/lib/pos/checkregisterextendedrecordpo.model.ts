/**
 * Model class CheckRegisterExtendedRecordPO
 * Path: common/pos
 * Model: com::uhc::aarp::fox::domain::common::entities::CheckRegisterExtendedRecord
 */
export class CheckRegisterExtendedRecordPO {
  issueDate = new Date();
  checkSeries = '';
  checkNumber = 0;
  checkAmount = 0;
  paypointCode = '';
  originalCheckSeries = '';
  originalCheckNumber = 0;
  originalIssueDate = new Date();
  replacementSeries = '';
  replacementCheckNumber = 0;
  replacementIssueDate = new Date();
  lostCheckStatementDate = new Date();
  lostCheckOperatorId = '';
  lastDebtsDate = new Date();
  lastDebtsOperatorId = '';
  paidLetterDate = new Date();
  paidLetterOperatorId = '';
  acknowledgeLetterDate = new Date();
  acknowledgeOperatorId = '';
  replvoidRequestDate = new Date();
  replvoidRequestOprId = '';
  replvoidApprovalDate = new Date();
  replvoidApprovalOprId = '';
  replvoidRequestReason = '';
  transactionId = '';
  notation = '';
  payeeSurname = '';
  payeeFirstName = '';
  payeeMiddleInitial = '';
  payeeSuffix = '';
  payeeStreetAddr1 = '';
  payeeStreetAddr2 = '';
  payeeStreetAddr3 = '';
  payeeCity = '';
  payeeState = '';
  payeeZipCode = '';
  taxIdNumber = 0;
  notationPrint = '';
  checkRegisterExtendedRecordSk = 0;
  checkRegister = null;
}
