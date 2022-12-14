import { ChangeDetectionStrategy, Component } from '@angular/core';
import { finalize, map, Observable, tap } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';

import { ICreditCardItem } from '@petar-cv/money-manager-models';

import { BasePaginationComponent } from 'apps/money-manager/src/app/shared/components/base-pagination/base-pagination.component';
import { IBaseTableData } from 'apps/money-manager/src/app/shared/components/base-table/models/data/base-table-data.model';
import { IBaseTableColumn } from 'apps/money-manager/src/app/shared/components/base-table/models/header/base-table-column.model';
import { IPaginationSearchQuery } from 'apps/money-manager/src/app/shared/models/pagination-search-model';
import { PrivateCreditCardItemsRoutes } from '../../../../constants/routing';
import { CreditCardItemsService } from '../services/credit-card-items.service';

@Component({
  selector: 'petar-cv-private-credit-card-items',
  templateUrl: './private-credit-card-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateCreditCardItemsComponent extends BasePaginationComponent {
  public data$?: Observable<Partial<ICreditCardItem>[]>;
  public itemsCreateRouterLink =
    PrivateCreditCardItemsRoutes.PRIVATE_CREDIT_CARD_ITEMS_CREATE;

  tableHeaders: IBaseTableColumn[] = [
    {
      text: 'commonFields.name',
      translate: true,
    },
    {
      text: 'privateCreditCardItems.fields.amount',
      translate: true,
    },
    {
      text: 'privateCreditCardItems.fields.instalments',
      translate: true,
    },
    {
      text: 'privateCreditCardItems.fields.boughtAt',
      translate: true,
    },
    {
      text: 'commonActions.title',
      translate: true,
    },
  ];

  tableRows: IBaseTableData[] = [
    {
      field: 'name',
    },
    {
      field: 'amount',
      pipes: [
        {
          pipe: 'customCurrency',
        },
      ],
    },
    {
      field: 'instalments',
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
        route: PrivateCreditCardItemsRoutes.PRIVATE_CREDIT_CARD_ITEMS,
        type: 'navigate',
        tooltip: 'commonActions.edit',
      },
    },
  ];

  constructor(private readonly entityService: CreditCardItemsService) {
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
    this.data$ = this.entityService.findAll(queryParams).pipe(
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
