import {DatePipe, CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatCheckboxModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {ApproveVouchersMenuComponent} from './approve-vouchers-menu/approve-vouchers-menu.component';
import {CheckRecoveryRoutingModule} from './check-recovery-routing.module';
import {BulkDetailComponent} from './check-register/bulk-detail/bulk-detail.component';
import {CheckDetailPageComponent} from './check-register/check-detail-page/check-detail-page.component';
import {CheckDetailSubSectionComponent} from './check-register/check-detail-sub-section/check-detail-sub-section.component';
import {CheckDetailComponent} from './check-register/check-detail/check-detail.component';
import {CheckRegisterComponent} from './check-register/check-register.component';
import {McReplaceVoidComponent} from './check-register/mc-replace-void/mc-replace-void.component';
import {CdkDetailRowDirective} from './check-register/multiple-checks/cdk-detail-row.directive';
import {MultipleChecksComponent} from './check-register/multiple-checks/multiple-checks.component';
import {PurgedCheckComponent} from './check-register/purged-check/purged-check.component';
import {ReplaceVoidComponent} from './check-register/replace-void/replace-void.component';
import {DepositFileVerificationComponent} from './deposit-file-verification/deposit-file-verification.component';
import {ConfirmDeleteComponent} from './find-deposit-trc/deposit-detail/confirm-delete/confirm-delete.component';
import {DepositDetailCancelModalComponent} from './find-deposit-trc/deposit-detail/deposit-detail-cancel-modal.component';
import {DepositDetailComponent} from './find-deposit-trc/deposit-detail/deposit-detail.component';
import {DepositImageAccordionComponent} from './find-deposit-trc/deposit-detail/deposit-image-accordion/deposit-image-accordion.component';
import {FindDepositFormComponent} from './find-deposit-trc/find-deposit-form/find-deposit-form.component';
import {FindDepositResultsComponent} from './find-deposit-trc/find-deposit-results/find-deposit-results.component';
import {FindDepositTrcComponent} from './find-deposit-trc/find-deposit-trc.component';
import {FindTrcFormComponent} from './find-deposit-trc/find-trc-form/find-trc-form.component';
import {FindTrcResultsComponent} from './find-deposit-trc/find-trc-results/find-trc-results.component';
import {TrcDetailComponent} from './find-deposit-trc/trc-detail/trc-detail.component';
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {ManualEntryComponent} from './manual-entry/manual-entry.component';
import {AddOrEditOverPaymentComponent} from './overpayment/add-edit-overpayment/add-edit-overpayment.component';
import {OverpaymentHeaderRightComponent} from './overpayment/add-edit-overpayment/overpayment-right-header.component';
import {OverpaymentSubHeaderComponent} from './overpayment/add-edit-overpayment/overpayment-sub-header.component';
import {ClaimOverpaymentSelectionSubtitleComponent} from './overpayment/claim-overpayment-selection/claim-overpayment-selection-subtitle';
import {ClaimOverpaymentSelectionComponent} from './overpayment/claim-overpayment-selection/claim-overpayment-selection.component';
import {OverpaymentErrorComponent} from './overpayment/overpayment-error/overpayment-error.component';
import {OverpaymentRecoveryComponent} from './overpayment/overpayment-recovery/overpayment-recovery.component';
import {OverpaymentRefundHistSubtitleComponent} from './overpayment/overpayment-refund-hist/overpayment-refund-hist-subtitle/overpayment-refund-hist-subtitle.component';
import {OverpaymentRefundHistComponent} from './overpayment/overpayment-refund-hist/overpayment-refund-hist.component';
import {SeriesInformationMaintenanceComponent} from './series-information-maintenance/series-information-maintenance.component';
import {CheckReplacementComponent} from './check-register/check-replacement/check-replacement.component';
import {CheckActionsComponent} from './check-register/check-replacement/check-actions/check-actions.component';
import {CheckInfoComponent} from './check-register/check-replacement/check-actions/check-info/check-info.component';
import {CheckNameComponent} from './check-register/check-replacement/check-actions/check-name/check-name.component';
import {CheckReasonComponent} from './check-register/check-replacement/check-actions/check-reason/check-reason.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {CheckVoidComponent} from './check-register/check-replacement/check-actions/check-void/check-void.component';
import {ProviderModalComponent} from './check-register/check-replacement/modals/provider/provider-modal.component';
import {MemberModalComponent} from './check-register/check-replacement/modals/member-modal/member-modal.component';
import {AltProviderModalComponent} from './check-register/check-replacement/modals/alt-provider-modal/alt-provider-modal.component';
import {
  DocumentRepositoryModule,
  DocumentSearchService
} from '@fox/document-repository';
import {CheckDetailState} from './check-register/check-replacement/check-detail.state';
import {SharedModule, RegexpReplacePipe} from '@fox/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DocumentRepositoryModule,
    ReactiveFormsModule,
    SharedModule,
    CheckRecoveryRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatTabsModule,
    MatExpansionModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressBarModule,
    NgSelectModule
  ],
  declarations: [
    CheckRegisterComponent,
    SeriesInformationMaintenanceComponent,
    MaintenanceComponent,
    ApproveVouchersMenuComponent,
    CheckDetailComponent,
    BulkDetailComponent,
    ReplaceVoidComponent,
    PurgedCheckComponent,
    MultipleChecksComponent,
    CdkDetailRowDirective,
    McReplaceVoidComponent,
    CheckReplacementComponent,
    CheckActionsComponent,
    CheckDetailPageComponent,
    ManualEntryComponent,
    FindDepositTrcComponent,
    DepositFileVerificationComponent,
    FindDepositResultsComponent,
    FindDepositFormComponent,
    FindTrcResultsComponent,
    FindTrcFormComponent,
    DepositFileVerificationComponent,
    DepositDetailComponent,
    TrcDetailComponent,
    DepositImageAccordionComponent,
    DepositDetailCancelModalComponent,
    ConfirmDeleteComponent,
    AddOrEditOverPaymentComponent,
    ClaimOverpaymentSelectionComponent,
    OverpaymentRefundHistComponent,
    OverpaymentErrorComponent,
    OverpaymentRecoveryComponent,
    CheckDetailSubSectionComponent,
    OverpaymentHeaderRightComponent,
    OverpaymentSubHeaderComponent,
    ClaimOverpaymentSelectionSubtitleComponent,
    OverpaymentRefundHistSubtitleComponent,
    CheckInfoComponent,
    CheckNameComponent,
    CheckReasonComponent,
    CheckVoidComponent,
    ProviderModalComponent,
    MemberModalComponent,
    AltProviderModalComponent
  ],
  providers: [
    RegexpReplacePipe,
    DatePipe,
    DocumentSearchService,
    CheckDetailState
  ],
  entryComponents: [CheckDetailSubSectionComponent,
    OverpaymentHeaderRightComponent,
    OverpaymentSubHeaderComponent,
    ClaimOverpaymentSelectionSubtitleComponent,
    OverpaymentRefundHistSubtitleComponent]
})
export class CheckRecoveryModule {
}
