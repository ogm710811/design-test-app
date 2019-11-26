import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../login-service/login.service';
import {TransferSrvService} from '../service/transfer-srv.service';
import {Observable} from 'rxjs';
import * as uuidNS from 'uuid';
const uuid = uuidNS;

@Injectable({
  providedIn: 'root'
})
export class AdjudicationSessionEntryGuard implements CanActivate {

  sessionLock: string = '';

  constructor(private transferSrvService: TransferSrvService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private loginService: LoginService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.sessionLock = uuid();

    if (!localStorage.getItem('sessionId') && !sessionStorage.getItem('sessionLock')) {
      localStorage.setItem('sessionId', this.loginService.sessionId);
      sessionStorage.setItem('sessionLock', this.sessionLock);
      return true;
    }
    if (localStorage.getItem('sessionId') === this.loginService.sessionId) {
      return true;
    }
    this.route.navigate(['/dashboard/adjAccessDenied']);
    return false;
  }
}
