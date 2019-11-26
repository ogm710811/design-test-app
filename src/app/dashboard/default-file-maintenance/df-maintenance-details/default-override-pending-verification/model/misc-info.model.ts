import { SelectionInfo } from './selection-info.model';
import { WsLevelPosition } from './ws-level-position.model';

/**
 * Model class MiscInfo
 * Path: screenbean/dfltovrdpendverfservice
 * Model: com::uhc::aarp::fox::domain::screenbean::dfltovrdpendverfservice::MiscInfo
 * Legacy Mapping: MISC-INFO
 */
export class MiscInfo {
  ind = '';
  fieldInd = '';
  siteSecurity = '';
  selectInd = '';
  divInd = '';
  locInd = '';
  fileIoCond = '';
  fileIoMsg = '';
  wsloc = '';
  wsLevelPosition = new WsLevelPosition();
  wsTempNum = '';
  sortFieldHold = '';
  selectJustified = '';
  selectNumeric = 0;
  selectNotJustified = '';
  selectionInfo = new SelectionInfo();
  screenError = '';
  wsTime = '';
  wsDate = '';
  wsStartDate = '';
  wsEndDate = '';
  wsVariableInfo = '';
  wsCautionX = '';
  wsNumberX = '';
  positionValue = '';
  levelValue = '';
  levelMsg = '';
  ionsMsg = '';

  public isValidPosition(): boolean {
    let validPosition = false;
    let cEnableValue_0 = '';
    let cEnableValue_1 = '';
    let cEnableValue_2 = '';
    let cEnableValue_3 = '';
    let cEnableValue_4 = '';
    let cEnableValue_5 = '';
    let cEnableValue_6 = '';
    let cEnableValue_7 = '';
    let cEnableValue_8 = '';
    let cEnableValue_9 = '';
    let cEnableValue_10 = '';
    let cEnableValue_11 = '';
    let cEnableValue_12 = '';
    let cEnableValue_13 = '';
    cEnableValue_0 = '0';
    cEnableValue_1 = '1';
    cEnableValue_2 = '2';
    cEnableValue_3 = '3';
    cEnableValue_4 = '4';
    cEnableValue_5 = '5';
    cEnableValue_6 = '6';
    cEnableValue_7 = '7';
    cEnableValue_8 = '8';
    cEnableValue_9 = '9';
    cEnableValue_10 = 'A';
    cEnableValue_11 = 'B';
    cEnableValue_12 = 'C';
    cEnableValue_13 = 'D';
    validPosition = (cEnableValue_0 === this.positionValue || cEnableValue_1 === this.positionValue || cEnableValue_2 === this.positionValue || cEnableValue_3 === this.positionValue || cEnableValue_4 === this.positionValue || cEnableValue_5 === this.positionValue || cEnableValue_6 === this.positionValue || cEnableValue_7 === this.positionValue || cEnableValue_8 === this.positionValue || cEnableValue_9 === this.positionValue || cEnableValue_10 === this.positionValue || cEnableValue_11 === this.positionValue || cEnableValue_12 === this.positionValue || cEnableValue_13 === this.positionValue);
    return validPosition;
  }

  public setValidPosition(): void {
    let initValue: string = '';
    initValue = '0';
    this.positionValue = initValue;
  }

  public isValidLevel(): boolean {
    let validLevel = false;
    let cEnableValue_0 = '';
    let cEnableValue_1 = '';
    let cEnableValue_2 = '';
    let cEnableValue_3 = '';
    let cEnableValue_4 = '';
    let cEnableValue_5 = '';
    let cEnableValue_6 = '';
    let cEnableValue_7 = '';
    let cEnableValue_8 = '';
    let cEnableValue_9 = '';
    let cEnableValue_10 = '';
    let cEnableValue_11 = '';
    let cEnableValue_12 = '';
    let cEnableValue_13 = '';
    let cEnableValue_14 = '';
    let cEnableValue_15 = '';
    let cEnableValue_16 = '';
    cEnableValue_0 = '00';
    cEnableValue_1 = '02';
    cEnableValue_2 = '03';
    cEnableValue_3 = '04';
    cEnableValue_4 = '05';
    cEnableValue_5 = '06';
    cEnableValue_6 = '07';
    cEnableValue_7 = '08';
    cEnableValue_8 = '09';
    cEnableValue_9 = '10';
    cEnableValue_10 = '11';
    cEnableValue_11 = '12';
    cEnableValue_12 = '20';
    cEnableValue_13 = '28';
    cEnableValue_14 = '60';
    cEnableValue_15 = '77';
    cEnableValue_16 = '78';
    validLevel = (cEnableValue_0 === this.levelValue || cEnableValue_1 === this.levelValue || cEnableValue_2 === this.levelValue || cEnableValue_3 === this.levelValue || cEnableValue_4 === this.levelValue || cEnableValue_5 === this.levelValue || cEnableValue_6 === this.levelValue || cEnableValue_7 === this.levelValue || cEnableValue_8 === this.levelValue || cEnableValue_9 === this.levelValue || cEnableValue_10 === this.levelValue || cEnableValue_11 === this.levelValue || cEnableValue_12 === this.levelValue || cEnableValue_13 === this.levelValue || cEnableValue_14 === this.levelValue || cEnableValue_15 === this.levelValue || cEnableValue_16 === this.levelValue);
    return validLevel;
  }

  public setValidLevel(): void {
    let initValue: string = '';
    initValue = '00';
    this.levelValue = initValue;
  }
}
