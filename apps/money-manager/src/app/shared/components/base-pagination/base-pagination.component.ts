import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

import { SortType } from '../../types/sorting.type';

@Component({
  selector: 'petar-cv-base-pagination',
  template: '',
})
export class BasePaginationComponent {
  loading = false;
  totalItems = 0;
  page = 1;
  perPage = 10;
  sortField?: string;
  sortOrder: SortType = 'asc';
  search?: string;

  onLazyLoadEvent(event: LazyLoadEvent): void {
    this.perPage = event.rows ?? 10;
    this.sortField = event.sortField;
    this.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc'; // 1 is ascending, -1 is descending
    this.search = event.globalFilter;

    if (event.rows && event.first && event.rows > 0 && event.first > 0) {
      this.page = Math.floor(event.first / event.rows) + 1;
    } else {
      this.page = 1;
    }
  }
}
