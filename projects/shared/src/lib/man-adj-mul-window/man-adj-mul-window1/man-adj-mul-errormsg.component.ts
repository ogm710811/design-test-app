import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoginService} from '../../login-service/login.service';

@Component({
  selector: 'fox-man-adj-mul-errormsg',
  templateUrl: './man-adj-mul-errormsg.component.html'
})
export class ManAdjMulWindowErrMsgComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): number {
    if (this.loginService.sessionId === localStorage.getItem('sessionId')) {
      localStorage.removeItem('isPageOpened');
      localStorage.removeItem('sessionId');
    }
    if (this.activatedRoute.snapshot.url && JSON.stringify(this.activatedRoute.snapshot.url) === localStorage.getItem('mainUrl')) {
      localStorage.removeItem('isPageOpened');
    }
    return 0;
  }
}
