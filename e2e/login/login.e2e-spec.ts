import {browser, promise as wdp, protractor} from 'protractor';
import {loginErrorMessageNotAuthorized} from '@fox/shared';
import {FoxUiDashboard} from '../dashboard/page-objects/dashboard.po';
import {FoxUiGlobalNav} from '../global-nav.po';
import {FoxUiLoginIdPage} from './page-objects/login.id.po';
import {FoxUiLoginPwPage} from './page-objects/login.pw.po';

let loginPage: FoxUiLoginIdPage;
let pwPage: FoxUiLoginPwPage;
let app: FoxUiGlobalNav;
let dashboard: FoxUiDashboard;

describe('[FOX UI] Login', () => {

  beforeEach(() => {
    loginPage = new FoxUiLoginIdPage();
    pwPage = new FoxUiLoginPwPage();
    app = new FoxUiGlobalNav();
    dashboard = new FoxUiDashboard();
    loginPage.navigateTo();
  });

  it('Has blank username input field when we first navigate to it', () => {
    // Username input should be empty
    expect(loginPage.username).toEqual('');
  });

  it('Username input field value updated as we type', () => {
    const loginText = 'testString';

    // Write the username to the text box.
    loginPage.username = wdp.fulfilled(loginText);

    // Make sure it contains what we just wrote to it
    expect(loginPage.username).toMatch(loginText);
  });

  it('Navigates to password page with blank input field after button click', () => {
    loginPage.submitUsername('testString', 'CLICK').then(() => {
      expect(pwPage.password).toEqual('');
    });
  });

  it('Navigates to password page with blank input field enter keypress', () => {
    loginPage.submitUsername('testString', 'ENTER').then(() => {
      expect(pwPage.password).toEqual('');
    });
  });

  it('Password input values updated as we type', () => {

    const loginText = 'testString';
    const pwText = 'testPassword';

    loginPage.submitUsername(loginText, 'ENTER').then(() => {
      // Write the password to the text box.
      // Since we receive a promise from this box, we must also write a promise; this is the purpose of wdp.fulfilled();
      pwPage.password = wdp.fulfilled(pwText);

      // Make sure it contains what we just wrote to it
      expect(pwPage.password).toMatch(pwText);
    });
  });

  it('Submits username and password when buttons are clicked', () => {
    loginPage.loginWithCredentials(browser.params.foxtusr6, browser.params.foxtusr6password, 'CLICK').then(() => {
      expect(app.userDropdownButton.isPresent()).toBe(true);
      expect(app.logoutAnchor.isPresent()).toBe(false);
      // Then we logout
      app.logout('Foxtest6 User6');

    });
  });

  it('Submits username and password when enter key is pressed', () => {
    loginPage.loginWithCredentials(browser.params.foxtusr6, browser.params.foxtusr6password, 'ENTER').then(() => {
      expect(app.userDropdownButton.isPresent()).toBe(true);
      expect(app.logoutAnchor.isPresent()).toBe(false);
      // Then we logout
      app.logout('Foxtest6 User6');
    });
  });

  it('Displays error message due to not having any roles when "nsantos" logs in', () => {
    loginPage.loginWithCredentials('nsantos', 'nsantospassword', 'CLICK', false).then(() => {
      browser.wait(protractor.ExpectedConditions.alertIsPresent());
      expect(browser.switchTo().alert().getText()).toMatch(loginErrorMessageNotAuthorized);
      browser.switchTo().alert().dismiss();
      expect(app.userDropdownButton.isPresent()).toBe(false);
      expect(app.logoutAnchor.isPresent()).toBe(false);
    });
  });

  it('Displays error message due to not being a user when `lskywalker` logs in', () => {
    loginPage.loginWithCredentials('lskywalker', 'lskywalkerpassword', 'ENTER', false).then(() => {
      browser.wait(protractor.ExpectedConditions.alertIsPresent());
      expect(browser.switchTo().alert().getText()).toMatch(loginErrorMessageNotAuthorized);
      browser.switchTo().alert().dismiss();
      expect(app.userDropdownButton.isPresent()).toBe(false);
      expect(app.logoutAnchor.isPresent()).toBe(false);
    });
  });

});
