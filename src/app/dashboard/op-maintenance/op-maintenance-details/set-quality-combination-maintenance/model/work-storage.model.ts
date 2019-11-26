import { CompressTable } from './compress-table.model';

/**
 * Model class WorkStorage
 * Path: screenbean/setqltycomb
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltycomb::WorkStorage
 * Legacy Mapping: MISCL-LENGTHS
 */
export class WorkStorage {
  journalRecLen = 0;
  messageKey = 0;
  wsPalsKey = 0;
  paraLtrNo = '';
  sub = 0;
  row = 0;
  wsRowCount = 0;
  rbaFld = 0;
  sortCtr1 = 0;
  sortCtr2 = 0;
  totRecCount = 0;
  screenError = '';
  compressInd = '';
  protectFieldsInd = '';
  wsReformatIons = 0;
  wsNumber = 0;
  wsPackField = 0;
  wsPackDate = 0;
  wsStartDate = '';
  wsEndDate = '';
  refDate = '';
  displayDate = '';
  holdYearCalc = 0;
  fieldInd = '';
  compressTable = new CompressTable();
  operItemIndicator = '';
  wsIons = 0;
  hold3 = 0;
  hold2 = 0;
  wsVarIonsid = 0;
  searchOperLevel = 0;
  searchOperPos = '';
  trnCompleted = '';
}
