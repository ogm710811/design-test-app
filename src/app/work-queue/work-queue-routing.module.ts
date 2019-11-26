import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  AuthorityRuleGuard,
  hasAnyOf,
  OP,
  workQueueMenuGroupMemberSeachId,
  workQueueMenuGroupMemberSearchLabel,
  workQueueMenuId,
  workQueueRouteLabelAcceptabilityCode,
  workQueueRouteLabelProviderValidation,
  workQueueRouteLabelQueueDetail,
  workQueueRouteLabelQueueSelection,
  workQueueRouteLabelWorkbench,
  workQueueRoutePathAcceptabilityCode,
  workQueueRoutePathProviderValidation,
  workQueueRoutePathQueueDetail,
  workQueueRoutePathQueueSelection,
  workQueueRoutePathWorkbench
} from '@fox/shared';
import {AcceptabilityCodeComponent} from './acceptability-code/acceptability-code.component';
import {ProviderValidationComponent} from './provider-validation/provider-validation.component';
import {QueueDetailComponent} from './queue-detail/queue-detail.component';
import {QueueSelectionComponent} from './queue-selection/queue-selection.component';
import {WorkbenchComponent} from './workbench/workbench.component';

const WorkQueueRoutes: Routes = [
  {
    path: '',
    redirectTo: workQueueRoutePathQueueSelection,
    data: {
      nav: {
        groups: [
          {
            id: workQueueMenuGroupMemberSeachId,
            label: workQueueMenuGroupMemberSearchLabel,
            parentMenuIds: [workQueueMenuId]
          }
        ]
      }
    },
    pathMatch: 'full'
  },
  {
    path: workQueueRoutePathQueueSelection,
    component: QueueSelectionComponent,
    canActivate: [AuthorityRuleGuard],
    data: {
      authorityRule: hasAnyOf([OP.MAINTAIN_STD_WQ, OP.MAINTAIN_EH_WQ, OP.MAINTAIN_CSS_WQ, OP.MAINTAIN_SIU_WQ,
        OP.VIEW_DOCUMENT, OP.EDIT_DOCUMENT, OP.MAINTAIN_WORKQUEUE]),
      nav: {
        linksToThisPath: [
          {
            label: workQueueRouteLabelQueueSelection
          }
        ]
      }
    }
  },
  {
    path: workQueueRoutePathQueueDetail,
    component: QueueDetailComponent,
    canActivate: [AuthorityRuleGuard],
    data: {
      authorityRule: hasAnyOf([OP.MAINTAIN_STD_WQ, OP.MAINTAIN_EH_WQ, OP.MAINTAIN_CSS_WQ, OP.MAINTAIN_SIU_WQ,
        OP.VIEW_DOCUMENT, OP.EDIT_DOCUMENT, OP.MAINTAIN_WORKQUEUE]),
      nav: {
        linksToThisPath: [
          {
            label: workQueueRouteLabelQueueDetail,
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
    path: workQueueRoutePathWorkbench,
    component: WorkbenchComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: workQueueRouteLabelWorkbench,
            pageHeaderConfig: {
              headerType: 'new'
            },
            fullWidth: true
          }
        ]
      }
    }
  },
  {
    path: workQueueRoutePathProviderValidation,
    component: ProviderValidationComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: workQueueRouteLabelProviderValidation
          }
        ]
      }
    }
  },
  {
    path: workQueueRoutePathAcceptabilityCode,
    component: AcceptabilityCodeComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: workQueueRouteLabelAcceptabilityCode
          }
        ]
      }
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(WorkQueueRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WorkQueueRoutingModule {

}
