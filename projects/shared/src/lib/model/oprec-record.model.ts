/**
 * Model class OprecRecord
 * Path: bean
 * Model: com::uhc::aarp::fox::domain::bean::OprecRecord
 */
export class OprecRecord {
  claimNumber = 0;
  pacsId = 0;
  insuredState = '';
  assignInd = '';
  assigneeProviderKey = 0;
  splitClaimInd = '';
  checkSeries = 0;
  checkDate = new Date();
  payAdjustAmt = 0;
  checkNumber = '';
  checkAmount = 0;
  assignPayAdjustAmt = 0;
  assignCheckNumber = '';
  assignCheckAmount = 0;
  bulkCheckAmount = 0;
  bulkIndicator = '';
  providerCheckSeries = 0;
  insuredOutputId = '';
  eobSortInd = '';
  providerOutputId = '';
  recTypeByte1 = '';
  recTypeByte2 = '';
  buwRefundInd = '';
  buwInd = '';
  extendHoldElig = '';
  complianceDate = new Date();
  rlseReason = '';
  supprInd = '';
  fundsAvailDate = new Date();
  achInd = '';
  replaceTo = '';
  eobSequenceNo = 0;
  eobPageNo = 0;
}
