import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  AuthorityRuleGuard,
  checkRecoveryMenuLabelManualEntry,
  checkRecoveryRouteLabelApproveTrc26,
  checkRecoveryRouteLabelBulkDetail,
  checkRecoveryRouteLabelCheckDetail,
  checkRecoveryRouteLabelCheckReconciliation,
  checkRecoveryRouteLabelDepositDetail,
  checkRecoveryRouteLabelDepositFileVerification,
  checkRecoveryRouteLabelEditOverpay,
  checkRecoveryRouteLabelFindCheckRegister,
  checkRecoveryRouteLabelFindDepositTRC,
  checkRecoveryRouteLabelMultipleCheck,
  checkRecoveryRouteLabelOverPaymentAddOrEdit,
  checkRecoveryRouteLabelOverpaymentError,
  checkRecoveryRouteLabelOverpaymentRecovery,
  checkRecoveryRouteLabelOverpaymentRefundHist,
  checkRecoveryRouteLabelOverpaymentSelection,
  checkRecoveryRouteLabelOverpaySelect,
  checkRecoveryRouteLabelPurgedCheck,
  checkRecoveryRouteLabelSeriesInfoMaint,
  checkRecoveryRouteLabelTrc26Maint,
  checkRecoveryRoutePathAddOrEditOverpayment,
  checkRecoveryRoutePathApproveTrc26,
  checkRecoveryRoutePathCheckReconciliation,
  checkRecoveryRoutePathDepositFileVerification,
  checkRecoveryRoutePathEditOverpay,
  checkRecoveryRoutePathFindCheckRegister,
  checkRecoveryRoutePathFindDepositTRC,
  checkRecoveryRoutePathManualEntry,
  checkRecoveryRoutePathMultipleCheck,
  checkRecoveryRoutePathOverpaymentError,
  checkRecoveryRoutePathOverpaymentRecovery,
  checkRecoveryRoutePathOverpaymentRefundHist,
  checkRecoveryRoutePathOverpaymentSelection,
  checkRecoveryRoutePathOverpaySelect,
  checkRecoveryRoutePathSeriesInfoMaint,
  checkRecoveryRoutePathTrc26Maint,
  checkRecoveryRoutePathWithArgsBulkDetail,
  checkRecoveryRoutePathWithArgsCheckDetail,
  checkRecoveryRoutePathWithArgsDepositDetail,
  checkRecoveryRoutePathWithArgsPurgedCheck,
  HasReleaseEnableGuard,
  OP,
  PlaceholderComponent,
  AuthorityRule,
  hasAnyOf,
  has
} from '@fox/shared';
import {ApproveVouchersMenuComponent} from './approve-vouchers-menu/approve-vouchers-menu.component';
import {BulkDetailComponent} from './check-register/bulk-detail/bulk-detail.component';
import {CheckDetailPageComponent} from './check-register/check-detail-page/check-detail-page.component';
import {CheckRegisterComponent} from './check-register/check-register.component';
import {MultipleChecksComponent} from './check-register/multiple-checks/multiple-checks.component';
import {PurgedCheckComponent} from './check-register/purged-check/purged-check.component';
import {DepositFileVerificationComponent} from './deposit-file-verification/deposit-file-verification.component';
import {DepositDetailComponent} from './find-deposit-trc/deposit-detail/deposit-detail.component';
import {DepositDetailGuard} from './find-deposit-trc/deposit-detail/deposit-detail.guard';
import {FindDepositTrcComponent} from './find-deposit-trc/find-deposit-trc.component';
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {ManualEntryComponent} from './manual-entry/manual-entry.component';
import {AddOrEditOverPaymentComponent} from './overpayment/add-edit-overpayment/add-edit-overpayment.component';
import {ClaimOverpaymentSelectionComponent} from './overpayment/claim-overpayment-selection/claim-overpayment-selection.component';
import {OverpaymentErrorComponent} from './overpayment/overpayment-error/overpayment-error.component';
import {OverpaymentRecoveryComponent} from './overpayment/overpayment-recovery/overpayment-recovery.component';
import {OverpaymentRefundHistComponent} from './overpayment/overpayment-refund-hist/overpayment-refund-hist.component';
import {SeriesInformationMaintenanceComponent} from './series-information-maintenance/series-information-maintenance.component';

export const hasOPRecoverOverpayment: AuthorityRule = hasAnyOf([OP.RECOVER_OVERPAYMENT]);
export const hasAnyViewPayment: AuthorityRule = hasAnyOf([OP.VIEW_PAYMENT, OP.MAINTAIN_PAYMENT, OP.AUTHORIZE_PAYMENT_ACTION]);
export const hasAnyFileVerification: AuthorityRule = hasAnyOf([OP.VIEW_DEPOSIT, OP.UPDATE_DEPOSIT]);
export const hasUpdateManualEntry: AuthorityRule = has(OP.UPDATE_DEPOSIT);
export const hasViewUpdateTRC: AuthorityRule = hasAnyOf([OP.VIEW_TRC, OP.MAINTAIN_TRC]);

const CheckRecoveryRoutes: Routes = [
  {
    path: '',
    redirectTo: checkRecoveryRoutePathFindCheckRegister,
    pathMatch: 'full'
  },
  {
    path: checkRecoveryRoutePathWithArgsCheckDetail,
    component: CheckDetailPageComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelCheckDetail,
            identifiers: {screenId: 'CHK-CHDT.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: checkRecoveryRoutePathFindCheckRegister,
    component: CheckRegisterComponent,
    canActivate: [AuthorityRuleGuard],
    data: {
      authorityRule: hasAnyViewPayment,
      featureName: checkRecoveryRoutePathFindCheckRegister,
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelFindCheckRegister,
            pageHeaderConfig: {
              headerType: 'flagged',
              feature: 'F4764',
              featureEnabledConfig: {
                headerType: 'new'
              },
              featureDisabledConfig: {
                headerType: 'old'
              }
            },
            identifiers: {screenId: 'CHK-RGTR.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: checkRecoveryRoutePathWithArgsBulkDetail,
    component: BulkDetailComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelBulkDetail,
            identifiers: {screenId: 'CHK-BULK.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: checkRecoveryRoutePathWithArgsPurgedCheck,
    component: PurgedCheckComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelPurgedCheck,
            identifiers: {screenId: 'CHK-PURG.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: checkRecoveryRoutePathMultipleCheck,
    component: MultipleChecksComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelMultipleCheck
          }
        ]
      }
    }
  },
  {
    path: checkRecoveryRoutePathSeriesInfoMaint,
    component: SeriesInformationMaintenanceComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelSeriesInfoMaint
          }
        ]
      }
    }
  },
  {
    path: checkRecoveryRoutePathTrc26Maint,
    component: MaintenanceComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelTrc26Maint,
            identifiers: {screenId: 'CHK-VA40.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: checkRecoveryRoutePathApproveTrc26,
    component: ApproveVouchersMenuComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelApproveTrc26,
            identifiers: {screenId: 'CHK-VA50.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: checkRecoveryRoutePathCheckReconciliation,
    component: PlaceholderComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelCheckReconciliation,
            identifiers: {screenId: 'CHK-PD16.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: checkRecoveryRoutePathEditOverpay,
    component: PlaceholderComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelEditOverpay
          }
        ]
      }
    }
  },
  {
    path: checkRecoveryRoutePathOverpaySelect,
    component: PlaceholderComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelOverpaySelect
          }
        ]
      }
    }
  },
  {
    path: checkRecoveryRoutePathManualEntry,
    component: ManualEntryComponent,
    canActivate: [AuthorityRuleGuard],
    data: {
      featureName: checkRecoveryRoutePathManualEntry,
      authorityRule: hasUpdateManualEntry,
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryMenuLabelManualEntry,
            identifiers: {screenId: 'CHK-MDPE.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: checkRecoveryRoutePathFindDepositTRC,
    component: FindDepositTrcComponent,
    canActivate: [AuthorityRuleGuard],
    data: {
      authorityRule: hasViewUpdateTRC,
      featureName: checkRecoveryRoutePathFindDepositTRC,
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelFindDepositTRC,
            identifiers: {screenId: 'CHK-DTRC.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: checkRecoveryRoutePathDepositFileVerification,
    component: DepositFileVerificationComponent,
    canActivate: [AuthorityRuleGuard],
    data: {
      featureName: checkRecoveryRoutePathDepositFileVerification,
      authorityRule: hasAnyFileVerification,
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelDepositFileVerification,
            identifiers: {screenId: 'CHK-DPVR.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: checkRecoveryRoutePathWithArgsDepositDetail,
    component: DepositDetailComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelDepositDetail,
            identifiers: {screenId: 'CHK-DPDT.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    },
    canDeactivate: [DepositDetailGuard]
  },

  {
    path: checkRecoveryRoutePathAddOrEditOverpayment,
    component: AddOrEditOverPaymentComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelOverPaymentAddOrEdit,
            identifiers: {screenId: 'CHK-PA15.00', hasTabs: false, tabs: {}},
            pageHeaderConfig: {
              headerType: 'new'
            }
          }
        ]
      }
    }
  },

  {
    path: checkRecoveryRoutePathOverpaymentRefundHist,
    component: OverpaymentRefundHistComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'new'
            },
            label: checkRecoveryRouteLabelOverpaymentRefundHist,
            identifiers: {screenId: 'CHK-DA1B.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },

  {
    path: checkRecoveryRoutePathOverpaymentError,
    component: OverpaymentErrorComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelOverpaymentError,
            identifiers: {screenId: 'CHK-PA1A.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },

  {
    path: checkRecoveryRoutePathOverpaymentSelection,
    component: ClaimOverpaymentSelectionComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'new'
          },
            label: checkRecoveryRouteLabelOverpaymentSelection,
            identifiers: {screenId: 'CHK-PA14.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },

  {
    path: checkRecoveryRoutePathOverpaymentRecovery,
    component: OverpaymentRecoveryComponent,
    canActivate: [AuthorityRuleGuard, HasReleaseEnableGuard],
    data: {
      authorityRule: hasOPRecoverOverpayment,
      featureName: 'F3709',
      nav: {
        linksToThisPath: [
          {
            label: checkRecoveryRouteLabelOverpaymentRecovery,
            identifiers: {screenId: 'CHK-OPRE', hasTabs: false, tabs: {}},
            pageHeaderConfig: {
              headerType: 'new',
              showTabs: true,
              tabTitles: ['File Import', 'Recovery History']
            }
          }
        ]
      }
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(CheckRecoveryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CheckRecoveryRoutingModule {

}
