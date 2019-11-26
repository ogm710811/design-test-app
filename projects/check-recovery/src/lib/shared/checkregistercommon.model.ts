/**
 * Model class CheckRegisterCommon
 * Path: screenbean/checkregister
 * Model: com::uhc::aarp::fox::domain::screenbean::checkregister::CheckRegisterCommon
 */
export class CheckRegisterCommon {
  commonSystemIdentifier = '';
  entryPoint = '';
  bulkInd = false;
  commonSeriesReadReturnInd = false;
  commonExtensionExistsInd = false;
  transferredFromBrowse = false;
  securityOk = false;
  systemOk = false;
  message = '';
  operatorId = '';
  goToCheckScreen = false;
  // issueDate = new Date();
  checkSeries = '';
  checkNumber = 0;
  claimBatchNumber = '';
  acctAssoc = 0;
  bulkIndicator = 0;
  replacementAuthorizeInd = '';
  voidInd = '';
  notationOrigin = '';
  replaceVoidFlag = '';
  authorizeFlag = '';
  checkStatusIndicator = '';
  depositSuspClearCode = '';
}
