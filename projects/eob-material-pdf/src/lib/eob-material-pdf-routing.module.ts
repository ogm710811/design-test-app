import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from '@fox/shared';
import {EobMaterialPdfComponent} from './eob-material-pdf.component';

const eobMaterialRoutes: Routes = [
  {
    path: '',
    canActivate: [LoggedInGuard],
    component: EobMaterialPdfComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(eobMaterialRoutes)],
  exports: [RouterModule]
})
export class EobMaterialPdfRoutingModule {
}
