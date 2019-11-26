import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  dashboardRouteLabelCurrentStats,
  dashboardRouteLabelDefaultAuthComb,
  dashboardRouteLabelDefaultAuthLimit,
  dashboardRouteLabelDefaultFile,
  dashboardRouteLabelDefaultOverridePendingVerification,
  dashboardRouteLabelDefaultSetQlty,
  dashboardRouteLabelDefaultSetQltyComb,
  dashboardRouteLabelDefaultTransSecurity,
  dashboardRouteLabelOperatorAuthComb,
  dashboardRouteLabelOperatorAuthLimit,
  dashboardRouteLabelOperatorAuthPlanOne,
  dashboardRouteLabelOperatorAuthPlanTwo,
  dashboardRouteLabelOperatorFile,
  dashboardRouteLabelOperatorInfo,
  dashboardRouteLabelOperatorSetQuality,
  dashboardRouteLabelOperatorTransSecurityOne,
  dashboardRouteLabelOperatorTransSecurityTwo,
  dashboardRouteLabelOperSelection,
  dashboardRouteLabelOperTransSecDflt1,
  dashboardRouteLabelOperTransSecDflt2,
  dashboardRouteLabelReplaceEob,
  dashboardRouteLabelSetQualityCombinationMaintenance,
  dashboardRouteLabelSetQualityCombinationOverride,
  dashboardRouteLabelSetQualityOverride,
  dashboardRouteLabelSetQualityTempAssign,
  dashboardRouteLabelSetQualityTempExclusions,
  dashboardRouteLabelTempAuthComb,
  dashboardRouteLabelTempAuthLimit,
  dashboardRouteLabelTempSetQlty,
  dashboardRouteLabelTempSetQltyComb,
  dashboardRouteLabelTempSetQltyTemplate,
  dashboardRoutePathCurrentStats,
  dashboardRoutePathDefaultAuthComb,
  dashboardRoutePathDefaultAuthLimit,
  dashboardRoutePathDefaultFile,
  dashboardRoutePathDefaultOverridePendingVerification,
  dashboardRoutePathDefaultSetQlty,
  dashboardRoutePathDefaultSetQltyComb,
  dashboardRoutePathDefaultTransSecurity,
  dashboardRoutePathOperatorAuthComb,
  dashboardRoutePathOperatorAuthLimit,
  dashboardRoutePathOperatorAuthPlanOne,
  dashboardRoutePathOperatorAuthPlanTwo,
  dashboardRoutePathOperatorFile,
  dashboardRoutePathOperatorInfo,
  dashboardRoutePathOperatorSetQuality,
  dashboardRoutePathOperatorTransSecurityOne,
  dashboardRoutePathOperatorTransSecurityTwo,
  dashboardRoutePathOperSelection,
  dashboardRoutePathOperTransSecDflt1,
  dashboardRoutePathOperTransSecDflt2,
  dashboardRoutePathReplaceEob,
  dashboardRoutePathSetQualityCombinationMaintenance,
  dashboardRoutePathSetQualityCombinationOverride,
  dashboardRoutePathSetQualityOverride,
  dashboardRoutePathSetQualityTempAssign,
  dashboardRoutePathSetQualityTempExclusions,
  dashboardRoutePathTempAuthComb,
  dashboardRoutePathTempAuthLimit,
  dashboardRoutePathTempSetQlty,
  dashboardRoutePathTempSetQltyComb,
  dashboardRoutePathTempSetQltyTemplate,
  DeActManAdjGuard,
  has,
  HasReleaseEnableGuard,
  ManAdjGuard,
  ManAdjMulWindow1Component,
  ManAdjMulWindowComponent,
  ManAdjMulWindowErrMsgComponent,
  OP,
  RoleResolver
} from '@fox/shared';
import {AdjAccDeniedComponent} from './adj-acc-denied/adj-acc-denied.component';
import {CurrentStatisticsComponent} from './current-statistics/current-statistics.component';
import {DefaultMaintenanceMenuComponent} from './default-file-maintenance/default-maintenance-menu.component';
import {DfltOvrdPendVerfServiceComponent} from './default-file-maintenance/df-maintenance-details/default-override-pending-verification/default-override-pending-verification.component';
import {OpDftAuthCombComponent} from './default-file-maintenance/df-maintenance-details/op-dft-auth-comb/op-dft-auth-comb.component';
import {OpDftAuthLimitComponent} from './default-file-maintenance/df-maintenance-details/op-dft-auth-limit/op-dft-auth-limit.component';
import {OpDftSetQualityCombComponent} from './default-file-maintenance/df-maintenance-details/op-dft-set-quality-comb/op-dft-set-quality-comb.component';
import {OpDftSetQualityComponent} from './default-file-maintenance/df-maintenance-details/op-dft-set-quality/op-dft-set-quality.component';
import {OpDftTransSecurityComponent} from './default-file-maintenance/df-maintenance-details/op-dft-trans-security/op-dft-trans-security.component';
import {OperatorTransactionSecDefault1Component} from './default-file-maintenance/df-maintenance-details/operator-transaction-security-default/operator-transaction-security-default-1/operator-transaction-security-default-1.component';
import {OperatorTransactionSecDefault2Component} from './default-file-maintenance/df-maintenance-details/operator-transaction-security-default/operator-transaction-security-default-2/operator-transaction-security-default-2.component';
import {SetQualityCombDefaultComponent} from './default-file-maintenance/df-maintenance-details/set-quality-comb-default-new/set-quality-comb-default.component';
import {SetQualityOverrideComponent} from './default-file-maintenance/df-maintenance-details/set-quality-overrides/set-quality-override.component';
import {TemplateAssignmentComponent} from './default-file-maintenance/df-maintenance-details/set-quality-template-assignments/set-quality-template-assignments.component';
import {TemplateExclusionsComponent} from './default-file-maintenance/df-maintenance-details/set-quality-template-exclusions/set-quality-template-exclusions.component';
import {TempAuthCombComponent} from './default-file-maintenance/df-maintenance-details/temp-auth-comb/temp-auth-comb.component';
import {TempAuthLimitComponent} from './default-file-maintenance/df-maintenance-details/temp-auth-limit/temp-auth-limit.component';
import {TempSetQualityCombComponent} from './default-file-maintenance/df-maintenance-details/temp-set-quality-comb/temp-set-quality-comb.component';
import {TempSetQualityTemplateComponent} from './default-file-maintenance/df-maintenance-details/temp-set-quality-template/temp-set-quality-template.component';
import {TempSetQualityComponent} from './default-file-maintenance/df-maintenance-details/temp-set-quality/temp-set-quality.component';
import {FoxComponentsDemoComponent} from './fox-components-demo/fox-components-demo.component';
import {FoxInputDemoComponent} from './fox-input-demo/fox-input-demo.component';
import {OpAuthCombComponent} from './op-maintenance/op-maintenance-details/op-auth-comb/op-auth-comb.component';
import {OpAuthLimitComponent} from './op-maintenance/op-maintenance-details/op-auth-limit/op-auth-limit.component';
import {OpAuthPlanOneComponent} from './op-maintenance/op-maintenance-details/op-auth-plan/op-auth-plan-one/op-auth-plan-one.component';
import {OpAuthPlanTwoComponent} from './op-maintenance/op-maintenance-details/op-auth-plan/op-auth-plan-two/op-auth-plan-two.component';
import {OpInfoComponent} from './op-maintenance/op-maintenance-details/op-info/op-info.component';
import {OperatorSelectionComponent} from './op-maintenance/op-maintenance-details/op-selection/op-selection.component';
import {OpSetQualityComponent} from './op-maintenance/op-maintenance-details/op-set-quality/op-set-quality.component';
import {OpTransSecurityOneComponent} from './op-maintenance/op-maintenance-details/op-trans-security/op-trans-security-one/op-trans-security-one.component';
import {OpTransSecurityTwoComponent} from './op-maintenance/op-maintenance-details/op-trans-security/op-trans-security-two/op-trans-security-two.component';
import {SetQualityCombinationComponent} from './op-maintenance/op-maintenance-details/set-quality-combination-maintenance/set-quality-combination-maintenance.component';
import {OperatorMaintenanceMenuComponent} from './op-maintenance/operator-maintenance-menu.component';
import {PageHeaderDemoManualClaimsComponent} from './page-header-demo-manual-claims/page-header-demo-manual-claims.component';
import {PageHeaderDemoComponent} from './page-header-demo/page-header-demo.component';
import {ReplaceEobComponent} from './replace-eob/replace-eob.component';
import {TableDemoComponent} from './table-demo/table-demo.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: dashboardRoutePathCurrentStats,
    pathMatch: 'full',
    resolve: {
      roles: RoleResolver
    }
  },
  {
    path: dashboardRoutePathCurrentStats,
    component: CurrentStatisticsComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelCurrentStats,
            // The below code is being kept commented because it is ambiguous whether it's intended to use the new or old
            // header on this page, so a new config given the new header properties is listed below
            //
            // pageHeaderConfig: {
            //   headerType: 'old',
            //   hideHeader: true,
            //   hideBreadcrumbs: false
            // },
            identifiers: {screenId: 'SAT-MBLK.00', hasTabs: false, tabs: {}},
            pageHeaderConfig: {
              headerType: 'new',
              tabTitles: [
                {tabName: 'Production Info'},
                {tabName: 'Queue Statistics', authorityRule: has(OP.REASSIGN_MEMBER_LOOKUP)}
              ]
            }
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathOperatorFile,
    component: OperatorMaintenanceMenuComponent,
    canActivate: [HasReleaseEnableGuard],
    data: {
      nav: {
        featureName: 'F3709',
        linksToThisPath: [
          {
            label: dashboardRouteLabelOperatorFile,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            identifiers: {screenId: 'SAT-PA70.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathDefaultFile,
    component: DefaultMaintenanceMenuComponent,
    canActivate: [HasReleaseEnableGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelDefaultFile,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            identifiers: {screenId: 'FLM-PA82.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathReplaceEob,
    component: ReplaceEobComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelReplaceEob,
            pageHeaderConfig: {
              headerType: 'old',
              hideHeader: true,
              hideBreadcrumbs: false
            }
          }
        ]
      }
    }
  },
  {
    path: 'table-demo',
    component: TableDemoComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: 'Table Demo',
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathOperatorInfo,
    component: OpInfoComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelOperatorInfo,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            identifiers: {screenId: 'FLM-PA72.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathOperatorAuthLimit,
    component: OpAuthLimitComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelOperatorAuthLimit,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            identifiers: {screenId: 'FLM-PA73.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathOperatorAuthPlanOne,
    component: OpAuthPlanOneComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelOperatorAuthPlanOne,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: false,
              hideBreadcrumbs: false
            },
            identifiers: {screenId: 'FLM-PA67.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathOperatorAuthPlanTwo,
    component: OpAuthPlanTwoComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelOperatorAuthPlanTwo,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: false,
              hideBreadcrumbs: false
            },
            identifiers: {screenId: 'FLM-PA90.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathOperatorTransSecurityOne,
    component: OpTransSecurityOneComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelOperatorTransSecurityOne,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            identifiers: {screenId: 'FLM-PA75.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathOperatorTransSecurityTwo,
    component: OpTransSecurityTwoComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelOperatorTransSecurityTwo,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            identifiers: {screenId: 'FLM-PA76.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathOperatorAuthComb,
    component: OpAuthCombComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelOperatorAuthComb,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            identifiers: {screenId: 'FLM-PA74.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathOperSelection,
    component: OperatorSelectionComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelOperSelection,
            identifiers: {screenId: 'FLM-PA71.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathDefaultAuthComb,
    component: OpDftAuthCombComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelDefaultAuthComb,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            }
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathDefaultAuthLimit,
    component: OpDftAuthLimitComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelDefaultAuthLimit,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: false,
              hideBreadcrumbs: false
            },
            identifiers: {screenId: 'FLM-PA83.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathDefaultSetQlty,
    component: OpDftSetQualityComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelDefaultSetQlty,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            }
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathDefaultSetQltyComb,
    component: OpDftSetQualityCombComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelDefaultSetQltyComb,
            identifiers: {screenId: 'FLM-PA86.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathDefaultTransSecurity,
    component: OpDftTransSecurityComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelDefaultTransSecurity
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathTempAuthComb,
    component: TempAuthCombComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelTempAuthComb,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            }
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathTempAuthLimit,
    component: TempAuthLimitComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelTempAuthLimit
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathTempSetQlty,
    component: TempSetQualityComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelTempSetQlty
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathTempSetQltyComb,
    component: TempSetQualityCombComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelTempSetQltyComb,
            pageHeaderConfig: {
              headerType: 'old',
              hideHeader: true,
              hideBreadcrumbs: false
            }
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathTempSetQltyTemplate,
    component: TempSetQualityTemplateComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelTempSetQltyTemplate,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            identifiers: {screenId: 'FLM-PA79.00', hasTabs: false, tabs: {}}

          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathOperatorSetQuality,
    component: OpSetQualityComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelOperatorSetQuality,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: false,
              hideBreadcrumbs: false
            },
            identifiers: {screenId: 'FLM-PA77.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },

  {
    path: dashboardRoutePathOperTransSecDflt1,
    component: OperatorTransactionSecDefault1Component,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelOperTransSecDflt1,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathOperTransSecDflt2,
    component: OperatorTransactionSecDefault2Component,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelOperTransSecDflt2
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathSetQualityTempExclusions,
    component: TemplateExclusionsComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelSetQualityTempExclusions
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathSetQualityTempAssign,
    component: TemplateAssignmentComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: dashboardRouteLabelSetQualityTempAssign
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathSetQualityCombinationOverride,
    component: SetQualityCombDefaultComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            label: dashboardRouteLabelSetQualityCombinationOverride
          }
        ]
      },
      action: 'OptionK'
    }
  },
  {
    path: 'input-demo',
    component: FoxInputDemoComponent
  },
  {
    path: 'page-header-demo',
    component: PageHeaderDemoComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'new',
              tabTitles: ['First Tab', '2nd Tab', 'Third Tab', 'Fourth Tab', 'Fifth Tab'],
              xsPrimaryTabCount: 2,           // Optional(By default 2 tabs), Number of tabs to be shown in 'xs' screen before More dropdown
              smPrimaryTabCount: 3           // Optional(By default 3 tabs), Number of tabs to be shown in 'sm' screen before More dropdown
            },
            label: 'Page Header Demo'
          }
        ]
      }
    }
  },
  {
    path: 'page-header-demo-manual-claims',
    component: PageHeaderDemoManualClaimsComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: 'Manual Claims Page Header Demo',
            pageHeaderConfig: {
              headerType: 'new'
            }
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathSetQualityOverride,
    component: SetQualityOverrideComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            label: dashboardRouteLabelSetQualityOverride
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathDefaultOverridePendingVerification,
    component: DfltOvrdPendVerfServiceComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            label: dashboardRouteLabelDefaultOverridePendingVerification
          }
        ]
      }
    }
  },
  {
    path: dashboardRoutePathSetQualityCombinationMaintenance,
    component: SetQualityCombDefaultComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            label: dashboardRouteLabelSetQualityCombinationOverride
          }
        ]
      }
    }
  },
  {
    path: 'components-demo',
    component: FoxComponentsDemoComponent
  },
  {
    path: 'man-adj-mul-window',
    component: ManAdjMulWindowComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: 'Manual Adjudication'
          }
        ]
      }
    }
  },
  {
    path: 'man-adj-mul-window/:id',
    component: ManAdjMulWindow1Component,
    canActivate: [ManAdjGuard],
    canDeactivate: [DeActManAdjGuard]
  },
  {
    path: 'errorMsg',
    component: ManAdjMulWindowErrMsgComponent
  },
  {
    path: 'adjAccessDenied',
    component: AdjAccDeniedComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {
}
