import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenCheckService {

  isTokenRefreshed = new BehaviorSubject<boolean>(true);
  isTokenRefreshed$ = this.isTokenRefreshed.asObservable();

  newToken = new Subject<string>();
  newToken$ = this.newToken.asObservable();

  constructor() {
  }

  changeIsTokenRefreshed(isRefresh: boolean): void {
    this.isTokenRefreshed.next(isRefresh);
  }

  setNewToken(token: string): void {
    this.newToken.next(token);
  }
}
