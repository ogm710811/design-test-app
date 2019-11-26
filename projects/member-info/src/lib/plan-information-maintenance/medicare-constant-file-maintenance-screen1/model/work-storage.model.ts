// import { StringUtils } from '../../services/string-utils.service';
import { HoldDate } from './hold-date.model';
import { MessageKey } from './message-key.model';
import { WorkField5R } from './work-field5-r.model';
import { WorkField6R } from './work-field6-r.model';
import { WsMedConstKey } from './ws-med-const-key.model';
import { WsTos } from './ws-tos.model';

/**
 * Model class WorkStorage
 * Path: screenbean/medcrcnstmnt
 * Model: com::uhc::aarp::fox::domain::screenbean::medcrcnstmnt::WorkStorage
 * Legacy Mapping: WORKING-STORAGE-SECTION
 */
export class WorkStorage {
  sub = 0;
  wsEibResp = 0;
  reformatDate = '';
  holdDate = new HoldDate();
  holdStart = 0;
  holdStop = 0;
  wsMedConstKey = new WsMedConstKey();
  wsTos = new WsTos();
  messageFoundInd = '';
  rpdiskqcFoundInd = '';
  workDate = '';
  wsAttributeValue = '';
  wsFileName = '';
  wsMap = '';
  messageKey = new MessageKey();
  workField1 = 0;
  workField1R = 0;
  workField2 = 0;
  workField2R = 0;
  workField3 = 0;
  workField3R = 0;
  workField4 = 0;
  workField4R = 0;
  workField5 = 0;
  workField5R = new WorkField5R();
  workField6 = 0;
  workField6R = new WorkField6R();
  wsMessageNo = 0;
  caTransType = '';
  caVerifySwitch = '';

  public isMessageFound(): boolean {
    let messageFound = false;
    let initValue: string = '' ;
    //
    initValue = 'Y';
    //
    messageFound = this.messageFoundInd === initValue;
    return messageFound;
  }

  public setMessageFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.messageFoundInd = initValue;
  }

  public isRpdiskqcFound(): boolean {
    let rpdiskqcFound = false;
    let initValue: string = '' ;
    //
    initValue = 'Y';
    //
    rpdiskqcFound = this.rpdiskqcFoundInd === initValue;
    return rpdiskqcFound;
  }

  public setRpdiskqcFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.rpdiskqcFoundInd = initValue;
  }

  public isRpdiskqcRnf(): boolean {
    let rpdiskqcRnf = false;
    let initValue: string = '';
    //
    initValue = 'N';
    //
    rpdiskqcRnf = this.rpdiskqcFoundInd === initValue;
    return rpdiskqcRnf;
  }

  public setRpdiskqcRnf(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.rpdiskqcFoundInd = initValue;
  }
}
