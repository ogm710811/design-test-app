/**
 * Model class WsPgmTsqRec
 * Path: screenbean/rvwblmessages
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwblmessages::WsPgmTsqRec
 * Legacy Mapping: WS-PGM-TSQ-REC
 */
export class WsPgmTsqRec {
  t1ReturnModule = '';
  t1CallFromId = '';
  t1ProcessingInd = '';
  t1MbrId = '';
  t1ClaimId = '';
  t1UctranstSaved = 0;
  t1LinkLen = 0;
  t1CurrScreen = 0;
  t1TotalScreens = 0;
  t1SaveScreen = '';

  public setT1CallFromEob(): void {
    let initValue: string = '';
    initValue = 'EOB';
    this.t1CallFromId = initValue;
  }

  public setT1CallFromRch(): void {
    let initValue: string = '';
    initValue = 'RCH';
    this.t1CallFromId = initValue;
  }

  public setT1CallFromQr(): void {
    let initValue: string = '';
    initValue = 'QR ';
    this.t1CallFromId = initValue;
  }
}
