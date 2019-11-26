import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  securityRouteLabelClaimNumberFileMaintenance,
  securityRouteLabelOperationStatusSecurity,
  securityRouteLabelOperatorStatistics,
  securityRouteLabelOperatorStatisticsTotals,
  securityRouteLabelPlanTypeOfServiceMaintenance1,
  securityRouteLabelPlanTypeOfServiceMaintenance2,
  securityRouteLabelReviewOperatorStatistics,
  securityRoutePathClaimNumberFileMaintenance,
  securityRoutePathOperationStatusSecurity,
  securityRoutePathOperatorStatistics,
  securityRoutePathOperatorStatisticsTotals,
  securityRoutePathPlanTypeOfServiceMaintenance1,
  securityRoutePathPlanTypeOfServiceMaintenance2,
  securityRoutePathReviewOperatorStatistics
} from '@fox/shared';
import {ClaimNumberFileMaintenanceComponent} from './claim-number-file-maintenance/claim-number-file-maintenance.component';
import {ReviewOperatorStaticsComponent} from './operator-status/review/review-operator-statics.component';
import {OperatorStatisticsComponent} from './operator-status/stat/operator-statistics.component';
import {OperstatsyssecurComponent} from './operator-status/sys-security/operstatsyssecur.component';
import {OperatorStaticsTotalsComponent} from './operator-status/totals/operator-statics-totals.component';
import {PlanTypeOfServiceMaintenance1Component} from './plan-type-of-service/type-of-service-maintenance-1/plan-type-of-service-maintenance1.component';
import {PlanTypeOfServiceMaintenance2Component} from './plan-type-of-service/type-of-service-maintenance-2/plan-type-of-service-maintenance2.component';

const ProcessingRoutes: Routes = [
  {
    path: '',
    redirectTo: securityRoutePathClaimNumberFileMaintenance
  },
  {
    path: securityRoutePathClaimNumberFileMaintenance,
    component: ClaimNumberFileMaintenanceComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: securityRouteLabelClaimNumberFileMaintenance,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: false,
              hideBreadcrumbs: false
            },
            identifiers: {screenId: 'FLM-PA39.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },

  {
    path: securityRoutePathOperationStatusSecurity,
    component: OperstatsyssecurComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: securityRouteLabelOperationStatusSecurity,
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
    path: securityRoutePathPlanTypeOfServiceMaintenance1,
    component: PlanTypeOfServiceMaintenance1Component,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: securityRouteLabelPlanTypeOfServiceMaintenance1,
            identifiers: {screenId: 'FLM-PA37.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: securityRoutePathPlanTypeOfServiceMaintenance2,
    component: PlanTypeOfServiceMaintenance2Component,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: securityRouteLabelPlanTypeOfServiceMaintenance2,
            identifiers: {screenId: 'FLM-PA38.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: securityRoutePathOperatorStatisticsTotals,
    component: OperatorStaticsTotalsComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true
            },
            label: securityRouteLabelOperatorStatisticsTotals,
            identifiers: {screenId: 'SAT-PA98.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: securityRoutePathReviewOperatorStatistics,
    component: ReviewOperatorStaticsComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true
            },
            label: securityRouteLabelReviewOperatorStatistics,
            identifiers: {screenId: 'SAT-PA97.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: securityRoutePathOperatorStatistics,
    component: OperatorStatisticsComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true
            },
            label: securityRouteLabelOperatorStatistics,
            identifiers: {screenId: 'SAT-PA95.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ProcessingRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SecurityRoutingModule {

}
