import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import localeHr from '@angular/common/locales/hr';
import localeEn from '@angular/common/locales/en-GB';
import { MessageService } from 'primeng/api';

import { AppComponent } from './app.component';
import { LayoutModule } from './components/layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './shared/guards/admin-guard/auth.guard';
import { httpInterceptorProviders } from './shared/interceptors';
import { SharedModule } from './shared/shared.module';
import { UserProfileService } from './shared/services/user-profile/user-profile.service';

declare const I18N_HASH: string; // This is imported from the custom Webpack config

function TranslatePartialLoader(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, 'i18n/', `.json?_=${I18N_HASH}`);
}

function initializeKeycloak(
  keycloak: KeycloakService,
  userProfileService: UserProfileService
) {
  return () =>
    keycloak
      .init({
        config: {
          url: 'http://localhost:8080/auth', // TODO: Implement environment variable
          realm: 'Money-Manager', // TODO: Implement environment variable
          clientId: 'money-manager-front', // TODO: Implement environment variable
        },
        loadUserProfileAtStartUp: true,
        initOptions: {
          onLoad: 'check-sso',
          checkLoginIframe: false,
        },
        bearerExcludedUrls: ['/assets'],
      })
      .then(() => {
        userProfileService.initializeUserProfileData();
      });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslatePartialLoader,
        deps: [HttpClient],
      },
    }),
    SharedModule,
    NgxWebstorageModule.forRoot({ prefix: '@MoneyManager' }),
    KeycloakAngularModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, UserProfileService],
    },
    httpInterceptorProviders,
    AuthGuard,
    MessageService,
    UserProfileService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localeHr);
    registerLocaleData(localeEn);
  }
}
