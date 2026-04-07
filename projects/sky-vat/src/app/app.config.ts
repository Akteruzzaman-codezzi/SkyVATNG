import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideHttpClient, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './core/auth/Interceptor/error.interceptor';
import { httpInterceptor } from './core/auth/Interceptor/http.interceptor';
import { provideEffects } from '@ngrx/effects';
import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { PostEffects } from './feature/components/dashboard/posts/store/post.effects';
import { postFeature } from './feature/components/dashboard/posts/store/post.reducer';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNzI18n(en_US),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideHttpClient(withInterceptors([httpInterceptor, errorInterceptor]), withJsonpSupport()),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
        provideStore(),
    provideState(postFeature),
    provideEffects([PostEffects]),
    provideStoreDevtools({ maxAge: 25 })
    
  ],
};
