import {Component, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '@fox/shared';

@Component({
  selector: 'fox-ui-app',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(private loginSvc: LoginService, private router: Router) {
  }

  /**
   * fox-claims:
   *
   * event: window:storage
   * fired whenever a change is made to the Storage object.
   * it's a way for other windows-tabs on the domain using the storage
   * to sync any changes that are made.
   *
   * We use this event to check if user logs out from a second open tab,
   * if that happens the App logs out from all window-tabs
   * and the localStorage is clean.
   */
  @HostListener('window:storage', ['$event'])
  storageChange(e): void {
    if (e.key === 'loginState') {
      this.loginSvc.onNewLoginState();
    }
  }
}
