import {browser, ElementFinder, protractor} from 'protractor';
import {GlobalExpects} from '../global-expects';
import {FoxUiGlobalNav} from '../global-nav.po';
import {FoxUiLoginIdPage} from '../login/page-objects/login.id.po';
import {FoxUiLoginPwPage} from '../login/page-objects/login.pw.po';
import {FoxUiDashboard} from './page-objects/dashboard.po';

let loginPage: FoxUiLoginIdPage;
let pwPage: FoxUiLoginPwPage;
let app: FoxUiGlobalNav;
let dashboard: FoxUiDashboard;

describe('[FOX UI] Statistics - Current Statistics Dashboard', () => {

  beforeEach(() => {
    loginPage = new FoxUiLoginIdPage();
    pwPage = new FoxUiLoginPwPage();
    app = new FoxUiGlobalNav();
    dashboard = new FoxUiDashboard();
    loginPage.navigateTo();
  });

  it('Displays correct menu items for users with only `Service Staff` Granted Authority', () => {
    loginPage.loginWithCredentials(browser.params.foxtusr1, browser.params.foxtusr1password).then(() => {
      app.commandBarEnter('OS').then(() => {
        // The logout button should be hidden
        expect(app.logoutAnchor.isPresent()).toBe(false);

        // The dashboard menu should have the service staff options, and the supervisor options should not be present
        app.menuToggleAnchor.click().then(() => {
          const EC = protractor.ExpectedConditions;
          browser.wait(EC.elementToBeClickable(app.claimMenuCategory));
          app.claimMenuCategory.click().then(() => {
            expect(app.bypassQueueMenuItem.isPresent()).toBe(true);
            expect(app.bypassManagementMenuItem.isPresent()).toBe(false);
            expect(app.memberLookupQueueMenuItem.isPresent()).toBe(true);
            // The dashboard menu should have the service staff options, and the supervisor options should not be present
            app.dashboardMenuCategory.click().then(() => {
              expect(app.currentStatsMenuItem.isPresent()).toBe(true);
              app.dashboardMenuCategory.click().then(() => {
                app.logout('Foxtest1 User1');
              });
            });
          });
        });
      });
    });
  });

  // This test should run fine in both mock and remote, but the user who has this permission is
  // constantly in flux on remote. Rather than play whack-a-mole, we comment it out here.
 // xit('Displays correct menu items for users with only `Claims Supervisor` Granted Authority', () => {
 //   loginPage.loginWithCredentials(browser.params.foxtusrc, browser.params.foxtusrcpassword).then(() => {
 //
 //     // The logout button should be hidden
 //     expect(app.logoutAnchor.isPresent()).toBe(false);
 //
 //     app.menuToggleAnchor.click().then(() => {
 //       browser.sleep(500);
 //       app.claimMenuCategory.click().then(() => {
 //         expect(app.bypassQueueMenuItem.isPresent()).toBe(false);
 //         expect(app.bypassManagementMenuItem.isPresent()).toBe(true);
 //         expect(app.memberLookupQueueMenuItem.isPresent()).toBe(false);
 //       });
 //     });
 //
 //     app.dashboardMenuCategory.click().then(() => {
 //       expect(app.currentStatsMenuItem.isPresent()).toBe(true);
 //       app.dashboardMenuCategory.click().then(() => {
 //         // Then we logout
 //         browser.sleep(500);
 //         app.userDropdownButton.click().then(() => {
 //           browser.sleep(500);
 //
 //           // the specific username should be present
 //           expect(app.usernameLabel.isPresent()).toBe(true);
 //           expect(app.usernameLabel.getText()).toMatch('Foxtestc Userc');
 //
 //           app.logout().then(() => {
 //             // Username input should be empty
 //             expect(loginPage.username).toEqual('');
 //           });
 //
 //         });
 //       });
 //     });
 //   });
 // });

  it('Displays correct menu items for users with `Service Staff` and `Claims Supervisor` Granted Authorities', () => {
    loginPage.loginWithCredentials(browser.params.foxtusr6, browser.params.foxtusr6password).then(() => {
      app.commandBarEnter('OS').then(() => {
        app.menuToggleAnchor.click().then(() => {
          const EC = protractor.ExpectedConditions;
          browser.wait(EC.elementToBeClickable(app.claimMenuCategory));
          app.claimMenuCategory.click().then(() => {
            expect(app.memberLookupQueueMenuItem.isPresent()).toBe(true);
            expect(app.bypassQueueMenuItem.isPresent()).toBe(true);
            expect(app.bypassManagementMenuItem.isPresent()).toBe(true);
            app.dashboardMenuCategory.click().then(() => {
              expect(app.currentStatsMenuItem.isPresent()).toBe(true);
              app.dashboardMenuCategory.click().then(() => {
                // Then we logout
                app.logout('Foxtest6 User6');
              });
            });
          });
        });
      });
      // The logout button should be hidden
      expect(app.logoutAnchor.isPresent()).toBe(false);
    });
  });

  it('Tabs through "Current Statistics" page elements in the correct order', () => {
    loginPage.loginWithCredentials(browser.params.foxtusr6, browser.params.foxtusr6password).then(() => {
      app.commandBarEnter('OS').then(() => {
        expect(app.userDropdownButton.isPresent()).toBe(true);

        // The logout button should be hidden
        expect(app.logoutAnchor.isPresent()).toBe(false);

        dashboard.messageBoxesCloseButton.asElementFinders_()
          .then((efs: ElementFinder[]) => {
            GlobalExpects.closeMessageBoxes(efs);
          })
          .then(() => {
            browser.driver.sleep(2000);
            browser.actions().sendKeys(protractor.Key.HOME).perform();
          }).catch((e) => {

        });

        dashboard.pageNumAnchors.asElementFinders_().then((efs: ElementFinder[]) => {
          const tabOrderedElements = [
            app.cmdInput,
            dashboard.reportsButton,
            dashboard.teamMatSelect,
            dashboard.userMatSelect,
            dashboard.timeframeMatSelect,
            dashboard.startDateInput,
            dashboard.endDateInput,
            dashboard.updateTimeframeButton,
            dashboard.teamSortTh,
            dashboard.userSortTh,
            dashboard.lookupsSortTh,
            dashboard.hoursSortTh,
            dashboard.matchSortTh,
            dashboard.noMatchSortTh,
            dashboard.totalSortTh,
            dashboard.pageSizeMatSelect,
            ...efs,
            dashboard.nextPageAnchor
          ];

          GlobalExpects.expectTabOrder(tabOrderedElements);
          // The intention with the below lines was to show that we cycle through, but due to browser quirks, it looks like it's not working.
          //
          // expect(tabOrderedElements[0].getAttribute('id')).toEqual(
          //  browser.driver.switchTo().activeElement().getAttribute('id'));
        });
        app.logout('Foxtest6 User6');
      });
    });

  });
});
