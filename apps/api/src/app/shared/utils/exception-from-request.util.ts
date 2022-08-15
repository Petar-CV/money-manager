/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ExceptionLog,
  IExceptionLog,
  IRequestForLogging,
} from 'apps/api/src/models/errors/request-for-logging.model';

// Request type is not defined in Nest!
export const createExceptionFromRequest = (
  request: IRequestForLogging,
  exception?: any
): IExceptionLog => {
  return new ExceptionLog({
    endpoint: request.route.path,
    userId: request.user.sub,
    query: request.query ? JSON.stringify(request.query) : '',
    params: request.params ? JSON.stringify(request.params) : '',
    message: exception?.message ? JSON.stringify(exception.message) : '',
  });
};
