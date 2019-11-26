import {browser, by, element, ElementFinder, promise as wdp, protractor} from 'protractor';
import {loginUrlUsername} from '@fox/shared';
import {FoxUiLoginPwPage} from './login.pw.po';

export class FoxUiLoginIdPage {

  directPath = '/#/login/msId';
  inputIdLogin = 'txtLogin';
  buttonIdSubmit = 'btnSubmit';

  get usernameInput(): ElementFinder {
    return element(by.id(this.inputIdLogin));
  }

  get loginButton(): ElementFinder {
    return element(by.id(this.buttonIdSubmit));
  }

  get username(): any {
    return this.usernameInput.getAttribute('value');
  }

  set username(un) {
    this.usernameInput.clear();
    if (un) {
      this.usernameInput.sendKeys(un);
    }
  }

  navigateTo(): wdp.Promise<any> {
    return browser.get(this.directPath);
  }

  submitUsername(username: string, clickOrEnter?: string): wdp.Promise<void> {
    this.username = username;
    if (clickOrEnter && clickOrEnter.toUpperCase() === 'ENTER') {
      return element(by.tagName('html')).sendKeys(protractor.Key.ENTER);
    } else {
      return this.loginButton.click();
    }
  }

  loginWithCredentials(username: string, password: string, clickOrEnter?: string, expectSuccess: boolean = true): wdp.Promise<any> {
    // Write the username and password to the text boxes.
    // Since we receive a promise from this box, we must also write a promise;
    // this is the purpose of wdp.fulfilled();
    const submitAction: wdp.Promise<void> = this.submitUsername(username, clickOrEnter);
    const pwPage = new FoxUiLoginPwPage();
    return submitAction.then(() => {
      if (expectSuccess) {
        const EC = protractor.ExpectedConditions;
        expect(browser.getCurrentUrl()).toMatch(new RegExp('.*' + loginUrlUsername + '.*'));
      }
      return pwPage.loginWithCredentials(password, clickOrEnter, expectSuccess);
    });
  }
}
