import {by, element, ElementArrayFinder, ElementFinder} from 'protractor';

export class FoxUiQueueSelection {

  private btnIdLoadQueue = 'btn-load-queue';

  get loadQueueButton(): ElementFinder {
    return element(by.id(this.btnIdLoadQueue));
  }
}
