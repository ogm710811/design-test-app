import {NgModule} from '@angular/core';
import {SharedModule} from '@fox/shared';
import {EobMaterialPdfComponent} from './eob-material-pdf.component';
import {EobMaterialPdfRoutingModule} from './eob-material-pdf-routing.module';

@NgModule({
  imports: [
    SharedModule,
    EobMaterialPdfRoutingModule
  ],
  declarations: [
    EobMaterialPdfComponent
  ]
})
export class EobMaterialPdfModule {
}
