import { SortType } from '../types/sorting.type';

export interface IPaginationQuery {
  page: number;
  perPage: number;
  sortOrder?: SortType;
  sortField?: string;
}

export class PaginationQuery implements IPaginationQuery {
  constructor(
    public page: number,
    public perPage: number,
    public sortOrder?: SortType,
    public sortField?: string,
  ) {}
}
