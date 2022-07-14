import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Strip out any `undefined` parameters in the query string.
 */
@Injectable()
export class StripUndefinedParamsInterceptor implements HttpInterceptor {
  /**
   * Iterate through query parameters and remove all those that are `undefined`.
   *
   * @param request The incoming request.
   * @param next The next handler.
   * @returns The handled request.
   */
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let params = request.params;
    for (const key of request.params.keys()) {
      if (
        params.get(key) === undefined ||
        params.get(key) === 'undefined' ||
        params.get(key) === null ||
        params.get(key) === 'null'
      ) {
        params = params.delete(key);
      }
    }
    request = request.clone({ params });
    return next.handle(request);
  }
}
