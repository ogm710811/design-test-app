import { BinNumFuncRed } from './bin-num-func-red.model';
import { BinNumRcodeRed } from './bin-num-rcode-red.model';
import { EibFn } from './eib-fn.model';
import { PgmErrorLine } from './pgm-error-line.model';

/**
 * Model class WsErrorFields
 * Path: screenbean/qltyrvwrvlderrrvw
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvlderrrvw::WsErrorFields
 * Legacy Mapping: WS-ERROR-FIELDS
 */
export class WsErrorFields {
  funcInd = '';
  binNumHighByte = 0;
  binNumFunc = 0;
  binNumFuncRed = new BinNumFuncRed();
  binNumRcode = 0;
  binNumRcodeRed = new BinNumRcodeRed();
  eibFn = new EibFn();
  pgmErrorLine = new PgmErrorLine();
  theHighByte = '';
  rcErrorByte = '';

  public isFctCommand(): boolean {
    let fctCommand = false;
    //
    fctCommand = 6 === this.binNumHighByte;
    return fctCommand;
  }

  public setFctCommand(): void {
    let initValue: number = 0;
    //
    initValue = Number(6);
    //
    this.binNumHighByte = initValue;
  }

  public isFRead(): boolean {
    let fRead = false;
    //
    fRead = 2 === this.binNumFunc;
    return fRead;
  }

  public setFRead(): void {
    let initValue: number = 0;
    //
    initValue = Number(2);
    //
    this.binNumFunc = initValue;
  }

  public isFWrite(): boolean {
    let fWrite = false;
    //
    fWrite = 4 === this.binNumFunc;
    return fWrite;
  }

  public setFWrite(): void {
    let initValue: number = 0;
    //
    initValue = Number(4);
    //
    this.binNumFunc = initValue;
  }

  public isFRewrite(): boolean {
    let fRewrite = false;
    //
    fRewrite = 6 === this.binNumFunc;
    return fRewrite;
  }

  public setFRewrite(): void {
    let initValue: number = 0;
    //
    initValue = Number(6);
    //
    this.binNumFunc = initValue;
  }

  public isFDelete(): boolean {
    let fDelete = false;
    //
    fDelete = 8 === this.binNumFunc;
    return fDelete;
  }

  public setFDelete(): void {
    let initValue: number = 0;
    //
    initValue = Number(8);
    //
    this.binNumFunc = initValue;
  }

  public isRcDsiderr(): boolean {
    let rcDsiderr = false;
    //
    rcDsiderr = 1 === this.binNumRcode;
    return rcDsiderr;
  }

  public setRcDsiderr(): void {
    let initValue: number = 0;
    //
    initValue = Number(1);
    //
    this.binNumRcode = initValue;
  }

  public isRcIllogic(): boolean {
    let rcIllogic = false;
    //
    rcIllogic = 2 === this.binNumRcode;
    return rcIllogic;
  }

  public setRcIllogic(): void {
    let initValue: number = 0;
    //
    initValue = Number(2);
    //
    this.binNumRcode = initValue;
  }

  public isRcInvreq(): boolean {
    let rcInvreq = false;
    //
    rcInvreq = 8 === this.binNumRcode;
    return rcInvreq;
  }

  public setRcInvreq(): void {
    let initValue: number = 0;
    //
    initValue = Number(8);
    //
    this.binNumRcode = initValue;
  }

  public isRcNotopen(): boolean {
    let rcNotopen = false;
    //
    rcNotopen = 12 === this.binNumRcode;
    return rcNotopen;
  }

  public setRcNotopen(): void {
    let initValue: number = 0;
    //
    initValue = Number(12);
    //
    this.binNumRcode = initValue;
  }

  public isRcDisabled(): boolean {
    let rcDisabled = false;
    //
    rcDisabled = 13 === this.binNumRcode;
    return rcDisabled;
  }

  public setRcDisabled(): void {
    let initValue: number = 0;
    //
    initValue = Number(13);
    //
    this.binNumRcode = initValue;
  }

  public isRcIoerr(): boolean {
    let rcIoerr = false;
    //
    rcIoerr = 128 === this.binNumRcode;
    return rcIoerr;
  }

  public setRcIoerr(): void {
    let initValue: number = 0;
    //
    initValue = Number(128);
    //
    this.binNumRcode = initValue;
  }

  public isRcNotfnd(): boolean {
    let rcNotfnd = false;
    //
    rcNotfnd = 129 === this.binNumRcode;
    return rcNotfnd;
  }

  public setRcNotfnd(): void {
    let initValue: number = 0;
    //
    initValue = Number(129);
    //
    this.binNumRcode = initValue;
  }

  public isRcDuprec(): boolean {
    let rcDuprec = false;
    //
    rcDuprec = 130 === this.binNumRcode;
    return rcDuprec;
  }

  public setRcDuprec(): void {
    let initValue: number = 0;
    //
    initValue = Number(130);
    //
    this.binNumRcode = initValue;
  }

  public isRcNospace(): boolean {
    let rcNospace = false;
    //
    rcNospace = 131 === this.binNumRcode;
    return rcNospace;
  }

  public setRcNospace(): void {
    let initValue: number = 0;
    //
    initValue = Number(131);
    //
    this.binNumRcode = initValue;
  }

  public isRcDupkey(): boolean {
    let rcDupkey = false;
    //
    rcDupkey = 132 === this.binNumRcode;
    return rcDupkey;
  }

  public setRcDupkey(): void {
    let initValue: number = 0;
    //
    initValue = Number(132);
    //
    this.binNumRcode = initValue;
  }

  public isRcSysiderr(): boolean {
    let rcSysiderr = false;
    //
    rcSysiderr = 208 === this.binNumRcode;
    return rcSysiderr;
  }

  public setRcSysiderr(): void {
    let initValue: number = 0;
    //
    initValue = Number(208);
    //
    this.binNumRcode = initValue;
  }

  public isRcIscinvreq(): boolean {
    let rcIscinvreq = false;
    //
    rcIscinvreq = 209 === this.binNumRcode;
    return rcIscinvreq;
  }

  public setRcIscinvreq(): void {
    let initValue: number = 0;
    //
    initValue = Number(209);
    //
    this.binNumRcode = initValue;
  }

  public isRcLengerr(): boolean {
    let rcLengerr = false;
    //
    rcLengerr = 225 === this.binNumRcode;
    return rcLengerr;
  }

  public setRcLengerr(): void {
    let initValue: number = 0;
    //
    initValue = Number(225);
    //
    this.binNumRcode = initValue;
  }
}
