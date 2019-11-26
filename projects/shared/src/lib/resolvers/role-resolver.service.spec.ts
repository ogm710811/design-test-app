import {HttpClientTestingModule} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BootstrapApi} from '@fox/rest-clients';
import {loginReducer, snackbarReducer} from '@fox/state-management';
import {StoreModule} from '@ngrx/store';
import {LoginService} from '../login-service/login.service';
import {RoleResolver} from './role-resolver.service';

describe('RoleResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoleResolver,
        BootstrapApi,
        LoginService
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({message: snackbarReducer, loggedIn: loginReducer})
      ]
    });
  });

  it('should be created', inject([RoleResolver], (service: RoleResolver) => {
    expect(service).toBeTruthy();
  }));
});
