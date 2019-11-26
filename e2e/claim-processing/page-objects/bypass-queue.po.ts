import {by, element, ElementArrayFinder, ElementFinder} from 'protractor';

export class FoxUiBypassQueue {
  labelIdDisplayQueueFor = 'lbl-select-user-bypass';
  selectIdDisplayQueueFor = 'select-user-bypass';
  optionIdDisplayQueueFor1 = 'display-queue-for-option-1';
  optionIdDisplayQueueFor2 = 'displayQueueFor-option-2';
  buttonIdDisplay = 'member-lookup-btn';
  tableIdQueueInfo = 'queue-info';

  get displayQueueForLabel(): ElementFinder {
    return element(by.id(this.labelIdDisplayQueueFor));
  }

  get displayQueueForSelect(): ElementFinder {
    return element(by.id(this.selectIdDisplayQueueFor));
  }

  get displayQueueForOptions(): ElementArrayFinder {
    return this.displayQueueForSelect.all(by.tagName('option'));
  }

  get displayQueueForOption1(): ElementFinder {
    return element(by.id(this.optionIdDisplayQueueFor1));
  }

  get displayQueueForOption2(): ElementFinder {
    return element(by.id(this.optionIdDisplayQueueFor2));
  }

  get displayButton(): ElementFinder {
    return element(by.id(this.buttonIdDisplay));
  }

  get queueInfoTable(): ElementFinder {
    return element(by.id(this.tableIdQueueInfo));
  }

  queueInfoTableHeader(colId: number): ElementFinder {
    return element(by.id(this.tableIdQueueInfo + '-th-' + colId));
  }

  queueInfoTableCell(rowId: number, colId: number): ElementFinder {
    return this.queueInfoTable.element(by.css('tbody'))
      .element(by.css('tr:nth-child(' + rowId + ')'))
      .element(by.css('td:nth-child(' + colId + ')'));
  }

  get selectedUser(): any {
    return this.displayQueueForSelect.element(by.css('.mat-select-value-text')).getText();
  }
}
