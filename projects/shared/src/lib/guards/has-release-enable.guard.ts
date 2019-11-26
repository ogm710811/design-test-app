import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {FeatureFlagService} from '../feature-flag-service/feature-flag.service';

@Injectable({
  providedIn: 'root'
})
export class HasReleaseEnableGuard implements CanActivate {

  constructor(
    private featureFlagSvc: FeatureFlagService,
    private router: Router
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (next.data.hasOwnProperty('featureName') && this.featureFlagSvc.isFeatureEnabled(next.data['featureName'])) {
      return this.router.parseUrl('insufficient-access');
    }
    return true;
  }

}
