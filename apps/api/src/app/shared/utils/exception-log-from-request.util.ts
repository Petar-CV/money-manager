import { IExceptionLog } from 'apps/api/src/models/errors/request-for-logging.model';

export const createExceptionStringForLoggerFromRequest = (
  functionName: string,
  exception: IExceptionLog
): string => {
  return `
    Exception in ${functionName}:
        ~ Endpoint: ${exception.endpoint}
        ~ Message: ${exception.message}
        ~ Params: ${exception.params}
        ~ Query: ${exception.query}
        `;
};
