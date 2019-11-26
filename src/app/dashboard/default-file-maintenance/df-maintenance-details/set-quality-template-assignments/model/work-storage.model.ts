import { Mod42Commarea } from './mod42-commarea.model';
import { OperdefCommareaMiscFields } from './operdef-commarea-misc-fields.model';

/**
 * Model class WorkStorage
 * Path: screenbean/setqltytmpltasgn
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltytmpltasgn::WorkStorage
 * Legacy Mapping: WS-FIELDS
 */
export class WorkStorage {
  sub = 0;
  sub1 = 0;
  rbaFld = 0;
  templNumbErrorInd = '';
  templFoundErrorInd = '';
  templExistInd = '';
  screenChangesInd = '';
  newNtFoundInd = '';
  pf3KeyInd = '';
  wsTemplPos1 = '';
  wsTemplPos2 = '';
  dfhMapSaveArea = '';
  dfhLinkageSwitch = '';
  operdefCommareaMiscFields = new OperdefCommareaMiscFields();
  mod42Commarea = new Mod42Commarea();

  public setTemplNumbError(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.templNumbErrorInd = initValue;
  }

  public setTemplFoundError(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.templFoundErrorInd = initValue;
  }

  public setTemplExist(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.templExistInd = initValue;
  }

  public setTemplNotExist(): void {
    let initValue: string = '';
    initValue = 'N';
    this.templExistInd = initValue;
  }

  public setScreenChanges(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.screenChangesInd = initValue;
  }

  public setNewNtFound(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.newNtFoundInd = initValue;
  }

  public setNewNtNotFound(): void {
    let initValue: string = '';
    initValue = 'N';
    this.newNtFoundInd = initValue;
  }

  public setPf3Key(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.pf3KeyInd = initValue;
  }
}
