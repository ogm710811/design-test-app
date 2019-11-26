import {ClaimNumberFile, Di82100Linkage, EligibilityIoArea, OprecRecord, QualityInfoRecord} from '@fox/shared';

/**
 * Model class WorkStorage
 * Path: screenbean/qltyrvwrvlderrmnt
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyRvwRvldErrMnt::WorkStorage
 */
export class WorkStorage {
  finishDi821 = '';
  blankSw = '';
  linkageSwitch = '';
  claimAwaitingQualOrRev = '';
  invalidErrorCode = '';
  commandEnteredInd = '';
  holdSuspReason = '';
  qualInfoNotFound = '';
  errorFound = '';
  mapSaveArea = '';
  invalidIons = '';
  operatorNotFound = '';
  cioInsuredFirstName = '';
  cioInsuredMi = '';
  cioInsuredSurname = '';
  ceTsqResponse = 0;
  wsHoldMnAcct = 0;
  wsHoldMnAssoc = 0;
  wsHoldMnInsd = 0;
  inSub = 0;
  outSub = 0;
  workSub = 0;
  holdAreaInput = '';
  holdAreaOutput = '';
  searchIons = 0;
  screenClaimNumberHold = 0;
  wsHoldIonsGroup = 0;
  wsHoldSequenceNumber = 0;
  leftJustify: string[] = [];
  wsErrorFieldPos1 = '';
  wsErrorFieldPos2 = '';
  sub = 0;
  cntErrors = 0;
  sub1 = 0;
  oprecRecord = new OprecRecord();
  eligibilityIoArea = new EligibilityIoArea();
  claimNumberFile = new ClaimNumberFile();
  qualityInfoRecord = new QualityInfoRecord();
  holdAreaOutputArray: string[] = [];
  di82100Linkage = new Di82100Linkage();
}
