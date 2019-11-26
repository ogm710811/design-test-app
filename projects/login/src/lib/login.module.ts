import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '@fox/shared';
import {LoginRoutingModule} from './login-routing.module';
import {MsIdComponent} from './ms-id/ms-id.component';
import {PwComponent} from './pw/pw.component';

@NgModule({
  declarations: [
    MsIdComponent,
    PwComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class LoginModule {
}
