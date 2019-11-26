import {Component, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../login-service/login.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdjudicationSessionExitGuard implements CanDeactivate<Component> {

  constructor(private loginService: LoginService) {
  }

  canDeactivate(component: Component,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (localStorage.getItem('sessionId') === this.loginService.sessionId) {
      localStorage.removeItem('sessionId');
    }

    if (sessionStorage.getItem('sessionLock')) {
      sessionStorage.removeItem('sessionLock');
    }
    return true;
  }
}
