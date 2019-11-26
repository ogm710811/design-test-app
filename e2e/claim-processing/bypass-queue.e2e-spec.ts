import {browser, ExpectedConditions, protractor} from 'protractor';
import {claimProcessingRoutePathBypass} from '@fox/shared';
import {FoxUiDashboard} from '../dashboard/page-objects/dashboard.po';
import {FoxUiGlobalNav} from '../global-nav.po';
import {FoxUiLoginIdPage} from '../login/page-objects/login.id.po';
import {FoxUiLoginPwPage} from '../login/page-objects/login.pw.po';
import {FoxUiBypassQueue} from './page-objects/bypass-queue.po';

let loginPage: FoxUiLoginIdPage;
let pwPage: FoxUiLoginPwPage;
let app: FoxUiGlobalNav;
let dashboard: FoxUiDashboard;
let dashboardMenu: FoxUiDashboard;
let memberLookup: FoxUiBypassQueue;

describe('[FOX UI] Member Lookup - Bypass Queue', () => {
  const user = browser.params.foxtusr1;
  const password = browser.params.foxtusr1password;
  let loginPromise;
  beforeEach(() => {
    loginPage = new FoxUiLoginIdPage();
    pwPage = new FoxUiLoginPwPage();
    app = new FoxUiGlobalNav();
    dashboard = new FoxUiDashboard();
    dashboardMenu = new FoxUiDashboard();
    memberLookup = new FoxUiBypassQueue();
    loginPage.navigateTo();
    loginPromise = loginPage.loginWithCredentials(user, password);
  });

  it('Changes "Queue Info" table\'s data and column header change when the selected user changes', () => {
    loginPromise.then(() => {
      app.menuToggleAnchor.click().then(() => {
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.elementToBeClickable(app.claimMenuCategory));
        app.claimMenuCategory.click().then(() => {
          expect(app.bypassQueueMenuItem.isPresent()).toBe(true);
          app.bypassQueueMenuItem.click().then(() => {
            function headerFor(u: string): any {
              if (u === user) {
                return 'Bypass Queue';
              }

              return u.toUpperCase() + '\'S Bypass Queue';
            }

            expect(memberLookup.selectedUser).toMatch(user);
            memberLookup.displayQueueForOptions.then((opts) => {
              for (let i = 0; i < opts.length; i++) {
                memberLookup.displayQueueForSelect.click().then(() => {
                  expect(opts[i].isPresent()).toBe(true);
                  opts[i].click().then(() => {
                    expect(memberLookup.queueInfoTableHeader(0).isPresent()).toBe(true);
                    expect(memberLookup.queueInfoTableHeader(0).getText()).toMatch('');
                    expect(memberLookup.queueInfoTableHeader(1).isPresent()).toBe(true);
                    expect(memberLookup.queueInfoTableHeader(1).getText()).toMatch('Queue Total');
                    opts[i].getText().then((optText: string) => {
                      const optUser = optText.trim();
                      expect(memberLookup.queueInfoTableHeader(2).isPresent()).toBe(true);
                      expect(memberLookup.queueInfoTableHeader(2).getText()).toMatch(headerFor(optUser));
                      if (optUser === user) {
                        expect(memberLookup.queueInfoTableCell(1, 2).getText()).toMatch('3641');
                        expect(memberLookup.queueInfoTableCell(1, 3).getText()).toMatch('3641');
                        expect(memberLookup.queueInfoTableCell(2, 2).getText()).toMatch('5');
                        expect(memberLookup.queueInfoTableCell(2, 3).getText()).toMatch('5');
                        expect(memberLookup.queueInfoTableCell(3, 2).getText()).toMatch('562');
                        expect(memberLookup.queueInfoTableCell(3, 3).getText()).toMatch('2');
                        expect(memberLookup.queueInfoTableCell(4, 2).getText()).toMatch('746');
                        expect(memberLookup.queueInfoTableCell(4, 3).getText()).toMatch('2');
                        expect(memberLookup.queueInfoTableCell(5, 2).getText()).toMatch('904');
                        expect(memberLookup.queueInfoTableCell(5, 3).getText()).toMatch('2');
                        expect(memberLookup.queueInfoTableCell(6, 2).getText()).toMatch('1424');
                        expect(memberLookup.queueInfoTableCell(6, 3).getText()).toMatch('2');
                      } else {
                        expect(memberLookup.queueInfoTableCell(1, 2).getText()).toMatch('3641');
                        expect(memberLookup.queueInfoTableCell(1, 3).getText()).toMatch('3641');
                        expect(memberLookup.queueInfoTableCell(2, 2).getText()).toMatch('45');
                        expect(memberLookup.queueInfoTableCell(2, 3).getText()).toMatch('45');
                        expect(memberLookup.queueInfoTableCell(3, 2).getText()).toMatch('456');
                        expect(memberLookup.queueInfoTableCell(3, 3).getText()).toMatch('10');
                        expect(memberLookup.queueInfoTableCell(4, 2).getText()).toMatch('454');
                        expect(memberLookup.queueInfoTableCell(4, 3).getText()).toMatch('10');
                        expect(memberLookup.queueInfoTableCell(5, 2).getText()).toMatch('676');
                        expect(memberLookup.queueInfoTableCell(5, 3).getText()).toMatch('10');
                        expect(memberLookup.queueInfoTableCell(6, 2).getText()).toMatch('789');
                        expect(memberLookup.queueInfoTableCell(6, 3).getText()).toMatch('10');
                      }
                    });
                  });
                });
              }
              app.logout();
            });
          });
        });
      });
    });
  });

  it('Accesses "Bypass Queue" page with BQ command in command bar', () => {
    loginPromise.then(() => {
      app.commandBarEnter('BQ').then(() => {
        browser.wait(ExpectedConditions.urlContains(claimProcessingRoutePathBypass)).then(() => {
          app.logout();
        });
      });
    });
  });

  it('Tabs through "Bypass Queue" elements in the correct order', () => {
    loginPromise.then(() => {
      app.logout();
    });
  });
})
;
