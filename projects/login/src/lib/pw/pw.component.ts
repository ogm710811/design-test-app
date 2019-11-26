import {AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService, LoginState, loginUrlCredentials} from '@fox/shared';

@Component({
  selector: 'fox-login-pw',
  templateUrl: './pw.component.html',
  styleUrls: ['../login.css']
})
export class PwComponent implements OnInit, AfterViewChecked {

  password: string = '';

  @ViewChild('txtPassword', {read: ElementRef}) pwInput: ElementRef = new ElementRef('txtPassword');

  get loginState(): LoginState {
    return this.loginSvc.loginState;
  }

  get errorMsg(): string {
    if (this.loginSvc && this.loginSvc.loginState) {
      return this.loginSvc.loginState.errorMessage || '';
    } else {
      return '';
    }
  }

  public constructor(private router: Router,
                     private route: ActivatedRoute,
                     private loginSvc: LoginService) {
  }

  ngOnInit(): void {
    this.password = '';
    this.route.url.subscribe(u => {
        if (this.loginSvc.savedUserName) {
          this.router.navigateByUrl(loginUrlCredentials);
        }
      }
    );
  }

  ngAfterViewChecked(): void {
    this.pwInput.nativeElement.focus();
  }

  buttonFocus(e: FocusEvent): void {
    const preventDefaultOnEnter: (KeyboardEvent: any) => void = (ev: KeyboardEvent) => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
      }
    };
    if (e && e.relatedTarget && e.relatedTarget.addEventListener) {
      e.relatedTarget.addEventListener('keypress', preventDefaultOnEnter);
      e.relatedTarget.addEventListener('keydown', preventDefaultOnEnter);
      e.relatedTarget.addEventListener('keyup', preventDefaultOnEnter);
    }
  }

  /**
   * Event action btnLoginEventClick
   */
  btnLoginEventClick(): void {
    this.loginSvc.login(this.loginSvc.savedUserName || '', this.password);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    if (event.keyCode && event.keyCode === 13) {
      this.btnLoginEventClick();
    }
  }
}
