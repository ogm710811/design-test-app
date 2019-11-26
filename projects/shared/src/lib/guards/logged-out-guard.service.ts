import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {loginUrlOnLoggedIn} from '../constants/login.constants';
import {LoginState} from '../login-service/login-state.model';
import {LoginService} from '../login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate, CanLoad {

  constructor(private loginSvc: LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.validate();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.validate();
  }

  private validate(): boolean | Observable<boolean> {
    const currentLoginState: LoginState = this.loginSvc.loginState;
    if (currentLoginState && currentLoginState.access_token) {
      return this.loginSvc.getUserProfile(currentLoginState.access_token, currentLoginState, false)
        .pipe(
          map(ls => {
            this.loginSvc.loginState = ls;
            if (!ls.errorMessage) {
              this.router.navigateByUrl(loginUrlOnLoggedIn);
            }
            return !!ls.errorMessage;
          })
        );
    }
    return true;
  }
}
