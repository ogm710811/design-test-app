import {APP_BASE_HREF} from '@angular/common';
import {HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {async, getTestBed, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {BootstrapApi} from '@fox/rest-clients';
import {loginReducer, snackbarReducer} from '@fox/state-management';
import {loginTestData, TestSupportModule} from '@fox/test-support';
import {StoreModule} from '@ngrx/store';
import {OP} from '../authority/op';
import {
  loginApiLogout,
  loginApiToken,
  loginApiUserDetails,
  loginErrorMessageToken400,
  loginErrorMessageToken401,
  loginErrorMessageToken500,
  loginErrorMessageTokenOther,
  loginErrorMessageUserDetails400,
  loginErrorMessageUserDetails401,
  loginErrorMessageUserDetails500,
  loginErrorMessageUserDetailsOther,
  loginUrlCredentials,
  loginUrlOnLoggedIn,
  loginUrlOnLoggedOut,
  loginUrlUsername,
} from '../constants/login.constants';
import {LoginState} from './login-state.model';
import {LoginService} from './login.service';
import Spy = jasmine.Spy;

describe('LoginService', () => {
  it('should have an empty LoginState on initialization', async(() => {
    verifyInitialLoginState(svc);
  }));

  it('should set LoginState to its inital empty state on logout', () => {
    const loginState: LoginState = new LoginState();
    loginState.authorities = [OP.MEMBER_PROFILE, OP.MAINTAIN_STD_WQ, OP.EDIT_DOCUMENT];
    loginState.permissions = [OP.MEMBER_PROFILE, OP.MAINTAIN_STD_WQ, OP.EDIT_DOCUMENT];
    loginState.username = 'adfhajlsf';
    loginState.access_token = '572908hja4q2390h';
    loginState.errorMessage = 'nopenopenopenope';

    const lsObj: LoginState = {
      username: 'adfhajlsf',
      authorities: [OP.MEMBER_PROFILE, OP.MAINTAIN_STD_WQ, OP.EDIT_DOCUMENT],
      permissions: [OP.MEMBER_PROFILE, OP.MAINTAIN_STD_WQ, OP.EDIT_DOCUMENT],
      access_token: '572908hja4q2390h',
      refresh_token: '',
      errorMessage: 'nopenopenopenope',
      userDetails: {},
      token_timeout: 0
    };
    svc.loginState = lsObj;
    testLogout(loginState);
  });

  it('should return the username from the LoginState when it is truthy', () => {
    const lsObj: LoginState = {
      username: 'bob',
      authorities: [],
      permissions: [],
      access_token: '',
      refresh_token: '',
      errorMessage: '',
      userDetails: {},
      token_timeout: 0
    };
    svc.loginState = lsObj;
    expect(svc.username).toEqual('bob');
  });

  it('should return true from hasRole() when it is called with an authority in the LoginState', () => {
    const lsObj: LoginState = {
      username: '',
      authorities: [OP.READ_MEMBER, OP.MAINTAIN_STD_WQ],
      permissions: [OP.READ_MEMBER, OP.MAINTAIN_STD_WQ],
      access_token: '',
      refresh_token: '',
      errorMessage: '',
      userDetails: {},
      token_timeout: 0
    };
    svc.loginState = lsObj;
    expect(svc.hasRole(OP.READ_MEMBER)).toBeTruthy();
    expect(svc.hasRole(OP.MAINTAIN_STD_WQ)).toBeTruthy();
  });

  it('should return false from hasRole() when it is called with an authority that is not in the LoginState', () => {
    const lsObj: LoginState = {
      username: '',
      authorities: [OP.READ_MEMBER, OP.MAINTAIN_STD_WQ],
      permissions: [OP.READ_MEMBER, OP.MAINTAIN_STD_WQ],
      access_token: '',
      refresh_token: '',
      errorMessage: '',
      userDetails: {},
      token_timeout: 0
    };
    svc.loginState = lsObj;
    expect(svc.hasRole(OP.EDIT_DOCUMENT)).toBeFalsy();
  });

  it('should return true from hasStaffRole() when it is called with \'OP_READ_MEMBER\' in the LoginState', () => {
    const lsObj: LoginState = {
      username: '',
      authorities: [OP.READ_MEMBER, OP.MAINTAIN_STD_WQ],
      permissions: [OP.READ_MEMBER, OP.MAINTAIN_STD_WQ],
      access_token: '',
      refresh_token: '',
      errorMessage: '',
      userDetails: {},
      token_timeout: 0
    };
    svc.loginState = lsObj;
    expect(svc.hasStaffRole).toBeTruthy();
  });

  it('should return false from hasStaffRole() when it is called without \'OP_READ_MEMBER\' in the LoginState', () => {
    const lsObj: LoginState = {
      username: '',
      authorities: [],
      permissions: [],
      access_token: '',
      refresh_token: '',
      errorMessage: '',
      userDetails: {},
      token_timeout: 0
    };
    svc.loginState = lsObj;
    expect(svc.hasStaffRole).toBeFalsy();
  });

  it('should return true from hasSupervisorRole() when it is called with \'OP_REASSIGN_MEMBER_LOOKUP\' in the LoginState', () => {
    const lsObj: LoginState = {
      username: '',
      authorities: [OP.REASSIGN_MEMBER_LOOKUP],
      permissions: [OP.REASSIGN_MEMBER_LOOKUP],
      access_token: '',
      refresh_token: '',
      errorMessage: '',
      userDetails: {},
      token_timeout: 0
    };
    svc.loginState = lsObj;
    expect(svc.hasSupervisorRole).toBeTruthy();
  });

  it('should return false when hasSupervisorRole() when it is called without \'OP_REASSIGN_MEMBER_LOOKUP\' in the LoginState', () => {
    const lsObj: LoginState = {
      username: '',
      authorities: [OP.READ_MEMBER],
      permissions: [OP.READ_MEMBER],
      access_token: '',
      refresh_token: '',
      errorMessage: '',
      userDetails: {},
      token_timeout: 0
    };
    svc.loginState = lsObj;

    expect(svc.hasSupervisorRole).toBeFalsy();
  });

  it('should save the username and navigate to /login/pw when saveUserName() is called with a valid username', () => {
    svc.saveUserName('bob');
    expect(svc.savedUserName).toBe('bob');
    expect(routerSpy).toHaveBeenCalledWith(loginUrlCredentials);
  });

  it('should save the username and navigate to /login/msId when saveUserName() is called with an invalid username', () => {
    svc.saveUserName('');
    expect(svc.savedUserName).toBe('');
    expect(routerSpy).toHaveBeenCalledWith(loginUrlUsername);
  });

  it('should populate LoginState with access_token when receiving valid response in userToken()', () => {
    const userName = 'jjensen';
    const mockToken: string = 'xyz123';

    svc.userToken(userName, userName + 'password').subscribe(ls => {
      expect(ls.access_token).toEqual(mockToken);
      expect(ls.errorMessage).toBeUndefined();
    });

    const postToken = verifyTokenRequest(userName);

    postToken.flush({
      access_token: mockToken
    }, {
      status: 200,
      statusText: 'OK'
    });
  });

  it('should populate LoginState with the correct errorMessage when receiving 400 response in userToken()', () => {
    testUserTokenError(400, loginErrorMessageToken400);
  });

  it('should populate LoginState with the correct errorMessage when receiving 401 response in userToken()', () => {
    testUserTokenError(401, loginErrorMessageToken401);
  });

  it('should populate LoginState with the correct errorMessage when receiving 500 response in userToken()', () => {
    testUserTokenError(500, loginErrorMessageToken500);
  });

  it('should populate LoginState with the correct errorMessage when receiving >500 and <600 response in userToken()', () => {
    testUserTokenError(572, loginErrorMessageToken500);
  });

  it('should populate LoginState with the correct errorMessage when receiving undefined status code response in userToken()', () => {
    testUserTokenError(417, loginErrorMessageTokenOther);
  });

  it('should populate LoginState with username and authorities when receiving a valid response in getUserDetails()', () => {
    const userName = 'jjensen';
    const authorities = [OP.READ_MEMBER];
    const mockToken: string = 'xyz123';

    const ls: LoginState = new LoginState();
    ls.access_token = mockToken;

    svc.getUserProfile(mockToken, ls).subscribe(l => {
      expect(l.errorMessage).toBeUndefined();
      expect(l.username).toBe(userName);
      expect(l.access_token).toBe(mockToken);
      expect(l.authorities).toBe(authorities);
      expect(l.permissions).toBe(authorities);
    });

    const postUserDetails = verifyUserDetailsRequest(mockToken);

    postUserDetails.flush({
      user_name: userName,
      authorities: authorities
    });

    verifySuccessfulLoginState(userName, authorities, ls);
  });

  it('should populate LoginState with the correct errorMessage when receiving 400 response in getUserDetails()', () => {
    testGetUserDetailsError(400, loginErrorMessageUserDetails400);
  });

  it('should populate LoginState with the correct errorMessage when receiving 401 response in getUserDetails()', () => {
    testGetUserDetailsError(401, loginErrorMessageUserDetails401);
  });

  it('should populate LoginState with the correct errorMessage when receiving 500 response in getUserDetails()', () => {
    testGetUserDetailsError(500, loginErrorMessageUserDetails500);
  });

  it('should populate LoginState with the correct errorMessage when receiving >500 and <600 response in getUserDetails()', () => {
    testGetUserDetailsError(572, loginErrorMessageUserDetails500);
  });

  it('should populate LoginState with the correct errorMessage when receiving undefined status code response in getUserDetails()', () => {
    testGetUserDetailsError(417, loginErrorMessageUserDetailsOther);
  });

  it('should populate LoginState with username and staff roles for foxtusr1 after login()', () => {
    const users: object[] = loginTestData.filter(o => o['username'] === 'foxtusr1');
    if (users.length !== 1) {
      fail('Test Data for foxtusr1 is incorrect');
    }
    const user = users[0];
    testLogin(user['username'], user['authorities']);
  });

  it('should populate LoginState with username and supervisor roles for foxtusrc after login()', () => {
    const users: object[] = loginTestData.filter(o => o['username'] === 'foxtusrc');
    if (users.length !== 1) {
      fail('Test Data for foxtusrc is incorrect');
    }
    const user = users[0];
    testLogin(user['username'], user['authorities']);
  });

  it('should populate LoginState with username and no roles for nsantos after login()', () => {
    const users: object[] = loginTestData.filter(o => o['username'] === 'nsantos');
    if (users.length !== 1) {
      fail('Test Data for nsantos is incorrect');
    }
    const user = users[0];
    testLogin(user['username'], user['authorities']);
  });

  it('should populate LoginState with username and both roles for foxtusr6 after login()', () => {
    const users: object[] = loginTestData.filter(o => o['username'] === 'foxtusr6');
    if (users.length !== 1) {
      fail('Test Data for foxtusr6 is incorrect');
    }
    const user = users[0];
    testLogin(user['username'], user['authorities']);
  });

  it('should perform two consecutive valid logins without issue', () => {
    testLogin('swhite', [OP.READ_MEMBER, OP.REASSIGN_MEMBER_LOOKUP]);
    testLogin('jjensen', [OP.READ_MEMBER]);
  });

  it('should populate LoginState with the correct errorMessage when userToken returns a 400 within the flow for login()', () => {
    testLogin('jjensen', [OP.READ_MEMBER], 'token', 400, loginErrorMessageToken400);
  });

  it('should populate LoginState with the correct errorMessage when userToken returns a 401 within the flow for login()', () => {
    testLogin('jjensen', [OP.READ_MEMBER], 'token', 401, loginErrorMessageToken401);
  });

  it('should populate LoginState with the correct errorMessage when userToken returns a 500 within the flow for login()', () => {
    testLogin('jjensen', [OP.READ_MEMBER], 'token', 500, loginErrorMessageToken500);
  });

  it('should populate LoginState with the correct errorMessage when userToken returns a >500 and <600 within the flow for login()',
    () => {
      testLogin('jjensen', [OP.READ_MEMBER], 'token', 539, loginErrorMessageToken500);
    });

  it('should populate LoginState with the correct errorMessage when userToken returns an undefined status within the flow for login()',
    () => {
      testLogin('jjensen', [OP.READ_MEMBER], 'token', 455, loginErrorMessageTokenOther);
    });

  it('should populate LoginState with the correct errorMessage when getUserDetails returns a 400 within the flow for login()', () => {
    testLogin('jjensen', [OP.READ_MEMBER], 'details', 400, loginErrorMessageUserDetails400);
  });

  it('should populate LoginState with the correct errorMessage when getUserDetails returns a 401 within the flow for login()', () => {
    testLogin('jjensen', [OP.READ_MEMBER], 'details', 401, loginErrorMessageUserDetails401);
  });

  it('should populate LoginState with the correct errorMessage when getUserDetails returns a 500 within the flow for login()', () => {
    testLogin('jjensen', [OP.READ_MEMBER], 'details', 500, loginErrorMessageUserDetails500);
  });

  it('should populate LoginState with the correct errorMessage when getUserDetails returns a >500 and <600 within the flow for login()',
    () => {
      testLogin('jjensen', [OP.READ_MEMBER], 'details', 539, loginErrorMessageUserDetails500);
    });

  it('should populate LoginState with the correct errorMessage when getUserDetails returns undefined status within the flow for login()',
    () => {
      testLogin('jjensen', [OP.READ_MEMBER], 'details', 455, loginErrorMessageUserDetailsOther);
    });

  let tb: TestBed;
  let svc: LoginService;
  let httpMock: HttpTestingController;
  let routerMock: Router;
  let routerSpy: Spy;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [
        BootstrapApi,
        LoginService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      imports: [
        TestSupportModule,
        StoreModule.forRoot({message: snackbarReducer, loggedIn: loginReducer})
      ]
    });

    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    tb = getTestBed();
    svc = tb.get(LoginService);
    httpMock = tb.get(HttpTestingController);
    routerMock = tb.get(Router);
    routerSpy = spyOn(routerMock, 'navigateByUrl');

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  function verifyInitialLoginState(sv: LoginService): void {
    sv.loginState = new LoginState();
    expect(sv).toBeTruthy();
    expect(sv.loginState).toBeTruthy();
    expect(sv.loginState.username).toEqual('');
    expect(sv.loginState.authorities).toEqual([]);
    expect(sv.loginState.permissions).toEqual([]);
    expect(sv.loginState.errorMessage).toBeFalsy();
  }

  function verifyTokenRequest(userName?: string, password?: string): TestRequest {
    const un: string = userName ? userName : 'swhite';
    const pw: string = password ? password : un + 'password';
    const postToken: TestRequest = httpMock.expectOne(loginApiToken);
    expect(postToken.request.method).toBe('POST');
    expect(postToken.request.body).toBe('grant_type=password&username=' + un + '&password=' + pw);
    return postToken;
  }

  function verifyUserDetailsRequest(accessToken?: string): TestRequest {
    const token: string = accessToken ? accessToken : 'xyz123';
    const postUserDetails = httpMock.expectOne(loginApiUserDetails);
    expect(postUserDetails.request.method).toBe('POST');
    expect(postUserDetails.request.body).toBe('token=' + token);
    return postUserDetails;
  }

  function verifyLogoutRequest(): TestRequest {
    const postLogout = httpMock.expectOne(loginApiLogout);
    expect(postLogout.request.method).toBe('POST');
    return postLogout;
  }

  function verifySuccessfulLoginState(expectedUserName: string, expectedAuthorities: string[], ls: LoginState = svc.loginState): void {
    expect(ls).toBeTruthy();
    expect(ls.username).toEqual(expectedUserName);
    expectedAuthorities.forEach(auth => {
      const validForThisAuth = ls.authorities.filter(a => a === auth);
      expect(validForThisAuth.length).toBeGreaterThan(0);
    });
    expect(ls.errorMessage).toBeUndefined();
  }

  function verifyFailedLoginState(errMsg: string, ls: LoginState = svc.loginState): void {
    expect(ls).toBeTruthy();
    expect(ls.username).toEqual('');
    expect(ls.access_token).toEqual('');
    expect(ls.authorities).toEqual([]);
    expect(ls.errorMessage).toEqual(errMsg);
  }

  function testLogin(userName: string, authorities: string[], errMethod?: string, errStatus?: number, errMsg?: string): void {
    verifyInitialLoginState(svc);

    svc.login(userName, userName + 'password').subscribe((ls) => {
      const postToken = verifyTokenRequest(userName);

      const mockToken: string = 'xyz123';
      if (errMethod && errMethod === 'token' && errMsg) {
        postToken.flush('', {status: errStatus, statusText: 'error'});
        verifyFailedLoginState(errMsg);
      } else {

        postToken.flush({
          access_token: mockToken
        });
        const postUserDetails = verifyUserDetailsRequest(mockToken);

        if (errMethod && errMethod === 'details' && errMsg) {
          postUserDetails.flush('', {status: errStatus, statusText: 'error'});
          verifyFailedLoginState(errMsg);
        } else {
          postUserDetails.flush({
            user_name: userName,
            authorities: authorities
          });
          verifySuccessfulLoginState(userName, authorities);
          expect(routerSpy).toHaveBeenCalledWith(loginUrlOnLoggedIn);
          testLogout();
        }
      }
    });

  }

  function testUserTokenError(status: number, errMsg: string): void {
    const userName = 'nemo';

    svc.userToken(userName, userName + 'password').subscribe(ls => {
        expect(ls.access_token).toBe('');
        expect(ls.errorMessage).toBe(errMsg);
      }
    );

    const postToken = verifyTokenRequest(userName);
    postToken.flush('', {status: status, statusText: 'error'});
  }

  function testGetUserDetailsError(status: number, errMsg: string): void {
    const mockToken: string = 'xyz123';

    const ls: LoginState = new LoginState();
    ls.access_token = mockToken;

    svc.getUserProfile(mockToken, ls).subscribe(l => {
      expect(l.errorMessage).toBe(errMsg);
      expect(l.username).toEqual('');
      expect(l.authorities).toEqual([]);
      expect(l.access_token).toEqual('');
    });

    const postUserDetails = verifyUserDetailsRequest(mockToken);

    postUserDetails.flush('', {status: status, statusText: 'error'});
  }

  function testLogout(ls?: LoginState): void {
    if (ls) {
      svc.loginState.authorities = ls.authorities;
      svc.loginState.username = ls.username;
      svc.loginState.access_token = ls.access_token;
      svc.loginState.errorMessage = ls.errorMessage;
    }

    svc.logout();

    const postLogout = verifyLogoutRequest();
    postLogout.flush('');

    verifyInitialLoginState(svc);
    expect(routerSpy).toHaveBeenCalledWith(loginUrlOnLoggedOut);
  }
});
