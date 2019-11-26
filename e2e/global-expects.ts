import {browser, ElementFinder} from 'protractor';
import {FoxUiGlobalNav} from './global-nav.po';

export class GlobalExpects {
  static expectTabOrder(tabOrderedElements: ElementFinder[]) {
    tabOrderedElements.forEach(elem => {
      expect(elem.getAttribute('id')).toEqual(
        browser.driver.switchTo().activeElement().getAttribute('id'));
      FoxUiGlobalNav.pressTab();
    });
  }

  static closeMessageBoxes(closeButtonMessageBoxElements: ElementFinder[]) {
    closeButtonMessageBoxElements.forEach(elem => {
      elem.click();
    });
  }
}
