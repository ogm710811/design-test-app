import { MatDividerModule, MatTabsModule, MatSelectModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { SharedModule } from '@fox/shared';
import { NgModule } from '@angular/core';
import { FileMaintenanceRoutingModule } from './file-maintenance-routing.module';
import { AddMessageComponent } from './message-file-maintenance/add-message.component';
import { ChangeMessageComponent } from './message-file-maintenance/change-message.component';
import { MessageInquiryComponent } from './message-file-maintenance/message-inquiry.component';
import { MessageMaintenanceMenuComponent } from './message-file-maintenance/message-maintenance-menu.component';
import { ClaimNumberRangeFileMaintenanceMenuComponent } from './claim-number-range-file-maintenance/claim-number-range-file-maintenance-menu/claim-number-range-file-maintenance-menu.component';
import { ClaimNumberRangeFileMaintenanceComponent } from './claim-number-range-file-maintenance/claim-number-range-file-maintenance.component';

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
    FileMaintenanceRoutingModule,
    MatDividerModule
  ],
  declarations: [
    AddMessageComponent,
    ChangeMessageComponent,
    MessageInquiryComponent,
    MessageMaintenanceMenuComponent,
    ClaimNumberRangeFileMaintenanceMenuComponent,
    ClaimNumberRangeFileMaintenanceComponent
  ]
})
export class FileMaintenancenModule {
}
