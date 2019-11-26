import {
  checkRecoveryRouteCommandCheckReconciliation,
  checkRecoveryRouteCommandDepositFileVerification,
  checkRecoveryRouteCommandEditOverpay,
  checkRecoveryRouteCommandFindDepositTRC,
  checkRecoveryRouteCommandManualEntry,
  checkRecoveryRouteCommandOverpaymentRecovery,
  checkRecoveryRouteCommandOverpaymentSelection,
  checkRecoveryRouteLabelCheckReconciliation,
  checkRecoveryRouteLabelDepositFileVerification,
  checkRecoveryRouteLabelFindDepositTRC,
  checkRecoveryRouteLabelOverpaymentRecovery,
  checkRecoveryRouteLabelOverpaymentSelection,
  checkRecoveryRoutePathCheckReconciliation,
  checkRecoveryRoutePathDepositFileVerification,
  checkRecoveryRoutePathEditOverpay,
  checkRecoveryRoutePathFindDepositTRC,
  checkRecoveryRoutePathManualEntry,
  checkRecoveryRoutePathOverpaymentRecovery,
  checkRecoveryRoutePathOverpaymentSelection,
  checkRecoveryRoutePathRoot
} from './check-recovery.constants';

import {
  claimProcessingRouteCommandBypass,
  claimProcessingRouteCommandBypassMgmt,
  claimProcessingRouteCommandCarrierOnHand,
  claimProcessingRouteCommandHistory,
  claimProcessingRouteCommandMaintenanceApproval,
  claimProcessingRouteCommandMemLookup,
  claimProcessingRouteCommandQrErrInquiry,
  claimProcessingRouteCommandSearch,
  claimProcessingRouteCommandSuspenseError,
  claimProcessingRouteCommandSuspenseProcess,
  claimProcessingRouteCommandVerificationError,
  claimProcessingRouteLabelBypass,
  claimProcessingRouteLabelCarrierOnHand,
  claimProcessingRouteLabelHistory,
  claimProcessingRouteLabelSearch,
  claimProcessingRouteLabelSuspenseProcess,
  claimProcessingRoutePathBypass,
  claimProcessingRoutePathBypassMgmt,
  claimProcessingRoutePathCarrierOnHand,
  claimProcessingRoutePathHistory,
  claimProcessingRoutePathMaintenanceApproval,
  claimProcessingRoutePathMemLookup,
  claimProcessingRoutePathQrErrInquiry,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathSearch,
  claimProcessingRoutePathSuspenseError,
  claimProcessingRoutePathSuspenseProcess,
  claimProcessingRoutePathVerificationError
} from './claim-processing.constants';

import {
  communicationRouteCommandCommInfo,
  communicationRouteCommandCommSuspended,
  communicationRouteCommandDeleteComm,
  communicationRouteCommandListComm,
  communicationRouteCommandQualityReviewComm,
  communicationRouteCommandRevComm,
  communicationRoutePathCommInfo,
  communicationRoutePathDeleteComm,
  communicationRoutePathListComm,
  communicationRoutePathQualityReviewComm,
  communicationRoutePathRevComm,
  communicationRoutePathRoot
} from './communication.constants';

import {
  dashboardRouteCommandCurrentStats,
  dashboardRouteCommandDefaultFile,
  dashboardRouteCommandOperatorFile,
  dashboardRouteCommandReplaceEob,
  dashboardRouteLabelReplaceEob,
  dashboardRoutePathCurrentStats,
  dashboardRoutePathDefaultFile,
  dashboardRoutePathOperatorFile,
  dashboardRoutePathReplaceEob,
  dashboardRoutePathRoot
} from './dashboard.constants';

import {
  documentRepositoryRouteCommandDocumentSearch,
  documentRepositoryRouteCommandDocumentUpload,
  documentRepositoryRouteLabelDocumentSearch,
  documentRepositoryRouteLabelDocumentUpload,
  documentRepositoryRoutePathDocumentSearch,
  documentRepositoryRoutePathDocumentUpload,
  documentRepositoryRoutePathRoot
} from './document-repository.constants';

import {
  fileMaintenanceRouteCommandClaimNumberRangeFileMaintenanceMenu,
  fileMaintenanceRouteCommandMessageMaintenance,
  fileMaintenanceRoutePathClaimNumberRangeFileMaintenanceMenu,
  fileMaintenanceRoutePathMessageMaintenance,
  fileMaintenanceRoutePathRoot
} from './file-maintenance.constants';

import {
  memberInformationRouteCommandEobInfo,
  memberInformationRouteCommandMemberSearch,
  memberInformationRouteCommandProviderSearch,
  memberInformationRouteLabelEobInfo,
  memberInformationRouteLabelMemberSearch,
  memberInformationRouteLabelProviderSearch,
  memberInformationRoutePathEobInfo,
  memberInformationRoutePathMemberSearch,
  memberInformationRoutePathProviderSearch,
  memberInformationRoutePathRoot
} from './member-information.constants';

import {
  processingRouteCommandIcdTableMaintenance,
  processingRouteCommandlDrugInquiry,
  processingRouteCommandReviewCptHpcsCodes,
  processingRouteCommandReviewIcdCodes,
  processingRouteCommandReviewMessages,
  processingRouteLabelDrugInquiry,
  processingRouteLabelIcdTableMaintenance,
  processingRouteLabelReviewIcdCodes,
  processingRoutePathIcdTableMaintenance,
  processingRoutePathlDrugInquiry,
  processingRoutePathReviewCptHpcsCodes,
  processingRoutePathReviewIcdCodes,
  processingRoutePathReviewMessages,
  processingRoutePathRoot
} from './processing.constants';
import {
  qualityReviewRouteCommandQualityInformation,
  qualityReviewRouteCommandQualityReviewVolume,
  qualityReviewRouteCommandRevalidationMenu,
  qualityReviewRouteCommandRevalidationMenuQQ,
  qualityReviewRouteCommandSequenceNumberInquiry,
  qualityReviewRoutePathQualityInformation,
  qualityReviewRoutePathQualityReviewVolume,
  qualityReviewRoutePathRevalidationMenu,
  qualityReviewRoutePathRoot,
  qualityReviewRoutePathSequenceNumberInq
} from './quality-review.constants';

export const sideMenu = [
  {
    modelName: 'Claims',
    sideMenuLink: [
      {
        command: claimProcessingRouteCommandBypass,
        label: claimProcessingRouteLabelBypass,
        link: `/${claimProcessingRoutePathRoot}/${claimProcessingRoutePathBypass}`,
        featureName: 'F3709'
      },
      {
        command: claimProcessingRouteCommandBypassMgmt,
        label: 'Bypass Queue Admin',
        link: `/${claimProcessingRoutePathRoot}/${claimProcessingRoutePathBypassMgmt}`,
        featureName: 'F3709'
      },
      {
        command: claimProcessingRouteCommandCarrierOnHand,
        label: claimProcessingRouteLabelCarrierOnHand,
        link: `/${claimProcessingRoutePathRoot}/${claimProcessingRoutePathCarrierOnHand}`,
        featureName: 'F3709'
      },
      {
        command: claimProcessingRouteCommandHistory,
        label: 'Claim Search',
        link: `/${claimProcessingRoutePathRoot}/${claimProcessingRoutePathHistory}`,
        featureName: 'F3709'
      },
      {
        command: memberInformationRouteCommandProviderSearch,
        label: memberInformationRouteLabelProviderSearch,
        link: `/${memberInformationRoutePathRoot}/${memberInformationRoutePathProviderSearch}`,
        featureName: 'F3709'
      },
      {
        command: dashboardRouteCommandReplaceEob,
        label: dashboardRouteLabelReplaceEob,
        link: `/${dashboardRoutePathRoot}/${dashboardRoutePathReplaceEob}`,
        featureName: 'F3709'
      },
      {
        command: claimProcessingRouteCommandSuspenseError,
        label: 'Suspense Err',
        link: `/${claimProcessingRoutePathRoot}/${claimProcessingRoutePathSuspenseError}`,
        featureName: 'F3709'
      },
      {
        command: claimProcessingRouteCommandSuspenseProcess,
        label: claimProcessingRouteLabelSuspenseProcess,
        link: `/${claimProcessingRoutePathRoot}/${claimProcessingRoutePathSuspenseProcess}`,
        featureName: 'F3709'
      },
      {
        command: claimProcessingRouteCommandVerificationError,
        label: 'Verification Err',
        link: `/${claimProcessingRoutePathRoot}/${claimProcessingRoutePathVerificationError}`,
        featureName: 'F3709'
      }
    ]
  },
  {
    modelName: 'Processing',
    sideMenuLink: [
      {
        command: claimProcessingRouteCommandHistory,
        label: claimProcessingRouteLabelHistory,
        link: `/${claimProcessingRoutePathRoot}/${claimProcessingRoutePathHistory}`
      },
      {
        command: processingRouteCommandReviewCptHpcsCodes,
        label: 'CPT / HCPCS Inq',
        link: `/${processingRoutePathRoot}/${processingRoutePathReviewCptHpcsCodes}`,
        featureName: 'F3709'
      },
      {
        command: processingRouteCommandlDrugInquiry,
        label: processingRouteLabelDrugInquiry,
        link: `/${processingRoutePathRoot}/${processingRoutePathlDrugInquiry}`,
        featureName: 'F3709'
      },
      {
        command: memberInformationRouteCommandEobInfo,
        label: memberInformationRouteLabelEobInfo,
        link: `/${memberInformationRoutePathRoot}/${memberInformationRoutePathEobInfo}`
      },
      {
        command: processingRouteCommandIcdTableMaintenance,
        label: processingRouteLabelIcdTableMaintenance,
        link: `/${processingRoutePathRoot}/${processingRoutePathIcdTableMaintenance}`,
        featureName: 'F3709'
      },
      {
        command: processingRouteCommandReviewIcdCodes,
        label: processingRouteLabelReviewIcdCodes,
        link: `/${processingRoutePathRoot}/${processingRoutePathReviewIcdCodes}`,
        featureName: 'F3709'
      },
      {
        command: claimProcessingRouteCommandMemLookup,
        label: 'Member Lookup',
        link: `/${claimProcessingRoutePathRoot}/${claimProcessingRoutePathMemLookup}`
      },
      {
        command: memberInformationRouteCommandMemberSearch,
        label: memberInformationRouteLabelMemberSearch,
        link: `/${memberInformationRoutePathRoot}/${memberInformationRoutePathMemberSearch}`
      },
      {
        command: processingRouteCommandReviewMessages,
        label: 'Message Inq',
        link: `/${processingRoutePathRoot}/${processingRoutePathReviewMessages}`,
        featureName: 'F3709'
      },
      {
        command: claimProcessingRouteCommandMaintenanceApproval,
        label: 'Request Management',
        link: `/${claimProcessingRoutePathRoot}/${claimProcessingRoutePathMaintenanceApproval}`
      }
    ]
  },
  {
    modelName: 'Checks',
    sideMenuLink: [
      {
        command: checkRecoveryRouteCommandCheckReconciliation,
        label: checkRecoveryRouteLabelCheckReconciliation,
        link: `/${checkRecoveryRoutePathRoot}/${checkRecoveryRoutePathCheckReconciliation}`
      },
      {
        command: claimProcessingRouteCommandSearch,
        label: claimProcessingRouteLabelSearch,
        link: `/${claimProcessingRoutePathRoot}/${claimProcessingRoutePathSearch}`
      },
      {
        command: checkRecoveryRouteCommandDepositFileVerification,
        label: checkRecoveryRouteLabelDepositFileVerification,
        link: `/${checkRecoveryRoutePathRoot}/${checkRecoveryRoutePathDepositFileVerification}`
      },
      {
        command: checkRecoveryRouteCommandFindDepositTRC,
        label: checkRecoveryRouteLabelFindDepositTRC,
        link: `/${checkRecoveryRoutePathRoot}/${checkRecoveryRoutePathFindDepositTRC}`
      },
      {
        command: checkRecoveryRouteCommandManualEntry,
        label: 'Manual Deposit Entry',
        link: `/${checkRecoveryRoutePathRoot}/${checkRecoveryRoutePathManualEntry}`
      },
      {
        command: checkRecoveryRouteCommandEditOverpay,
        label: 'Overpayment Record',
        link: `/${checkRecoveryRoutePathRoot}/${checkRecoveryRoutePathEditOverpay}`
      },
      {
        command: checkRecoveryRouteCommandOverpaymentSelection,
        label: checkRecoveryRouteLabelOverpaymentSelection,
        link: `/${checkRecoveryRoutePathRoot}/${checkRecoveryRoutePathOverpaymentSelection}`
      },
      {
        command: checkRecoveryRouteCommandOverpaymentRecovery,
        label: checkRecoveryRouteLabelOverpaymentRecovery,
        link: `/${checkRecoveryRoutePathRoot}/${checkRecoveryRoutePathOverpaymentRecovery}`,
        featureName: 'F3709'
      }
    ]
  },
  {
    modelName: 'Communication',
    sideMenuLink: [
      {
        command: communicationRouteCommandCommInfo,
        label: 'Comm Info',
        link: `/${communicationRoutePathRoot}/${communicationRoutePathCommInfo}`,
        featureName: 'F3709'
      },
      {
        command: communicationRouteCommandQualityReviewComm,
        label: 'Comm Quality Rev',
        link: `/${communicationRoutePathRoot}/${communicationRoutePathQualityReviewComm}`,
        featureName: 'F3709'
      },
      {
        command: communicationRouteCommandDeleteComm,
        label: 'Delete Comm',
        link: `/${communicationRoutePathRoot}/${communicationRoutePathDeleteComm}`,
        featureName: 'F3709'
      },
      {
        command: communicationRouteCommandListComm,
        label: 'List Comm',
        link: `/${communicationRoutePathRoot}/${communicationRoutePathListComm}`,
        featureName: 'F3709'
      },
      {
        command: communicationRouteCommandRevComm,
        label: 'Rev Comm',
        link: `/${communicationRoutePathRoot}/${communicationRoutePathRevComm}`,
        featureName: 'F3709'
      },
      {
        command: communicationRouteCommandCommSuspended,
        label: 'Edit Comm',
        link: `/${communicationRoutePathRoot}/${communicationRoutePathCommInfo}`,
        featureName: 'F3709'
      }
    ]
  },
  {
    modelName: 'Documents',
    sideMenuLink: [
      {
        command: documentRepositoryRouteCommandDocumentSearch,
        label: documentRepositoryRouteLabelDocumentSearch,
        link: `/${documentRepositoryRoutePathRoot}/${documentRepositoryRoutePathDocumentSearch}`
      },
      {
        command: documentRepositoryRouteCommandDocumentUpload,
        label: documentRepositoryRouteLabelDocumentUpload,
        link: `/${documentRepositoryRoutePathRoot}/${documentRepositoryRoutePathDocumentUpload}`
      }
    ]
  },
  {
    modelName: 'File Maintenance',
    sideMenuLink: [
      {
        command: dashboardRouteCommandDefaultFile,
        label: 'Default File',
        link: `/${dashboardRoutePathRoot}/${dashboardRoutePathDefaultFile}`,
        featureName: 'F3709'
      },
      {
        command: fileMaintenanceRouteCommandMessageMaintenance,
        label: 'Message File',
        link: `/${fileMaintenanceRoutePathRoot}/${fileMaintenanceRoutePathMessageMaintenance}`,
        featureName: 'F3709'
      },
      {
        command: fileMaintenanceRouteCommandClaimNumberRangeFileMaintenanceMenu,
        label: 'Microfilm Range File',
        link: `/${fileMaintenanceRoutePathRoot}/${fileMaintenanceRoutePathClaimNumberRangeFileMaintenanceMenu}`,
        featureName: 'F3709'
      }
    ]
  },
  {
    modelName: 'Quality Review',
    sideMenuLink: [
      {
        command: qualityReviewRouteCommandQualityInformation,
        label: 'QR Info',
        link: `/${qualityReviewRoutePathRoot}/${qualityReviewRoutePathQualityInformation}`,
        featureName: 'F3709'
      },
      {
        command: qualityReviewRouteCommandRevalidationMenuQQ,
        label: 'QR Revalidation',
        link: `/${qualityReviewRoutePathRoot}/${qualityReviewRoutePathRevalidationMenu}`,
        featureName: 'F3709'
      },
      {
        command: qualityReviewRouteCommandRevalidationMenu,
        label: 'QR Review',
        link: `/${qualityReviewRoutePathRoot}/${qualityReviewRoutePathRevalidationMenu}`,
        featureName: 'F3709'
      },
      {
        command: qualityReviewRouteCommandSequenceNumberInquiry,
        label: 'QR Sequence Inq',
        link: `/${qualityReviewRoutePathRoot}/${qualityReviewRoutePathSequenceNumberInq}`,
        featureName: 'F3709'
      },
      {
        command: qualityReviewRouteCommandQualityReviewVolume,
        label: 'QR Volume',
        link: `/${qualityReviewRoutePathRoot}/${qualityReviewRoutePathQualityReviewVolume}`,
        featureName: 'F3709'
      }
    ]
  },
  {
    modelName: 'Reporting',
    sideMenuLink: [
      {
        command: dashboardRouteCommandCurrentStats,
        label: 'Member Lookup Statistics',
        link: `/${dashboardRoutePathRoot}/${dashboardRoutePathCurrentStats}`
      },
      {
        command: dashboardRouteCommandOperatorFile,
        label: 'Operator File',
        link: `/${dashboardRoutePathRoot}/${dashboardRoutePathOperatorFile}`,
        featureName: 'F3709'
      },
      {
        command: claimProcessingRouteCommandQrErrInquiry,
        label: 'QR Error Inquiry',
        link: `/${claimProcessingRoutePathRoot}/${claimProcessingRoutePathQrErrInquiry}`
      }
    ]
  }
];
