import {Inject, Injectable} from '@angular/core';
import {Data, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {OP} from '../authority/op';
import {LoginService} from '../login-service/login.service';
import {LoggedInGuard} from './logged-in-guard.service';

@Injectable({
  providedIn: 'root'
})
export class HasAnyRoleGuard extends LoggedInGuard {
  constructor(protected loginSvc: LoginService, protected router: Router, @Inject('ROLE_TO_GUARD') private roles: OP[]) {
    super(loginSvc, router);
  }

  protected getRedirectUrl(): string {
    return 'insufficient-access';
  }

  protected canProceed(routeData: Data): boolean | Observable<boolean> {
    if (this.loginSvc && this.roles) {
      for (let i = 0; i < this.roles.length; i++) {
        if (this.loginSvc.hasRole(this.roles[i])) {
          return super.canProceed(routeData);
        }
      }
    }
    return false;
  }
}
