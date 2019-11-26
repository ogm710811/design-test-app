import {browser} from 'protractor';
import {FoxUiDashboard} from '../dashboard/page-objects/dashboard.po';
import {FoxUiGlobalNav} from '../global-nav.po';
import {FoxUiLoginIdPage} from '../login/page-objects/login.id.po';
import {FoxUiLoginPwPage} from '../login/page-objects/login.pw.po';

let loginPage: FoxUiLoginIdPage;
let app: FoxUiGlobalNav;
let dashboard: FoxUiDashboard;

describe('[FOX UI] Work Queue - Workbench', () => {

  beforeEach(() => {
    loginPage = new FoxUiLoginIdPage();
    app = new FoxUiGlobalNav();
    dashboard = new FoxUiDashboard();
    loginPage.navigateTo();
  });

  it('Tabs through "Workbench" page elements in the correct order', () => {

  });
});
