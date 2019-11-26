import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  checkRecoveryRouteLabelRoot,
  checkRecoveryRoutePathRoot,
  claimProcessingRouteLabelRoot,
  claimProcessingRoutePathRoot,
  CommandArgumentGuard,
  communicationRouteLabelRoot,
  communicationRoutePathRoot,
  dashboardRouteLabelRoot,
  dashboardRoutePathRoot,
  documentRepositoryRouteLabelRoot,
  documentRepositoryRoutePathRoot,
  fileMaintenanceRouteLabelRoot,
  fileMaintenanceRoutePathRoot,
  hasAllOf,
  HasReleaseEnableGuard,
  homeRouteLabelRoot,
  homeRoutePathRoot,
  InsufficientAccessPageComponent,
  InvalidParameterPageComponent,
  LoggedInGuard,
  LoggedOutGuard,
  loginRoutePathRoot,
  memberInformationRouteLabelRoot,
  memberInformationRoutePathRoot,
  OP,
  processingRouteLabelRoot,
  processingRoutePathRoot,
  qualityReviewRouteLabelRoot,
  qualityReviewRoutePathRoot,
  RoleResolver,
  securityRouteLabelRoot,
  securityRoutePathRoot,
  workQueueRouteLabelRoot,
  workQueueRoutePathRoot
} from '@fox/shared';
import {FoxUiComponent} from './core/fox-ui/fox-ui.component';

const appRoutes: Routes = [
  {
    path: '',
    canActivate: [LoggedInGuard],
    component: FoxUiComponent,
    children: [
      {
        path: '',
        redirectTo: homeRoutePathRoot,
        pathMatch: 'full'
      },
      {
        path: dashboardRoutePathRoot,
        data: {
          authorityRule: hasAllOf([
            OP.READ_MEMBER
          ]),
          nav: {
            linksToThisPath: [
              {
                label: dashboardRouteLabelRoot
              }
            ]
          }
        },
        resolve: {
          roles: RoleResolver
        },
        children: [
          {
            path: '',
            canLoad: [LoggedInGuard],
            loadChildren: './dashboard/dashboard.module#DashboardModule',
            data: {}
          }
        ]
      },
      {
        path: checkRecoveryRoutePathRoot,
        data: {
          nav: {
            linksToThisPath: [
              {
                label: checkRecoveryRouteLabelRoot
              }
            ]
          }
        },
        resolve: {
          roles: RoleResolver
        },
        children: [
          {
            path: '',
            canLoad: [LoggedInGuard],
            loadChildren: './wrappers/check-recovery-wrapper.module#CheckRecoveryWrapperModule'
          }
        ]
      },
      {
        path: memberInformationRoutePathRoot,
        data: {
          nav: {
            linksToThisPath: [
              {
                label: memberInformationRouteLabelRoot
              }
            ]
          }
        },
        resolve: {
          roles: RoleResolver
        },
        children: [
          {
            path: '',
            canLoad: [LoggedInGuard],
            loadChildren: './wrappers/member-info-wrapper.module#MemberInformationWrapperModule'
          }
        ]
      },
      {
        path: claimProcessingRoutePathRoot,
        data: {
          nav: {
            linksToThisPath: [
              {
                label: claimProcessingRouteLabelRoot
              }
            ]
          }
        },
        resolve: {
          roles: RoleResolver
        },
        children: [
          {
            path: '',
            canLoad: [LoggedInGuard],
            loadChildren: './claim-processing/claim-processing.module#ClaimProcessingModule'
          }
        ]
      },
      {
        path: documentRepositoryRoutePathRoot,
        data: {
          nav: {
            linksToThisPath: [
              {
                label: documentRepositoryRouteLabelRoot
              }
            ]
          }
        },
        resolve: {
          roles: RoleResolver
        },
        children: [
          {
            path: '',
            canLoad: [LoggedInGuard],
            loadChildren: './wrappers/document-repository-wrapper.module#DocumentRepositoryWrapperModule'
          }
        ]
      },
      {
        path: workQueueRoutePathRoot,
        data: {
          nav: {
            linksToThisPath: [
              {
                label: workQueueRouteLabelRoot
              }
            ]
          }
        },
        resolve: {
          roles: RoleResolver
        },
        children: [
          {
            path: '',
            canLoad: [LoggedInGuard],
            loadChildren: './work-queue/work-queue.module#WorkQueueModule'
          }
        ]
      },
      {
        path: 'insufficient-access',
        component: InsufficientAccessPageComponent,
        data: {
          nav: {
            linksToThisPath: [
              {
                pageHeaderConfig: {
                  headerType: 'none'
                },
                hideAssertiveMessages: true,
                identifiers: {screenId: 'SYS-NOPE.00', hasTabs: false, tabs: {}}
              }
            ]
          }
        }
      },
      {
        path: communicationRoutePathRoot,
        canActivate: [HasReleaseEnableGuard],
        canActivateChild: [CommandArgumentGuard],
        data: {
          featureName: 'F3709',
          nav: {
            linksToThisPath: [
              {
                label: communicationRouteLabelRoot
              }
            ]
          }
        },
        resolve: {
          roles: RoleResolver
        },
        children: [
          {
            path: '',
            canLoad: [LoggedInGuard],
            loadChildren: './wrappers/communication-wrapper.module#CommunicationWrapperModule'
          }
        ]
      },
      {
        path: fileMaintenanceRoutePathRoot,
        canActivate: [HasReleaseEnableGuard],
        data: {
          featureName: 'F3709',
          nav: {
            linksToThisPath: [
              {
                label: fileMaintenanceRouteLabelRoot
              }
            ]
          }
        },
        resolve: {
          roles: RoleResolver
        },
        children: [
          {
            path: '',
            canLoad: [LoggedInGuard],
            loadChildren: './wrappers/file-maintenance-wrapper.module#FileMaintenanceWrapperModule'
          }
        ]
      },
      {
        path: processingRoutePathRoot,
        canActivate: [HasReleaseEnableGuard],
        data: {
          featureName: 'F3709',
          nav: {
            linksToThisPath: [
              {
                label: processingRouteLabelRoot
              }
            ]
          }
        },
        resolve: {
          roles: RoleResolver
        },
        children: [
          {
            path: '',
            canLoad: [LoggedInGuard],
            loadChildren: './wrappers/processing-wrapper.module#ProcessingWrapperModule'
          }
        ]
      },
      {
        path: securityRoutePathRoot,
        data: {
          nav: {
            linksToThisPath: [
              {
                label: securityRouteLabelRoot
              }
            ]
          }
        },
        resolve: {
          roles: RoleResolver
        },
        children: [
          {
            path: '',
            canLoad: [LoggedInGuard],
            loadChildren: './security/security.module#SecurityModule'
          }
        ]
      },
      {
        path: qualityReviewRoutePathRoot,
        data: {
          nav: {
            linksToThisPath: [
              {
                label: qualityReviewRouteLabelRoot
              }
            ]
          }
        },
        resolve: {
          roles: RoleResolver
        },
        children: [
          {
            path: '',
            canLoad: [LoggedInGuard],
            loadChildren: './wrappers/quality-review-wrapper.module#QualityReviewWrapperModule'
          }
        ]
      },
      {
        path: homeRoutePathRoot,
        data: {
          nav: {
            linksToThisPath: [
              {
                label: homeRouteLabelRoot
              }
            ]
          }
        },
        resolve: {
          roles: RoleResolver
        },
        children: [
          {
            path: '',
            canLoad: [LoggedInGuard],
            loadChildren: './wrappers/home-wrapper.module#HomeWrapperModule'
          }
        ]
      },
      {
        path: 'invalid-params',
        component: InvalidParameterPageComponent,
        data: {
          nav: {
            linksToThisPath: [
              {
                pageHeaderConfig: {
                  headerType: 'none'
                },
                hideAssertiveMessages: true
              }
            ]
          }
        }
      }
    ]
  },
  {
    path: loginRoutePathRoot,
    canLoad: [LoggedOutGuard],
    loadChildren: './wrappers/login-wrapper.module#LoginWrapperModule'
  },
  {
    path: 'EobMaterialPdfComponent',
    canLoad: [LoggedInGuard],
    loadChildren: './wrappers/eob-material-pdf-wrapper.module#EobMaterialPdfWrapperModule'
  },
  {
    path: 'ClaimSearchPdfComponent',
    canLoad: [LoggedInGuard],
    loadChildren: './wrappers/claim-pdf-wrapper.module#ClaimPdfWrapperModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled', useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
