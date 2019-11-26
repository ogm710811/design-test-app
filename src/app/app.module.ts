import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import {NgModule, Provider} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  MAT_LABEL_GLOBAL_OPTIONS,
  MAT_MENU_DEFAULT_OPTIONS
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {SwaggerGeneratedModule} from '@fox/rest-clients';
import {FeatureFlagService, HasReleaseEnableGuard} from '@fox/shared';
import {
  loginReducer,
  modalReducer,
  snackbarReducer
} from '@fox/state-management';
import {
  BootstrapApiTestInterceptor,
  DepositApiTestInterceptor,
  TrcApiTestInterceptor,
  UaaApiTestInterceptor,
  WqSessionApiTestInterceptor
} from '@fox/test-support';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {StoreModule} from '@ngrx/store';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {HotkeyModule} from 'angular2-hotkeys';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';

const mockProviders: Provider[] = environment.envName === 'mock' ? [
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: UaaApiTestInterceptor
  },
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: DepositApiTestInterceptor
  },
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TrcApiTestInterceptor
  },
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: WqSessionApiTestInterceptor
  },
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: BootstrapApiTestInterceptor
  }
] : [];

const staticProviders: Provider[] = [
  HttpClient,
  {
    provide: MAT_LABEL_GLOBAL_OPTIONS,
    useValue: {float: 'always'}
  },
  {
    provide: MAT_MENU_DEFAULT_OPTIONS,
    useValue: {overlapTrigger: false}
  },
  {
    provide: 'futureReleaseGuard',
    useFactory: (featureFlagSvc: FeatureFlagService, router: Router) => {
      return new HasReleaseEnableGuard(featureFlagSvc, router);
    },
    deps: [FeatureFlagService, Router]
  }
];

const assembledProviders: Provider[] = staticProviders.concat(mockProviders);

/**
 * `FoxUiModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular modules
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    // Routing module
    AppRoutingModule,
    // Shared Module
    SharedModule.forRoot(),
    // Swagger Generated Code
    SwaggerGeneratedModule,
    HotkeyModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    StoreModule.forRoot({
      message: snackbarReducer,
      loggedIn: loginReducer,
      modalActive: modalReducer
    }),
    BsDropdownModule.forRoot(),
    CoreModule
  ],
  providers: assembledProviders
})
export class AppModule {
}
