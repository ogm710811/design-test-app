import {browser, promise as wdp} from 'protractor';
import {claimProcessingRoutePathBypassMgmt} from '@fox/shared';
import {FoxUiDashboard} from '../dashboard/page-objects/dashboard.po';
import {FoxUiGlobalNav} from '../global-nav.po';
import {FoxUiLoginIdPage} from '../login/page-objects/login.id.po';
import {FoxUiBypassQueueManagement} from './page-objects/bypass-queue-management.po';

let loginPage: FoxUiLoginIdPage;
let app: FoxUiGlobalNav;
let dashboardMenu: FoxUiDashboard;
let bypassQueue: FoxUiBypassQueueManagement;

describe('[FOX UI] Member Lookup - Bypass Queue Management', () => {
  const user = browser.params.foxtusrc;
  const password = browser.params.foxtusrcpassword;
  let loginPromise: wdp.Promise<void>;
  beforeEach(() => {
    loginPage = new FoxUiLoginIdPage();
    app = new FoxUiGlobalNav();
    dashboardMenu = new FoxUiDashboard();
    bypassQueue = new FoxUiBypassQueueManagement();
    loginPage.navigateTo();
    loginPromise = loginPage.loginWithCredentials(user, password);
  });
  /*
  xit('Displays the correct initial table details', () => {
    loginPage.loginWithCredentials(browser.params.foxtusrc, browser.params.foxtusrcpassword).then(() => {
      expect(dashboardMenu.bypassQueueManagementAnchor.isPresent()).toBe(true);
      dashboardMenu.bypassQueueManagementAnchor.click().then(() => {

        const opdata = [
          ['Main Queue', '67890', '54321', '98765', '34567'],
          ['Main Queue', '12345', '54321', '98765', '34567'],
          ['Main Queue', '12345', '67890', '98765', '34567'],
          ['Main Queue', '12345', '67890', '54321', '34567'],
          ['Main Queue', '12345', '67890', '54321', '98765']
        ];
        const testData = [
          ['12345', '4', opdata],
          ['67890', '3', opdata],
          ['54321', '4', opdata],
          ['98765', '2', opdata],
          ['34567', '2', opdata]
        ];

        for (let i = 0; i < testData.length; i++) {
          for (let j = 0; j < 2; j++) {
            const cell = bypassQueue.bypassQueueInfoTableCell(i, j);

            expect(cell.isPresent()).toBe(true);
            expect(cell.getText()).toMatch(<string>testData[i][j]);

            cell.getText().then((txt) => {
            });
          }
          const select = bypassQueue.assignToQueueSelectForRow(i);
          expect(select.isPresent()).toBe(true);
          const selectedText = bypassQueue.assignToSelectedTextForRow(i);
          expect(selectedText).toMatch(opdata[i][0]);

          for (let c = 1; c < opdata[i].length; c++) {
            select.click().then(() => {
              const opt = select.all(by.css('option')).get(c);

              opt.click().then(() => {
                expect(select.element(by.css('option:checked')).getText()).toMatch(opdata[i][c]);
              });

            });
          }
        }
        const btn = element(by.tagName('button'));
        expect(btn.isPresent());
        element(by.id('btnBypass')).click();
        try {
          browser.switchTo().alert().dismiss();
        } catch (e) {
          console.log(e);
        }
      });
    });

  });

  */
  it('Accesses "Bypass Queue Management" page with "BM" command in command bar', () => {
    loginPromise.then(() => {
      app.commandBarEnter('BM').then(() => {
        expect(browser.getCurrentUrl()).toContain(claimProcessingRoutePathBypassMgmt);
        app.logout('Foxtestc Userc');
      });
    });
  });
});
