import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '../login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleResolver implements Resolve<string[]> {

  constructor(private loginSvc: LoginService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> | Promise<string[]> | string[] {
    return this.loginSvc.loginState.authorities;
  }
}
