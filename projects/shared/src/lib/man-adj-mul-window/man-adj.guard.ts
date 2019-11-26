import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {ManAdjMulWindow1Component} from './man-adj-mul-window1/man-adj-mul-window1.component';
import {TransferSrvService} from '../service/transfer-srv.service';
import {LoginService} from '../login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class ManAdjGuard implements CanActivate {
  constructor(private transferSrvService: TransferSrvService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private loginService: LoginService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', this.loginService.sessionId);
      return true;
    }
    if (localStorage.getItem('sessionId') === this.loginService.sessionId) {
      return true;
    }
    if (localStorage.getItem('sessionId') && !(localStorage.getItem('sessionId') === this.loginService.sessionId)) {
      this.route.navigate(['/dashboard/errorMsg']);
      return false;
    } else {
      return true;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class DeActManAdjGuard implements CanDeactivate<ManAdjMulWindow1Component> {
  constructor(private loginService: LoginService) {
  }

  canDeactivate(component: ManAdjMulWindow1Component,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('sessionId') === this.loginService.sessionId) {
      localStorage.removeItem('isPageOpened');
      localStorage.removeItem('sessionId');
      sessionStorage.removeItem('sessionLock');
    }
    return true;
  }
}
