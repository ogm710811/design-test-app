import {CommonModule, LowerCasePipe, TitleCasePipe} from '@angular/common';
import {forwardRef, NgModule} from '@angular/core';
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {
  MatInputModule,
  MatMenuModule,
  MatSelectModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {NgSelectModule} from '@ng-select/ng-select';
import {HotkeyModule} from 'angular2-hotkeys';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {CollapseModule, TooltipModule} from 'ngx-bootstrap';
import {FormatMemberNumber} from './add-space/format-member-number.pipe';
import {ButtonComponent} from './button/button.component';
import {DatabuttonComponent} from './databutton/databutton.component';
import {DateFormatPipe} from './date-format/date-format.pipe';
import {FieldTextFormatPipe} from './edit-aggregate-field-pipe/field-text-format.pipe';
import {WholeNumberFormatPipe} from './edit-aggregate-whole-number-pipe/whole-number-format.pipe';
import {FeatureFlagModalComponent} from './feature-flag/feature-flag-modal.component';
import {FilterPipe} from './filter-search-result-pipe/filter-search-result.pipe';
import {FormatClaimPipe} from './format-claim-pipe/format-claim.pipe';
import {FormatMemberDirective} from './format-member-directive/format-member.directive';
import {FormatMemberPipe} from './format-member-pipe/format-member.pipe';
import {FoxBadgeComponent} from './fox-badge/fox-badge-component/fox-badge.component';
import {FoxTooltipComponent} from './fox-tooltip/fox-tooltip-component/fox-tooltip.component';
import {GridItemDirective} from './grid/grid-item.directive';
import {HotkeyDirective} from './hotkey/hotkey.directive';
import {IconItemFormatTableComponent} from './icon-item-format-table/icon-item-format-table.component';
import {ClaimNoInputDirective} from './input/claim-no-input.directive';
import {CurrencyInputDirective} from './input/currency-input.directive';
import {DateInputDirective} from './input/date-input.directive';
import {DateRangeInputDirective} from './input/date-range-input.directive';
import {InputComponent} from './input/input.component';
import {MemberNoInputDirective} from './input/member-no-input.directive';
import {NumberInputDirective} from './input/number-input.directive';
import {PhoneNumInputDirective} from './input/phone-num-input.directive';
import {TextInputDirective} from './input/text-input.directive';
import {InsufficientAccessPageComponent} from './insufficient-access-page/insufficient-access-page.component';
import {InvalidParameterPageComponent} from './invalid-parameter-page/invalid-parameter-page.component';
import {KeyboardShortcutsComponent} from './keyboard-shortcuts/keyboard-shortcuts.component';
import {LinkDirective} from './link/link.directive';
import {LoginPageRedirectComponent} from './login-page-redirect/login-page-redirect';
import {ManAdjMulWindowComponent} from './man-adj-mul-window/man-adj-mul-window.component';
import {ManAdjMulWindowErrMsgComponent} from './man-adj-mul-window/man-adj-mul-window1/man-adj-mul-errormsg.component';
import {ManAdjMulWindow1Component} from './man-adj-mul-window/man-adj-mul-window1/man-adj-mul-window1.component';
import {MemberDemographicsCardComponent} from './member-demographics-card/member-demographics-card.component';
import {MemberInfoComponent} from './member-info/member-info.component';
import {MemberProfileFormatTableComponent} from './member-profile-format-table/member-profile-format-table.component';
import {MessageBoxComponent} from './message-box/message-box.component';
import {ModalComponent} from './modal/modal.component';
import {RouteToQueueModalComponent} from './modal/route-to-queue-modal/route-to-queue-modal.component';
import {RouteValidationModalComponent} from './modal/route-validation-modal/route-validation-modal.component';
import {SaveToWorkbenchModalComponent} from './modal/save-to-workbench-modal/save-to-workbench-modal.component';
import {NumbersDirective} from './numbers/numbers.directive';
import {OrderByPipe} from './order-by/order-by.pipe';
import {PaginatorNonMaterialComponent} from './paginator/paginator-non-material.component';
import {PaginatorComponent} from './paginator/paginator.component';
import {PdfDownloadButtonDirective} from './pdf/pdf-download-button.directive';
import {PdfComponent} from './pdf/pdf.component';
import {PlaceholderComponent} from './placeholder/placeholder.component';
import {LoadingOverlayComponent} from './progress-aware-container/loading-overlay/loading-overlay.component';
import {ProgressAwareDirective} from './progress-aware-container/progress-aware.directive';
import {ProgressContextDirective} from './progress-aware-container/progress-context.directive';
import {ReadOnlyFieldComponent} from './read-only-field/read-only-field.component';
import {RefundDateFormatPipe} from './refund-date-format/refund-date-format.pipe';
import {RefundFutureDateValidatorDirective} from './refund-future-date-validator/refund-future-date-validator.directive';
import {RegexpReplacePipe} from './regexp-replace/regexp-replace.pipe';
import {ReportsComponent} from './reports/reports.component';
import {SectionSubheaderComponent} from './section/section-suheader/section-subheader.component';
import {SectionTitleComponent} from './section/section-title/section-title.component';
import {SectionComponent} from './section/section.component';
import {SectionDirective} from './section/section.directive';
import {SplitPipe} from './split-value/split-value.pipe';
import {StatBoxComponent} from './stat-box/stat-box.component';
import {TableExpandRowComponent} from './table/table-expand-row/table-expand-row.component';
import {TableExpandRowDirective} from './table/table-expand-row/table-expand-row.directive';
import {TableHeaderSortComponent} from './table/table-header-sort.component';
import {TableComponent} from './table/table.component';
import {TileBoxComponent} from './tiles/tile-box.component';
import {RemoveUnderscorePipe} from './trim-value/trim-value.pipe';
import {PrependZeroPipe} from './prepend-zero/prepend-zero.pipe';
import {ZipCodePipe} from './zip-code/zip-code.pipe';
import {DefaultBreadcrumbsComponent} from './default-breadcrumbs/default-breadcrumbs.component';
import {FoxSelectDropdownComponent} from './fox-multiselect-dropdown/component/fox-select-dropdown/fox-select-dropdown.component';
import {SelectDropdownSingleSelectComponent} from './fox-multiselect-dropdown/component/slect-dropdown-single-select/select-dropdown-single-select.component';
import {PageHeaderRightDirective} from './page-header/page-header-right.directive';
import {PageHeaderSubtitleDirective} from './page-header/page-header-subtitle.directive';
import {PageHeaderTabsComponent} from './page-header/page-header-tabs/page-header-tabs.component';
import {PageHeaderComponent} from './page-header/page-header.component';
import {ProcessClaimHeaderRightComponent} from './page-header/process-claim-header-right.component';
import {ProcessClaimSubheaderComponent} from './page-header/process-claim-subheader.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,
    FormsModule,
    NgSelectModule,
    RouterModule,
    // Other 3rd Party Modules
    CollapseModule,
    HotkeyModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    PdfViewerModule,
    ReactiveFormsModule,
    TooltipModule
    // FOX Modules
  ],
  declarations: [
    BreadcrumbsComponent,
    ButtonComponent,
    ClaimNoInputDirective,
    CurrencyInputDirective,
    DatabuttonComponent,
    DateFormatPipe,
    DateInputDirective,
    DateRangeInputDirective,
    DefaultBreadcrumbsComponent,
    FeatureFlagModalComponent,
    FieldTextFormatPipe,
    FilterPipe,
    FormatClaimPipe,
    FormatMemberDirective,
    FormatMemberNumber,
    FormatMemberPipe,
    FoxBadgeComponent,
    FoxSelectDropdownComponent,
    FoxTooltipComponent,
    GridItemDirective,
    HotkeyDirective,
    IconItemFormatTableComponent,
    InputComponent,
    InsufficientAccessPageComponent,
    InvalidParameterPageComponent,
    KeyboardShortcutsComponent,
    LinkDirective,
    LoadingOverlayComponent,
    LoginPageRedirectComponent,
    ManAdjMulWindow1Component,
    ManAdjMulWindowComponent,
    ManAdjMulWindowErrMsgComponent,
    MemberDemographicsCardComponent,
    MemberInfoComponent,
    MemberNoInputDirective,
    MemberProfileFormatTableComponent,
    MessageBoxComponent,
    ModalComponent,
    NumberInputDirective,
    NumbersDirective,
    OrderByPipe,
    PageHeaderComponent,
    PageHeaderRightDirective,
    PageHeaderSubtitleDirective,
    PageHeaderTabsComponent,
    PaginatorComponent,
    PaginatorNonMaterialComponent,
    PdfComponent,
    PdfDownloadButtonDirective,
    PhoneNumInputDirective,
    PlaceholderComponent,
    ProcessClaimHeaderRightComponent,
    ProcessClaimSubheaderComponent,
    ProgressAwareDirective,
    ProgressContextDirective,
    ReadOnlyFieldComponent,
    RefundDateFormatPipe,
    RefundFutureDateValidatorDirective,
    RegexpReplacePipe,
    RemoveUnderscorePipe,
    ReportsComponent,
    RouteToQueueModalComponent,
    RouteValidationModalComponent,
    SaveToWorkbenchModalComponent,
    SectionComponent,
    SectionDirective,
    SectionSubheaderComponent,
    SectionTitleComponent,
    SelectDropdownSingleSelectComponent,
    SplitPipe,
    StatBoxComponent,
    TableComponent,
    TableExpandRowComponent,
    TableExpandRowDirective,
    TableHeaderSortComponent,
    TextInputDirective,
    TileBoxComponent,
    WholeNumberFormatPipe,
    ZipCodePipe,
    PrependZeroPipe
  ],
  exports: [
    // 3rd Party Modules
    HotkeyModule,
    // FOX Components, Directives & Pipes
    BreadcrumbsComponent,
    ButtonComponent,
    ClaimNoInputDirective,
    CurrencyInputDirective,
    DatabuttonComponent,
    DateFormatPipe,
    DateInputDirective,
    DateRangeInputDirective,
    DefaultBreadcrumbsComponent,
    FeatureFlagModalComponent,
    FieldTextFormatPipe,
    FieldTextFormatPipe,
    FilterPipe,
    FormatClaimPipe,
    FormatMemberNumber,
    FormatMemberPipe,
    FoxBadgeComponent,
    FoxSelectDropdownComponent,
    FoxTooltipComponent,
    GridItemDirective,
    HotkeyDirective,
    IconItemFormatTableComponent,
    InputComponent,
    InsufficientAccessPageComponent,
    InvalidParameterPageComponent,
    KeyboardShortcutsComponent,
    LinkDirective,
    LoadingOverlayComponent,
    LoginPageRedirectComponent,
    ManAdjMulWindow1Component,
    ManAdjMulWindowComponent,
    ManAdjMulWindowErrMsgComponent,
    MatSelectModule,
    MemberDemographicsCardComponent,
    MemberInfoComponent,
    MemberNoInputDirective,
    MemberProfileFormatTableComponent,
    MessageBoxComponent,
    ModalComponent,
    NumberInputDirective,
    NumbersDirective,
    OrderByPipe,
    PageHeaderComponent,
    PageHeaderRightDirective,
    PageHeaderSubtitleDirective,
    PageHeaderTabsComponent,
    PaginatorComponent,
    PaginatorNonMaterialComponent,
    PdfComponent,
    PdfDownloadButtonDirective,
    PhoneNumInputDirective,
    PlaceholderComponent,
    ProcessClaimHeaderRightComponent,
    ProcessClaimSubheaderComponent,
    ProgressAwareDirective,
    ProgressContextDirective,
    ReadOnlyFieldComponent,
    RefundDateFormatPipe,
    RefundFutureDateValidatorDirective,
    RegexpReplacePipe,
    RemoveUnderscorePipe,
    ReportsComponent,
    RouteToQueueModalComponent,
    RouteValidationModalComponent,
    SaveToWorkbenchModalComponent,
    SectionComponent,
    SectionDirective,
    SectionSubheaderComponent,
    SectionTitleComponent,
    SelectDropdownSingleSelectComponent,
    SplitPipe,
    StatBoxComponent,
    TableComponent,
    TableExpandRowComponent,
    TableExpandRowDirective,
    TableHeaderSortComponent,
    TextInputDirective,
    TileBoxComponent,
    WholeNumberFormatPipe,
    ZipCodePipe,
    PrependZeroPipe
  ],
  providers: [
    LowerCasePipe,
    TitleCasePipe
  ]
})
export class SharedModule {
}
