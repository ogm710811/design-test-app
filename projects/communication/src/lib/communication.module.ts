import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {SharedModule, ProcessClaimHeaderRightComponent, ProcessClaimSubheaderComponent} from '@fox/shared';
import {CommInfoComponent} from './comm-info/comm-info.component';
import {EndCommunicationComponent} from './comm-info/end-communication/end-communication.component';
import {CommunicationRoutingModule} from './communication-routing.module';
import {DeleteCommunicationComponent} from './delete-communication/delete-communication.component';
import {ListCommunicationComponent} from './list-communication/list-communication.component';
import {QualityReviewInfoRightComponent} from './quality-review/quality-review-info/quality-review-info-right/quality-review-info-right.component';
import {QualityReviewInfoSubtitleComponent} from './quality-review/quality-review-info/quality-review-info-subtitle/quality-review-info-subtitle.component';
import {QualityReviewInfoComponent} from './quality-review/quality-review-info/quality-review-info.component';
import {QualityReviewComponent} from './quality-review/quality-review.component';
import {ReviewCommunicationComponent} from './review-communication/review-communication.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    ReactiveFormsModule,
    CommunicationRoutingModule,
    MatDividerModule
  ],
  declarations: [
    QualityReviewComponent,
    QualityReviewInfoComponent,
    DeleteCommunicationComponent,
    ReviewCommunicationComponent,
    ListCommunicationComponent,
    CommInfoComponent,
    EndCommunicationComponent,
    QualityReviewInfoRightComponent,
    QualityReviewInfoSubtitleComponent
  ],
  entryComponents: [
    QualityReviewInfoRightComponent,
    QualityReviewInfoSubtitleComponent,
    ProcessClaimHeaderRightComponent,
    ProcessClaimSubheaderComponent
  ]
})
export class CommunicationModule {
}
