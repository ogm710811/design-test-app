import {browser, by, element, ElementFinder, promise as wdp, protractor} from 'protractor';
import {homeRoutePathRoot} from '@fox/shared';

export class FoxUiLoginPwPage {

  directPath = '/#/login/pw';
  inputIdPassword = 'txtPassword';
  buttonIdLogin = 'btnLogin';

  get passwordInput(): ElementFinder {
    return element(by.id(this.inputIdPassword));
  }

  get loginButton(): ElementFinder {
    return element(by.id(this.buttonIdLogin));
  }

  get password(): wdp.Promise<string> {
    return this.passwordInput.getAttribute('value');
  }

  set password(pw: wdp.Promise<string>) {
    this.passwordInput.clear();
    this.passwordInput.sendKeys(pw);
  }

  navigateTo(): wdp.Promise<any> {
    return browser.get(this.directPath);
  }

  loginWithCredentials(password: string, clickOrEnter?: string, expectSuccess: boolean = true): wdp.Promise<any> {
    // Write the username and password to the text boxes.
    // Since we receive a promise from this box, we must also write a promise;
    // this is the purpose of wdp.fulfilled();
    this.password = wdp.fulfilled(password);

    const EC = protractor.ExpectedConditions;

    const loginTriggeredPromise: wdp.Promise<void> = (clickOrEnter && clickOrEnter.toUpperCase() === 'ENTER') ?
      element(by.tagName('html')).sendKeys(protractor.Key.ENTER) :
      this.loginButton.click();

    return expectSuccess ? loginTriggeredPromise.then(() => {
        browser.wait(EC.urlContains(homeRoutePathRoot));
        expect(browser.getCurrentUrl()).toMatch(new RegExp('.*' + homeRoutePathRoot + '.*'));
      }
    ) : loginTriggeredPromise;
  }
}
