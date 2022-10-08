import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { finalize, map, Observable, tap } from 'rxjs';

import { ICreditCardIssuer } from '@petar-cv/money-manager-models';

import { BasePaginationComponent } from 'apps/money-manager/src/app/shared/components/base-pagination/base-pagination.component';
import { IBaseTableData } from 'apps/money-manager/src/app/shared/components/base-table/models/data/base-table-data.model';
import { IBaseTableColumn } from 'apps/money-manager/src/app/shared/components/base-table/models/header/base-table-column.model';
import { IPaginationSearchQuery } from 'apps/money-manager/src/app/shared/models/pagination-search-model';
import { AdminCreditCardIssuersRoutes } from '../../../../constants/routing';
import { AdminCreditCardIssuersService } from '../services/admin-credit-card-issuers.service';

@Component({
  selector: 'petar-cv-admin-credit-card-issuers',
  templateUrl: './admin-credit-card-issuers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCreditCardIssuersComponent extends BasePaginationComponent {
  creditCardIssuers$?: Observable<ICreditCardIssuer[]>;

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
        route: AdminCreditCardIssuersRoutes.ADMIN_CREDIT_CARD_ISSUERS,
        type: 'navigate',
        tooltip: 'commonActions.edit',
      },
    },
  ];

  constructor(
    private readonly creditCardIssuersService: AdminCreditCardIssuersService
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
    this.creditCardIssuers$ = this.creditCardIssuersService
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
