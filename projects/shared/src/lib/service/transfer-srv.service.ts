import {EventEmitter, Injectable, Output} from '@angular/core';

/**
 * Global Transfer Service. Use to store instance and pass them between views.
 * Note: Once an instance set into data it will be global.
 */
@Injectable({
  providedIn: 'root'
})
export class TransferSrvService {
  // HmrState uis used by HMR to track the any state during reloading
  _data: any = {};
  currentUrl: string = '';
  previousUrl: string = '';
  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  setStoreUrl(url: string): void {
    this.currentUrl = url;
  }
  getStoreUrl(): string {
   return  this.currentUrl;
  }

  setStorePreviousUrl(url: string): void {
    this.previousUrl = url;
  }

  getStorePreviousUrl(): string {
    return this.previousUrl;
  }

  getData(): any {
    return this._data = this._clone(this._data);
  }

  // already return a clone of the current state
  get data(): any {
    return this._data = this._clone(this._data);
  }
  // never allow mutation
  set data(value: any) {
    throw new Error('do not mutate the `data` directly');
  }

  get(prop?: any): any {
    // use our state getter for the clone
    const data = this.data;
    return data[prop] || data;
  }

  set(prop: string, value: any): void {
    // internally mutate our state data
    return this._data[prop] = value;
  }

  _clone(object: any): any {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }

  sendData(data: any): void {
    this.change.emit(data);
  }
}

export function TRANSFERSRV(): any[] {
  return [TransferSrvService];
}
