import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedOutGuard, loginRoutePathCredentials, loginRoutePathUsername, NeedPwGuard} from '@fox/shared';
import {MsIdComponent} from './ms-id/ms-id.component';
import {PwComponent} from './pw/pw.component';

const loginRoutes: Routes = [
  {
    path: loginRoutePathUsername,
    component: MsIdComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: loginRoutePathCredentials,
    component: PwComponent,
    canActivate: [NeedPwGuard]
  },
  {
    path: '',
    redirectTo: loginRoutePathUsername,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {
}
