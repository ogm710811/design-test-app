import {FoxUiDashboard} from '../dashboard/page-objects/dashboard.po';
import {FoxUiGlobalNav} from '../global-nav.po';
import {FoxUiLoginIdPage} from '../login/page-objects/login.id.po';
import {FoxUiLoginPwPage} from '../login/page-objects/login.pw.po';

let loginPage: FoxUiLoginIdPage;
let pwPage: FoxUiLoginPwPage;
let app: FoxUiGlobalNav;
let dashboard: FoxUiDashboard;

describe('[FOX UI] Work Queue - Queue Selection', () => {

  beforeEach(() => {
    loginPage = new FoxUiLoginIdPage();
    pwPage = new FoxUiLoginPwPage();
    app = new FoxUiGlobalNav();
    dashboard = new FoxUiDashboard();
    loginPage.navigateTo();
  });

  it('Is accessible via the work menu for all but "Security Admin" users', () => {

  });

  it('Is not accessible via the work menu for "Security Admin" users', () => {

  });

  it('Searches for queues by Work Type', () => {

  });

  it('Searches for queues by Work Type & Category', () => {

  });

  it('Searches for queues by Queue Type', () => {

  });

  it('Searches for queues by Work Type, Category & Queue Type', () => {

  });

  it('Starts a FIFO Work Session for "Standard" WQ users', () => {

  });

  it('Navigates to WIP Queues for "Standard" WQ users', () => {

  });

  it('Navigates to WIP Queues for "Enhanced" WQ users', () => {

  });

  it('Navigates to FIFO Queues as if they were WIP Queues for "Enhanced" WQ users', () => {

  });

  it('Tabs through "Queue Selection" page elements in the correct order', () => {

  });
});
