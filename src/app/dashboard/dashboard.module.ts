import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {SharedModule} from '../shared/shared.module';
import {AdjAccDeniedComponent} from './adj-acc-denied/adj-acc-denied.component';
import {CurrentStatisticsRightComponent} from './current-statistics/current-statistics-right/current-statistics-right.component';
import {CurrentStatisticsComponent} from './current-statistics/current-statistics.component';
import {QueueInfoTableComponent} from './current-statistics/queue-info-table/queue-info-table.component';
import {TeamProductivityTableComponent} from './current-statistics/team-productivity-table/team-productivity-table.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {DefaultMaintenanceMenuComponent} from './default-file-maintenance/default-maintenance-menu.component';
import {DfltOvrdPendVerfServiceComponent} from './default-file-maintenance/df-maintenance-details/default-override-pending-verification/default-override-pending-verification.component';
import {OpDftAuthCombComponent} from './default-file-maintenance/df-maintenance-details/op-dft-auth-comb/op-dft-auth-comb.component';
import {OpDftAuthLimitComponent} from './default-file-maintenance/df-maintenance-details/op-dft-auth-limit/op-dft-auth-limit.component';
import {OpDftSetQualityCombComponent} from './default-file-maintenance/df-maintenance-details/op-dft-set-quality-comb/op-dft-set-quality-comb.component';
import {OpDftSetQualityComponent} from './default-file-maintenance/df-maintenance-details/op-dft-set-quality/op-dft-set-quality.component';
import {OpDftTransSecurityComponent} from './default-file-maintenance/df-maintenance-details/op-dft-trans-security/op-dft-trans-security.component';
import {OperatorTransactionSecDefault1Component} from './default-file-maintenance/df-maintenance-details/operator-transaction-security-default/operator-transaction-security-default-1/operator-transaction-security-default-1.component';
import {OperatorTransactionSecDefault2Component} from './default-file-maintenance/df-maintenance-details/operator-transaction-security-default/operator-transaction-security-default-2/operator-transaction-security-default-2.component';
import {SetQualityCombDefaultComponent} from './default-file-maintenance/df-maintenance-details/set-quality-comb-default-new/set-quality-comb-default.component';
import {SetQualityCombinationOverrideComponent} from './default-file-maintenance/df-maintenance-details/set-quality-combination-overrides/set-quality-combination-override.component';
import {SetQualityOverrideComponent} from './default-file-maintenance/df-maintenance-details/set-quality-overrides/set-quality-override.component';
import {TemplateAssignmentComponent} from './default-file-maintenance/df-maintenance-details/set-quality-template-assignments/set-quality-template-assignments.component';
import {TemplateExclusionsComponent} from './default-file-maintenance/df-maintenance-details/set-quality-template-exclusions/set-quality-template-exclusions.component';
import {TempAuthCombComponent} from './default-file-maintenance/df-maintenance-details/temp-auth-comb/temp-auth-comb.component';
import {TempAuthLimitComponent} from './default-file-maintenance/df-maintenance-details/temp-auth-limit/temp-auth-limit.component';
import {TempSetQualityCombComponent} from './default-file-maintenance/df-maintenance-details/temp-set-quality-comb/temp-set-quality-comb.component';
import {TempSetQualityTemplateComponent} from './default-file-maintenance/df-maintenance-details/temp-set-quality-template/temp-set-quality-template.component';
import {TempSetQualityComponent} from './default-file-maintenance/df-maintenance-details/temp-set-quality/temp-set-quality.component';
import {FoxComponentsDemoComponent} from './fox-components-demo/fox-components-demo.component';
import {FoxInputDemoComponent} from './fox-input-demo/fox-input-demo.component';
import {OpAuthCombComponent} from './op-maintenance/op-maintenance-details/op-auth-comb/op-auth-comb.component';
import {OpAuthLimitComponent} from './op-maintenance/op-maintenance-details/op-auth-limit/op-auth-limit.component';
import {OpAuthPlanOneComponent} from './op-maintenance/op-maintenance-details/op-auth-plan/op-auth-plan-one/op-auth-plan-one.component';
import {OpAuthPlanTwoComponent} from './op-maintenance/op-maintenance-details/op-auth-plan/op-auth-plan-two/op-auth-plan-two.component';
import {OpInfoComponent} from './op-maintenance/op-maintenance-details/op-info/op-info.component';
import {OperatorSelectionComponent} from './op-maintenance/op-maintenance-details/op-selection/op-selection.component';
import {OpSetQualityComponent} from './op-maintenance/op-maintenance-details/op-set-quality/op-set-quality.component';
import {OpTransSecurityOneComponent} from './op-maintenance/op-maintenance-details/op-trans-security/op-trans-security-one/op-trans-security-one.component';
import {OpTransSecurityTwoComponent} from './op-maintenance/op-maintenance-details/op-trans-security/op-trans-security-two/op-trans-security-two.component';
import {SetQualityCombinationComponent} from './op-maintenance/op-maintenance-details/set-quality-combination-maintenance/set-quality-combination-maintenance.component';
import {OperatorMaintenanceMenuComponent} from './op-maintenance/operator-maintenance-menu.component';
import {PageHeaderDemoManualClaimsComponent} from './page-header-demo-manual-claims/page-header-demo-manual-claims.component';
import {PageHeaderDemoComponent} from './page-header-demo/page-header-demo.component';
import {PageHeaderRightSampleComponent} from './page-header-demo/page-header-right-sample.component';
import {PageHeaderSubtitleSampleComponent} from './page-header-demo/page-header-subtitle-sample.component';
import {ReplaceEobComponent} from './replace-eob/replace-eob.component';
import {TableDemoComponent} from './table-demo/table-demo.component';
import {ProcessClaimHeaderRightComponent, ProcessClaimSubheaderComponent} from '@fox/shared';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatButtonModule
  ],
  declarations: [
    DashboardComponent,
    CurrentStatisticsComponent,
    TableDemoComponent,
    TeamProductivityTableComponent,
    QueueInfoTableComponent,
    OperatorMaintenanceMenuComponent,
    OpInfoComponent,
    OpAuthLimitComponent,
    OpAuthPlanOneComponent,
    OpAuthPlanTwoComponent,
    OpTransSecurityOneComponent,
    OpTransSecurityTwoComponent,
    OpAuthCombComponent,
    OperatorSelectionComponent,
    OpSetQualityComponent,
    OperatorSelectionComponent,
    DefaultMaintenanceMenuComponent,
    OpDftAuthCombComponent,
    OpDftAuthLimitComponent,
    OpDftSetQualityComponent,
    OpDftSetQualityCombComponent,
    OpDftTransSecurityComponent,
    TempAuthCombComponent,
    TempAuthLimitComponent,
    TempSetQualityComponent,
    TempSetQualityCombComponent,
    TempSetQualityTemplateComponent,
    OperatorTransactionSecDefault1Component,
    OperatorTransactionSecDefault2Component,
    TemplateExclusionsComponent,
    TemplateAssignmentComponent,
    SetQualityCombinationOverrideComponent,
    SetQualityOverrideComponent,
    DfltOvrdPendVerfServiceComponent,
    SetQualityCombinationComponent,
    SetQualityCombDefaultComponent,
    ReplaceEobComponent,
    FoxInputDemoComponent,
    PageHeaderDemoComponent,
    FoxComponentsDemoComponent,
    PageHeaderDemoManualClaimsComponent,
    CurrentStatisticsRightComponent,
    PageHeaderRightSampleComponent,
    PageHeaderSubtitleSampleComponent,
    AdjAccDeniedComponent
  ],
  providers: [
  ],
  entryComponents: [
    CurrentStatisticsRightComponent,
    PageHeaderRightSampleComponent,
    PageHeaderSubtitleSampleComponent,
    ProcessClaimHeaderRightComponent,
    ProcessClaimSubheaderComponent
  ]
})
export class DashboardModule {
}
