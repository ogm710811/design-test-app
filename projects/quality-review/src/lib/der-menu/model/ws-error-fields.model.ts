import { BinNumFuncRed } from './bin-num-func-red.model';
import { BinNumRcodeRed } from './bin-num-rcode-red.model';
import { EibFn } from './eib-fn.model';
import { EibRcode } from './eib-rcode.model';
import { Filler1 } from './filler1.model';
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
  filler1 = new Filler1();
  binNumFunc = 0;
  binNumFuncRed = new BinNumFuncRed();
  binNumRcode = 0;
  binNumRcodeRed = new BinNumRcodeRed();
  eibFn = new EibFn();
  eibRcode = new EibRcode();
  pgmErrorLine = new PgmErrorLine();

  public isFctCommand(): boolean {
    let fctCommand = false;
    let initValue: number = 0;
    //
    initValue = Number(6);
    //
    fctCommand = initValue === this.binNumHighByte;
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
    let initValue: number = 0;
    //
    initValue = Number(2);
    //
    fRead = initValue === this.binNumFunc;
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
    let initValue: number = 0;
    //
    initValue = Number(4);
    //
    fWrite = initValue === this.binNumFunc;
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
    let initValue: number = 0;
    //
    initValue = Number(6);
    //
    fRewrite = initValue === this.binNumFunc;
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
    let initValue: number = 0;
    //
    initValue = Number(8);
    //
    fDelete = initValue === this.binNumFunc;
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
    let initValue: number = 0;
    //
    initValue = Number(1);
    //
    rcDsiderr = initValue === this.binNumRcode;
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
    let initValue: number = 0;
    //
    initValue = Number(2);
    //
    rcIllogic = initValue === this.binNumRcode;
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
    let initValue: number = 0;
    //
    initValue = Number(8);
    //
    rcInvreq = initValue === this.binNumRcode;
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
    let initValue: number = 0;
    //
    initValue = Number(12);
    //
    rcNotopen = initValue === this.binNumRcode;
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
    let initValue: number = 0;
    //
    initValue = Number(13);
    //
    rcDisabled = initValue === this.binNumRcode;
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
    let initValue: number = 0;
    //
    initValue = Number(128);
    //
    rcIoerr = initValue === this.binNumRcode;
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
    let initValue: number = 0;
    //
    initValue = Number(129);
    //
    rcNotfnd = initValue === this.binNumRcode;
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
    let initValue: number = 0;
    //
    initValue = Number(130);
    //
    rcDuprec = initValue === this.binNumRcode;
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
    let initValue: number = 0;
    //
    initValue = Number(131);
    //
    rcNospace = initValue === this.binNumRcode;
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
    let initValue: number = 0;
    //
    initValue = Number(132);
    //
    rcDupkey = initValue === this.binNumRcode;
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
    let initValue: number = 0;
    //
    initValue = Number(208);
    //
    rcSysiderr = initValue === this.binNumRcode;
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
    let initValue: number = 0;
    //
    initValue = Number(209);
    //
    rcIscinvreq = initValue === this.binNumRcode;
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
    let initValue: number = 0;
    //
    initValue = Number(225);
    //
    rcLengerr = initValue === this.binNumRcode;
    return rcLengerr;
  }

  public setRcLengerr(): void {
    let initValue: number = 0;
    //
    initValue = Number(225);
    //
    this.binNumRcode = initValue;
  }

  public stringfy(): string {
    let stringfied = '';
    stringfied = 'CRITICAL ERROR - FILE: ' + this.pgmErrorLine.errFile + ' - COMMAND: ' + this.pgmErrorLine.errCommand;
    return stringfied;
  }
}
