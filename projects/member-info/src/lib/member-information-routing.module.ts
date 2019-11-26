import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  AdjudicationSessionEntryGuard,
  AdjudicationSessionExitGuard,
  memberInformationRouteLabelEobInfo,
  memberInformationRouteLabelMedicareConstantOop,
  memberInformationRouteLabelMedicareConstFileMaintenanceScreen1,
  memberInformationRouteLabelMedicareConstFileMaintenanceScreen2,
  memberInformationRouteLabelMemberProfile,
  memberInformationRouteLabelMemberSearch,
  memberInformationRouteLabelPlanInfoMaintenanceMenu,
  memberInformationRouteLabelPlanStateInformationMainTenance,
  memberInformationRouteLabelPlanStateTypeOfService,
  memberInformationRouteLabelProviderProfile,
  memberInformationRouteLabelProviderSearch,
  memberInformationRoutePathEobInfo,
  memberInformationRoutePathMedicareConstantOop,
  memberInformationRoutePathMedicareConstFileMaintenanceScreen1,
  memberInformationRoutePathMedicareConstFileMaintenanceScreen2,
  memberInformationRoutePathMemberSearch,
  memberInformationRoutePathPlanInfoMaintenanceMenu,
  memberInformationRoutePathPlanStateInformationMainTenance,
  memberInformationRoutePathPlanStateTypeOfService,
  memberInformationRoutePathProviderSearch,
  memberInformationRoutePathWithArgsMemberProfile,
  memberInformationRoutePathWithArgsProviderProfile,
  securityRouteLabelClaimNumberFileMaintenance,
  securityRoutePathClaimNumberFileMaintenance
} from '@fox/shared';
import {EobInformationComponent} from './eob-information/eob-information.component';
import {ProfileComponent} from './search/profile/profile.component';
import {SearchParentComponent} from './search/search-parent.component';
import {MedicareConstFileMaintenance1Component} from './plan-information-maintenance/medicare-constant-file-maintenance-screen1/medicare-constant-file-maintenance-screen1.component';
import {MedicareConstFileMaintenance2Component} from './plan-information-maintenance/medicare-constant-file-maintenance-screen2/fox-medicare-constant-file-maintenance-screen2.component';
import {MedicareConstOutOfPocketComponent} from './plan-information-maintenance/medicare-constant-out-of-pocket/medicare-constant-out-of-pocket.component';
import {PlanInfoMaintenanceMenuComponent} from './plan-information-maintenance/plan-information-maintenance-menu/plan-information-maintenance-menu.component';
import {PlanStateInfoMaintenanceComponent} from './plan-information-maintenance/plan-state-information-maintenance/plan-state-information-maintenance.component';
import {PlanStateTypeOfServiceMaintenanceComponent} from './plan-information-maintenance/plan-state-type-of-service-maintenance/plan-state-type-of-service-maintenance.component';
import {ProviderProfileComponent} from './provider-search/provider-profile/provider-profile.component';
import {ProviderSearchComponent} from './provider-search/provider-search.component';

const MemberInformationRoutes: Routes = [
  {
    path: '',
    redirectTo: memberInformationRoutePathMemberSearch,
    pathMatch: 'full'
  },
  {
    path: memberInformationRoutePathWithArgsMemberProfile,
    component: ProfileComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: memberInformationRouteLabelMemberProfile,
            identifiers: {screenId: 'PRC-MBPR.01, .02, .03, .04, .05 ', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: memberInformationRoutePathWithArgsProviderProfile,
    component: ProviderProfileComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [
          {
            label: memberInformationRouteLabelProviderProfile,
            hideWorkItems: true,
            pageHeaderConfig: {
              headerType: 'new',
              tabTitles: ['Demographics', 'Status Codes', 'Notes'],
            },
            identifiers: {
              screenId: ' PDR-PRFL.01',
              hasTabs: true,
              tabs: ['PDR-PRFL.01', 'PDR-PRFL.02', 'PDR-PRFL.03', 'PDR-PRFL.04']
            }
          }
        ]
      }
    }
  },

  {
    path: memberInformationRoutePathMedicareConstantOop,
    component: MedicareConstOutOfPocketComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: memberInformationRouteLabelMedicareConstantOop,
            identifiers: {screenId: 'FLM-PA12.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },

  {
    path: memberInformationRoutePathPlanInfoMaintenanceMenu,
    component: PlanInfoMaintenanceMenuComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: memberInformationRouteLabelPlanInfoMaintenanceMenu,
            identifiers: {screenId: 'FLM-PA36.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },

  {
    path: memberInformationRoutePathMedicareConstFileMaintenanceScreen2,
    component: MedicareConstFileMaintenance2Component,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: memberInformationRouteLabelMedicareConstFileMaintenanceScreen2,
            identifiers: {screenId: 'FLM-PA29.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },

  {
    path: memberInformationRoutePathMemberSearch,
    component: SearchParentComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: memberInformationRouteLabelMemberSearch,
            identifiers: {screenId: 'PRC-MBSR.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: memberInformationRoutePathProviderSearch,
    component: ProviderSearchComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: memberInformationRouteLabelProviderSearch,
            pageHeaderConfig: {
              headerType: 'old',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            hideWorkItems: true,
            identifiers: {screenId: 'PDR-SRCH.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },

  {
    path: memberInformationRoutePathEobInfo,
    component: EobInformationComponent,
    data: {
      featureName: memberInformationRoutePathEobInfo,
      nav: {
        linksToThisPath: [
          {
            label: memberInformationRouteLabelEobInfo,
            identifiers: {screenId: 'PRC-EOBS.01', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },

  {
    path: memberInformationRoutePathMedicareConstFileMaintenanceScreen1,
    component: MedicareConstFileMaintenance1Component,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: memberInformationRouteLabelMedicareConstFileMaintenanceScreen1,
            identifiers: {screenId: 'FLM-PA28.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: memberInformationRoutePathPlanStateTypeOfService,
    component: PlanStateTypeOfServiceMaintenanceComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: memberInformationRouteLabelPlanStateTypeOfService,
            identifiers: {screenId: 'FLM-PA11.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },

  {
    path: memberInformationRoutePathPlanStateInformationMainTenance,
    component: PlanStateInfoMaintenanceComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: memberInformationRouteLabelPlanStateInformationMainTenance,
            identifiers: {screenId: 'FLM-PA27.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(MemberInformationRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MemberInformationRoutingModule {

}
