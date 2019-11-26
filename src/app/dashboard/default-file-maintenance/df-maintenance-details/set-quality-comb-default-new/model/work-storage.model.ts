import { OperDfltSetQltyOvSetQualityCombinationBO } from '../../common/bos/oper-dflt-set-qlty-ov-set-quality-combination-bo.model';
import { OperJobFuncNmPO } from '../../common/pos/oper-job-func-nm-po.model';
import { CompressTable } from './compress-table.model';

/**
 * Model class WorkStorage
 * Path: screenbean/setqltycombdflt
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltycombdflt::WorkStorage
 */
export class WorkStorage {
  journalRecLen = 0;
  wsResponseCode = 0;
  wsRpdiskqbKeyType2 = '';
  wsRpdiskqbKeyType1 = '';
  wsRpdiskqbTypeCode = '';
  qbErrorMsg = '';
  qbErrorCode = 0;
  sub1 = 0;
  sub = 0;
  sub2 = 0;
  searchOperPos = '';
  searchOperLevel = 0;
  dispDd = 0;
  dispMm = 0;
  dispYy = 0;
  lastDays: number[] = [];
  hold3 = 0;
  hold2 = 0;
  screenError = '';
  compressInd = '';
  wsReformatIons = 0;
  wsNumber = 0;
  wsNumR = '';
  wsPackField = 0;
  wsPackDate = 0;
  refDatemm = '';
  lastDayOfTheMonth = '';
  holdYearCalc = 0;
  returnStatus = '';
  errorSwitch = '';
  subType = '';
  fieldInd = '';
  wsJournalAddInd = '';
  formatSwitch2 = '';
  numberCheckSw = '';
  formatErrorSwitch = '';
  sendWarningMsg = '';
  dummyVerifRecord = '';
  operItemIndicator = '';
  wsIons = 0;
  wsMaint6Ions = 0;
  wsMaint6Loc = 0;
  wsMaint7Loc = 0;
  wsMaint7Ions = 0;
  wsMaint6OsaLoc = 0;
  wsMaint6OsaIons = 0;
  wsPackYy = 0;
  wsPackDd = 0;
  wsPackMm = 0;
  wsJrnlVarKey = '';
  row = 0;
  wsRowCount = 0;
  refDatedd = '';
  refDateyy = '';
  wsStartDateMm = '';
  wsStartDateDd = '';
  wsStartDateYy = '';
  wsEndDateMm = '';
  wsEndDateDd = '';
  wsEndDateYy = '';
  compresstable: CompressTable[] = [];
  firstTimeReadRec = '';
  commsavetermid = '';
  commsavepos = 0;
}
