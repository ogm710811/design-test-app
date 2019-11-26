import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  communicationRouteLabelCommInfo,
  communicationRouteLabelDeleteComm,
  communicationRouteLabelEndComm,
  communicationRouteLabelListComm,
  communicationRouteLabelQualityReviewComm,
  communicationRouteLabelQualityReviewCommInfo,
  communicationRouteLabelRevComm,
  communicationRoutePathCommInfo,
  communicationRoutePathDeleteComm,
  communicationRoutePathEndComm,
  communicationRoutePathListComm,
  communicationRoutePathQualityReviewComm,
  communicationRoutePathQualityReviewCommInfo,
  communicationRoutePathRevComm,
  HasReleaseEnableGuard
} from '@fox/shared';
import {CommInfoComponent} from './comm-info/comm-info.component';
import {EndCommunicationComponent} from './comm-info/end-communication/end-communication.component';
import {DeleteCommunicationComponent} from './delete-communication/delete-communication.component';
import {ListCommunicationComponent} from './list-communication/list-communication.component';
import {QualityReviewInfoComponent} from './quality-review/quality-review-info/quality-review-info.component';
import {QualityReviewComponent} from './quality-review/quality-review.component';
import {ReviewCommunicationComponent} from './review-communication/review-communication.component';

const CommunicationRoutes: Routes = [
  {
    path: '',
    redirectTo: communicationRoutePathCommInfo
  },
  {
    path: communicationRoutePathCommInfo,
    canActivateChild: [HasReleaseEnableGuard],
    component: CommInfoComponent,
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {headerType: 'new'},
            label: communicationRouteLabelCommInfo,
            identifiers: {screenId: 'COM-PB65.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: communicationRoutePathEndComm,
    component: EndCommunicationComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {headerType: 'new'},
            label: communicationRouteLabelEndComm
          }
        ]
      }
    }
  },
  {
    path: communicationRoutePathRevComm,
    component: ReviewCommunicationComponent,
    canActivate: [HasReleaseEnableGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {headerType: 'new'},
            label: communicationRouteLabelRevComm,
            identifiers: {screenId: 'COM-PB56.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },

  {
    path: communicationRoutePathDeleteComm,
    canActivate: [HasReleaseEnableGuard],
    component: DeleteCommunicationComponent,
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {headerType: 'new'},
            label: communicationRouteLabelDeleteComm,
            identifiers: {screenId: 'COM-PB9E.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },

  {
    path: communicationRoutePathQualityReviewComm,
    canActivate: [HasReleaseEnableGuard],
    component: QualityReviewComponent,
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {headerType: 'new'},
            label: communicationRouteLabelQualityReviewComm,
            identifiers: {screenId: 'COM-PB87.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },

  {
    path: communicationRoutePathQualityReviewCommInfo,
    component: QualityReviewInfoComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {headerType: 'new'},
            label: communicationRouteLabelQualityReviewCommInfo
          }
        ]
      }
    }
  },

  {
    path: communicationRoutePathListComm,
    canActivate: [HasReleaseEnableGuard],
    component: ListCommunicationComponent,
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {headerType: 'new'},
            label: communicationRouteLabelListComm,
            identifiers: {screenId: 'COM-PB40.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(CommunicationRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CommunicationRoutingModule {
}
