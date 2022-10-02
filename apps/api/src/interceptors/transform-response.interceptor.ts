import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { IApiResponse, IModifiedApiResponse } from '@petar-cv/api-interfaces';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, IModifiedApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<IModifiedApiResponse<T>> {
    return next.handle().pipe(
      tap((res: IApiResponse<T> | undefined) => {
        const response = context.switchToHttp().getResponse();

        response.header('x-alert-success', res.success);

        if (res?.message) {
          response.header('x-alert-message', res.message);
        }

        if (res?.param) {
          response.header('x-alert-param', res.param);
        }

        if (res?.totalItems) {
          response.header('x-total-items', res.totalItems);
        }
      }),
      map((res: IApiResponse<T> | undefined) => ({
        data: res?.data,
      }))
    );
  }
}
