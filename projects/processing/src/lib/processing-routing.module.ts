import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  HasReleaseEnableGuard,
  processingRouteLabelDrugInquiry,
  processingRouteLabelDrugInquiryResults,
  processingRouteLabelIcdTableMaintenance,
  processingRouteLabelReviewCptHcpsCodes,
  processingRouteLabelReviewIcdCodes,
  processingRouteLabelReviewMessages,
  processingRoutePathIcdTableMaintenance,
  processingRoutePathlDrugInquirResults,
  processingRoutePathlDrugInquiry,
  processingRoutePathReviewCptHpcsCodes,
  processingRoutePathReviewIcdCodes,
  processingRoutePathReviewMessages
} from '@fox/shared';
import {DrugInquiryResultsComponent} from './drug-inquiry/drug-inquiry-results/drug-inquiry-results.component';
import {DrugInquiryComponent} from './drug-inquiry/drug-inquiry.component';
import {IcdCodeTableMaintenanceComponent} from './icd-code-table-maintenance/icd-code-table-maintenance.component';
import {ReviewCptHcpsCodesComponent} from './review-cpt-hcpcs-codes/review-cpt-hcpcs-codes.component';
import {ReviewIcdCodesComponent} from './review-icd-codes/review-icd-codes.component';
import {ReviewMessagesComponent} from './review-messages/review-messages.component';

const ProcessingRoutes: Routes = [
  {
    path: '',
    redirectTo: processingRoutePathIcdTableMaintenance
  },
  {
    path: processingRoutePathIcdTableMaintenance,
    component: IcdCodeTableMaintenanceComponent,
    canActivate: [HasReleaseEnableGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            label: processingRouteLabelIcdTableMaintenance,
            pageHeaderConfig: {
              headerType: 'new'
            },
            identifiers: {screenId: 'PRC-PA22.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: processingRoutePathReviewCptHpcsCodes,
    component: ReviewCptHcpsCodesComponent,
    canActivate: [HasReleaseEnableGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            label: processingRouteLabelReviewCptHcpsCodes,
            identifiers: {screenId: 'PRC-PB20.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: processingRoutePathlDrugInquiry,
    component: DrugInquiryComponent,
    canActivate: [HasReleaseEnableGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            label: processingRouteLabelDrugInquiry,
            identifiers: {screenId: 'PRC-PB02.00', hasTabs: false, tabs: {}},
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
    path: processingRoutePathlDrugInquirResults,
    component: DrugInquiryResultsComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: processingRouteLabelDrugInquiryResults,
            identifiers: {screenId: 'PRC-PB03.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: processingRoutePathReviewIcdCodes,
    component: ReviewIcdCodesComponent,
    canActivate: [HasReleaseEnableGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            label: processingRouteLabelReviewIcdCodes,
            identifiers: {screenId: 'PRC-PB73.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: processingRoutePathReviewMessages,
    component: ReviewMessagesComponent,
    canActivate: [HasReleaseEnableGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            label: processingRouteLabelReviewMessages,
            identifiers: {screenId: 'PRC-PB14.00', hasTabs: false, tabs: {}}
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
export class ProcessingRoutingModule {

}
