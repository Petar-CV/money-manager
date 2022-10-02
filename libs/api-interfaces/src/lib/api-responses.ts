export interface IApiResponse<T = undefined> {
  data?: T;
  message?: string;
  param?: string | number;
  totalItems?: number;
  success: boolean;
}

export interface IModifiedApiResponse<T> {
  data: T;
}
