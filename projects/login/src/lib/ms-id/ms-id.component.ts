import {AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService, LoginState, loginUrlCredentials, MessageBoxService} from '@fox/shared';

@Component({
  selector: 'fox-login-ms-id',
  templateUrl: './ms-id.component.html',
  styleUrls: ['../login.css']
})
export class MsIdComponent implements OnInit, AfterViewChecked {

  username: string = '';
  password: string = '';
  showMsid = true;

  @ViewChild('txtLogin', {read: ElementRef}) unInput: ElementRef = new ElementRef('txtLogin');

  get loginState(): LoginState {
    return this.loginSvc.loginState;
  }

  get errorMsg(): any {
    if (this.loginSvc && this.loginSvc.loginState) {
      return this.loginSvc.loginState.errorMessage;
    } else {
      return null;
    }
  }

  public constructor(private router: Router,
                     private route: ActivatedRoute,
                     private loginSvc: LoginService,
                     private messageBoxService: MessageBoxService) {
  }

  ngOnInit(): void {
    this.route.url.subscribe(u => {
        if (this.loginState && this.loginState.username) {
          this.router.navigateByUrl(loginUrlCredentials);
        }
      }
    );
  }

  ngAfterViewChecked(): void {
    this.unInput.nativeElement.focus();
  }

  btnLoginIDEventClick(): void {
    if (this.loginSvc.loginWithSSO) {
      this.btnLoginEventClick();
    } else {
      this.showMsid = false;
    }
  }

  btnLoginEventClick(): void {
    this.loginSvc.login(this.username, this.password).subscribe(obs => {
      if (this.errorMsg) {
        this.showMsid = true;
        this.username = '';
        this.password = '';
      } else {
        this.messageBoxService.reset();
      }
    });
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

  @HostListener('document: keydown', ['$event'])
  onsubmitKeyPress(event: KeyboardEvent): void {
    if ((event.keyCode && event.keyCode === 13)) {
      if (this.showMsid) {
        this.btnLoginIDEventClick();
      } else {
        this.btnLoginEventClick();
      }
    }
  }
}
