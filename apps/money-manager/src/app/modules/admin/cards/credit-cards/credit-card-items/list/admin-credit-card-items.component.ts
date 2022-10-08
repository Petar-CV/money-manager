import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { finalize, map, Observable, tap } from 'rxjs';

import { ICreditCardItem } from '@petar-cv/money-manager-models';

import { BasePaginationComponent } from '../../../../../../shared/components/base-pagination/base-pagination.component';
import { IPaginationSearchQuery } from '../../../../../../shared/models/pagination-search-model';
import { IBaseTableColumn } from '../../../../../../shared/components/base-table/models/header/base-table-column.model';
import { IBaseTableData } from '../../../../../../shared/components/base-table/models/data/base-table-data.model';
import { AdminCreditCardItemsRoutes } from '../../../../constants/routing';
import { AdminCreditCardItemsService } from '../services/admin-credit-card-items.service';

@Component({
  selector: 'petar-cv-admin-credit-card-items',
  templateUrl: './admin-credit-card-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCreditCardItemsComponent extends BasePaginationComponent {
  creditCardItems$?: Observable<ICreditCardItem[]>;

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
      text: 'adminCreditCardItems.fields.amount',
      translate: true,
    },
    {
      text: 'adminCreditCardItems.fields.boughtAt',
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
      field: 'amount',
    },
    {
      field: 'boughtAt',
      pipes: [
        {
          pipe: 'localizedDate',
        },
      ],
    },
    {
      action: {
        icon: 'pi pi-pencil',
        route: AdminCreditCardItemsRoutes.ADMIN_CREDIT_CARD_ITEMS,
        type: 'navigate',
        tooltip: 'commonActions.edit',
      },
    },
  ];

  constructor(
    private readonly creditCardItemsService: AdminCreditCardItemsService
  ) {
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
    this.creditCardItems$ = this.creditCardItemsService
      .findAll(queryParams)
      .pipe(
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
