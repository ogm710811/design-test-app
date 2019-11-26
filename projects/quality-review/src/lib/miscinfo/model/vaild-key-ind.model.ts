
/**
 * Model class VaildKeyInd
 * Path: screenbean/qltyrvwrvldmiscinfo
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvldmiscinfo::VaildKeyInd
 * Legacy Mapping: VAILD-KEY-IND
 */
export class VaildKeyInd {
  vaildKeyInd = '';

  public isPf8ValidKey(): boolean {
    let pf8ValidKey = false;
    //
    pf8ValidKey = this.vaildKeyInd === 'Y';
    return pf8ValidKey;
  }

  public setPf8ValidKey(): void {
    //
    this.vaildKeyInd = 'Y';
  }

  public isPf8InvalidKey(): boolean {
    let pf8InvalidKey = false;
    //
    pf8InvalidKey = this.vaildKeyInd === 'N';
    return pf8InvalidKey;
  }

  public setPf8InvalidKey(): void {
    //
    this.vaildKeyInd = 'N';
  }
}
