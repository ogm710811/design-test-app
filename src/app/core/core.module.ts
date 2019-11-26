import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Configuration} from '@fox/rest-clients';
import {CommonInterceptor, LoginService} from '@fox/shared';
import {SharedModule} from '../shared/shared.module';
import {FooterComponent} from './footer/footer.component';
import {FoxUiComponent} from './fox-ui/fox-ui.component';
import {HeaderComponent} from './header/header.component';

export function generatedServiceConfiguration(ls: LoginService): Configuration {
  return new Configuration(
    {
      apiKey: '',
      accessToken: () => {
        return ls.loginState.access_token;
      },
      basePath: '',
      withCredentials: false
    }
  );
}

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
  ],
  declarations: [
    FoxUiComponent,
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: CommonInterceptor
    },
    {
      provide: Configuration,
      useFactory: generatedServiceConfiguration,
      deps: [LoginService]
    }
  ]
})
export class CoreModule {
}
