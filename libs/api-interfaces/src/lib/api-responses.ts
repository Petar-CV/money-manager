export interface IApiResponse<T = undefined> {
  data?: T;
  message?: string;
  param?: string | number;
  totalItems?: number;
}

export interface IModifiedApiResponse<T> {
  data: T;
}
