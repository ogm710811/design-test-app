import {browser, by, element, ElementFinder, promise as wdp, protractor} from 'protractor';
import {loginUrlOnLoggedOut} from '@fox/shared';
import {FoxUiLoginIdPage} from './login/page-objects/login.id.po';

export class FoxUiGlobalNav {

  private inputIdCmd = 'com1';
  private inputIdMem = 'memid';
  private inputIdRec = 'claimid';
  private inputIdComm = 'commid';

  private labelIdWork = 'fox-header-work-menu-label';

  private buttonUserDropdown = 'btn-user-dropdown';
  private labelClassUsername = 'lbl-username';
  private anchorIdLogout = 'link-logout';
  private btnIdViewQueues = 'btn-view-all-queues';
  private btnIdViewWorkbench = 'btn-view-workbench';
  private bumbleBeeDropdown = 'fox-header-menu-bumble-bee';

  private anchorClassMenu = 'btn-menu';
  private divClassDash = 'btn-nav-dashboard';
  private divIdCurrentStats = 'menu-item-current-stats';

  private divClassClaim = 'btn-nav-claim';
  private divIdClaimSearch = 'menu-item-claim-search';
  private divIdClaimHistory = 'menu-item-claim-history';
  private divIdClaimDup = 'menu-item-claim-dup';
  private divIdMemberQueue = 'menu-item-mbr-que';
  private divIdBypassQueue = 'menu-item-bypass-que';
  private divIdBypassManagement = 'menu-item-bypass-mgmt';

  private divClassCheck = 'btn-nav-check';
  private divIdFindCheck = 'menu-item-check-find';
  private divIdDepositFileVerification = 'menu-item-deposit-file-ver';
  private divIdManualEntry = 'menu-item-manual-entry';
  private divIdTrc = 'menu-item-trc';

  private divClassMember = 'btn-nav-member';
  private divIdMemberSearch = 'menu-item-mbr-search';
  private divIdProviderSearch = 'menu-item-prov-search';
  private divIdMemberEob = 'menu-item-mbr-eob';

  private divClassDoc = 'btn-nav-doc';
  private divIdDocSearch = 'menu-item-doc-search';
  private divIdDocUpload = 'menu-item-doc-upload';

  private loginPage: FoxUiLoginIdPage = new FoxUiLoginIdPage();

  get cmdInput(): ElementFinder {
    return element(by.id(this.inputIdCmd));
  }

  get memInput(): ElementFinder {
    return element(by.id(this.inputIdMem));
  }

  get recInput(): ElementFinder {
    return element(by.id(this.inputIdRec));
  }

  get commInput(): ElementFinder {
    return element(by.id(this.inputIdComm));
  }

  get workMenuLabel(): ElementFinder {
    return element(by.id(this.labelIdWork));
  }

  get userDropdownButton(): ElementFinder {
    return element(by.className(this.buttonUserDropdown));
  }

  get usernameLabel(): ElementFinder {
    return element(by.className(this.labelClassUsername));
  }

  get logoutAnchor(): ElementFinder {
    return element(by.className(this.anchorIdLogout));
  }

  get bumbleBeeMenu(): ElementFinder {
    return element(by.className(this.bumbleBeeDropdown));
  }

  get menuToggleAnchor(): ElementFinder {
    return element(by.className(this.anchorClassMenu));
  }

  get viewAllQueuesButton(): ElementFinder {
    return element(by.id(this.btnIdViewQueues));
  }

  get viewMyWorkbenchButton(): ElementFinder {
    return element(by.id(this.btnIdViewWorkbench));
  }

  get dashboardMenuCategory(): ElementFinder {
    return element(by.className(this.divClassDash));
  }

  get currentStatsMenuItem(): ElementFinder {
    return element(by.id(this.divIdCurrentStats));
  }

  get claimMenuCategory(): ElementFinder {
    return element(by.className(this.divClassClaim));
  }

  get claimSearchMenuItem(): ElementFinder {
    return element(by.id(this.divIdClaimSearch));
  }

  get claimHistoryMenuItem(): ElementFinder {
    return element(by.id(this.divIdClaimHistory));
  }

  get claimDuplicateMenuItem(): ElementFinder {
    return element(by.id(this.divIdClaimDup));
  }

  get memberLookupQueueMenuItem(): ElementFinder {
    return element(by.id(this.divIdMemberQueue));
  }

  get bypassQueueMenuItem(): ElementFinder {
    return element(by.id(this.divIdBypassQueue));
  }

  get bypassManagementMenuItem(): ElementFinder {
    return element(by.id(this.divIdBypassManagement));
  }

  get checkMenuCategory(): ElementFinder {
    return element(by.className(this.divClassCheck));
  }

  get findCheckMenuItem(): ElementFinder {
    return element(by.id(this.divIdFindCheck));
  }

  get depositFileVerificationMenuItem(): ElementFinder {
    return element(by.id(this.divIdDepositFileVerification));
  }

  get manualEntryMenuItem(): ElementFinder {
    return element(by.id(this.divIdManualEntry));
  }

  get trcMenuItem(): ElementFinder {
    return element(by.id(this.divIdTrc));
  }

  get memberMenuCategory(): ElementFinder {
    return element(by.className(this.divClassMember));
  }

  get memberSearchMenuItem(): ElementFinder {
    return element(by.id(this.divIdMemberSearch));
  }

  get providerSearchMenuItem(): ElementFinder {
    return element(by.id(this.divIdProviderSearch));
  }

  get memberEobMenuItem(): ElementFinder {
    return element(by.id(this.divIdMemberEob));
  }

  get docMenuCategory(): ElementFinder {
    return element(by.className(this.divClassDoc));
  }

  get docSearchMenuItem(): ElementFinder {
    return element(by.id(this.divIdDocSearch));
  }

  get docUploadMenuItem(): ElementFinder {
    return element(by.id(this.divIdDocUpload));
  }

  get cmd(): any {
    return this.cmdInput.getAttribute('value');
  }

  set cmd(c) {
    this.cmdInput.clear();
    if (c) {
      this.cmdInput.sendKeys(c);
    }
  }

  get mem(): any {
    return this.memInput.getAttribute('value');
  }

  set mem(c) {
    this.memInput.clear();
    if (c) {
      this.memInput.sendKeys(c);
    }
  }

  get rec(): any {
    return this.recInput.getAttribute('value');
  }

  set rec(c) {
    this.recInput.clear();
    if (c) {
      this.recInput.sendKeys(c);
    }
  }

  get comm(): any {
    return this.commInput.getAttribute('value');
  }

  set comm(c) {
    this.commInput.clear();
    if (c) {
      this.commInput.sendKeys(c);
    }
  }

  static pressTab() {
    browser.driver.switchTo().activeElement().sendKeys(protractor.Key.TAB);
  }

  commandBarEnter(cmd, mem?, rec?, comm?): wdp.Promise<void> {
    this.cmd = cmd;
    if (mem) { this.mem = mem; }
    if (rec) { this.rec = rec; }
    if (comm) { this.comm = comm; }
    return this.cmdInput.sendKeys(protractor.Key.ENTER);
  }

  logout(expectedUser?: string): wdp.Promise<void> {
    const EC = protractor.ExpectedConditions;
    return browser.wait(EC.elementToBeClickable(this.userDropdownButton)).then(() => {
      return this.userDropdownButton.click().then(() => {
        return browser.wait(EC.presenceOf(this.logoutAnchor)).then(() => {
          // the specific username should be present
          expect(this.usernameLabel.isPresent()).toBe(true);

          if (expectedUser) {
            expect(this.usernameLabel.getText()).toMatch(expectedUser);
          }

          return browser.wait(EC.elementToBeClickable(this.logoutAnchor)).then(() => {
            return this.logoutAnchor.click().then(() => {
              browser.wait(EC.urlContains(loginUrlOnLoggedOut));
              expect(browser.getCurrentUrl()).toMatch(new RegExp('.*' + loginUrlOnLoggedOut + '.*'));
            });
          });
        });

      }).then(() => {
        // Username input should be empty
        expect(this.loginPage.username).toEqual('');
      });
    });
  }

}
