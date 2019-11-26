import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  AuthorityRule,
  AuthorityRuleGuard,
  both,
  documentRepositoryRouteLabelDocumentDetail,
  documentRepositoryRouteLabelDocumentSearch,
  documentRepositoryRouteLabelDocumentUpload,
  documentRepositoryRoutePathDocumentDetail,
  documentRepositoryRoutePathDocumentSearch,
  documentRepositoryRoutePathDocumentUpload,
  hasAllOf,
  hasAnyOf,
  OP
} from '@fox/shared';
import {DocumentDetailComponent} from './document-search/document-detail/document-detail.component';
import {DocumentSearchComponent} from './document-search/document-search.component';
import {DocumentUploadComponent} from './document-upload/document-upload.component';

export const hasAnyWqPermission: AuthorityRule = hasAnyOf([OP.MAINTAIN_STD_WQ, OP.MAINTAIN_EH_WQ, OP.MAINTAIN_CSS_WQ, OP.MAINTAIN_SIU_WQ,
  OP.VIEW_DOCUMENT, OP.EDIT_DOCUMENT, OP.MAINTAIN_WORKQUEUE]);

export const hasBothWqAndDocPermissions: AuthorityRule = both(
  hasAnyOf([OP.MAINTAIN_EH_WQ, OP.MAINTAIN_STD_WQ]),
  hasAllOf([OP.VIEW_DOCUMENT, OP.EDIT_DOCUMENT]));

const DocumentRepositoryRoutes: Routes = [
  {
    path: '',
    redirectTo: documentRepositoryRoutePathDocumentSearch,
    pathMatch: 'full'
  },
  {
    path: documentRepositoryRoutePathDocumentSearch,
    component: DocumentSearchComponent,
    canActivate: [AuthorityRuleGuard],
    data: {
      featureName: documentRepositoryRoutePathDocumentSearch,
      authorityRule: hasAnyWqPermission,
      nav: {
        linksToThisPath: [
          {
            label: documentRepositoryRouteLabelDocumentSearch,
            pageHeaderConfig: {headerType: 'new'},
            identifiers: {screenId: 'DOC-SRCH.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: documentRepositoryRoutePathDocumentUpload,
    component: DocumentUploadComponent,
    canActivate: [AuthorityRuleGuard],
    data: {
      featureName: documentRepositoryRoutePathDocumentUpload,
      authorityRule: hasBothWqAndDocPermissions,
      nav: {
        linksToThisPath: [
          {
            label: documentRepositoryRouteLabelDocumentUpload,
            identifiers: {screenId: 'DOC-UPLD.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  },
  {
    path: documentRepositoryRoutePathDocumentDetail,
    component: DocumentDetailComponent,
    canActivate: [AuthorityRuleGuard],
    data: {
      authorityRule: hasAnyWqPermission,
      nav: {
        linksToThisPath: [
          {
            label: documentRepositoryRouteLabelDocumentDetail,
            pageHeaderConfig: {
              headerType: 'new',
              tabTitles: ['Image', 'Notes', 'Audit Log'],
            },
            hideFooter: true,
            fullWidth: true,
            identifiers: {screenId: 'DOC-DTLS.00', hasTabs: false, tabs: {}}
          }
        ]
      }
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(DocumentRepositoryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DocumentRepositoryRoutingModule {

}
