import {Injectable} from '@angular/core';
import {Data, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {loginUrlOnLoggedOut} from '../constants/login.constants';
import {LoginState} from '../login-service/login-state.model';
import {LoginService} from '../login-service/login.service';
import {ProceedOrRedirectGuard} from './proceed-or-redirect.guard';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard extends ProceedOrRedirectGuard {

  constructor(protected loginSvc: LoginService, protected router: Router) {
    super(router);
  }

  protected getRedirectUrl(): string {
    return loginUrlOnLoggedOut;
  }

  protected canProceed(routeData: Data): boolean | Observable<boolean> {
    const currentLoginState: LoginState = this.loginSvc.loginState;
    if (currentLoginState && currentLoginState.access_token) {
      return this.loginSvc.getUserProfile(currentLoginState.access_token, currentLoginState, false)
        .pipe(
          map(ls => {
            this.loginSvc.loginState = ls;
            return !ls.errorMessage;
          })
        );
    }
    return of(false);
  }
}
