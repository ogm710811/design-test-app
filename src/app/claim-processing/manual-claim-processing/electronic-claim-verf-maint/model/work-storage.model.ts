import {AdminDbaseErrorLine} from './admin-dbase-error-line.model';
import {CommLenErrMsg} from './comm-len-err-msg.model';
import {ExClaimNumberSeg} from './ex-claim-number-seg.model';
import {LastClaimInfoLine} from './last-claim-info-line.model';
import {LastClaimRnfCorresInfo} from './last-claim-rnf-corres-info.model';
import {ScreenHicNumber} from './screen-hic-number.model';
import {ScreenRrHic1} from './screen-rr-hic1.model';
import {ScreenRrHic2} from './screen-rr-hic2.model';
import {ScreenRrHic3} from './screen-rr-hic3.model';
import {ScreenRrHic4} from './screen-rr-hic4.model';
import {ScreenRrHic5} from './screen-rr-hic5.model';
import {ScreenRrHic6} from './screen-rr-hic6.model';
import {WsApprovTable} from './ws-approv-table.model';
import {WsChargeTable} from './ws-charge-table.model';
import {WsDeductTable} from './ws-deduct-table.model';
import {WsErrorMsgGroup} from './ws-error-msg-group.model';
import {WsHicNumberPositions} from './ws-hic-number-positions.model';
import {WsInelTable} from './ws-inel-table.model';
import {WsPaidTable} from './ws-paid-table.model';

/**
 * Model class WorkStorage
 * Path: screenbean/ecverfmnt
 * Model: com::uhc::aarp::fox::domain::screenbean::ecverfmnt::WorkStorage
 * Legacy Mapping: WS-COMP-FIELDS
 */
export class WorkStorage {
  subYear = 0;
  subMonth = 0;
  sub1 = 0;
  sub2 = 0;
  sub3 = 0;
  sub4 = 0;
  mcnSub = 0;
  subErrorTable = 0;
  subErrLine = 0;
  map44ErrorCodeCount = 0;
  map45ErrorCodeCount = 0;
  map49ErrorCodeCount = 0;
  dependCntr = 0;
  subAdminRecords = 0;
  subBillLines = 0;
  rbaFld = 0;
  browseHicRLength = 0;
  browseHicKLength = 0;
  userIdComp = 0;
  wsRespCode = 0;
  wsNumFieldsChanged = 0;
  wsReplyInd = '';
  wsSequenceNo = 0;
  wsEccClaimNumber = '';
  wsCategoryInd = '';
  wsDate = '';
  wsYearDivide = 0;
  wsLeapChk = 0;
  wsSplitDate = 0;
  wsBlToDate = '';
  wsBlFromDate = '';
  wsStoreToDate = '';
  wsStoreFromDate = '';
  wsTotalBlInelRecalc = 0;
  wsTotalBlPaidRecalc = 0;
  wsTotalBlDeductRecalc = 0;
  wsTotalBlAppRecalc = 0;
  wsTotalBlChargedRecalc = 0;
  totAmtChargedErrCount = 0;
  totAmtAppErrCount = 0;
  totAmtDeductErrCount = 0;
  totAmtPaidErrCount = 0;
  totAmtIneligErrCount = 0;
  holdInsuredType = '';
  saveInsuredType = '';
  saveAssoc = '';
  adminInsRecCount = 0;
  mismatchInd = '';
  allNines = 0;
  adminDbaseSex = '';
  rpdiskpbKey = '';
  unpacClaimNumber = 0;
  unpacMembNo = 0;
  wsEcCarIons = 0;
  wsClaimTotal = 0;
  userId = 0;
  browseHicKeyR = '';
  screenHicNumber = new ScreenHicNumber();
  wsHicNumberPositions = new WsHicNumberPositions();
  screenRrHic1 = new ScreenRrHic1();
  screenRrHic2 = new ScreenRrHic2();
  screenRrHic3 = new ScreenRrHic3();
  screenRrHic4 = new ScreenRrHic4();
  screenRrHic5 = new ScreenRrHic5();
  screenRrHic6 = new ScreenRrHic6();
  screenHicType = '';
  wsSequenceNum = 0;
  wsHicType = '';
  validCharInd = '';
  compressErrorInd = '';
  wsCrossReferenceNum = 0;
  membershipId = '';
  wsHnrAccountNumber = '';
  wsHnrAssociation = '';
  wsHnrInsuredCode = '';
  claimNumber = 0;
  claimSplit = 0;
  wsLeadZero = '';
  wsError = '';
  adminInsSurname = '';
  filler2 = '';
  adminInsFirstInitial = '';
  filler3 = '';
  browseHicSsn = 0;
  browseHicSuffix = '';
  quotient = 0;
  mult = 0;
  prime = 0;
  remain = 0;
  binAns = 0;
  ans1 = 0;
  resultThreePos = 0;
  resultFourPos = 0;
  deisRxInd = '';
  partAClaimInd = '';
  fekHipClaimInd = '';
  hicNumberErrorInd = '';
  accountNumberErrorInd = '';
  lastNameErrorInd = '';
  finitErrorInd = '';
  sexCodeErrorInd = '';
  dateErrorInd = '';
  ineligCodeErrorInd = '';
  servTypeFoundInd = '';
  servPlaceFoundInd = '';
  servTypeErrorInd = '';
  servPlaceErrorInd = '';
  percentPaidErrorInd = '';
  totalChargeErrorInd = '';
  totalApprovErrorInd = '';
  totalDeductErrorInd = '';
  totalPaidErrorInd = '';
  servToDateErrorInd = '';
  servFromDateErrorInd = '';
  compDateInd = '';
  noBlFromDateErrors = '';
  noBlToDateErrors = '';
  noBlFromGtToDateErrors = '';
  noBlPlaceErrorsInd = '';
  correctInsuredInd = '';
  insCodeValuedInd = '';
  nameMismatchInd = '';
  nameMatchInd = '';
  sexMismatchInd = '';
  sexMatchInd = '';
  insCodeMatchInd = '';
  noMoreMatchInd = '';
  hicMatchFoundInd = '';
  recommendedDeleteInd = '';
  hicAcctFoundInd = '';
  accountFoundInd = '';
  matchFoundInd = '';
  dependentTsqReadInd = '';
  recordChangedInd = '';
  replyInd = '';
  clearPressedInd = '';
  qualityInd = '';
  servicePlaceValues = '';
  alphanumericInd = '';
  read1Ind = '';
  read2Ind = '';
  luwInd = '';
  wsTempLocations = 0;
  wsRespDisplay = 0;
  rpfyResponse = 0;
  wsResp = 0;
  wsRegionName = '';
  wsGregDate = '';
  wsJulDate = 0;
  wsQuotient = 0;
  wsRemainder = 0;
  ceTsqResponse = 0;
  ceTsqItem = 0;
  wsTsqItem = 0;
  wsChargeTables: WsChargeTable[] = [];
  wsApprovTables: WsApprovTable[] = [];
  wsDeductTables: WsDeductTable[] = [];
  wsPaidTables: WsPaidTable[] = [];
  wsInelTables: WsInelTable[] = [];
  wsEccVerifiersIonsid = 0;
  wsEccStatusInd = '';
  wsEccVerifyComment = '';
  wsEccCrossReference = 0;
  wsEccCrossReferenceX = '';
  wsEccUtilizationReviewInd = '';
  wsEccFekClaimIndicator = '';
  wsEccVerificationDate = 0;
  wsEccVerifRnfDate = 0;
  wsEccVerifRnfInd = '';
  wsEccVerifRnfStatus = '';
  wsEccVerifRnfTime = 0;
  adminDbaseErrorLine = new AdminDbaseErrorLine();
  lastClaimInfoLine = new LastClaimInfoLine();
  lastClaimRnfCorresInfo = new LastClaimRnfCorresInfo();
  commLenErrMsg = new CommLenErrMsg();
  wsErrorMsgGroup = new WsErrorMsgGroup();
  lastClaimNumber = '';
  exClaimNumberSeg = new ExClaimNumberSeg();
}
