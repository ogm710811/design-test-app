
/**
 * Model class WsIndicatorFields
 * Path: screenbean/qltyrvwrvlderrrvw
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvlderrrvw::WsIndicatorFields
 * Legacy Mapping: WS-INDICATOR-FIELDS
 */
export class WsIndicatorFields {
  endOfFileInd = '';
  endPageInd = '';
  errorFoundInd = '';
  brsSuccessInd = '';
  clearKeyInd = '';

  public isEndOfFile(): boolean {
    let endOfFile = false;
    //
    endOfFile = 'Y' === this.endOfFileInd.trim();
    return endOfFile;
  }

  public setEndOfFile(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.endOfFileInd = initValue;
  }

  public isEndPage(): boolean {
    let endPage = false;
    //
    endPage = 'Y' === this.endPageInd.trim();
    return endPage;
  }

  public setEndPage(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.endPageInd = initValue;
  }

  public isErrorFound(): boolean {
    let errorFound = false;
    //
    errorFound = 'Y' === this.errorFoundInd.trim();
    return errorFound;
  }

  public setErrorFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.errorFoundInd = initValue;
  }

  public isBrsSuccess(): boolean {
    let brsSuccess = false;
    //
    brsSuccess = 'Y' === this.brsSuccessInd.trim();
    return brsSuccess;
  }

  public setBrsSuccess(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.brsSuccessInd = initValue;
  }

  public isClearKey(): boolean {
    let clearKey = false;
    //
    clearKey = 'Y' === this.clearKeyInd.trim();
    return clearKey;
  }

  public setClearKey(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.clearKeyInd = initValue;
  }
}
