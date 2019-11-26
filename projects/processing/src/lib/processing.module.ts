import { MatDividerModule, MatTabsModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule, ProcessClaimHeaderRightComponent, ProcessClaimSubheaderComponent } from '@fox/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IcdCodeTableMaintenanceComponent } from './icd-code-table-maintenance/icd-code-table-maintenance.component';
import { ProcessingRoutingModule } from './processing-routing.module';
import { DrugInquiryComponent } from './drug-inquiry/drug-inquiry.component';
import { DrugInquiryResultsComponent } from './drug-inquiry/drug-inquiry-results/drug-inquiry-results.component';
import { ReviewMessagesComponent } from './review-messages/review-messages.component';
import { ReviewCptHcpsCodesComponent } from './review-cpt-hcpcs-codes/review-cpt-hcpcs-codes.component';
import { ReviewIcdCodesComponent } from './review-icd-codes/review-icd-codes.component';

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
      ProcessingRoutingModule,
      MatDividerModule,
      MatCheckboxModule
    ],
    declarations: [
        IcdCodeTableMaintenanceComponent,
        DrugInquiryComponent,
        DrugInquiryResultsComponent,
        ReviewMessagesComponent,
        ReviewCptHcpsCodesComponent,
        ReviewIcdCodesComponent
    ],
    entryComponents: [
        ProcessClaimHeaderRightComponent,
        ProcessClaimSubheaderComponent
    ]
  })
  export class ProcessingModule {
  }
