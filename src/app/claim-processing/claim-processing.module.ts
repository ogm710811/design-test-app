import {
  CommonModule,
  DatePipe,
  LowerCasePipe,
  TitleCasePipe
} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonToggleModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {NgSelectModule} from '@ng-select/ng-select';
import {TooltipModule} from 'ngx-bootstrap';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ClipboardModule} from 'ngx-clipboard';
import {
  ProcessClaimHeaderRightComponent,
  ProcessClaimSubheaderComponent,
  SharedModule
} from '@fox/shared';
import {IWriteLetterService, MemberInformationService} from '@fox/member-info';
import {ClaimDetailsRightComponent} from './claim-history/claim-details-right.component';
import {ClaimDetailsCrossReferenceComponent} from './claim-history/claim-details/claim-detail-cross-reference/claim-details-cross-reference.component';
import {CrossReferenceSearchTableComponent} from './claim-history/claim-details/claim-detail-cross-reference/cross-reference-search-table/cross-reference-search-table.component';
import {CrossReferenceTableComponent} from './claim-history/claim-details/claim-detail-cross-reference/cross-reference-table/cross-reference-table.component';
import {CombinedClaimsModalComponent} from './claim-history/claim-details/claim-detail-modals/combined-claims-modal/combined-claims-modal.component';
import {DeleteClaimModalComponent} from './claim-history/claim-details/claim-detail-modals/delete-claim-modal/delete-claim-modal.component';
import {ReactivateClaimModalComponent} from './claim-history/claim-details/claim-detail-modals/reactivate-claim-modal/reactivate-claim-modal.component';
import {SendReplaceEobModalComponent} from './claim-history/claim-details/claim-detail-modals/send-replace-eob-modal/send-replace-eob-modal.component';
import {SuspendClaimModalComponent} from './claim-history/claim-details/claim-detail-modals/suspend-claim-modal/suspend-claim-modal.component';
import {TransferClaimSearchModalComponent} from './claim-history/claim-details/claim-detail-modals/transfer-claim-modals/transfer-claim-search-modal/transfer-claim-search-modal.component';
import {UpdateEobModalComponent} from './claim-history/claim-details/claim-detail-modals/update-eob-modal/update-eob-modal.component';
import {ClaimDetailsAuditComponent} from './claim-history/claim-details/claim-details-audit-log/claim-details-audit-log.component';
import {BillLinesDrugComponent} from './claim-history/claim-details/claim-details-bill-lines/bill-lines-drug/bill-lines-drug.component';
import {BillLinesHospitalComponent} from './claim-history/claim-details/claim-details-bill-lines/bill-lines-hospital/bill-lines-hospital.component';
import {BillLinesMedSuppComponent} from './claim-history/claim-details/claim-details-bill-lines/bill-lines-medsupp/bill-lines-medsupp.component';
import {BillLinesMessagesTableComponent} from './claim-history/claim-details/claim-details-bill-lines/bill-lines-messages-table/bill-lines-messages-table.component';
import {BillLinesNoPayComponent} from './claim-history/claim-details/claim-details-bill-lines/bill-lines-nopay/bill-lines-nopay.component';
import {BillLinesServiceComponent} from './claim-history/claim-details/claim-details-bill-lines/bill-lines-services/bill-lines-services.component';
import {ClaimDetailsHomeComponent} from './claim-history/claim-details/claim-details-home/claim-details-home.component';
import {ClaimDetailsMessageComponent} from './claim-history/claim-details/claim-details-home/claim-details-message/claim-details-message.component';
import {ClaimDetailsNotesComponent} from './claim-history/claim-details/claim-details-notes/claim-details-notes.component';
import {ClaimDetailsComponent} from './claim-history/claim-details/claim-details.component';
import {BillLinesResultTableComponent} from './claim-history/claim-history-tables/bill-lines-table/bill-lines-table.component';
import {HistoryResultTableComponent} from './claim-history/claim-history-tables/history-result-table/history-result-table.component';
import {MemberResultTableComponent} from './claim-history/claim-history-tables/member-result-table/member-result-table.component';
import {TransferClaimDetailsTableComponent} from './claim-history/claim-history-tables/transfer-claim-details-table/transfer-claim-details.component';
import {TransferClaimResultTableComponent} from './claim-history/claim-history-tables/transfer-claim-result-table/transfer-claim-result.component';
import {ClaimHistoryComponent} from './claim-history/claim-history.component';
import {ClaimProcessingRoutingModule} from './claim-processing-routing.module';
import {ClaimSearchDevComponent} from './claim-search-dev/claim-search.component';
import {ClaimSearchOrigComponent} from './claim-search-orig/claim-search.component';
import {ClaimSearchComponent} from './claim-search/claim-search.component';
import {ClaimInfoHeaderComponent} from './duplicate-claim-check/claim-info-header/claim-info-header.component';
import {DuplicateClaimCheckComponent} from './duplicate-claim-check/duplicate-claim-check.component';
import {DuplicateClaimSummaryComponent} from './duplicate-claim-check/duplicate-claim-summary/duplicate-claim-summary.component';
import {DuplicateProcessingComponent} from './duplicate-claim-check/duplicate-processing/duplicate-processing.component';
import {DenialReasonModalComponent} from './maintenance-approval/maintenance-approval-modals/denial-reason-modal/denial-reason-modal.component';
import {MaintenanceApprovalComponent} from './maintenance-approval/maintenance-approval.component';
import {ApproveDenyRequestComponent} from './maintenance-approval/maintenance-request-details/approve-deny-request/approve-deny-request.component';
import {DeleteClaimRequestComponent} from './maintenance-approval/maintenance-request-details/delete-claim-request/delete-claim-request.component';
import {ReactivateClaimRequestComponent} from './maintenance-approval/maintenance-request-details/reactive-claim-request/reactive-claim-request.component';
import {RequestPageHeaderComponent} from './maintenance-approval/maintenance-request-details/request-page-header/request-page-header.component';
import {RequestPageNavigatorComponent} from './maintenance-approval/maintenance-request-details/request-page-navigator/request-page-navigator.component';
import {TransferClaimRequestComponent} from './maintenance-approval/maintenance-request-details/transfer-claim-request/transfer-claim-request.component';
import {TransferMemberRequestComponent} from './maintenance-approval/maintenance-request-details/transfer-member-request/transfer-member-request.component';
import {UpdateCrossRefComponent} from './maintenance-approval/maintenance-request-details/update-cross-ref-request/update-cross-ref-request.component';
import {UpdateEobRequestComponent} from './maintenance-approval/maintenance-request-details/update-eob-request/update-eob-request.component';
import {UpdateMemberAggregateRequestComponent} from './maintenance-approval/maintenance-request-details/update-member-aggregate-request/update-member-aggregate-request.component';
import {UpdateSplHandlingRequestComponent} from './maintenance-approval/maintenance-request-details/update-spl-handling-request/update-spl-handling-request.component';
import {RequestResultsTableComponent} from './maintenance-approval/request-results-table/request-results.component';
import {ManualClaimIntakeComponent} from './manual-claim-intake/manual-claim-intake.component';
import {ManualClaimReceiptComponent} from './manual-claim-intake/manual-claim-receipt/manual-claim-receipt.component';
import {ProviderValidationSubtitleComponent} from './manual-claim-intake/provider-validation/provider-validation-subtitle/provider-validation-subtitle.component';
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
import {FoxUiCustomTableComboComponent} from './member-lookup/bypass-queue-management/custom-table-dropdown/bypass-queue-table.component';
import {BypassQueueComponent as BypassQueueOriginalComponent} from './member-lookup/bypass-queue-original/bypass-queue.component';
import {BypassQueueComponent} from './member-lookup/bypass-queue/bypass-queue.component';
import {MemberLookupQueueComponent as MemberLookupQueueOriginalComponent} from './member-lookup/member-lookup-queue-original/member-lookup-queue.component';
import {MemberLookupQueueRightComponent} from './member-lookup/member-lookup-queue/member-lookup-queue-right/member-lookup-queue-right.component';
import {MemberLookupQueueComponent} from './member-lookup/member-lookup-queue/member-lookup-queue.component';
import {PotentialMatchesActionsComponent} from './member-lookup/potential-matches-actions/potential-matches-actions.component';
import {PotentialMatchesOriginalComponent} from './member-lookup/potential-matches-original/potential-matches-original.component';
import {PotentialMatchesTableTitleComponent as PotentialMatchesTableTitleOriginalComponent} from './member-lookup/potential-matches-original/potential-matches-table-title/potential-matches-table-title.component';
import {PotentialMatchesTableTitleComponent} from './member-lookup/potential-matches/potential-matches-table-title/potential-matches-table-title.component';
import {PotentialMatchesComponent} from './member-lookup/potential-matches/potential-matches.component';
import {QueueTotalsTableComponent} from './member-lookup/queue-totals-table/queue-totals-table.component';
import {ImportDetailsComponent} from './rescanned-claim-images/import-summary/import-details.component';
import {RescannedClaimImagesComponent} from './rescanned-claim-images/rescanned-claim-images.component';
import {ProcessClaimExceptionBComponent} from './manual-claim-processing/process-claim-exception/process-claim-exception-b.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ClaimProcessingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatExpansionModule,
    MatTabsModule,
    TooltipModule,
    BsDropdownModule,
    ClipboardModule,
    MatProgressBarModule,
    ClipboardModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    CollapseModule,
    NgSelectModule,
    MatGridListModule,
    NgxChartsModule
  ],
  declarations: [
    ClaimSearchComponent,
    ClaimSearchOrigComponent,
    ClaimSearchDevComponent,
    MemberLookupQueueOriginalComponent,
    MemberLookupQueueComponent,
    BypassQueueOriginalComponent,
    BypassQueueComponent,
    DuplicateClaimCheckComponent,
    DuplicateClaimSummaryComponent,
    ClaimInfoHeaderComponent,
    DuplicateProcessingComponent,
    BypassManagementComponent,
    PotentialMatchesOriginalComponent,
    PotentialMatchesComponent,
    FoxUiCustomTableComboComponent,
    QueueTotalsTableComponent,
    PotentialMatchesTableTitleOriginalComponent,
    PotentialMatchesTableTitleComponent,
    ClaimHistoryComponent,
    MemberResultTableComponent,
    HistoryResultTableComponent,
    BillLinesResultTableComponent,
    ClaimDetailsComponent,
    ClaimDetailsHomeComponent,
    ClaimDetailsAuditComponent,
    ClaimDetailsNotesComponent,
    BillLinesDrugComponent,
    BillLinesNoPayComponent,
    BillLinesMedSuppComponent,
    BillLinesHospitalComponent,
    BillLinesServiceComponent,
    BillLinesMessagesTableComponent,
    ClaimDetailsMessageComponent,
    ClaimDetailsCrossReferenceComponent,
    CrossReferenceTableComponent,
    CrossReferenceSearchTableComponent,
    SendReplaceEobModalComponent,
    TransferClaimDetailsTableComponent,
    TransferClaimResultTableComponent,
    TransferClaimSearchModalComponent,
    DeleteClaimModalComponent,
    SendReplaceEobModalComponent,
    UpdateEobModalComponent,
    ManualClaimIntakeComponent,
    ManualClaimReceiptComponent,
    MaintenanceApprovalComponent,
    RequestResultsTableComponent,
    ReactivateClaimModalComponent,
    UpdateCrossRefComponent,
    CombinedClaimsModalComponent,
    ReactivateClaimRequestComponent,
    DeleteClaimRequestComponent,
    TransferMemberRequestComponent,
    UpdateSplHandlingRequestComponent,
    UpdateMemberAggregateRequestComponent,
    TransferClaimRequestComponent,
    UpdateEobRequestComponent,
    ApproveDenyRequestComponent,
    DenialReasonModalComponent,
    ReactivateClaimRequestComponent,
    ProviderValidationComponent,
    SuspendClaimModalComponent,
    RequestPageHeaderComponent,
    RequestPageNavigatorComponent,
    ApproveDenyRequestComponent,
    ProcClmEligServiceScreenComponent,
    TypeOfServiceComponent,
    ProcessClaimHospitalChargeComponent,
    ProcessClaimNoPayComponent,
    ProcessClaimNoPayEobComponent,
    ProcessClaimHospSnfEobComponent,
    ProcessClaimMedicalVisitComponent,
    ReviewBillLineMessagesComponent,
    BillLineMessagesComponent,
    ProcessClaimMessagesComponent,
    ProcclmaddrverfComponent,
    MendofclaimScreenComponent,
    DenialReasonModalComponent,
    ReactivateClaimRequestComponent,
    ProviderValidationComponent,
    ServiceEobComponent,
    ProcclmdrugchrgComponent,
    ProcClmDrugEobComponent,
    ProcClmMedSupChrgLnComponent,
    ReviewClaimMessagesComponent,
    ProcclmaddclminfoComponent,
    ProcessClaimMedsuppChargebComponent,
    ProcessClaimExceptionComponent,
    ProcessClaimHomeHealthComponent,
    ProcessClaimSuspendclaimComponent,
    ProcessClaimNursingChargeComponent,
    BillLineSpecialMemoComponent,
    ElectronicClaimVerfSuspProcessComponent,
    ProcessClaimMedsuppEobComponent,
    ElectronicClaimVerfMaintComponent,
    ElectronicClaimVerfBillLineComponent,
    ElectronicClaimVerfDrugBillLineComponent,
    RescannedClaimImagesComponent,
    ImportDetailsComponent,
    ClaimDetailsRightComponent,
    ProviderValidationSubtitleComponent,
    MemberLookupQueueRightComponent,
    PotentialMatchesActionsComponent,
    ProcessClaimExceptionBComponent
  ],
  providers: [
    TitleCasePipe,
    LowerCasePipe,
    DatePipe
  ],
  entryComponents: [
    BillLinesResultTableComponent,
    ClaimDetailsRightComponent,
    ProviderValidationSubtitleComponent,
    MemberLookupQueueRightComponent,
    ProcessClaimHeaderRightComponent,
    ProcessClaimSubheaderComponent
  ]
})
export class ClaimProcessingModule {
}
