import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  HasReleaseEnableGuard,
  qualityReviewRouteLabelDuplicateBill,
  qualityReviewRouteLabelOperatorStatistics,
  qualityReviewRouteLabelQualityErrorReview,
  qualityReviewRouteLabelQualityInformation,
  qualityReviewRouteLabelQualityMiscInfo,
  qualityReviewRouteLabelQualityMiscInfoQQ,
  qualityReviewRouteLabelQualityReviewVolume,
  qualityReviewRouteLabelRevalidationCautions,
  qualityReviewRouteLabelRevalidationClaimMessages,
  qualityReviewRouteLabelRevalidationErrorMenu,
  qualityReviewRouteLabelRevalidationMenu,
  qualityReviewRouteLabelRevalidationMenuQQ,
  qualityReviewRouteLabelSequenceNumberInq,
  qualityReviewRouteLabelVolumeReason,
  qualityReviewRoutePathDuplicateBill,
  qualityReviewRoutePathOperatorStatistics,
  qualityReviewRoutePathQualityErrorReview,
  qualityReviewRoutePathQualityInformation,
  qualityReviewRoutePathQualityMiscInfo,
  qualityReviewRoutePathQualityMiscInfoQQ,
  qualityReviewRoutePathQualityReviewVolume,
  qualityReviewRoutePathRevalidationCautions,
  qualityReviewRoutePathRevalidationClaimMessages,
  qualityReviewRoutePathRevalidationErrorMenu,
  qualityReviewRoutePathRevalidationMenu,
  qualityReviewRoutePathRevalidationMenuQQ,
  qualityReviewRoutePathSequenceNumberInq,
  qualityReviewRoutePathVolumeReason
} from '@fox/shared';
import {RevalidationErrorMenuComponent} from './der-menu/revalidation-error-menu.component';
import {QualityInformationComponent} from './derrmnt/quality-information.component';
import {ErrorReviewComponent} from './derrrvw/error-review.component';
import {DuplicateBillComponent} from './dupbil/duplicate-bill.component';
import {RevalidationMenuComponent} from './menu/revalidation-menu.component';
import {VolumeReasonComponent} from './olrsn/volume-reason.component';
import {OperatorStatisticsComponent} from './oper-stat/operator-statistics.component';
import {QualityReviewTabsComponent} from './quality-review-tabs/quality-review-tabs.component';
import {QualitySequenceNumInquiryComponent} from './quality-sequence-number-inquiry/quality-sequence-number-inquiry.component';
import {RevalidationCautionsComponent} from './revalidation-cautions/revalidation-cautions.component';
import {RevalidationClaimMessagesComponent} from './revalidation-claim-messages/revalidation-claim-messages.component';
import {QualityReviewVolumeComponent} from './volume/quality-review-volume.component';

const QualityRoutings: Routes = [
  {
    path: '',
    redirectTo: qualityReviewRoutePathRevalidationMenu
  },
  {
    path: qualityReviewRoutePathRevalidationCautions,
    component: RevalidationCautionsComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: qualityReviewRouteLabelRevalidationCautions,
            identifiers: {screenId: 'QRV-PB80.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: qualityReviewRoutePathRevalidationClaimMessages,
    component: RevalidationClaimMessagesComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: qualityReviewRouteLabelRevalidationClaimMessages,
            identifiers: {screenId: 'QRV-PB78.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: qualityReviewRoutePathRevalidationMenu,
    component: RevalidationMenuComponent,
    canActivate: [HasReleaseEnableGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            label: qualityReviewRouteLabelRevalidationMenu,
            identifiers: {screenId: 'QRV-PB75.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  }, {
    path: qualityReviewRoutePathRevalidationMenuQQ,
    component: RevalidationMenuComponent,
    canActivate: [HasReleaseEnableGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            label: qualityReviewRouteLabelRevalidationMenuQQ,
            identifiers: {screenId: 'QRV-PB75.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: qualityReviewRoutePathRevalidationErrorMenu,
    component: RevalidationErrorMenuComponent,
    canActivate: [HasReleaseEnableGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            label: qualityReviewRouteLabelRevalidationErrorMenu
          }
        ]
      }
    }
  },
  {
    path: qualityReviewRoutePathVolumeReason,
    component: VolumeReasonComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: qualityReviewRouteLabelVolumeReason,
            identifiers: {screenId: 'SAT-PB99.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: qualityReviewRoutePathQualityInformation,
    component: QualityInformationComponent,
    canActivate: [HasReleaseEnableGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            label: qualityReviewRouteLabelQualityInformation,
            identifiers: {screenId: 'QRV-PB81.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: qualityReviewRoutePathSequenceNumberInq,
    component: QualitySequenceNumInquiryComponent,
    canActivate: [HasReleaseEnableGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            label: qualityReviewRouteLabelSequenceNumberInq,
            identifiers: {screenId: 'QRV-PB95.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: qualityReviewRoutePathOperatorStatistics,
    component: OperatorStatisticsComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: qualityReviewRouteLabelOperatorStatistics,
            pageHeaderConfig: {
              headerType: 'new'
            },
            identifiers: {screenId: 'SAT-PA99.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: qualityReviewRoutePathDuplicateBill,
    component: DuplicateBillComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: qualityReviewRouteLabelDuplicateBill,
            identifiers: {screenId: 'QRV-PB77.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: qualityReviewRoutePathQualityErrorReview,
    component: ErrorReviewComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: qualityReviewRouteLabelQualityErrorReview,
            identifiers: {screenId: 'COM-PB85.00.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },

  {
    path: qualityReviewRoutePathQualityReviewVolume,
    component: QualityReviewVolumeComponent,
    canActivate: [HasReleaseEnableGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            label: qualityReviewRouteLabelQualityReviewVolume,
            identifiers: {screenId: 'QRV-PB98.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: qualityReviewRoutePathQualityMiscInfo,
    component: QualityReviewTabsComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: qualityReviewRouteLabelQualityMiscInfo,
            identifiers: {screenId: 'QRV-PB76.00', hasTabs: false, tabs: {}},
            pageHeaderConfig: {
              headerType: 'new',
              tabTitles: ['Misc Info', 'Cautions', 'Duplicates', 'Claim Messages', 'Bill Line Messages'],
              xsPrimaryTabCount: 2,           // Optional(By default 2 tabs), Number of tabs to be shown in 'xs' screen before More dropdown
              smPrimaryTabCount: 3           // Optional(By default 3 tabs), Number of tabs to be shown in 'sm' screen before More dropdown
            }
          }
        ]
      }
    }
  },
  {
    path: qualityReviewRoutePathQualityMiscInfoQQ,
    component: QualityReviewTabsComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: qualityReviewRouteLabelQualityMiscInfoQQ,
            identifiers: {screenId: 'QRV-PB76.00', hasTabs: false, tabs: {}},
            pageHeaderConfig: {
              headerType: 'new',
              tabTitles: ['Misc Info', 'Cautions', 'Duplicates', 'Claim Messages', 'Bill Line Messages'],
              xsPrimaryTabCount: 2,           // Optional(By default 2 tabs), Number of tabs to be shown in 'xs' screen before More dropdown
              smPrimaryTabCount: 3           // Optional(By default 3 tabs), Number of tabs to be shown in 'sm' screen before More dropdown
            }
          }
        ]
      }
    }
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(QualityRoutings)
  ],
  exports: [
    RouterModule
  ]
})
export class QualityReviewRoutingModule {

}
