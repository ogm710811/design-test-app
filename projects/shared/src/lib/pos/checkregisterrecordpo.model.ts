/**
 * Model class CheckRegisterRecordPO
 * Path: common/pos
 * Model: com::uhc::aarp::fox::domain::common::entities::CheckRegisterRecord
 */
export class CheckRegisterRecordPO {
  issueDate = new Date();
  checkSeries = '';
  checkNumber = 0;
  bulkIndicator = 0;
  checkAmount = 0;
  claimBatchNumber = '';
  acctAssoc = 0;
  claimAmount = 0;
  bulkId = '';
  buwInd = '';
  paypointCode = '';
  payeeEntireName = '';
  payeeSuffix = '';
  payeeStreetAddr1 = '';
  payeeStreetAddr2 = '';
  payeeStreetAddr3 = '';
  payeeCityStateZip = '';
  checkStatusIndicator = '';
  clearingDate = new Date();
  clearingAmount = 0;
  insured = '';
  taxIdNumber = 0;
  rho = '';
  extensionRecordPointer = 0;
  checkRegisterRecordSk = 0;
  extension = null;
}
