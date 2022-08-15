export interface IRequestForLogging {
  route: {
    path: string;
  };
  user: {
    sub: string;
  };
  query?: string;
  params?: string;
  message?: string;
}

export interface IExceptionLog {
  endpoint: string;
  userId: string;
  query?: string;
  params?: string;
  message?: string;
}

export class ExceptionLog implements IExceptionLog {
  endpoint: string;
  userId: string;
  query?: string;
  params?: string;
  message?: string;

  constructor(data: IExceptionLog) {
    this.endpoint = data.endpoint;
    this.userId = data.userId;
    this.query = data.query;
    this.params = data.params;
    this.message = data.message;
  }
}
