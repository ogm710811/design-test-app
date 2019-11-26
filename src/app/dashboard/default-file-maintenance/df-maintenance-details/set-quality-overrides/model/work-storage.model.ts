import { ComSetQualityInfo } from './com-set-quality-info.model';
import { LtrsFields } from './ltrs-fields.model';
import { SortFields } from './sort-fields.model';
import { SortMsgFields } from './sort-msg-fields.model';
import { Sort20Fields } from './sort20-fields.model';
import { ValidLocationsTable } from './valid-locations-table.model';

/**
 * Model class WorkStorage
 * Path: screenbean/setqltyovrd
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltyovrd::WorkStorage
 */
export class WorkStorage {
  sub = 0;
  exclSub = 0;
  locSub = 0;
  totalExclLocations = 0;
  sub1 = 0;
  sub2 = 0;
  sub3 = 0;
  sub4 = 0;
  sortCtr1 = 0;
  sortCtr2 = 0;
  msgCount = 0;
  cautCount = 0;
  ltrsCount = 0;
  locCount = 0;
  formatSwitch1 = '';
  formatSwitch2 = '';
  formatErrorSwitch = '';
  nonAssignHospSw = '';
  nonAssignSw = '';
  assignSw = '';
  assignHospSw = '';
  warningSw = '';
  osaIndicator = '';
  thisCvRecFoundInd = '';
  locationFoundInd = '';
  excludedLocationInd = '';
  anyCvRecFoundInd = '';
  decimalErrorInd = '';
  wholeErrorInd = '';
  endOfFormatInd = '';
  typeOfPercentInd = '';
  zeroNumberInd = '';
  firstDLocationInd = '';
  rpdiskdmEofInd = '';
  ioRec = '';
  vkeyRecType = '';
  vkeyMenuSelection = '';
  vkeyMenuType = '';
  vkeyMenuValue = '';
  okeyRecType = '';
  okeyValue = '';
  wsResponseCode = 0;
  wsIonsP = 0;
  wsFileName = '';
  wsRecordAccessed = '';
  holdDivision = '';
  holdLocation = '';
  holdExclLocs = '';
  wsUnpackAmt = 0;
  wsUnpackMsg = 0;
  wsUnpackIons = 0;
  wsMaintIons = 0;
  warningCt = 0;
  holdMsg = 0;
  wsHoldPct = 0;
  holdTblPct = '';
  holdTblNo = '';
  holdLtrsNo = '';
  lespaRecLen = 0;
  lespaLength = 0;
  rbaFld = 0;
  holdVerifRecord = '';
  messageNum = 0;
  messageLangInd = '';
  wsPctFirst = '';
  wsPctLast = '';
  wsJrlVarKey = '';
  screenAmount = '';
  formatAmount = '';
  holdRecordPct = 0;
  holdDeci1 = '';
  holdDeci2 = '';
  holdDeci3 = '';
  holdDeci4 = '';
  ltrsFields: LtrsFields[] = [];
  sort20Fields: Sort20Fields[] = [];
  wsDateArea = '';
  storePercentPct = '';
  storePercentPctR = '';
  workPercent = '';
  formatWorkPct = '';
  wsDisplayWholePct = '';
  wsMapPct = '';
  wsCheckPercent = '';
  dummyUnpackPct = '';
  wsWorkPct = 0;
  mapWorkPct = '';
  formatWorkPct12 = '';
  formatWorkPct345 = '';
  formatWorkPct1 = '';
  formatWorkPct2 = '';
  wsMaintDate = '';
  comSetQualityInfo = new ComSetQualityInfo();
  warningMsgSentSw = '';
  firstMapChangesSw = '';
  validLocationsTable = new ValidLocationsTable();
  lastSetQualityInfo = '';
  comSqVqrPctAny = 0;
  comSqVqrPct2OrMore = 0;
  lastSqVqrPctAny = 0;
  lastSqVqrPct2OrMore = 0;
  maintTermId = '';
  verifSetq1 = '';
  verifSetq2 = '';
  awaitVerifyIons = '';
  awaitVerifyLoc = '';
  awaitOsaIons = '';
  awaitOsaLoc = '';
  maintDeniedIons = '';
  maintDeniedLoc = '';
  warningMsg1 = '';
  sortFields: SortFields[] = [];
  sortMsgFields: SortMsgFields[] = [];
}
