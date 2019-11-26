import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  AdjudicationSessionEntryGuard,
  AdjudicationSessionExitGuard,
  AuthorityRuleGuard,
  claimProcessingRouteLabelBillLineMessages,
  claimProcessingRouteLabelBillLineSpecialMemo,
  claimProcessingRouteLabelBypass,
  claimProcessingRouteLabelBypassMgmt,
  claimProcessingRouteLabelCarrierOnHand,
  claimProcessingRouteLabelClaimDetails,
  claimProcessingRouteLabelClaimDrugEob,
  claimProcessingRouteLabelClaimEligibility,
  claimProcessingRouteLabelClaimMedSuppEob,
  claimProcessingRouteLabelClaimSuspendClm,
  claimProcessingRouteLabelDeleteClaim,
  claimProcessingRouteLabelDrugChrg,
  claimProcessingRouteLabelDupeClaimCheck,
  claimProcessingRouteLabelElectronicClaimVerfBillLine,
  claimProcessingRouteLabelElectronicClaimVerfDrugBillLine,
  claimProcessingRouteLabelElectronicClaimVerfMaint,
  claimProcessingRouteLabelElectronicClaimVerfSuspProcess,
  claimProcessingRouteLabelHistory,
  claimProcessingRouteLabelHospital,
  claimProcessingRouteLabelMaintenanceApproval,
  claimProcessingRouteLabelManualClaimIntake,
  claimProcessingRouteLabelManualClaimReceipt,
  claimProcessingRouteLabelMedicalVisit,
  claimProcessingRouteLabelMedSuppCharge,
  claimProcessingRouteLabelMedSuppChargeB,
  claimProcessingRouteLabelMemLookup,
  claimProcessingRouteLabelNursingCharge,
  claimProcessingRouteLabelProcess,
  claimProcessingRouteLabelProcessAddrVerf,
  claimProcessingRouteLabelProcessAddtionalClaimInfo,
  claimProcessingRouteLabelProcessClaimException,
  claimProcessingRouteLabelProcessClaimExceptionB,
  claimProcessingRouteLabelProcessClaimHomeHealth,
  claimProcessingRouteLabelProcessClaimHospSnf,
  claimProcessingRouteLabelProcessClaimMessages,
  claimProcessingRouteLabelProcessClaimNopay,
  claimProcessingRouteLabelProcessClaimNopayEob,
  claimProcessingRouteLabelProcessEndofClaim,
  claimProcessingRouteLabelProviderValidation,
  claimProcessingRouteLabelQrErrInquiry,
  claimProcessingRouteLabelQrInfo,
  claimProcessingRouteLabelQrMicrofilmRequest,
  claimProcessingRouteLabelQrRev,
  claimProcessingRouteLabelQrReval,
  claimProcessingRouteLabelQrSequenceInquiry,
  claimProcessingRouteLabelQrVolume,
  claimProcessingRouteLabelReactivateClaim,
  claimProcessingRouteLabelRescannedImages,
  claimProcessingRouteLabelReviewBillLineMessages,
  claimProcessingRouteLabelReviewClaimMessages,
  claimProcessingRouteLabelSearch,
  claimProcessingRouteLabelServiceEob,
  claimProcessingRouteLabelSuspenseError,
  claimProcessingRouteLabelSuspenseProcess,
  claimProcessingRouteLabelTransferClaim,
  claimProcessingRouteLabelTransferMember,
  claimProcessingRouteLabelTypeOfService,
  claimProcessingRouteLabelUpdateCrossRef,
  claimProcessingRouteLabelUpdateEob,
  claimProcessingRouteLabelUpdateMemberAggregate,
  claimProcessingRouteLabelUpdateSplHandling,
  claimProcessingRouteLabelVerificationError,
  claimProcessingRoutePathBillLineMessages,
  claimProcessingRoutePathBillLineSpecialMemo,
  claimProcessingRoutePathBypass,
  claimProcessingRoutePathBypassMgmt,
  claimProcessingRoutePathBypassOrig,
  claimProcessingRoutePathCarrierOnHand,
  claimProcessingRoutePathClaimDrugEob,
  claimProcessingRoutePathClaimEligibility,
  claimProcessingRoutePathClaimMedSuppEob,
  claimProcessingRoutePathClaimSuspendClm,
  claimProcessingRoutePathDeleteClaim,
  claimProcessingRoutePathDrugChrg,
  claimProcessingRoutePathDupeClaimCheck,
  claimProcessingRoutePathElectronicClaimVerfBillLine,
  claimProcessingRoutePathElectronicClaimVerfDrugBillLine,
  claimProcessingRoutePathElectronicClaimVerfMaint,
  claimProcessingRoutePathElectronicClaimVerfSuspProcess,
  claimProcessingRoutePathHistory,
  claimProcessingRoutePathHospital,
  claimProcessingRoutePathMaintenanceApproval,
  claimProcessingRoutePathManualClaimIntake,
  claimProcessingRoutePathManualClaimReceipt,
  claimProcessingRoutePathMedicalVisit,
  claimProcessingRoutePathMedSuppCharge,
  claimProcessingRoutePathMedSuppChargeB,
  claimProcessingRoutePathMemLookup,
  claimProcessingRoutePathMemLookupOrig,
  claimProcessingRoutePathNursingCharge,
  claimProcessingRoutePathProcess,
  claimProcessingRoutePathProcessAddrVerf,
  claimProcessingRoutePathProcessAddtionalClaimInfo,
  claimProcessingRoutePathProcessClaiHospSnf,
  claimProcessingRoutePathProcessClaimException,
  claimProcessingRoutePathProcessClaimExceptionB,
  claimProcessingRoutePathProcessClaimHomeHealth,
  claimProcessingRoutePathProcessClaimMessages,
  claimProcessingRoutePathProcessClaimNopay,
  claimProcessingRoutePathProcessClaimNopayEob,
  claimProcessingRoutePathProcessEndofClaim,
  claimProcessingRoutePathProviderValidation,
  claimProcessingRoutePathQrErrInquiry,
  claimProcessingRoutePathQrInfo,
  claimProcessingRoutePathQrMicrofilmRequest,
  claimProcessingRoutePathQrRev,
  claimProcessingRoutePathQrReval,
  claimProcessingRoutePathQrSequenceInquiry,
  claimProcessingRoutePathQrVolume,
  claimProcessingRoutePathReactivateClaim,
  claimProcessingRoutePathRescannedImages,
  claimProcessingRoutePathReviewBillLineMessages,
  claimProcessingRoutePathReviewClaimMessages,
  claimProcessingRoutePathSearch,
  claimProcessingRoutePathServiceEob,
  claimProcessingRoutePathSuspenseError,
  claimProcessingRoutePathSuspenseProcess,
  claimProcessingRoutePathTransferClaim,
  claimProcessingRoutePathTransferMember,
  claimProcessingRoutePathTypeOfService,
  claimProcessingRoutePathUpdateCrossRef,
  claimProcessingRoutePathUpdateEob,
  claimProcessingRoutePathUpdateMemberAggregate,
  claimProcessingRoutePathUpdateSplHandling,
  claimProcessingRoutePathVerificationError,
  claimProcessingRoutePathWithArgsClaimDetails,
  has,
  HasReleaseEnableGuard,
  OP,
  PlaceholderComponent
} from '@fox/shared';
import {ClaimDetailsComponent} from './claim-history/claim-details/claim-details.component';
import {ClaimHistoryComponent} from './claim-history/claim-history.component';
import {ClaimSearchComponent} from './claim-search/claim-search.component';
import {DuplicateClaimCheckComponent} from './duplicate-claim-check/duplicate-claim-check.component';
import {MaintenanceApprovalComponent} from './maintenance-approval/maintenance-approval.component';
import {DeleteClaimRequestComponent} from './maintenance-approval/maintenance-request-details/delete-claim-request/delete-claim-request.component';
import {ReactivateClaimRequestComponent} from './maintenance-approval/maintenance-request-details/reactive-claim-request/reactive-claim-request.component';
import {TransferClaimRequestComponent} from './maintenance-approval/maintenance-request-details/transfer-claim-request/transfer-claim-request.component';
import {TransferMemberRequestComponent} from './maintenance-approval/maintenance-request-details/transfer-member-request/transfer-member-request.component';
import {UpdateCrossRefComponent} from './maintenance-approval/maintenance-request-details/update-cross-ref-request/update-cross-ref-request.component';
import {UpdateEobRequestComponent} from './maintenance-approval/maintenance-request-details/update-eob-request/update-eob-request.component';
import {UpdateMemberAggregateRequestComponent} from './maintenance-approval/maintenance-request-details/update-member-aggregate-request/update-member-aggregate-request.component';
import {UpdateSplHandlingRequestComponent} from './maintenance-approval/maintenance-request-details/update-spl-handling-request/update-spl-handling-request.component';
import {ManualClaimIntakeComponent} from './manual-claim-intake/manual-claim-intake.component';
import {ManualClaimReceiptComponent} from './manual-claim-intake/manual-claim-receipt/manual-claim-receipt.component';
import {ProviderValidationComponent} from './manual-claim-intake/provider-validation/provider-validation.component';
import {BillLineMessagesComponent} from './manual-claim-processing/bill-line-messages/bill-line-messages.component';
import {BillLineSpecialMemoComponent} from './manual-claim-processing/bill-line-special-memo/bill-line-special-memo.component';
import {ElectronicClaimVerfBillLineComponent} from './manual-claim-processing/electronic-claim-verf-bill-line/electronic-claim-verf-bill-line.component';
import {ElectronicClaimVerfDrugBillLineComponent} from './manual-claim-processing/electronic-claim-verf-drug-bill-line/electronic-claim-verf-drug-bill-line.component';
import {ElectronicClaimVerfMaintComponent} from './manual-claim-processing/electronic-claim-verf-maint/electronic-claim-verf-maint.component';
import {ElectronicClaimVerfSuspProcessComponent} from './manual-claim-processing/electronic-claim-verf-susp-process/electronic-claim-verf-susp-process.component';
import {ProcclmaddrverfComponent} from './manual-claim-processing/process-claim-addr-verf/process-claim-addr-verf.component';
import {ProcclmaddclminfoComponent} from './manual-claim-processing/process-claim-addtional-claim-info/process-claim-addtional-claim-info.component';
import {ProcclmdrugchrgComponent} from './manual-claim-processing/process-claim-drugchrg/procclmdrugchrg.component';
import {ProcClmDrugEobComponent} from './manual-claim-processing/process-claim-drugeob/proc-clm-drug-eob.component';
import {ProcClmEligServiceScreenComponent} from './manual-claim-processing/process-claim-eligibility/process-claim-eligibility.component';
import {ProcessClaimExceptionComponent} from './manual-claim-processing/process-claim-exception/process-claim-exception.component';
import {ProcessClaimHomeHealthComponent} from './manual-claim-processing/process-claim-home-health/process-claim-home-health.component';
import {ProcessClaimHospSnfEobComponent} from './manual-claim-processing/process-claim-hosp-snf-eob/process-claim-hosp-snf-eob.component';
import {ProcessClaimHospitalChargeComponent} from './manual-claim-processing/process-claim-hospital-charge/process-claim-hospital-charge.component';
import {ProcessClaimMedicalVisitComponent} from './manual-claim-processing/process-claim-medical-visit/process-claim-medical-visit.component';
import {ProcClmMedSupChrgLnComponent} from './manual-claim-processing/process-claim-medsupp-charge/process-claim-medsupp-charge.component';
import {ProcessClaimMedsuppChargebComponent} from './manual-claim-processing/process-claim-medsupp-chargeb/process-claim-medsupp-chargeb.component';
import {ProcessClaimMedsuppEobComponent} from './manual-claim-processing/process-claim-medsupp-eob/process-claim-medsupp-eob.component';
import {ProcessClaimMessagesComponent} from './manual-claim-processing/process-claim-messages/process-claim-messages.component';
import {ProcessClaimNoPayEobComponent} from './manual-claim-processing/process-claim-no-pay-eob/process-claim-no-pay-eob.component';
import {ProcessClaimNoPayComponent} from './manual-claim-processing/process-claim-no-pay/process-claim-no-pay.component';
import {ProcessClaimNursingChargeComponent} from './manual-claim-processing/process-claim-nursing-charge/process-claim-nursing-charge.component';
import {ProcessClaimSuspendclaimComponent} from './manual-claim-processing/process-claim-suspendclaim/process-claim-suspendclaim.component';
import {MendofclaimScreenComponent} from './manual-claim-processing/process-end-of-claim/process-end-of-claim.component';
import {ReviewBillLineMessagesComponent} from './manual-claim-processing/review-bill-line-messages/review-bill-line-messages.component';
import {ReviewClaimMessagesComponent} from './manual-claim-processing/review-claim-messages/review-claim-messages.component';
import {ServiceEobComponent} from './manual-claim-processing/service-eob/service-eob.component';
import {TypeOfServiceComponent} from './manual-claim-processing/type-of-service/type-of-service.component';
import {BypassManagementComponent} from './member-lookup/bypass-queue-management/bypass-management.component';
import {BypassQueueComponent as BypassQueueOriginalComponent} from './member-lookup/bypass-queue-original/bypass-queue.component';
import {BypassQueueComponent} from './member-lookup/bypass-queue/bypass-queue.component';
import {MemberLookupQueueComponent as MemberLookupQueueOriginalComponent} from './member-lookup/member-lookup-queue-original/member-lookup-queue.component';
import {MemberLookupQueueComponent} from './member-lookup/member-lookup-queue/member-lookup-queue.component';
import {RescannedClaimImagesComponent} from './rescanned-claim-images/rescanned-claim-images.component';
import {ProcessClaimExceptionBComponent} from './manual-claim-processing/process-claim-exception/process-claim-exception-b.component';

const claimProcessingRoutes: Routes = [
  {
    path: '',
    redirectTo: claimProcessingRoutePathSearch,
    canActivate: [HasReleaseEnableGuard],
    data: {
      featureName: 'F3709',
    },
    pathMatch: 'full'
  },
  {
    path: claimProcessingRoutePathSearch,
    component: ClaimSearchComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelSearch,
            identifiers: {screenId: 'CLM-SRCH.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathHistory,
    component: ClaimHistoryComponent,
    data: {
      featureName: claimProcessingRoutePathHistory,
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelHistory,
            identifiers: {screenId: 'PRC-CHSR.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathMaintenanceApproval,
    component: MaintenanceApprovalComponent,
    data: {
      featureName: claimProcessingRoutePathMaintenanceApproval,
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelMaintenanceApproval,
          identifiers: {screenId: 'PRC-RQST.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathMemLookupOrig,
    component: MemberLookupQueueOriginalComponent,
    canActivate: [AuthorityRuleGuard],
    data: {
      authorityRule: has(OP.READ_MEMBER),
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelMemLookup,
            pageHeaderConfig: {
              headerType: 'old',
              hideHeader: true
            },
            identifiers: {screenId: 'PRC-MBLK.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathBypassOrig,
    component: BypassQueueOriginalComponent,
    canActivate: [AuthorityRuleGuard],
    data: {
      authorityRule: has(OP.READ_MEMBER),
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelBypass,
            identifiers: {screenId: ' CLM-BPSQ.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathMemLookup,
    component: MemberLookupQueueComponent,
    canActivate: [AuthorityRuleGuard],
    data: {
      authorityRule: has(OP.READ_MEMBER),
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelMemLookup,
            pageHeaderConfig: {
              headerType: 'new'
            },
            identifiers: {screenId: 'PRC-MBLK.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathBypass,
    component: BypassQueueComponent,
    canActivate: [AuthorityRuleGuard],
    data: {
      authorityRule: has(OP.READ_MEMBER),
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelBypass,
            pageHeaderConfig: {
              headerType: 'new'
            },
            identifiers: {screenId: ' CLM-BPSQ.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathBypassMgmt,
    component: BypassManagementComponent,
    canActivate: [AuthorityRuleGuard],
    data: {
      authorityRule: has(OP.REASSIGN_MEMBER_LOOKUP),
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'old',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            label: claimProcessingRouteLabelBypassMgmt,
            identifiers: {screenId: 'CLM-BPQM.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathProcess,
    component: PlaceholderComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelProcess,
          hideWorkItems: true,
          identifiers: {screenId: 'CLM-PB21.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathVerificationError,
    component: PlaceholderComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelVerificationError,
          hideWorkItems: true,
          identifiers: {screenId: 'CLM-PA41.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathSuspenseError,
    component: PlaceholderComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelSuspenseError,
          hideWorkItems: true,
          identifiers: {screenId: 'CLM-PA41.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathCarrierOnHand,
    component: PlaceholderComponent,
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelCarrierOnHand,
          identifiers: {screenId: 'CLM-PA47.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathSuspenseProcess,
    component: PlaceholderComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelSuspenseProcess,
          hideWorkItems: true,
          identifiers: {screenId: 'CLM-PA43.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathQrErrInquiry,
    canActivate: [HasReleaseEnableGuard],
    component: PlaceholderComponent,
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelQrErrInquiry
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathQrMicrofilmRequest,
    canActivate: [HasReleaseEnableGuard],
    component: PlaceholderComponent,
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelQrMicrofilmRequest
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathQrInfo,
    canActivate: [HasReleaseEnableGuard],
    component: PlaceholderComponent,
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelQrInfo
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathQrReval,
    canActivate: [HasReleaseEnableGuard],
    component: PlaceholderComponent,
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelQrReval
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathQrRev,
    canActivate: [HasReleaseEnableGuard],
    component: PlaceholderComponent,
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelQrRev
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathWithArgsClaimDetails,
    component: ClaimDetailsComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelClaimDetails,
            pageHeaderConfig: {
              headerType: 'new',
              tabTitles: ['Overview', 'Bill Lines', 'Cross References', 'Notes', 'Audit Log'],
            },
            hideWorkItems: true,
            identifiers: {
              screenId: 'CLM-CLDT.01',
              hasTabs: true,
              tabs: ['CLM-CLDT.01', 'CLM-CLDT.02', 'CLM-CLDT.03', 'CLM-CLDT.04', 'CLM-CLDT.05']
            }
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathUpdateCrossRef,
    component: UpdateCrossRefComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'old',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            label: claimProcessingRouteLabelUpdateCrossRef
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathReactivateClaim,
    component: ReactivateClaimRequestComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'old',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            label: claimProcessingRouteLabelReactivateClaim
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathDeleteClaim,
    component: DeleteClaimRequestComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'old',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            label: claimProcessingRouteLabelDeleteClaim
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathTransferClaim,
    component: TransferClaimRequestComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'old',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            label: claimProcessingRouteLabelTransferClaim
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathUpdateEob,
    component: UpdateEobRequestComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'old',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            label: claimProcessingRouteLabelUpdateEob
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathTransferMember,
    component: TransferMemberRequestComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'old',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            label: claimProcessingRouteLabelTransferMember
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathUpdateSplHandling,
    component: UpdateSplHandlingRequestComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'old',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            label: claimProcessingRouteLabelUpdateSplHandling
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathUpdateMemberAggregate,
    component: UpdateMemberAggregateRequestComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            label: claimProcessingRouteLabelUpdateMemberAggregate
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathQrSequenceInquiry,
    canActivate: [HasReleaseEnableGuard],
    component: PlaceholderComponent,
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelQrSequenceInquiry
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathQrVolume,
    canActivate: [HasReleaseEnableGuard],
    component: PlaceholderComponent,
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelQrVolume
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathDupeClaimCheck,
    component: DuplicateClaimCheckComponent,
    canActivate: [AdjudicationSessionEntryGuard, HasReleaseEnableGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelDupeClaimCheck,
          pageHeaderConfig: {
            headerType: 'new'
          },
          hideWorkItems: true,
          identifiers: {screenId: 'CLM-DUPE.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathManualClaimIntake,
    component: ManualClaimIntakeComponent,
    canActivate: [AuthorityRuleGuard, HasReleaseEnableGuard],
    data: {
      authorityRule: has(OP.PROCESS_CLAIM),
      featureName: 'F3709',
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelManualClaimIntake,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          identifiers: {screenId: 'PRC-MCLI.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathManualClaimReceipt,
    canActivate: [HasReleaseEnableGuard],
    component: ManualClaimReceiptComponent,
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelManualClaimReceipt,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          }
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathProviderValidation,
    component: ProviderValidationComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelProviderValidation,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          identifiers: {screenId: 'PDR-VLAD.00', hasTabs: false, tabs: {}}
        }]
      },
      customFocus: true
    }
  },
  {
    path: claimProcessingRoutePathClaimEligibility,
    component: ProcClmEligServiceScreenComponent,
    canActivate: [AdjudicationSessionEntryGuard,
      AuthorityRuleGuard, HasReleaseEnableGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      featureName: 'F3709',
      authorityRule: has(OP.PROCESS_CLAIM),
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelClaimEligibility,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          hideWorkItems: true,
          identifiers: {screenId: 'PRC-PB21.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathMedSuppCharge,
    component: ProcClmMedSupChrgLnComponent,
    canActivate: [HasReleaseEnableGuard, AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelMedSuppCharge,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          hideWorkItems: true,
          identifiers: {screenId: 'PRC-PB29.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathMedSuppChargeB,
    component: ProcessClaimMedsuppChargebComponent,
    canActivate: [HasReleaseEnableGuard, AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {

      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelMedSuppChargeB,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          hideWorkItems: true,
          identifiers: {screenId: 'PRC-PB9H.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathTypeOfService,
    component: TypeOfServiceComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelTypeOfService,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            hideWorkItems: true,
            identifiers: {screenId: 'PRC-PB22.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },

  {
    path: claimProcessingRoutePathHospital,
    component: ProcessClaimHospitalChargeComponent,
    canActivate: [AdjudicationSessionEntryGuard, HasReleaseEnableGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      featureName: 'F3709',
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelHospital,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          hideWorkItems: true,
          identifiers: {screenId: 'PRC-PB23.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathProcessClaimNopay,
    component: ProcessClaimNoPayComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelProcessClaimNopay,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            identifiers: {screenId: 'PRC-PAA1.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathProcessClaimNopayEob,
    component: ProcessClaimNoPayEobComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelProcessClaimNopayEob,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            identifiers: {screenId: 'PRC-PAA2.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathProcessClaiHospSnf,
    component: ProcessClaimHospSnfEobComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelProcessClaimHospSnf,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            hideWorkItems: true,
            identifiers: {screenId: 'PRC-PB31.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathMedicalVisit,
    component: ProcessClaimMedicalVisitComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelMedicalVisit,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          hideWorkItems: true,
          identifiers: {screenId: 'PRC-PB25.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathReviewBillLineMessages,
    component: ReviewBillLineMessagesComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelReviewBillLineMessages,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          identifiers: {screenId: 'PRC-PAA5.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathBillLineMessages,
    component: BillLineMessagesComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelBillLineMessages,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          identifiers: {screenId: 'PRC-PAA3.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathProcessClaimMessages,
    component: ProcessClaimMessagesComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelProcessClaimMessages,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          hideWorkItems: true,
          identifiers: {screenId: 'PRC-PB35.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathProcessAddrVerf,
    component: ProcclmaddrverfComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelProcessAddrVerf,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          hideWorkItems: true,
          identifiers: {screenId: 'PRC-PB36.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathProcessEndofClaim,
    component: MendofclaimScreenComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelProcessEndofClaim,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          hideWorkItems: true,
          identifiers: {screenId: 'PRC-PB37.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathProviderValidation,
    component: ProviderValidationComponent,
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelProviderValidation,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          identifiers: {screenId: 'PDR-VLAD.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathServiceEob,
    component: ServiceEobComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelServiceEob,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          hideWorkItems: true,
          identifiers: {screenId: 'PRC-PB33.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathDrugChrg,
    component: ProcclmdrugchrgComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelDrugChrg,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          hideWorkItems: true,
          identifiers: {screenId: 'PRC-PB27.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathClaimDrugEob,
    component: ProcClmDrugEobComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {

      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelClaimDrugEob,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          hideWorkItems: true,
          identifiers: {screenId: 'PRC-MAC6.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathReviewClaimMessages,
    component: ReviewClaimMessagesComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelReviewClaimMessages,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          }
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathProcessAddtionalClaimInfo,
    component: ProcclmaddclminfoComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelProcessAddtionalClaimInfo,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          identifiers: {screenId: 'PRC-PAC7.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathProcessClaimException,
    component: ProcessClaimExceptionComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelProcessClaimException,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          }
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathProcessClaimExceptionB,
    component: ProcessClaimExceptionBComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelProcessClaimExceptionB,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          }
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathProcessClaimHomeHealth,
    component: ProcessClaimHomeHealthComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelProcessClaimHomeHealth,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          hideWorkItems: true,
          identifiers: {screenId: 'PRC-PB28.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathClaimSuspendClm,
    component: ProcessClaimSuspendclaimComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {

      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelClaimSuspendClm,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          hideWorkItems: true,
          identifiers: {screenId: 'PRC-PB39.00', hasTabs: false, tabs: {}}
        }]
      }
    }
  },
  {
    path: claimProcessingRoutePathNursingCharge,
    component: ProcessClaimNursingChargeComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelNursingCharge,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            hideWorkItems: true,
            identifiers: {screenId: 'PRC-PB26.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathBillLineSpecialMemo,
    component: BillLineSpecialMemoComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelBillLineSpecialMemo,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            identifiers: {screenId: 'PRC-PAA4.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathElectronicClaimVerfSuspProcess,
    component: ElectronicClaimVerfSuspProcessComponent,
    canActivate: [AdjudicationSessionEntryGuard,
      AuthorityRuleGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      authorityRule: has(OP.PROCESS_CLAIM),
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelElectronicClaimVerfSuspProcess,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            hideWorkItems: true,
            identifiers: {screenId: 'CLM-PA44.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathClaimMedSuppEob,
    component: ProcessClaimMedsuppEobComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {

      nav: {
        linksToThisPath: [{
          label: claimProcessingRouteLabelClaimMedSuppEob,
          pageHeaderConfig: {
            headerType: 'new',
            hideHeader: true,
            hideBreadcrumbs: false
          },
          hideWorkItems: true,
          identifiers: {screenId: 'PRC-PB32.00', hasTabs: false, tabs: {}}
        }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathElectronicClaimVerfMaint,
    component: ElectronicClaimVerfMaintComponent,
    canActivate: [AdjudicationSessionEntryGuard,
      AuthorityRuleGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      authorityRule: has(OP.PROCESS_CLAIM),
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelElectronicClaimVerfMaint,
            pageHeaderConfig: {
              headerType: 'new',
              hideHeader: true,
              hideBreadcrumbs: false
            },
            hideWorkItems: true,
            identifiers: {screenId: 'PRC-PA45.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: claimProcessingRoutePathElectronicClaimVerfBillLine,
    component: ElectronicClaimVerfBillLineComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelElectronicClaimVerfBillLine,
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
    path: claimProcessingRoutePathElectronicClaimVerfDrugBillLine,
    component: ElectronicClaimVerfDrugBillLineComponent,
    canActivate: [AdjudicationSessionEntryGuard],
    canDeactivate: [AdjudicationSessionExitGuard],
    data: {
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelElectronicClaimVerfDrugBillLine,
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
    path: claimProcessingRoutePathRescannedImages,
    component: RescannedClaimImagesComponent,
    data: {
      featureName: claimProcessingRoutePathHistory,
      nav: {
        linksToThisPath: [
          {
            label: claimProcessingRouteLabelRescannedImages,
            identifiers: {screenId: 'PRC-CHSR.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(claimProcessingRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClaimProcessingRoutingModule {
}
