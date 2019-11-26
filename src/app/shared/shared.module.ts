import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule
} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {RouterModule} from '@angular/router';
import {SharedModule as ExtSharedModule} from '@fox/shared';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {CollapseModule, TooltipModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ExtSharedModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    CollapseModule,
    PdfViewerModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatDividerModule,
    TooltipModule.forRoot(),
    NgxChartsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ExtSharedModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    NgxChartsModule,
    TooltipModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
