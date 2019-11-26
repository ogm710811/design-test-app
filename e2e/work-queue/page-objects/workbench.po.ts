import {by, element, ElementArrayFinder, ElementFinder} from 'protractor';

export class FoxUiWorkbench {

  private titleWorkbenchSummary = 'title-workbench-summary';

  get workbenchSummaryTitle(): ElementFinder {
    return element(by.className(this.titleWorkbenchSummary));
  }
}
