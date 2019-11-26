import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../login-service/login.service';

@Component({
  selector: 'fox-man-adj-mul-window',
  templateUrl: './man-adj-mul-window.component.html',
  styleUrls: ['./man-adj-mul-window.component.css']
})
export class ManAdjMulWindowComponent implements OnInit {
  @Input() tableClass: string = '';
  showDetails: boolean = true;
  claimNumList: any = [];
  claimNumOptions: boolean = false;
  sharedText: any = {};

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.claimNumList = [{
      claimNo: '1234567',
      memberNo: '123456789',
      claimDate: '12/12/2009',
      amount: '1000'
    },
      {
        claimNo: '1112223',
        memberNo: '123456789',
        claimDate: '12/12/2009',
        amount: '1000'
      },
      {
        claimNo: '00998877',
        memberNo: '123456789',
        claimDate: '12/12/2009',
        amount: '1000'
      }];
    localStorage.removeItem('activePage');
  }

  open(e: any, i: any): void {
    this.claimNumOptions = true;
    this.sharedText = {text: e.target.text, index: '1'};
    e.preventDefault();
  }

  next(e: any): void {
    localStorage.setItem('mainUrl', this.router.url);
    this.router.navigate(['/dashboard/man-adj-mul-window', e]);
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
