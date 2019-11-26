import {StringUtils} from '../../services/string-utils.service';
/**
 * Model class WsNpiLinkarea
 * Path: screenbean/procclmhhcoohfgncov
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmhhcoohfgncov::WsNpiLinkarea
 * Legacy Mapping: WS-NPI-LINKAREA
 */
export class WsNpiLinkarea {
  npiCallingPgm = '';
  npiReturnCode = '';
  npiErrorInfo = '';
  filler1 = '';
  npiNumber = '';
  npiProvName = '';

  public isNpiNormal(): boolean {
    let npiNormal = false;
    let initValue: string = '';
    initValue = '0';
    npiNormal = StringUtils.trim(this.npiReturnCode) === initValue;
    return npiNormal;
  }

  public setNpiNormal(): void {
    let initValue: string = '';
    initValue = '0';
    this.npiReturnCode = initValue;
  }

  public isNpiNotOpen(): boolean {
    let npiNotOpen = false;
    let initValue: string = '';
    initValue = '7';
    npiNotOpen = StringUtils.trim(this.npiReturnCode) === initValue;
    return npiNotOpen;
  }

  public setNpiNotOpen(): void {
    let initValue: string = '';
    initValue = '7';
    this.npiReturnCode = initValue;
  }

  public isNpiNotFound(): boolean {
    let npiNotFound = false;
    let initValue: string = '';
    initValue = '8';
    npiNotFound = StringUtils.trim(this.npiReturnCode) === initValue;
    return npiNotFound;
  }

  public setNpiNotFound(): void {
    let initValue: string = '';
    initValue = '8';
    this.npiReturnCode = initValue;
  }

  public isNpiError(): boolean {
    let npiError = false;
    let initValue: string = '';
    initValue = '9';
    npiError = StringUtils.trim(this.npiReturnCode) === initValue;
    return npiError;
  }

  public setNpiError(): void {
    let initValue: string = '';
    initValue = '9';
    this.npiReturnCode = initValue;
  }
}
