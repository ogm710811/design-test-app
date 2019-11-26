import {by, element, ElementFinder, promise as wdp} from 'protractor';
import {FoxUiLoginIdPage} from '../../login/page-objects/login.id.po';

export class FoxUiBypassQueueManagement {

  directPath = '/#/dashboard/bypass-queue-management';

  loginAndNavigateTo(username: string, password: string, clickOrEnter?: string): wdp.Promise<void> {
    const loginPo: FoxUiLoginIdPage = new FoxUiLoginIdPage();
    return loginPo.loginWithCredentials(username, password, clickOrEnter);
  }

  bypassQueueInfoTableCell(row: number, col: number): ElementFinder {
    const filteredRows = element.all(by.xpath('//table[@id=\'bypassqueuetabl\']/tbody//tr')).filter((elem, index) => {
      return index === row;
    });

    const filteredCols = filteredRows.all(by.tagName('td')).filter((elm, idx) => {
      return idx === col;
    });

    return filteredCols.get(0);
  }

  teamSelect(): ElementFinder {
    return element(by.css('mat-select select'));
  }

  assignToQueueSelectForRow(row: number): ElementFinder {
    const cell = this.bypassQueueInfoTableCell(row, 2);
    return cell.element(by.tagName('select'));
  }

  assignToSelectedTextForRow(row: number): any {
    const cell = this.bypassQueueInfoTableCell(row, 2);
    return cell.element(by.css('select option:checked')).getText();
  }
}
