/**
 * Model class WsIndicatorFields
 * Path: screenbean/qltyrvwrvlderrrvw
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvlderrrvw::WsIndicatorFields
 * Legacy Mapping: WS-INDICATOR-FIELDS
 */
export class WsIndicatorFields {
  aixIonsInd = '';
  errorFoundInd = '';
  ionsFoundInd = '';
  ionsDateEofInd = '';
  brsSuccessInd = '';

  public isAixIons(): boolean {
    return this.aixIonsInd.trim() === 'Y';
  }

  public setAixIons(): void {
    this.aixIonsInd = 'Y';
  }

  public isErrorFound(): boolean {
    return this.errorFoundInd.trim() === 'Y';
  }

  public setErrorFound(): void {
    this.errorFoundInd = 'Y';
  }

  public isIonsFound(): boolean {
    return this.ionsFoundInd.trim() === 'Y';
  }

  public setIonsFound(): void {
    this.ionsFoundInd = 'Y';
  }

  public isIonsDateEof(): boolean {
    return this.ionsDateEofInd.trim() === 'Y';
  }

  public setIonsDateEof(): void {
    this.ionsDateEofInd = 'Y';
  }

  public isBrsSuccess(): boolean {
    return this.brsSuccessInd.trim() === 'Y';
  }

  public setBrsSuccess(): void {
    this.brsSuccessInd = 'Y';
  }
}
