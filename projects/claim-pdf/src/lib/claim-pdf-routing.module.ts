import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from '@fox/shared';
import {ClaimPdfComponent} from './claim-pdf.component';

const claimPdfRoutes: Routes = [
  {
    path: '',
    canActivate: [LoggedInGuard],
    component: ClaimPdfComponent,
  }];

@NgModule({
  imports: [
    RouterModule.forChild(claimPdfRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClaimPdfRoutingModule {
}
