import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CustomMessageService } from '../services/utility/custom-message/custom-message.service';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  constructor(
    private readonly messageService: CustomMessageService,
    private readonly translateService: TranslateService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          let alertMessage: string | null = null;
          let alertParam: string | null = null;

          for (const headerKey of event.headers.keys()) {
            if (headerKey.toLowerCase().endsWith('x-alert-message')) {
              alertMessage = event.headers.get(headerKey);
            }

            if (headerKey.toLowerCase().endsWith('x-alert-param')) {
              const extractedHeaderKey = event.headers.get(headerKey);

              if (extractedHeaderKey) {
                alertParam = decodeURIComponent(
                  extractedHeaderKey.replace(/\+/g, ' ')
                );
              }
            }
          }

          // TODO: Add support for error messages
          if (alertMessage) {
            this.messageService.add({
              severity: 'success',
              detail: this.translateService.instant(
                alertMessage,
                { param: alertParam } ?? undefined
              ),
              life: 3000,
            });
          }
        }
      })
    );
  }
}
