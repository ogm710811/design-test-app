import {NameWorkArea} from './name-work-area.model';

/**
 * Model class WorkStorage
 * Path: screenbean/operinfo
 * Model: com::uhc::aarp::fox::domain::screenbean::OperInfo::WorkStorage
 * Legacy Mapping: SWITCHES
 */
export class WorkStorage {
  titleFoundSw = '';
  nameSwitch = '';
  invalidDateSw = '';
  protectFieldsInd = '';
  positionCodeInd = '';
  charFound = '';
  onlyNameChange = '';
  wsLesSecError = '';
  lesDefNf = '';
  sub = 0;
  nameWorkAreas: NameWorkArea[] = [];
  wsLocation = 0;
  wsTitleCode = 0;
  wsPosition = 0;
  yearDivide = 0;
  leapChk = 0;
  wsFileName = '';
  rbaFld = 0;
  wsLevel = 0;
  wsIons = 0;
  wsIonsP = 0;
  wsResponseCode = 0;
  operItemIndicator = '';
  searchOperLevel = 0;
  searchOperPos = '';
  wsAuthRecKey = '';
  wsAuthRecNum = 0;
  wsDefaultInd = '';
  wsAuthLevel = '';
  wsDefaultPos = '';
  recordType = '';
  lvlPstn = '';

  public setLastName(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.nameSwitch = initValue;
  }

  public setInvalidDate(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.invalidDateSw = initValue;
  }

  public setProtectFields(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.protectFieldsInd = initValue;
  }

  }
