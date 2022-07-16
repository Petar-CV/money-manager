import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { finalize, map, Observable, tap } from 'rxjs';

import { ICreditCard } from '@petar-cv/money-manager-models';

import { BasePaginationComponent } from '../../../../../../shared/components/base-pagination/base-pagination.component';
import { IPaginationSearchQuery } from '../../../../../../shared/models/pagination-search-model';
import { IBaseTableColumn } from '../../../../../../shared/components/base-table/models/header/base-table-column.model';
import { IBaseTableData } from '../../../../../../shared/components/base-table/models/data/base-table-data.model';
import { AdminCreditCardsService } from 'apps/money-manager/src/app/shared/services/entities/admin/credit-cards/admin-credit-cards.service';
import { AdminCreditCardsRoutes } from 'apps/money-manager/src/app/shared/constants/routing';

@Component({
  selector: 'petar-cv-admin-credit-cards',
  templateUrl: './admin-credit-cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCreditCardsComponent extends BasePaginationComponent {
  creditCards$?: Observable<ICreditCard[]>;

  tableHeaders: IBaseTableColumn[] = [
    {
      text: 'commonFields.id',
      translate: true,
    },
    {
      text: 'commonFields.name',
      translate: true,
    },
    {
      text: 'commonActions.title',
      translate: true,
    },
  ];

  tableRows: IBaseTableData[] = [
    {
      field: 'id',
    },
    {
      field: 'name',
    },
    {
      action: {
        icon: 'pi pi-pencil',
        route: AdminCreditCardsRoutes.ADMIN_CREDIT_CARDS,
        type: 'navigate',
        tooltip: 'commonActions.edit',
      },
    },
  ];

  constructor(private readonly creditCardsService: AdminCreditCardsService) {
    super();
    this.loadData();
  }

  onLazyLoad(event: LazyLoadEvent): void {
    super.onLazyLoadEvent(event);
    this.loadData();
  }

  private loadData(): void {
    this.loading = true;
    const queryParams: IPaginationSearchQuery = {
      page: this.page,
      perPage: this.perPage,
      sortOrder: this.sortOrder,
      sortField: this.sortField,
      search: this.search,
    };
    this.creditCards$ = this.creditCardsService.findAll(queryParams).pipe(
      tap((res) => {
        this.totalItems = Number(res.headers.get('x-total-items'));
      }),
      map((res) => res.body?.data ?? []),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
