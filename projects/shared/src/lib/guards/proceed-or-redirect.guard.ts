import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Data,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export abstract class ProceedOrRedirectGuard implements CanActivate, CanLoad {
  protected constructor(protected router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.process(route.data);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.process(route.data);
  }

  protected abstract getRedirectUrl(): string;

  protected abstract canProceed(routeData?: Data): boolean | Observable<boolean>;

  private process(routeData?: Data): boolean | Observable<boolean> {
    const thisCanProceed: boolean | Observable<boolean> = this.canProceed(routeData);
    if (typeof thisCanProceed === 'boolean') {
      if (!thisCanProceed) {
        this.router.navigateByUrl(this.getRedirectUrl());
      }
      return thisCanProceed;
    }

    return thisCanProceed.pipe(
      map((doProceed: boolean) => {
        if (!doProceed) {
          this.router.navigateByUrl(this.getRedirectUrl());
        }

        return doProceed;
      })
    );
  }

}
