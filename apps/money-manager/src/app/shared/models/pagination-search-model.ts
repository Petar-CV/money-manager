import { SortType } from '../types/sorting.type';
import { IPaginationQuery } from './pagination-model';

export interface IPaginationSearchQuery extends IPaginationQuery {
  search?: string;
}

export class PaginationSearchQuery implements IPaginationSearchQuery {
  constructor(
    public page: number,
    public perPage: number,
    public sortOrder?: SortType,
    public sortField?: string,
    public search?: string,
  ) {}
}
