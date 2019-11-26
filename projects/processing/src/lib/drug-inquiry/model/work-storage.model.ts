
/**
 * Model class WorkStorage
 * Path: screenbean/druginquiry
 * Model: com::uhc::aarp::fox::domain::screenbean::druginquiry::WorkStorage
 * Legacy Mapping: WORK-AREAS
 */
export class WorkStorage {
  commandEnteredInd = '';
  yearDivide = 0;
  leapChk = 0;
  screenDrugStr = 0;
  wsResp = 0;
  linkResp = 0;
  sub1 = 0;
  sub2 = 0;
  sub3 = 0;
  nnSub = 0;
  ctr1 = 0;
  wsStrengthLiteral = '';
  wsUnitLiteral = '';
  wsDateFmtLit = '';
  editReturnCode = '';
  leftFields = 0;
  validLeftFieldLen = 0;
  posAfterDecimal = 0;
  inputFieldLen = 0;
  editSub = 0;
  outputSub = 0;
  saveSub = 0;
  compressSub = 0;
  sqlErrorCode = 0;
  sqlErrorMsg = '';
  workDateYy = 0;
  workDateMm = 0;
  workDateDd = 0;
  decimalInd = '';
  validCharInd = '';
  compressErrorInd = '';
  dosSpaceInd = '';
  dateErrorInd = '';
  ndcErrorFoundInd = '';
  nameErrorFoundInd = '';
  nonNumericFoundInd = '';
  mapCommandLine = '';
  screenNamePos: string[] = [];
  WorkDate = '';
  errorMessages: string[] = [];
  outputFields: string[] = [];
  editFields: string[] = [];
  screenNdc = '';
  inputFields: string[] = [];
  editFields11 = 0;
}
