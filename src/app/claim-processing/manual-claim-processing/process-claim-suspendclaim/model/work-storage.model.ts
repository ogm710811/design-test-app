import {WsEMRMicroflmKey} from './ws-emrmicroflm-key.model';

/**
 * Model class WorkStorage
 * Path: screenbean/procclmsuspendclm
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmsuspendclm::WorkStorage
 */
export class WorkStorage {
  commandEnteredInd = '';
  sub = 0;
  sub1 = 0;
  sub2 = 0;
  wsProgram = '';
  holdDate = 0;
  saveMicroLocationNo = 0;
  saveSequenceNum = 0;
  saveSeqNum = 0;
  microfilmNumFlag = '';
  reqMicroJulianDate = 0;
  wsTempLocations = 0;
  wsCrf1INum = 0;
  reqMicroYy1 = 0;
  reqMicroYy2 = 0;
  reqMicroDd = 0;
  wsJulDateFiller = 0;
  wsJulDate5 = 0;
  requestedMicroflmJulianDate = 0;
  requestedMicroflmLocationNo = 0;
  requestedMicroflmCartridge = 0;
  holdClmJulDay1 = '';
  filler2 = '';
  leapYy1 = 0;
  leapYy2 = 0;
  wsCurrDateY1 = 0;
  wsCurrDateY2 = 0;
  wsGregMm = 0;
  wsGregDd = 0;
  wsGregYy = 0;
  wsJulDate = '';
  daysToSubtract = 0;
  signedJulDays = 0;
  subYear = 0;
  subMonth = 0;
  wsQuotient = 0;
  wsRemainder = 0;
  filler4 = '';
  filler5 = '';
  endDays: number[] = [];
  wsEMRMicroflmKey = new WsEMRMicroflmKey();
}
