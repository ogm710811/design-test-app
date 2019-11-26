import { MatDividerModule, MatTabsModule, MatSelectModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { SecurityRoutingModule } from './security-routing.module';
import { ClaimNumberFileMaintenanceComponent } from './claim-number-file-maintenance/claim-number-file-maintenance.component';
import { OperstatsyssecurComponent } from './operator-status/sys-security/operstatsyssecur.component';
import { PlanTypeOfServiceMaintenance1Component } from './plan-type-of-service/type-of-service-maintenance-1/plan-type-of-service-maintenance1.component';
import { PlanTypeOfServiceMaintenance2Component } from './plan-type-of-service/type-of-service-maintenance-2/plan-type-of-service-maintenance2.component';
import { OperatorStaticsTotalsComponent } from './operator-status/totals/operator-statics-totals.component';
import { ReviewOperatorStaticsComponent } from './operator-status/review/review-operator-statics.component';
import { OperatorStatisticsComponent } from './operator-status/stat/operator-statistics.component';

@NgModule({
    imports: [
      SharedModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatTabsModule,
      ReactiveFormsModule,
      MatDividerModule,
      SecurityRoutingModule
    ],
    declarations: [
        ClaimNumberFileMaintenanceComponent,
        OperstatsyssecurComponent,
        PlanTypeOfServiceMaintenance1Component,
        PlanTypeOfServiceMaintenance2Component,
        OperatorStaticsTotalsComponent,
        ReviewOperatorStaticsComponent,
        OperatorStatisticsComponent
    ]
  })
  export class SecurityModule {
  }
