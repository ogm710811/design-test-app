
/**
 * Model class WsScreenDate
 * Path: screenbean/qltyrvwrvlderrrvw
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvlderrrvw::WsScreenDate
 * Legacy Mapping: WS-SCREEN-DATE
 */
export class WsScreenDate {
  wsScreenMm = '';
  wsScreenDd = '';
  wsScreenYy = '';

  public stringfy(): string {
    let stringfy = '';
    //
    stringfy = this.wsScreenMm + '/' + this.wsScreenDd + '/' + this.wsScreenYy;
    return stringfy;
  }

  public createFromIntDate(intDate: number): void {
    const strYy = '';
    const strMm = '';
    const strDd = '';
    let stringDate = '';
    //
    stringDate = intDate.toString();

    this.wsScreenYy = stringDate.substring(0, 2);
    this.wsScreenMm = stringDate.substring(2, 4);
    this.wsScreenDd = stringDate.substring(4, 6);
  }
}
