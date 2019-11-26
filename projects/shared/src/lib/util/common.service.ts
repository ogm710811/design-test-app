import {Injectable} from '@angular/core';

/* Common Service to interact with two componants
 for getting most search result when go back to previous componant
 */

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _checkRegisterPayload: any;
  private _isBack: boolean = false;
  private _checkIds: string[] = [];
  private _dropdownOption: string = '';
  private _replaceSuccessMsg: boolean = false;
  private _voidSuccessMsg: boolean = false;
  private _authorizeSuccessMsg: boolean = false;
  private _denySuccessMsg: boolean = false;
  private _isNpiMismatch: boolean = false;

  constructor() {
  }

  get checkRegisterPayload(): any {
    return this._checkRegisterPayload;
  }

  set checkRegisterPayload(value: any) {
    this._checkRegisterPayload = value;
  }

  get isBack(): boolean {
    return this._isBack;
  }

  set isBack(value: boolean) {
    this._isBack = value;
  }

  get checkIds(): string[] {
    return this._checkIds;
  }

  set checkIds(value: string[]) {
    this._checkIds = value;
  }

  get dropdownOption(): string {
    return this._dropdownOption;
  }

  set dropdownOption(value: string) {
    this._dropdownOption = value;
  }

  get replaceSuccessMsg(): boolean {
    return this._replaceSuccessMsg;
  }

  set replaceSuccessMsg(value: boolean) {
    this._replaceSuccessMsg = value;
  }

  get voidSuccessMsg(): boolean {
    return this._voidSuccessMsg;
  }

  set voidSuccessMsg(value: boolean) {
    this._voidSuccessMsg = value;
  }

  get authorizeSuccessMsg(): boolean {
    return this._authorizeSuccessMsg;
  }

  set authorizeSuccessMsg(value: boolean) {
    this._authorizeSuccessMsg = value;
  }

  get denySuccessMsg(): boolean {
    return this._denySuccessMsg;
  }

  set denySuccessMsg(value: boolean) {
    this._denySuccessMsg = value;
  }

  get isNpiMismatch(): boolean {
    return this._isNpiMismatch;
  }

  set isNpiMismatch(value: boolean) {
    this._isNpiMismatch = value;
  }
}
