import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {EventEmitter, Injectable, NgZone} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BootstrapApi, InlineResponse200} from '@fox/rest-clients';
import {LOG_IN, LOG_OUT, LoginReduxState, RESET} from '@fox/state-management';
import {Store} from '@ngrx/store';
import {asyncScheduler, BehaviorSubject, Observable, of as observableOf, of, Subscription} from 'rxjs';
import {catchError, delay, flatMap, map, observeOn, switchMap, tap} from 'rxjs/operators';
import * as uuidNS from 'uuid';
import {hasAnyOf, not} from '../authority/authority-rule';
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
import {enterZone, leaveZone} from '../ng-rx-zone/ng-rx-zone-scheduler';
import {LoginState} from './login-state.model';
import {TokenCheckService} from './token-check.service';
import {homeRoutePathRoot} from '../constants/home.constants';
import {FeatureFlagService} from '../feature-flag-service/feature-flag.service';
const uuid = uuidNS;
/**
 * Service for interacting with server-side login API, which provides the canonical application state for the logged in
 * username, his or her roles and/or error messages derived from the success or failure of login and logout calls
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /**
   * The username, roles and error message associated with the most recent successful login or logout interaction with
   * the server-side API
   */
  savedUserName?: string;
  store: Store<LoginReduxState>;
  logoutTimeout: number | undefined;
  idleTimeout: number | undefined;
  loginWithSSO: boolean = false;
  newTokenTimeoutListener: EventEmitter<LoginState>;
  tokenExpirationListener: Observable<LoginState>;
  environmentDescription: string | undefined;
  isMainTabVisible: boolean = false;
  isNewBrowserTabOpen: boolean = false;
  sessionId: string;
  isTokenRefreshed = new BehaviorSubject<boolean>(true);
  isTokenRefreshed$ = this.isTokenRefreshed.asObservable();
  private loginSubscription?: Subscription;
  private loginStateSubscription?: Subscription;
  private logoutSubscription?: Subscription;

  /**
   * username property from the latest returned LoginState. Eventually updates after each call to login or logout
   * @returns
   */
  get username(): string {
    if (this.loginState && this.loginState.username) {
      return this.loginState.username;
    }
    return '';
  }

  get isSecurityAdmin(): boolean {
    return not(hasAnyOf([OP.MAINTAIN_STD_WQ, OP.MAINTAIN_EH_WQ, OP.MAINTAIN_CSS_WQ, OP.MAINTAIN_SIU_WQ,
      OP.VIEW_DOCUMENT, OP.EDIT_DOCUMENT, OP.MAINTAIN_WORKQUEUE])).isObeyed(this.loginState.permissions);
  }

  get hasStaffRole(): boolean {
    return this.hasRole(OP.READ_MEMBER);
  }

  get hasOptumCSSRole(): boolean {
    return this.hasRole(OP.MAINTAIN_CSS_WQ);
  }

  get hasEnhancedWqRole(): boolean {
    return this.hasRole(OP.MAINTAIN_EH_WQ);
  }

  get hasSupervisorRole(): boolean {
    return this.hasRole(OP.REASSIGN_MEMBER_LOOKUP);
  }

  get hasOpViewPaymentRole(): boolean {
    return this.hasRole(OP.VIEW_PAYMENT);
  }

  get hasOpMaintainPaymentRole(): boolean {
    return this.hasRole(OP.MAINTAIN_PAYMENT);
  }

  get hasOpAuthorizePaymentRole(): boolean {
    return this.hasRole(OP.AUTHORIZE_PAYMENT_ACTION);
  }

  get hasOpViewClaimImageRole(): boolean {
    return this.hasRole(OP.VIEW_CLAIM_IMAGE);
  }

  get hasOpDeleteDocument(): boolean {
    return this.hasRole(OP.DELETE_DOCUMENT);
  }

  get hasOpMaintainWq(): boolean {
    return this.hasRole(OP.MAINTAIN_STD_WQ) || this.hasRole(OP.MAINTAIN_EH_WQ);
  }

  get hasOpViewClaimNoteRole(): boolean {
    return this.hasRole(OP.VIEW_CLAIM_NOTE);
  }

  get hasOpMaintainClaimNoteRole(): boolean {
    return this.hasRole(OP.MAINTAIN_CLAIM_NOTE);
  }

  get hasOpMemberProfile(): boolean {
    return this.hasRole(OP.MEMBER_PROFILE);
  }

  get hasOpReassignMemberLookup(): boolean {
    return this.hasRole(OP.REASSIGN_MEMBER_LOOKUP);
  }

  get hasOpSendEob(): boolean {
    return this.hasRole(OP.SEND_EOB);
  }

  get hasOpSendRa(): boolean {
    return this.hasRole(OP.SEND_RA);
  }

  get hasOpReplaceEob(): boolean {
    return this.hasRole(OP.REPLACE_EOB);
  }

  get hasOpReplaceRa(): boolean {
    return this.hasRole(OP.REPLACE_RA);
  }

  get hasRecoverOverpaymentRole(): boolean {
    return this.hasRole(OP.RECOVER_OVERPAYMENT);
  }

  get homeUrl(): string {
    if (this.featureFlagSvc.isFeatureDisabled('F5560')) {
      return loginUrlOnLoggedIn;
    } else {
      return homeRoutePathRoot;
    }
  }

  /**
   * fox-claims:
   *
   * getter: loginState
   * @returns the user login state
   *
   * reads the localStorage item loginState and if it exists
   * returns the value
   */
  get loginState(): LoginState {
    const ls1 = localStorage.getItem('loginState');
    if (ls1 === null) {
      const ls2 = new LoginState();
      localStorage.setItem('loginState', JSON.stringify(ls2));
      return ls2;
    } else {
      return JSON.parse(ls1);
    }
  }

  /**
   * fox-claims:
   *
   * method: setLoginState
   * @params: ls: LoginState
   *
   * accesses the current domain's local Storage object
   * and adds a loginState item saving there
   * all user login information
   */
  set loginState(ls: LoginState) {
    localStorage.setItem('loginState', JSON.stringify(ls));
  }

  /**
   * Constructor injecting Http, Router and ActivatedRoute types
   *
   * @param http communicates with the backend server login API
   * @param router controls routing actions after login and logout attempts
   * @param activatedRoute retrieves query parameters to the login service, such as returnUrl, which determines where
   *     to redirect after a successful login attempt
   * @param theStore an ng-rx store to cascade events to the global service
   * @param bootstrapSvc Communicates initial settings with backend
   * @param ngZone Angular "zone" for Zone.js; used to exclude rxjs timers from Angular "zone" to allow protractor to run
   */
  constructor(private http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              theStore: Store<LoginReduxState>,
              private bootstrapSvc: BootstrapApi,
              private ngZone: NgZone,
              private tokenCheckService: TokenCheckService,
              private featureFlagSvc: FeatureFlagService) {
    this.sessionId = uuid();
    this.store = theStore;
    bootstrapSvc.getBootstrap(uuid()).subscribe(resp => {
      this.loginWithSSO = resp.enableSso ? resp.enableSso : false;
      this.logoutTimeout = resp.logoutTimeout;
      this.idleTimeout = resp.idleTimeout;
      this.environmentDescription = resp.environmentDescription;
    });
    this.newTokenTimeoutListener = new EventEmitter<LoginState>();
    this.tokenExpirationListener = this.newTokenTimeoutListener.pipe(
      switchMap((ls: LoginState) => {
        const waitTime = (ls && ls.token_timeout && ls.token_timeout <= 60) ? 1 : (ls.token_timeout - 60) * 1000;
        return of(ls).pipe(
          delay(waitTime, leaveZone(ngZone, asyncScheduler))
        );
      })
    ).pipe(
      observeOn(enterZone(ngZone, asyncScheduler))
    );

    this.tokenExpirationListener.subscribe((ls) => {
      this.getRefreshToken();
    });
  }

  onNewLoginState(): void {
    if (!this.loginState.access_token) {
      this.router.navigateByUrl(loginUrlOnLoggedOut);
    } else if (this.router.url.endsWith('/login/msId')) {
      this.router.navigateByUrl(this.homeUrl);
    }
  }

  saveUserName(loginName: string): void {
    this.savedUserName = loginName;
    if (typeof this.savedUserName !== 'undefined' && this.savedUserName) {
      this.router.navigateByUrl(loginUrlCredentials);
    } else {
      this.router.navigateByUrl(loginUrlUsername);
    }
  }

  /**
   * Whether or not the current logged in user has a specific role
   *
   * @param role the role in question
   * @returns whether or not the current user has the passed role
   */
  hasRole(role: string): boolean {
    if (this.loginState && this.loginState.authorities) {
      const filtered = this.loginState.authorities.filter((auth) => {
        return (auth === role);
      });
      return filtered.length > 0;
    }
    return false;
  }

  retriveApplicationEnvironment(): string | undefined {
    return this.environmentDescription;
  }

  /**
   * fox-claims:
   *set
   * method: login
   * @params: username: string, password: string
   * @returns a login subscription
   *
   * Checks whether current user is authorized or not
   * Directs user to dashboard if current user is authorized
   *
   * After loginStateSubscription subscription, we set the login state value
   * using setLoginState() which save the user login state in the local storage.
   */
  login(username: string, password: string): Observable<LoginState> {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }

    return this.userToken(username, password)
      .pipe(
        flatMap((ls: LoginState) => {
          if (!ls.errorMessage) {
            return this.getUserProfile(ls.access_token, ls);
          } else {
            return observableOf(ls);
          }
        }),
        tap(finalLs => {
          this.loginState = finalLs;
          this.onNewLoginState();
          if (!finalLs.errorMessage) {
            this.store.dispatch({type: LOG_IN});
            // const targetRoute = this.activatedRoute.snapshot.queryParams['returnUrl'];
            // if (targetRoute) {
            //   this.router.navigateByUrl(targetRoute);
            // } else {
            //   this.router.navigateByUrl(loginUrlOnLoggedIn);
            // }
          } else {
            this.store.dispatch({type: RESET});
          }
        })
      );
  }

  /*
   Checks if user credentials match with the user service data
   if it user matches it issues a user token
   */
  userToken(username: string, password: string): Observable<LoginState> {
    let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('Authorization', 'Basic ' + basicAuthHeader);
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('RequestCorrelationId', uuid());

    let postResponse: Observable<InlineResponse200>;

    if (this.loginWithSSO) {
      headers = headers.append('Authorization', 'Basic Zm94ZWRpOmZveGVkaXNlY3JldA==');
      headers = headers.append('groups', 'FOX_USER_TST,fox_ui_user_alpha,fox_ui_user_fpp,fox_ui_user_int,' +
        'fox_ui_user_int2,fox_ui_user_int3,fox_ui_user_qa,fox_ui_user_qa2,fox_ui_user_tst,fox_user_alpha,fox_user_fpp,' +
        'fox_user_int,fox_user_int2,fox_user_int3,fox_user_qa,fox_user_qa2,fox_user_ts,FOX_CHECKS_AUTHORIZE,FOX_QR_EXAMINER_PC');

      postResponse =
        this.http.get<InlineResponse200>('/uaa/oauth/sso/token?grant_type=password&username=' + username, {
          headers: headers
        });

    } else {

      const passwordEncoded = password.replace('%', '%25').replace('+', '%2B');

      const credentials = 'grant_type=password&username=' + username + '&password=' + passwordEncoded;

      postResponse =
        this.http.post<InlineResponse200>(loginApiToken, credentials, {
          headers: headers
        });
    }

    return postResponse.pipe(map((response200: InlineResponse200) => {
      const loginState: LoginState = new LoginState();
      loginState.access_token = response200.access_token || '';
      loginState.token_timeout = response200.expires_in || 0;
      loginState.refresh_token = response200.refresh_token || '';
      this.newTokenTimeoutListener.emit(loginState);
      return loginState;
    }), catchError((e: HttpErrorResponse) => {
      const loginState: LoginState = new LoginState();
      if (e.status === 400) {
        alert(loginErrorMessageToken400);
        loginState.errorMessage = loginErrorMessageToken400;
      } else if (e.status === 401) {
        alert(loginErrorMessageToken401);
        loginState.errorMessage = loginErrorMessageToken401;
      } else if (e.status >= 500 && e.status < 600) {
        alert(loginErrorMessageToken500);
        loginState.errorMessage = loginErrorMessageToken500;
      } else {
        alert(loginErrorMessageTokenOther);
        loginState.errorMessage = loginErrorMessageTokenOther;
      }
      return observableOf(loginState);
    }));
  }

  userTokenwdfwdf(username: string, password: string): Observable<LoginState> {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('RequestCorrelationId', uuid());
    headers = headers.append('Authorization', 'Basic Zm94ZWRpOmZveGVkaXNlY3JldA==');
    headers = headers.append('groups', 'fox_ui_user_alpha,fox_ui_user_fpp,fox_ui_user_int,' +
      'fox_ui_user_int2,fox_ui_user_int3,fox_ui_user_qa,fox_ui_user_qa2,fox_ui_user_tst,fox_user_alpha,fox_user_fpp,' +
      'fox_user_int,fox_user_int2,fox_user_int3,fox_user_qa,fox_user_qa2,fox_user_ts,FOX_CHECKS_AUTHORIZE,FOX_QR_EXAMINER_PC');

    const postResponse: Observable<InlineResponse200> =
      this.http.get<InlineResponse200>('/uaa/oauth/sso/token?grant_type=password&username=foxtusr7', {
        headers: headers
      });

    return postResponse.pipe(map((response200: InlineResponse200) => {
      const loginState: LoginState = new LoginState();
      loginState.access_token = response200.access_token || '';
      loginState.token_timeout = response200.expires_in || 0;
      loginState.refresh_token = response200.refresh_token || '';
      this.newTokenTimeoutListener.emit(loginState);
      return loginState;
    }), catchError((e: HttpErrorResponse) => {
      const loginState: LoginState = new LoginState();
      if (e.status === 400) {
        alert(loginErrorMessageToken400);
        loginState.errorMessage = loginErrorMessageToken400;
      } else if (e.status === 401) {
        alert(loginErrorMessageToken401);
        loginState.errorMessage = loginErrorMessageToken401;
      } else if (e.status >= 500 && e.status < 600) {
        alert(loginErrorMessageToken500);
        loginState.errorMessage = loginErrorMessageToken500;
      } else {
        alert(loginErrorMessageTokenOther);
        loginState.errorMessage = loginErrorMessageTokenOther;
      }
      return observableOf(loginState);
    }));
  }

  userTokenSSO(username: string, password: string): Observable<LoginState> {

    // const basicAuthHeader = btoa(clientId + ':' + clientSecret);
    let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('Authorization', 'Basic ' + basicAuthHeader);
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('RequestCorrelationId', uuid());
    headers = headers.append('Authorization', 'Basic Zm94ZWRpOmZveGVkaXNlY3JldA==');
    headers = headers.append('groups', 'FOX_USER_INT');

    const postResponse: Observable<InlineResponse200> =
      this.http.get<InlineResponse200>('/uaa/oauth/sso/token?grant_type=password&username=foxtusr7', {
        headers: headers
      });

    return postResponse.pipe(
      map((response200: InlineResponse200) => {
        const loginState: LoginState = new LoginState();
        loginState.access_token = response200.access_token || '';
        loginState.token_timeout = response200.expires_in || 0;
        loginState.refresh_token = response200.refresh_token || '';
        this.newTokenTimeoutListener.emit(loginState);
        return loginState;
      }),
      catchError((e: HttpErrorResponse) => {
        const loginState: LoginState = new LoginState();
        if (e.status === 400) {
          alert(loginErrorMessageToken400);
          loginState.errorMessage = loginErrorMessageToken400;
        } else if (e.status === 401) {
          alert(loginErrorMessageToken401);
          loginState.errorMessage = loginErrorMessageToken401;
        } else if (e.status >= 500 && e.status < 600) {
          alert(loginErrorMessageToken500);
          loginState.errorMessage = loginErrorMessageToken500;
        } else {
          alert(loginErrorMessageTokenOther);
          loginState.errorMessage = loginErrorMessageTokenOther;
        }
        return of(loginState);
      })
    );
  }

  /*
   Get refresh token
   */
  getRefreshToken(): void {
    this.tokenCheckService.changeIsTokenRefreshed(false);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('RequestCorrelationId', uuid());

    const credentials = 'grant_type=refresh_token&refresh_token=' + this.loginState.refresh_token;

    if (this.loginState.access_token.length > 0) {

      const postResponse: Observable<InlineResponse200> =
        this.http.post<InlineResponse200>(loginApiToken, credentials, {
          headers: headers
        });

      postResponse.subscribe((response200: InlineResponse200) => {
        this.loginState.access_token = response200.access_token || '';
        this.loginState.token_timeout = response200.expires_in || 10;
        this.loginState.refresh_token = response200.refresh_token || '';
        const ls = {...this.loginState};
        ls.access_token = response200.access_token || '';
        ls.token_timeout = response200.expires_in || 10;
        ls.refresh_token = response200.refresh_token || '';
        this.loginState = ls;
        this.tokenCheckService.changeIsTokenRefreshed(true);
        this.tokenCheckService.setNewToken(ls.access_token);
        this.newTokenTimeoutListener.emit(this.loginState);
      });

    }
  }

  changeIsTokenRefreshed(isRefresh: boolean): void {
    this.isTokenRefreshed.next(isRefresh);
  }

  /*
  Checks if user token is valid or not
   */

  getUserProfile(accessToken: string, existingState?: LoginState, showAlert: boolean = true): Observable<LoginState> {

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('RequestCorrelationId', uuid());

    const credentials = 'token=' + accessToken;
    const postResponse: Observable<{user_name: string, authorities: string[]}> =
      this.http.post<{user_name: string, authorities: string[]}>(loginApiUserDetails, credentials, {
        headers: headers
      });

    return postResponse.pipe(
      map((response200: {user_name: string, authorities: string[]}) => {
        return {
          user_name: response200.user_name,
          authorities: response200.authorities,
          permissions: (response200.authorities || []).filter((authStr: string): authStr is OP => {
            return Object.values(OP).includes(authStr);
          })
        };
      }),
      map((response200: {user_name: string, authorities: string[], permissions: OP[]}) => {
        const loginState: LoginState = existingState ? existingState : new LoginState();
        loginState.username = response200.user_name || '';
        loginState.authorities = response200.authorities || [];
        loginState.permissions = response200.permissions || [];
        return loginState;
      }),
      catchError((e: HttpErrorResponse) => {
        const loginState = new LoginState();
        if (e.status === 400) {
          if (showAlert) {
            alert(loginErrorMessageToken400);
          }
          loginState.errorMessage = loginErrorMessageUserDetails400;
        } else if (e.status === 401) {
          if (showAlert) {
            alert(loginErrorMessageToken401);
          }
          loginState.errorMessage = loginErrorMessageUserDetails401;
        } else if (e.status >= 500 && e.status < 600) {
          if (showAlert) {
            alert(loginErrorMessageUserDetails500);
          }
          loginState.errorMessage = loginErrorMessageUserDetails500;
        } else {
          if (showAlert) {
            alert(loginErrorMessageUserDetailsOther);
          }
          loginState.errorMessage = loginErrorMessageUserDetailsOther;
        }
        return observableOf(loginState);
      })
    );
  }

  /**
   * fox-claims:
   *
   * method: logout
   * @params: none
   *  Logs out the user from App return a logoutSubscription.
   *  In this method we implement the following features:
   *  -> set a localStorage key 'isLoggedIn' which is used to know if user
   *  is logged out from a second window-tab. Refers to header.component.ts file.
   *  -> check if there is a second open tab or if the focus (visibility) is on
   *  the main window-tab to logout the user.
   *  -> clear localStorage in all cases.
   */
  logout(): Subscription | undefined {
    localStorage.removeItem('sessionId');
    this.store.dispatch({type: LOG_OUT});
    if (this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
    }
    if (this.loginState && this.loginState.access_token) {
      const loginState: LoginState = new LoginState();
      let headers = new HttpHeaders();
      headers = headers.append('Authorization', 'Bearer ' + this.loginState.access_token);
      headers = headers.append('RequestCorrelationId', uuid());
      this.logoutSubscription = this.http.post(loginApiLogout, null, {headers: headers}).subscribe(r => {
        this.loginState = loginState;
        this.onNewLoginState();
        this.newTokenTimeoutListener.emit(loginState);
      }, e => {
        this.loginState = loginState;
        this.onNewLoginState();
        this.newTokenTimeoutListener.emit(loginState);
      });
    }
    return this.logoutSubscription;
  }

  /**
   * fox-claims:
   *
   * method: clearLocalStorage
   * @params: none
   *
   * removes all the localStorage items
   */
  clearLocalStorage(): void {
    localStorage.clear();
  }
}
