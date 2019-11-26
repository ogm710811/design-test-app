import { StringUtils } from '../../services/string-utils.service';

/**
 * Model class Switches
 * Path: screenbean/setqltytmpltservice
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltytmpltservice::Switches
 * Legacy Mapping: SWITCHES
 */
export class Switches {
  formatSwitch1 = 'N';
  formatSwitch2 = 'N';
  formatErrorSwitch = 'N';
  lastTemplateFoundInd = 'N';
  cntlPassedFrom5o81Ind = '';
  decimalErrorInd = 'N';
  fieldErrorInd = 'N';
  wholeErrorInd = 'N';
  endOfFormatInd = 'N';
  typeOfPercentInd = '';
  zeroNumberInd = 'N';
  skipNotfndHandleInd = 'N';
  theNumberIsGoodInd = 'N';
  wsTempNumFoundInd = 'N';

  public isMovedANumber(): boolean {
    let movedANumber = false;
    let initValue: string = '';
    initValue = 'Y';
    movedANumber = StringUtils.trim(this.formatSwitch1) === initValue;
    return movedANumber;
  }

  public setMovedANumber(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.formatSwitch1 = initValue;
  }

  public isMovedABlank(): boolean {
    let movedABlank = false;
    let initValue: string = '';
    initValue = 'Y';
    movedABlank = StringUtils.trim(this.formatSwitch2) === initValue;
    return movedABlank;
  }

  public setMovedABlank(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.formatSwitch2 = initValue;
  }

  public isFormatError(): boolean {
    let formatError = false;
    let initValue: string = '';
    initValue = 'Y';
    formatError = StringUtils.trim(this.formatErrorSwitch) === initValue;
    return formatError;
  }

  public setFormatError(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.formatErrorSwitch = initValue;
  }

  public isLastTemplateFound(): boolean {
    let lastTemplateFound = false;
    let initValue: string = '';
    initValue = 'Y';
    lastTemplateFound = StringUtils.trim(this.lastTemplateFoundInd) === initValue;
    return lastTemplateFound;
  }

  public setLastTemplateFound(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.lastTemplateFoundInd = initValue;
  }

  public isCntlNotPassedFrom5o81(): boolean {
    let cntlNotPassedFrom5o81 = false;
    let initValue: string = '';
    initValue = 'N';
    cntlNotPassedFrom5o81 = StringUtils.trim(this.cntlPassedFrom5o81Ind) === initValue;
    return cntlNotPassedFrom5o81;
  }

  public setCntlNotPassedFrom5o81(): void {
    let initValue: string = '';
    initValue = 'N';
    this.cntlPassedFrom5o81Ind = initValue;
  }

  public isCntlPassedFrom5o81(): boolean {
    let cntlPassedFrom5o81 = false;
    let initValue: string = '';
    initValue = 'Y';
    cntlPassedFrom5o81 = StringUtils.trim(this.cntlPassedFrom5o81Ind) === initValue;
    return cntlPassedFrom5o81;
  }

  public setCntlPassedFrom5o81(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.cntlPassedFrom5o81Ind = initValue;
  }

  public isDecimalError(): boolean {
    let decimalError = false;
    let initValue: string = '';
    initValue = 'Y';
    decimalError = StringUtils.trim(this.decimalErrorInd) === initValue;
    return decimalError;
  }

  public setDecimalError(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.decimalErrorInd = initValue;
  }

  public isFieldError(): boolean {
    let fieldError = false;
    let initValue: string = '';
    initValue = 'Y';
    fieldError = StringUtils.trim(this.fieldErrorInd) === initValue;
    return fieldError;
  }

  public setFieldError(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.fieldErrorInd = initValue;
  }

  public isWholeError(): boolean {
    let wholeError = false;
    let initValue: string = '';
    initValue = 'Y';
    wholeError = StringUtils.trim(this.wholeErrorInd) === initValue;
    return wholeError;
  }

  public setWholeError(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.wholeErrorInd = initValue;
  }

  public isNotEndOfFormat(): boolean {
    let notEndOfFormat = false;
    let initValue: string = '';
    initValue = 'N';
    notEndOfFormat = StringUtils.trim(this.endOfFormatInd) === initValue;
    return notEndOfFormat;
  }

  public setNotEndOfFormat(): void {
    let initValue: string = '';
    initValue = 'N';
    this.endOfFormatInd = initValue;
  }

  public isEndOfFormat(): boolean {
    let endOfFormat = false;
    let initValue: string = '';
    initValue = 'Y';
    endOfFormat = StringUtils.trim(this.endOfFormatInd) === initValue;
    return endOfFormat;
  }

  public setEndOfFormat(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.endOfFormatInd = initValue;
  }

  public isWholePercent(): boolean {
    let wholePercent = false;
    let initValue: string = '';
    initValue = 'W';
    wholePercent = StringUtils.trim(this.typeOfPercentInd) === initValue;
    return wholePercent;
  }

  public setWholePercent(): void {
    let initValue: string = '';
    initValue = 'W';
    this.typeOfPercentInd = initValue;
  }

  public isDecimalPercent(): boolean {
    let decimalPercent = false;
    let initValue: string = '';
    initValue = 'D';
    decimalPercent = StringUtils.trim(this.typeOfPercentInd) === initValue;
    return decimalPercent;
  }

  public setDecimalPercent(): void {
    let initValue: string = '';
    initValue = 'D';
    this.typeOfPercentInd = initValue;
  }

  public isNumberIsZeros(): boolean {
    let numberIsZeros = false;
    let initValue: string = '';
    initValue = 'Y';
    numberIsZeros = StringUtils.trim(this.zeroNumberInd) === initValue;
    return numberIsZeros;
  }

  public setNumberIsZeros(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.zeroNumberInd = initValue;
  }

  public isSkipNotfndHandle(): boolean {
    let skipNotfndHandle = false;
    let initValue: string = '';
    initValue = 'Y';
    skipNotfndHandle = StringUtils.trim(this.skipNotfndHandleInd) === initValue;
    return skipNotfndHandle;
  }

  public setSkipNotfndHandle(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.skipNotfndHandleInd = initValue;
  }

  public isTheNumberIsGood(): boolean {
    let theNumberIsGood = false;
    let initValue: string = '';
    initValue = 'Y';
    theNumberIsGood = StringUtils.trim(this.theNumberIsGoodInd) === initValue;
    return theNumberIsGood;
  }

  public setTheNumberIsGood(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.theNumberIsGoodInd = initValue;
  }

  public isWsTempNumFound(): boolean {
    let wsTempNumFound = false;
    let initValue: string = '';
    initValue = 'Y';
    wsTempNumFound = StringUtils.trim(this.wsTempNumFoundInd) === initValue;
    return wsTempNumFound;
  }

  public setWsTempNumFound(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.wsTempNumFoundInd = initValue;
  }
}
