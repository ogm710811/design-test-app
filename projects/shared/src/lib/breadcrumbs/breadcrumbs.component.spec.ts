import {Component, DebugElement, NgZone, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {BreadcrumbsComponent} from './breadcrumbs.component';
import {MessageBoxService} from '../message-box/message-box.service';
import {NotifyFooter} from '../notify-footer/notify-footer.service';
import {ProgressContextService} from '../progress-aware-container/progress-context.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FeatureFlagService} from '../feature-flag-service/feature-flag.service';
import {LoginService} from '../login-service/login.service';
import {StoreModule} from '@ngrx/store';
import {loginReducer, snackbarReducer} from '@fox/state-management';

@Component({
  selector: `fox-test-breadcrumbs-root`,
  template: `
    <fox-breadcrumbs></fox-breadcrumbs>
    <router-outlet></router-outlet>`
})
export class RootWithBreadcrumbsComponent {
  @ViewChild(BreadcrumbsComponent) breadcrumbs: any;
}

@Component({
  selector: `fox-just-router-outlet`,
  template: `
    <router-outlet></router-outlet>`
})
export class JustARouterOutletComponent {
}

@Component({
  selector: `fox-terminal-route`,
  template: `
    <router-outlet></router-outlet>`
})
export class TerminalRouteComponent {
}

describe('Breadcrumbs Component', () => {
  function zoned(fn: any): void {
    zone = TestBed.get(NgZone);
    zone.run(fn);
  }

  function onNavigationEnd(fn: any): void {
    zoned(() => {
      router = TestBed.get(Router);
      router.events.subscribe((ev) => {
        if (ev instanceof NavigationEnd) {
          fixture.detectChanges();
          fn();
        }
      });
    });
  }

  let component: RootWithBreadcrumbsComponent;
  let fixture: ComponentFixture<RootWithBreadcrumbsComponent>;
  let router: Router;
  let bc: DebugElement;
  let home: any, currentPage: any, links: any;
  let zone: NgZone;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BreadcrumbsComponent,
        RootWithBreadcrumbsComponent,
        JustARouterOutletComponent,
        TerminalRouteComponent,
      ],
      providers: [
        MessageBoxService,
        ProgressContextService,
        NotifyFooter,
        LoginService,
        {
          provide: NgZone,
          useFactory: () => {
            return new NgZone({enableLongStackTrace: true});
          }
        }
      ],
      imports: [StoreModule.forRoot({message: snackbarReducer, loggedIn: loginReducer}),
        HttpClientTestingModule, RouterTestingModule.withRoutes([
        {
          path: 'altRoot',
          component: RootWithBreadcrumbsComponent,
          children: [
            {
              path: '',
              redirectTo: '1',
              pathMatch: 'full'
            },
            {
              path: '1',
              component: TerminalRouteComponent,
              data: {
                nav: {
                  linksToThisPath: [
                    {
                      label: 'The First',
                    }
                  ]
                }
              }
            }
          ]
        },
        {
          path: '',
          component: RootWithBreadcrumbsComponent,
          children: [
            {
              path: '',
              redirectTo: '1',
              pathMatch: 'full'
            },
            {
              path: '1',
              component: JustARouterOutletComponent,
              data: {
                nav: {
                  linksToThisPath: [
                    {
                      label: 'The First',
                    }
                  ]
                }
              },
              children: [
                {
                  path: 'a',
                  data: {
                    nav: {
                      linksToThisPath: [
                        {
                          label: 'Component A',
                        }
                      ]
                    }
                  },
                  component: TerminalRouteComponent
                },
                {
                  path: 'b',
                  data: {
                    nav: {
                      linksToThisPath: [
                        {
                          label: 'Component B',
                        }
                      ]
                    }
                  },
                  component: TerminalRouteComponent
                }
              ]
            },
            {
              path: '2',
              data: {
                nav: {
                  linksToThisPath: [
                    {
                      label: 'The Second',
                    }
                  ]
                }
              },
              component: TerminalRouteComponent
            },
          ]
        }
      ])]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(RootWithBreadcrumbsComponent);
      component = fixture.componentInstance;
      router = TestBed.get(Router);
      zoned(() => router.initialNavigation());
      onNavigationEnd(() => {
        bc = fixture.debugElement.query(By.directive(BreadcrumbsComponent));
        home = bc.nativeElement.querySelector('.nav-home');
        currentPage = fixture.debugElement.query(By.css('.span-current-page'));
        links = fixture.debugElement.queryAll(By.css('.txt-blue'));
      });
    });
  }));

  it('displays the breadcrumbs as `Home > The First` for the initial page load', () => {
    onNavigationEnd(() => {
      expect((home as any).textContent).toEqual('Home');
      expect(links.length).toEqual(0);
      expect((currentPage as any).textContent).toEqual('The First');
    });
  });

  it('displays the breadcrumbs as `Home > The First > Component A` when navigating to `1/a`', () => {
    onNavigationEnd(() => {
      router.navigateByUrl('1/a');
      onNavigationEnd(() => {
        expect((home as any).textContent).toEqual('Home');
        expect(links.length).toEqual(1);
        expect((links as any)[0].textContent).toEqual('The First');
        expect((currentPage as any).textContent).toEqual('Component A');
      });
    });
  });

  it('displays the breadcrumbs as `Home > The First > Component B` when navigating to `1/b`', () => {
    onNavigationEnd(() => {
      router.navigateByUrl('1/b');
      onNavigationEnd(() => {
        expect((home as any).textContent).toEqual('Home');
        expect(links.length).toEqual(1);
        expect((links as any)[0].textContent).toEqual('The First');
        expect((currentPage as any).textContent).toEqual('Component B');
      });
    });
  });

  it('displays the breadcrumbs as `Home > The Second` when navigating to `2`', () => {
    onNavigationEnd(() => {
      router.navigateByUrl('2');
      onNavigationEnd(() => {
        expect((home as any).textContent).toEqual('Home');
        expect(links.length).toEqual(0);
        expect((currentPage as any).textContent).toEqual('The Second');
      });
    });
  });

  it('displays the breadcrumbs as `Home > The First` for the initial page load, then `Home > The Second`, then `Home > The First` again', () => {
    onNavigationEnd(() => {
      expect((home as any).textContent).toEqual('Home');
      expect(links.length).toEqual(0);
      expect((currentPage as any).textContent).toEqual('The First');
      router.navigateByUrl('2');
      onNavigationEnd(() => {
        expect((home as any).textContent).toEqual('Home');
        expect(links.length).toEqual(0);
        expect((currentPage as any).textContent).toEqual('The Second');
        router.navigateByUrl('altRoot/1');
        onNavigationEnd(() => {
          expect((home as any).textContent).toEqual('Home');
          expect(links.length).toEqual(0);
          expect((currentPage as any).textContent).toEqual('The First');
        });
      });
    });
  });
});
