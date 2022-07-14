import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NotificationInterceptor } from './notification.interceptor';
import { StripUndefinedParamsInterceptor } from './strip-undefined-params.interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NotificationInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: StripUndefinedParamsInterceptor,
    multi: true,
  },
];
