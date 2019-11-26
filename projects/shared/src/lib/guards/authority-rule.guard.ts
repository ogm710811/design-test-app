import {Injectable} from '@angular/core';
import {Data, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthorityRule} from '../authority/authority-rule';
import {LoginService} from '../login-service/login.service';
import {LoggedInGuard} from './logged-in-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorityRuleGuard extends LoggedInGuard {
  constructor(protected loginSvc: LoginService, protected router: Router) {
    super(loginSvc, router);
  }

  protected getRedirectUrl(): string {
    return 'insufficient-access';
  }

  protected canProceed(routeData: Data): boolean | Observable<boolean> {
    if (routeData.hasOwnProperty('authorityRule') && routeData.authorityRule) {
      const rule: AuthorityRule = routeData.authorityRule;
      return rule.isObeyed(this.loginSvc.loginState.permissions) && super.canProceed(routeData);
    }
    return super.canProceed(routeData);
  }
}
