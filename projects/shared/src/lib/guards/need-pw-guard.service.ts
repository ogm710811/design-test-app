import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {loginUrlOnLoggedIn, loginUrlUsername} from '../constants/login.constants';
import {LoginService} from '../login-service/login.service';
import {FeatureFlagService} from '../feature-flag-service/feature-flag.service';
import {homeRoutePathRoot} from '../constants/home.constants';

@Injectable({
  providedIn: 'root'
})
export class NeedPwGuard implements CanActivate {

  constructor(private loginSvc: LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // We wish to direct logged in users to the /home path, and only allow logged out users to access pages behind this guard
    if (this.loginSvc.savedUserName && !this.loginSvc.loginState.username) {
      return true;
    } else if (this.loginSvc.loginState.username) {
      this.router.navigateByUrl(this.loginSvc.homeUrl);
      return false;
    } else {
      this.router.navigateByUrl(loginUrlUsername);
      return false;
    }
  }
}
