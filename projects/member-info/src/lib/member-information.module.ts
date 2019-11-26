import {
  DateFormatPipe,
  FormatMemberNumber,
  MessageBoxService,
  MessageBoxType
} from '@fox/shared';
import {DatePipe, CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatCheckboxModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatGridListModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {
  Event as NavigationEvent,
  NavigationStart,
  Router
} from '@angular/router';
import {ClaimsMaterialApi} from '@fox/rest-clients';
import {filter} from 'rxjs/operators';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {SharedModule} from '@fox/shared';
import {AggregateNewValueDirective} from './edit-aggregate-validator/aggregate-new-value.directive';
import {ClaimsSummaryFormComponent} from './eob-information/claims-summary-form/claims-summary-form.component';
import {ClaimsSummaryResultsComponent} from './eob-information/claims-summary-results/claims-summary-results.component';
import {DrugSummaryResultsComponent} from './eob-information/drug-summary-results/drug-summary-results.component';
import {EobInformationComponent} from './eob-information/eob-information.component';
import {EobStatementsFormComponent} from './eob-information/eob-statements-form/eob-statements-form.component';
import {EobStatementsResultsComponent} from './eob-information/eob-statements-results/eob-statements-results.component';
import {MemberCardComponent} from './eob-information/member-card/member-card.component';
import {MemberInformationRoutingModule} from './member-information-routing.module';
import {MedicareConstFileMaintenance1Component} from './plan-information-maintenance/medicare-constant-file-maintenance-screen1/medicare-constant-file-maintenance-screen1.component';
import {MedicareConstFileMaintenance2Component} from './plan-information-maintenance/medicare-constant-file-maintenance-screen2/fox-medicare-constant-file-maintenance-screen2.component';
import {MedicareConstOutOfPocketComponent} from './plan-information-maintenance/medicare-constant-out-of-pocket/medicare-constant-out-of-pocket.component';
import {PlanInfoMaintenanceMenuComponent} from './plan-information-maintenance/plan-information-maintenance-menu/plan-information-maintenance-menu.component';
import {PlanStateInfoMaintenanceComponent} from './plan-information-maintenance/plan-state-information-maintenance/plan-state-information-maintenance.component';
import {PlanStateTypeOfServiceMaintenanceComponent} from './plan-information-maintenance/plan-state-type-of-service-maintenance/plan-state-type-of-service-maintenance.component';
import {FieldComponent} from './provider-search/provider-profile/provider-profile-tabs/field/field.component';
import {ProviderAlternativeComponent} from './provider-search/provider-profile/provider-profile-tabs/provider-alternate/provider-alternate.component';
import {ProviderDemographicsComponent} from './provider-search/provider-profile/provider-profile-tabs/provider-demographics/provider-demographics.component';
import {ProviderNotesComponent} from './provider-search/provider-profile/provider-profile-tabs/provider-notes/provider-notes.component';
import {ProviderStatusCodesComponent} from './provider-search/provider-profile/provider-profile-tabs/provider-status-codes/provider-status-codes.component';
import {ProviderSummaryComponent} from './provider-search/provider-profile/provider-profile-tabs/provider-summary/provider-summary.component';
import {ProviderProfileComponent} from './provider-search/provider-profile/provider-profile.component';
import {ProviderSearchResultDetailsService} from './provider-search/provider-profile/provider-profile.service';
import {ProviderResultTableComponent} from './provider-search/provider-result-table/provider-result-table.component';
import {ProviderSearchComponent} from './provider-search/provider-search.component';
import {ProviderSearchService} from './provider-search/provider-search.service';
import {SpecialHandlingModalComponent} from './search/member-profile-tabs/special-handling-modal/special-handling-modal.component';
import {MemberSearchComponent} from './search/member-search-new-version/member-search.component';
import {MemberSearchOldVersionComponent} from './search/member-search-old-version/member-search-old-version.component';
import {ProfileComponent} from './search/profile/profile.component';
import {ByYearComponent} from './search/profile/tabs/aggregate-by-year/by-year.component';
import {AddressComponent} from './search/profile/tabs/demographics/address/address.component';
import {DemographicsComponent} from './search/profile/tabs/demographics/demographics.component';
import {DependentsComponent} from './search/profile/tabs/demographics/dependents/dependents.component';
import {DesigneesComponent} from './search/profile/tabs/demographics/designees/designees.component';
import {PreferencesComponent} from './search/profile/tabs/demographics/preferences/preferences.component';
import {HandlingCodeComponent} from './search/profile/tabs/enrollment-info/handling-code/handling-code.component';
import {InformationComponent} from './search/profile/tabs/enrollment-info/information.component';
import {InfoInsuranceParentComponent} from './search/profile/tabs/enrollment-info/insurance-parent/info-insurance-parent.component';
import {InfoInsuranceV1Component} from './search/profile/tabs/enrollment-info/insurance-parent/info-insurance-V1/info-insurance-v1.component';
import {InfoInsuranceComponent} from './search/profile/tabs/enrollment-info/insurance-parent/info-insurance-v2/info-insurance.component';
import {EnrollmentNoteComponent} from './search/profile/tabs/enrollment-info/insured-note/enrollment-note.component';
import {ProfileTabsComponent} from './search/profile/tabs/profile-tabs.component';
import {AccountNumberComponent} from './search/profile/transfer/account-number.component';
import {SearchParentComponent} from './search/search-parent.component';
import {AggregateYearSelectionModalComponent} from './shared/aggregate-year-selection-modal/aggregate-year-selection-modal.component';
import {EditAggregateValueModalComponent} from './shared/edit-aggregate-value-modal/edit-aggregate-value-modal.component';
import {EditAggregateService} from './shared/edit-aggregate.service';
import {IWriteLetterService} from './shared/iwrite-letter.service';
import {MemberBenefitModificationComponent} from './shared/member-benefit-modification/member-benefit-modification.component';
import {MemberInformationService} from './shared/member-information.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MemberInformationRoutingModule,
    MatMenuModule,
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
    MatGridListModule,
    MatExpansionModule,
    MatDividerModule
  ],
  declarations: [
    AggregateNewValueDirective,
    MemberSearchComponent,
    MemberSearchOldVersionComponent,
    SearchParentComponent,
    ProfileComponent,
    ProfileTabsComponent,
    DemographicsComponent,
    InformationComponent,
    AddressComponent,
    DesigneesComponent,
    DependentsComponent,
    PreferencesComponent,
    InfoInsuranceParentComponent,
    InfoInsuranceComponent,
    InfoInsuranceV1Component,
    HandlingCodeComponent,
    EnrollmentNoteComponent,
    EobInformationComponent,
    EobStatementsFormComponent,
    EobStatementsResultsComponent,
    ClaimsSummaryResultsComponent,
    ClaimsSummaryFormComponent,
    MemberCardComponent,
    DrugSummaryResultsComponent,
    ProviderSearchComponent,
    ProviderProfileComponent,
    ProviderDemographicsComponent,
    ProviderStatusCodesComponent,
    ProviderNotesComponent,
    ProviderAlternativeComponent,
    ProviderResultTableComponent,
    ProviderSummaryComponent,
    ByYearComponent,
    AccountNumberComponent,
    ByYearComponent,
    MedicareConstFileMaintenance1Component,
    MedicareConstOutOfPocketComponent,
    MedicareConstFileMaintenance2Component,
    PlanStateTypeOfServiceMaintenanceComponent,
    PlanStateInfoMaintenanceComponent,
    PlanInfoMaintenanceMenuComponent,
    ByYearComponent,
    SpecialHandlingModalComponent,
    EditAggregateValueModalComponent,
    AggregateYearSelectionModalComponent,
    MemberBenefitModificationComponent,
    FieldComponent
  ],
  providers: [
    DatePipe,
    FormatMemberNumber,
    DateFormatPipe
  ]
})

/**
 * fox-claims
 *
 * NOTE:
 * The "navigationTrigger" property and the "restoredState" property in the NavigationStart Router event.
 * They give the ability to differentiate between an imperative navigation (ex, the user clicked a router-link)
 * and a location-change navigation (ex, the user clicked the Back or Forward buttons in the browser).
 * We are using those properties to identify when the user click the back button
 * in the Browser and emit this event to be used to unlock member account.
 */

export class MemberInformationModule {
  constructor(
    private router: Router,
    claimsMemberApi: ClaimsMaterialApi,
    messageBoxService: MessageBoxService) {

    router.events
      .pipe(
        filter((event: NavigationEvent) => {
            return (event instanceof NavigationStart);
          }
        )
        // @ts-ignore
      ).subscribe((event: NavigationStart) => {
      const memberNumber = sessionStorage.getItem('memberNumber');
      if (memberNumber) {
        claimsMemberApi.getLockAccountStatus(memberNumber, uuid()).subscribe(status => {
          if (status.lockStatus === 'LOCKED') {
            claimsMemberApi.unlockAccount(memberNumber, uuid()).subscribe(res => {
              messageBoxService.addMessageBox('Success', MessageBoxType.SUCCESS, 'Member was unlocked.', 3000);
            }, err => {
              messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'The account has not been unlocked.');
            });
          }
          sessionStorage.removeItem('memberNumber');
        });
      }
    });
  }
}
