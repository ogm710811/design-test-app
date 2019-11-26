import {browser} from 'protractor';
import {FoxUiDashboard} from '../dashboard/page-objects/dashboard.po';
import {FoxUiGlobalNav} from '../global-nav.po';
import {FoxUiLoginIdPage} from '../login/page-objects/login.id.po';
import {FoxUiQueueSelection} from './page-objects/queue-selection.po';
import {FoxUiWorkbench} from './page-objects/workbench.po';

let loginPage: FoxUiLoginIdPage;
let app: FoxUiGlobalNav;
let dashboard: FoxUiDashboard;
let queueSelection: FoxUiQueueSelection;
let workbench: FoxUiWorkbench;

describe('[FOX UI] Work Queue - Work Session Dropdown', () => {
  const user = browser.params.foxtusr6;
  const password = browser.params.foxtusr6password;
  let loginPromise;
  beforeEach(() => {
    loginPage = new FoxUiLoginIdPage();
    app = new FoxUiGlobalNav();
    dashboard = new FoxUiDashboard();
    queueSelection = new FoxUiQueueSelection();
    workbench = new FoxUiWorkbench();
    loginPage.navigateTo();
  });

  it('Should not have Bumble Bee on no session', () => {
    loginPage.loginWithCredentials(browser.params.foxtusr9, browser.params.foxtusr9password, 'CLICK').then(() => {
      expect(app.bumbleBeeMenu.isPresent()).toBe(false);
        app.logout('Foxtest9 User9');
      });
  });

  it('Should have Bumble Bee on session', () => {
    loginPromise = loginPage.loginWithCredentials(user, password);
    loginPromise.then(() => {
      expect(app.bumbleBeeMenu.isPresent()).toBe(true);
      app.logout('Foxtest6 User6');
    });
  });

  it('Navigates to all queues from dropdown', () => {
    loginPromise = loginPage.loginWithCredentials(user, password);
    loginPromise.then(() => {
      // The logout button should be hidden
      expect(app.logoutAnchor.isPresent()).toBe(false);
      app.workMenuLabel.click().then(() => {
        browser.sleep(500);
        app.viewAllQueuesButton.click().then(() => {
          expect(queueSelection.loadQueueButton.isPresent()).toBe(true);
        });
      });

      app.logout('Foxtest6 User6');
    });
  });

  it('Navigates to workbench from dropdown', () => {
    loginPromise = loginPage.loginWithCredentials(user, password);
    loginPromise.then(() => {

      // The logout button should be hidden
      expect(app.logoutAnchor.isPresent()).toBe(false);

      app.workMenuLabel.click().then(() => {
        browser.sleep(500);
        app.viewMyWorkbenchButton.click().then(() => {
          expect(workbench.workbenchSummaryTitle.isPresent()).toBe(true);
        });
      });
      app.logout('Foxtest6 User6');
    });
  });
});
