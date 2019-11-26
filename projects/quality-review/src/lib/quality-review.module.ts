import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatMenuModule
} from '@angular/material';
import {SharedModule} from '@fox/shared';
import {ClaimMessagesComponent} from './claim-messages/claim-messages.component';
import {RevalidationErrorMenuComponent} from './der-menu/revalidation-error-menu.component';
import {QualityInformationComponent} from './derrmnt/quality-information.component';
import {ErrorReviewComponent} from './derrrvw/error-review.component';
import {DuplicateBillComponent} from './dupbil/duplicate-bill.component';
import {RevalidationMenuComponent} from './menu/revalidation-menu.component';
import {MiscInfoPageHeaderRightComponent} from './miscinfo/misc-info-page-header-right.component';
import {MiscInfoPageHeaderSubtitleComponent} from './miscinfo/misc-info-page-header-subtitle.component';
import {MiscinfoFormComponent} from './miscinfo/miscinfo-form/miscinfo-form.component';
import {QltyrvwrvldmiscinfoComponent} from './miscinfo/qltyrvwrvldmiscinfo.component';
import {VolumeReasonComponent} from './olrsn/volume-reason.component';
import {OperatorStatisticsComponent} from './oper-stat/operator-statistics.component';
import {QualityReviewRoutingModule} from './quality-review-routing.module';
import {QualityReviewTabsComponent} from './quality-review-tabs/quality-review-tabs.component';
import {QualitySequenceNumInquiryComponent} from './quality-sequence-number-inquiry/quality-sequence-number-inquiry.component';
import {CautionsNoteComponent} from './revalidation-cautions/cautions-note/cautions-note.component';
import {RevalidationCautionsComponent} from './revalidation-cautions/revalidation-cautions.component';
import {RevalidationClaimMessagesComponent} from './revalidation-claim-messages/revalidation-claim-messages.component';
import {QualityReviewVolumeComponent} from './volume/quality-review-volume.component';
import {DuplicatesComponent} from './dupbil/duplicates/duplicates.component';
import {DuplicatesRightPanelComponent} from './dupbil/duplicates-right-panel/duplicates-right-panel.component';
import {DuplicatesLeftPanelComponent} from './dupbil/duplicates-left-panel/duplicates-left-panel.component';
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
    MatMenuModule,
    ReactiveFormsModule,
    MatDividerModule,
    QualityReviewRoutingModule
  ],
  declarations: [
    RevalidationCautionsComponent,
    RevalidationClaimMessagesComponent,
    RevalidationMenuComponent,
    RevalidationErrorMenuComponent,
    QualityReviewVolumeComponent,
    VolumeReasonComponent,
    DuplicateBillComponent,
    ErrorReviewComponent,
    QualityInformationComponent,
    QualitySequenceNumInquiryComponent,
    QltyrvwrvldmiscinfoComponent,
    OperatorStatisticsComponent,
    MiscinfoFormComponent,
    DuplicatesLeftPanelComponent,
    DuplicatesRightPanelComponent,
    QualityReviewTabsComponent,
    ClaimMessagesComponent,
    CautionsNoteComponent,
    MiscInfoPageHeaderRightComponent,
    MiscInfoPageHeaderSubtitleComponent,
    DuplicatesComponent
  ],
  entryComponents: [
    MiscInfoPageHeaderRightComponent,
    MiscInfoPageHeaderSubtitleComponent
  ]
})
export class QualityReviewModule {
}
