import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TransferSrvService} from '../../service/transfer-srv.service';
import {LoginService} from '../../login-service/login.service';

@Component({
  selector: 'fox-man-adj-mul-window1',
  templateUrl: './man-adj-mul-window1.component.html'
})
export class ManAdjMulWindow1Component implements OnInit {
  Screens: any = [];
  term = 1;
  active: boolean = false;
  params: any = {};
  details: any = [];

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              private transferSrvService: TransferSrvService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    let activatedRoute;
    const checkDetails = localStorage.getItem('isPageOpened');
    if (!localStorage.getItem('isPageOpened')) {
      this.details.push((this.activatedRoute as any)['_routerState'].snapshot.url);
      localStorage.setItem('isPageOpened', JSON.stringify(this.details));
    } else if (checkDetails && checkDetails.indexOf(this.transferSrvService.getStoreUrl()) > -1) {
      this.active = true;
    }
    this.activatedRoute.params.subscribe(params => {
      this.params = params;
      activatedRoute = localStorage.getItem('activePage');
      const length = parseInt(this.params.id, 10);
      this.Screens = [];
      for (let i = 1; i <= length; i++) {
        const text = 'Screen-' + i;
        this.Screens.push({value: text});
      }
      let baseUrl = (this.activatedRoute as any)['_routerState'].snapshot.url;
      baseUrl = baseUrl.slice(0, baseUrl.lastIndexOf('/') + 1);
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): number {
    if (this.loginService.sessionId === localStorage.getItem('sessionId')) {
      localStorage.removeItem('isPageOpened');
      localStorage.removeItem('sessionId');
    }
    return 0;
  }

  nextScreen(e: any): void {
    this.term = this.term + 1;
    const data = parseInt(this.params.id, 10) + 1;
    const listValues = '/dashboard/man-adj-mul-window/' + (parseInt(this.params.id, 10) + 1);
    this.Screens.push({value: 'Screen-' + data});
    this.transferSrvService.setStoreUrl(listValues);
    this.details.push((this.activatedRoute as any)['_routerState'].snapshot.url);
    localStorage.setItem('isPageOpened', JSON.stringify(this.details));
    this.route.navigate(['/dashboard/man-adj-mul-window', data]);
  }
}
