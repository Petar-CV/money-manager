import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import localeHr from '@angular/common/locales/hr';
import localeEn from '@angular/common/locales/en-GB';

import { checkIfExYuCountry, isLangAvailable } from '@petar-cv/translate-utils';

declare const I18N_HASH: string; // This is imported from the custom Webpack config

function TranslatePartialLoader(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, 'i18n/', `.json?_=${I18N_HASH}`);
}

import { AppComponent } from './app.component';
import { LayoutModule } from './components/layout/layout.module';
import { AppRoutingModule } from './app-routing.module';

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
    NgxWebstorageModule.forRoot({ prefix: '@MoneyManager' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private readonly localStorage: LocalStorageService,
    private readonly translateService: TranslateService
  ) {
    const currentLang = this.localStorage.retrieve('lang');

    registerLocaleData(localeHr);
    registerLocaleData(localeEn);

    if (currentLang && isLangAvailable(currentLang)) {
      this.translateService.use(currentLang);
    } else {
      // If not in local storage, check if browser language is supported
      let browserLang = this.translateService.getBrowserLang();

      // If the browser language is not available, check whether user comes from the
      // Ex-Yu countries and if so, set language to Croatian, otherwise fallback to English
      if (!browserLang || !isLangAvailable(browserLang)) {
        browserLang = checkIfExYuCountry(browserLang);
      }

      this.localStorage.store('lang', browserLang);
      this.translateService.use(browserLang);
    }
  }
}
