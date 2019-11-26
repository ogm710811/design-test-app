import {StringUtils} from '../../../services/string-utils.service';
import {R5o04iRequestData} from './r5o04i-request-data.model';
import {R5o04iTransferData} from './r5o04i-transfer-data.model';

/**
 * Model class R5o04iInput
 * Path: screenbean/procclmhospchrg/rpdo5004
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmhospchrg::rpdo5004::R5o04iInput
 * Legacy Mapping: R5O04I-INPUT
 */
export class R5o04iInput {
  r5o04iProgram = '';
  r5o04iFunction = '';
  r5o04iRequestData = new R5o04iRequestData();
  r5o04iTransferData = new R5o04iTransferData();

  public isR5o04iFAct(): boolean {
    let r5o04iFAct = false;
    let initValue: string = '';
    //
    initValue = 'A';
    //
    r5o04iFAct = StringUtils.trim(this.r5o04iFunction) === initValue;
    return r5o04iFAct;
  }

  public setR5o04iFAct(): void {
    let initValue: string = '';
    //
    initValue = 'A';
    //
    this.r5o04iFunction = initValue;
  }

  public isR5o04iFInq(): boolean {
    let r5o04iFInq = false;
    let initValue: string = '';
    //
    initValue = 'I';
    //
    r5o04iFInq = StringUtils.trim(this.r5o04iFunction) === initValue;
    return r5o04iFInq;
  }

  public setR5o04iFInq(): void {
    let initValue: string = '';
    //
    initValue = 'I';
    //
    this.r5o04iFunction = initValue;
  }

  public isR5o04iFSet(): boolean {
    let r5o04iFSet = false;
    let initValue: string = '';
    //
    initValue = 'S';
    //
    r5o04iFSet = StringUtils.trim(this.r5o04iFunction) === initValue;
    return r5o04iFSet;
  }

  public setR5o04iFSet(): void {
    let initValue: string = '';
    //
    initValue = 'S';
    //
    this.r5o04iFunction = initValue;
  }

  public isR5o04iFPos(): boolean {
    let r5o04iFPos = false;
    let initValue: string = '';
    //
    initValue = 'P';
    //
    r5o04iFPos = StringUtils.trim(this.r5o04iFunction) === initValue;
    return r5o04iFPos;
  }

  public setR5o04iFPos(): void {
    let initValue: string = '';
    //
    initValue = 'P';
    //
    this.r5o04iFunction = initValue;
  }

  public isR5o04iFNeg(): boolean {
    let r5o04iFNeg = false;
    let initValue: string = '';
    //
    initValue = 'N';
    //
    r5o04iFNeg = StringUtils.trim(this.r5o04iFunction) === initValue;
    return r5o04iFNeg;
  }

  public setR5o04iFNeg(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.r5o04iFunction = initValue;
  }

  public isR5o04iFDel(): boolean {
    let r5o04iFDel = false;
    let initValue: string = '';
    //
    initValue = 'D';
    //
    r5o04iFDel = StringUtils.trim(this.r5o04iFunction) === initValue;
    return r5o04iFDel;
  }

  public setR5o04iFDel(): void {
    let initValue: string = '';
    //
    initValue = 'D';
    //
    this.r5o04iFunction = initValue;
  }

  public isR5o04iFTrn(): boolean {
    let r5o04iFTrn = false;
    let initValue: string = '';
    //
    initValue = 'T';
    //
    r5o04iFTrn = StringUtils.trim(this.r5o04iFunction) === initValue;
    return r5o04iFTrn;
  }

  public setR5o04iFTrn(): void {
    let initValue: string = '';
    //
    initValue = 'T';
    //
    this.r5o04iFunction = initValue;
  }
}
