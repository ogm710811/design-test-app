import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {NavData} from '../nav/nav-data.model';

@Injectable({
  providedIn: 'root'
})
export class NotifyFooter {

  private behave = new BehaviorSubject<any>({data: undefined});

  constructor() {
  }

  setNotificationFooter(behave: Object): void {
    this.behave.next(behave);
  }

  getNotificationFooter(): Observable<NavData | number> {
    return this.behave.asObservable();
  }
}
