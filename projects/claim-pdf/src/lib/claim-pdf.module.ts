import {NgModule} from '@angular/core';
import {SharedModule} from '@fox/shared';
import {ClaimPdfRoutingModule} from './claim-pdf-routing.module';
import {ClaimPdfComponent} from './claim-pdf.component';

@NgModule({
  imports: [
    SharedModule,
    ClaimPdfRoutingModule
  ],
  declarations: [
    ClaimPdfComponent
  ]

})
export class ClaimPdfModule {
}
