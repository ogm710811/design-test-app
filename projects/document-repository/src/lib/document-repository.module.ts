import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonToggleModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatRadioModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {TooltipModule} from 'ngx-bootstrap';
import {DateFormatPipe, SharedModule} from '@fox/shared';
import {DocumentFormComponent} from './document-form.component';
import {DocumentRepositoryRoutingModule} from './document-repository-routing.module';
import {DocumentDetailNoteCancelModalComponent} from './document-search/document-detail/document-detail-delete-modal.component';
import {DocumentDetailRightComponent} from './document-search/document-detail/document-detail-right/document-detail-right.component';
import {DocumentDetailSeparateCancelModalComponent} from './document-search/document-detail/document-detail-separate-modal.component';
import {DocumentDetailComponent} from './document-search/document-detail/document-detail.component';
import {LinkMemberSearchComponent} from './document-search/document-detail/link-member-modal.component/link-member-modal.component';
import {QuickEditModalComponent} from './document-search/document-quick-edit.component';
import {DocumentSearchExpansionHeaderComponent} from './document-search/document-search-expansion-header.component';
import {DocumentSearchComponent} from './document-search/document-search.component';
import {DocumentUploadComponent} from './document-upload/document-upload.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatMenuModule,
    DocumentRepositoryRoutingModule,
    TooltipModule,
    MatDividerModule
  ],
  declarations: [
    DocumentSearchComponent,
    DocumentDetailComponent,
    LinkMemberSearchComponent,
    DocumentFormComponent,
    DocumentUploadComponent,
    DocumentDetailNoteCancelModalComponent,
    DocumentSearchExpansionHeaderComponent,
    QuickEditModalComponent,
    DocumentDetailRightComponent,
    DocumentDetailSeparateCancelModalComponent
  ],
  providers: [
    DateFormatPipe
  ]
})
export class DocumentRepositoryModule {
}
