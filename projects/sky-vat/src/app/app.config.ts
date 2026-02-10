import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideNzI18n(en_US),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideHttpClient(
      withJsonpSupport()
    ),
    provideToastr(), // Toastr providers
  ]
};
