import {
  checkRecoveryRouteCommandFindCheckRegister,
  checkRecoveryRouteCommandFindDepositTRC,
  checkRecoveryRouteCommandManualEntry,
  checkRecoveryRouteLabelFindCheckRegister,
  checkRecoveryRouteLabelFindDepositTRC,
  checkRecoveryRouteLabelManualEntry,
  checkRecoveryRoutePathFindCheckRegister,
  checkRecoveryRoutePathFindDepositTRC,
  checkRecoveryRoutePathManualEntry,
  checkRecoveryRoutePathRoot,
  claimProcessingRouteCommandHistory,
  claimProcessingRouteCommandMaintenanceApproval,
  claimProcessingRouteCommandManualClaimIntake,
  claimProcessingRouteCommandMemLookup,
  claimProcessingRouteCommandSearch,
  claimProcessingRouteLabelHistory,
  claimProcessingRouteLabelMaintenanceApproval,
  claimProcessingRouteLabelManualClaimIntake,
  claimProcessingRouteLabelMemLookup,
  claimProcessingRouteLabelSearch,
  claimProcessingRoutePathHistory,
  claimProcessingRoutePathMaintenanceApproval,
  claimProcessingRoutePathManualClaimIntake,
  claimProcessingRoutePathMemLookup,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathSearch,
  documentRepositoryRouteCommandDocumentSearch,
  documentRepositoryRouteCommandDocumentUpload,
  documentRepositoryRouteLabelDocumentSearch,
  documentRepositoryRouteLabelDocumentUpload,
  documentRepositoryRoutePathDocumentSearch,
  documentRepositoryRoutePathDocumentUpload,
  documentRepositoryRoutePathRoot,
  memberInformationRouteCommandEobInfo,
  memberInformationRouteCommandMemberSearch,
  memberInformationRouteCommandProviderSearch,
  memberInformationRouteLabelEobInfo,
  memberInformationRouteLabelMemberSearch,
  memberInformationRouteLabelProviderSearch,
  memberInformationRoutePathEobInfo,
  memberInformationRoutePathMemberSearch,
  memberInformationRoutePathProviderSearch,
  memberInformationRoutePathRoot,
  checkRecoveryRouteCommandDepositFileVerification,
  checkRecoveryRouteLabelDepositFileVerification,
  checkRecoveryRoutePathDepositFileVerification
} from '@fox/shared';

export const tiles = [
  [
    {
      title: 'Member', icon: 'assets/img/member.svg', tileRow: 1,
      menuLink: [
        {
          command: memberInformationRouteCommandMemberSearch,
          label: memberInformationRouteLabelMemberSearch,
          link: `/${memberInformationRoutePathRoot}/${memberInformationRoutePathMemberSearch}`
        },
        {
          command: memberInformationRouteCommandEobInfo,
          label: memberInformationRouteLabelEobInfo,
          link: `/${memberInformationRoutePathRoot}/${memberInformationRoutePathEobInfo}`
        },
        {
          command: claimProcessingRouteCommandMemLookup,
          label: claimProcessingRouteLabelMemLookup,
          link: `/${claimProcessingRoutePathRoot}/${claimProcessingRoutePathMemLookup}`
        }
      ]
    },
    {
      title: 'Claims', icon: 'assets/img/claim.svg', tileRow: 1,
      menuLink: [
        {
          command: claimProcessingRouteCommandHistory,
          label: claimProcessingRouteLabelHistory,
          link: `/${claimProcessingRoutePathRoot}/${claimProcessingRoutePathHistory}`
        },
        {
          command: claimProcessingRouteCommandSearch,
          label: claimProcessingRouteLabelSearch,
          link: `/${claimProcessingRoutePathRoot}/${claimProcessingRoutePathSearch}`
        },
        {
          command: memberInformationRouteCommandProviderSearch,
          label: memberInformationRouteLabelProviderSearch,
          link: `/${memberInformationRoutePathRoot}/${memberInformationRoutePathProviderSearch}`
        }
      ]
    },
  ],
  [
    {
      title: 'Documents', icon: 'assets/img/document-grey.svg', tileRow: 2,
      menuLink: [
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
      title: 'Checks', icon: 'assets/img/checks-icon.svg', tileRow: 2,
      menuLink: [
        {
          command: checkRecoveryRouteCommandFindCheckRegister,
          label: checkRecoveryRouteLabelFindCheckRegister,
          link: `/${checkRecoveryRoutePathRoot}/${checkRecoveryRoutePathFindCheckRegister}`
        },
        {
          command: checkRecoveryRouteCommandFindDepositTRC,
          label: checkRecoveryRouteLabelFindDepositTRC,
          link: `/${checkRecoveryRoutePathRoot}/${checkRecoveryRoutePathFindDepositTRC}`
        },
        {
          command: checkRecoveryRouteCommandDepositFileVerification,
          label: checkRecoveryRouteLabelDepositFileVerification,
          link: `/${checkRecoveryRoutePathRoot}/${checkRecoveryRoutePathDepositFileVerification}`
        }
      ]
    }
  ]
];
