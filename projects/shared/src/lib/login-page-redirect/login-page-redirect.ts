import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {loginUrlOnLoggedOut} from '../constants/login.constants';

@Component({
  selector: 'fox-login-page-redirect',
  template: ``
})
export class LoginPageRedirectComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigateByUrl(loginUrlOnLoggedOut);
  }
}
