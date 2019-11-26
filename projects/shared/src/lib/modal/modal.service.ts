import {EventEmitter, Injectable} from '@angular/core';
import {WorkQueueItemMetadataVO} from '@fox/rest-clients';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  routeToQueueModalVisible = false;
  routeToQueueItemList: number[] = [];
  saveToWorkbenchModalVisible = false;
  saveToWorkbenchItemList: WorkQueueItemMetadataVO[] = [];
  reportModalVisible = false;
  routeToQueueFromDetailInitiated = false;
  routeToQueueCompleted = false;
  saveToWorkbenchCompleted = false;
  saveToWorkbenchFromDetailInitiated = false;
  queueType = '';
  routeValidationModalVisible = false;

  mainContentScrolling: EventEmitter<boolean> = new EventEmitter<boolean>();
  itemsDetailsChange:  EventEmitter<string> = new EventEmitter<string>();
  followupDateChange:  EventEmitter<string> = new EventEmitter<string>();

  private _itemDetails: string = '';
  private _followUpDate: string = '';

  disableMainContentScrolling(): void {
    this.mainContentScrolling.emit(false);
  }

  enableMainContentScrolling(): void {
    this.mainContentScrolling.emit(true);
  }

  set itemDetails(item) {
    this._itemDetails = item;
    this.itemsDetailsChange.emit(item);
  }

  get itemDetails(): string {
    return this._itemDetails;
  }

  set followUpDate(date) {
    this._followUpDate = date;
    this.followupDateChange.emit(date);
  }

  get followUpDate(): string {
    return this._followUpDate;
  }

}
