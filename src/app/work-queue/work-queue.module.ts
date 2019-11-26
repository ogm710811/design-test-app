import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material';
import {DocumentRepositoryModule} from '@fox/document-repository';
import {OrderByPipe} from '@fox/shared';
import {TooltipModule} from 'ngx-bootstrap';
import {ClipboardModule} from 'ngx-clipboard';
import {SharedModule} from '../shared/shared.module';
import {AcceptabilityCodeComponent} from './acceptability-code/acceptability-code.component';
import {ProviderValidationComponent} from './provider-validation/provider-validation.component';
import {OpenWorkItemConfirmationComponent} from './queue-detail/open-workitem-confirmation/open-workitem-confirmation-modal.component';
import {QueueDetailConfirmationComponent} from './queue-detail/queue-detail-confirmation/queue-detail-confirmation-modal.component';
import {QueueDetailComponent} from './queue-detail/queue-detail.component';
import {QueueSelectionConfirmationComponent} from './queue-selection/queue-selection-results/queue-selection-confirmation/queue-selection-confirmation.component';
import {QueueSelectionResultsComponent} from './queue-selection/queue-selection-results/queue-selection-results.component';
import {QueueSelectionSearchComponent} from './queue-selection/queue-selection-search/queue-selection-search.component';
import {QueueSelectionComponent} from './queue-selection/queue-selection.component';
import {WorkQueueRoutingModule} from './work-queue-routing.module';
import {WorkbenchComponent} from './workbench/workbench.component';

@NgModule({
  imports: [
    DocumentRepositoryModule,
    SharedModule,
    WorkQueueRoutingModule,
    ReactiveFormsModule,
    MatExpansionModule,
    ClipboardModule,
    TooltipModule
  ],
  declarations: [
    QueueDetailComponent,
    QueueDetailConfirmationComponent,
    OpenWorkItemConfirmationComponent,
    QueueSelectionComponent,
    WorkbenchComponent,
    QueueSelectionSearchComponent,
    QueueSelectionResultsComponent,
    ProviderValidationComponent,
    AcceptabilityCodeComponent,
    QueueSelectionConfirmationComponent
  ],
  providers: [
    OrderByPipe
  ]
})
export class WorkQueueModule {
}
