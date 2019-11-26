import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {PwComponent} from '@fox/login';
import {BootstrapApi} from '@fox/rest-clients';
import {LoginService} from '@fox/shared';
import {loginReducer, snackbarReducer} from '@fox/state-management';
import {StoreModule} from '@ngrx/store';

describe('Log in page Component test', () => {
  let component: PwComponent;
  let fixture: ComponentFixture<PwComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PwComponent
      ],
      providers: [
        LoginService,
        HttpClient,
        BootstrapApi
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        StoreModule.forRoot({message: snackbarReducer, loggedIn: loginReducer})
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(PwComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should display the login page', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have 'Sign in' as title element`, async(() => {
    TestBed.createComponent(PwComponent);
    expect(document.getElementById('loginTitle')).toBeDefined();
  }));

  it('should simulate enter key', () => {
    spyOn(component, 'onKeyPress');
    const evInit: KeyboardEventInit = ({code: 'Enter', key: 'Enter'});
    const x: KeyboardEvent = new KeyboardEvent('keyboardEvent', evInit);
    x.initEvent('keydown', true, true);
    document.dispatchEvent(x);
    expect(component.onKeyPress).toHaveBeenCalled();
  });

});
