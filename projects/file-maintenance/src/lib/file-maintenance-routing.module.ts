import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  fileMaintenanceRouteLabelAddMessage,
  fileMaintenanceRouteLabelChangeMessage,
  fileMaintenanceRouteLabelClaimNumberRangeFileMaintenance,
  fileMaintenanceRouteLabelClaimNumberRangeFileMaintenanceMenu,
  fileMaintenanceRouteLabelMessageInquiry,
  fileMaintenanceRouteLabelMessageMaintenance,
  fileMaintenanceRoutePathAddMessage,
  fileMaintenanceRoutePathChangeMessage,
  fileMaintenanceRoutePathClaimNumberRangeFileMaintenance,
  fileMaintenanceRoutePathClaimNumberRangeFileMaintenanceMenu,
  fileMaintenanceRoutePathMessageInquiry,
  fileMaintenanceRoutePathMessageMaintenance,
  HasReleaseEnableGuard
} from '@fox/shared';
import {ClaimNumberRangeFileMaintenanceMenuComponent} from './claim-number-range-file-maintenance/claim-number-range-file-maintenance-menu/claim-number-range-file-maintenance-menu.component';
import {ClaimNumberRangeFileMaintenanceComponent} from './claim-number-range-file-maintenance/claim-number-range-file-maintenance.component';
import {AddMessageComponent} from './message-file-maintenance/add-message.component';
import {ChangeMessageComponent} from './message-file-maintenance/change-message.component';
import {MessageInquiryComponent} from './message-file-maintenance/message-inquiry.component';
import {MessageMaintenanceMenuComponent} from './message-file-maintenance/message-maintenance-menu.component';

const ProcessingRoutes: Routes = [
  {
    path: '',
    redirectTo: fileMaintenanceRoutePathAddMessage
  },
  {
    path: fileMaintenanceRoutePathAddMessage,
    component: AddMessageComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: fileMaintenanceRouteLabelAddMessage,
            identifiers: {screenId: 'FLM-PA17.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: fileMaintenanceRoutePathChangeMessage,
    component: ChangeMessageComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: fileMaintenanceRouteLabelChangeMessage,
            identifiers: {screenId: 'FLM-PA18.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: fileMaintenanceRoutePathClaimNumberRangeFileMaintenance,
    component: ClaimNumberRangeFileMaintenanceComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: fileMaintenanceRouteLabelClaimNumberRangeFileMaintenance
          }
        ]
      }
    }
  },
  {
    path: fileMaintenanceRoutePathMessageInquiry,
    component: MessageInquiryComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: fileMaintenanceRouteLabelMessageInquiry,
            identifiers: {screenId: 'PRC-PA20.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: fileMaintenanceRoutePathMessageMaintenance,
    component: MessageMaintenanceMenuComponent,
    canActivate: [HasReleaseEnableGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            label: fileMaintenanceRouteLabelMessageMaintenance,
            identifiers: {screenId: 'FLM-PA16.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: fileMaintenanceRoutePathClaimNumberRangeFileMaintenanceMenu,
    component: ClaimNumberRangeFileMaintenanceMenuComponent,
    canActivate: [HasReleaseEnableGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            label: fileMaintenanceRouteLabelClaimNumberRangeFileMaintenanceMenu,
            identifiers: {screenId: 'FLM-PA25.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: fileMaintenanceRoutePathClaimNumberRangeFileMaintenance,
    component: ClaimNumberRangeFileMaintenanceComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: fileMaintenanceRouteLabelClaimNumberRangeFileMaintenance,
            identifiers: {screenId: 'FLM-PA26.00', hasTabs: false, tabs: {}}
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
export class FileMaintenanceRoutingModule {

}
