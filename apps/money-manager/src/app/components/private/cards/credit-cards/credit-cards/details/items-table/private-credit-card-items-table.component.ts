import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, Observable, tap } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';

import { ICreditCardItem } from '@petar-cv/money-manager-models';

import { CreditCardsService } from 'apps/money-manager/src/app/shared/services/entities/private/credit-cards/credit-cards.service';
import { PrivateCreditCardItemsRoutes } from 'apps/money-manager/src/app/shared/constants/routing';
import { BasePaginationComponent } from 'apps/money-manager/src/app/shared/components/base-pagination/base-pagination.component';
import { IBaseTableData } from 'apps/money-manager/src/app/shared/components/base-table/models/data/base-table-data.model';
import { IBaseTableColumn } from 'apps/money-manager/src/app/shared/components/base-table/models/header/base-table-column.model';
import { IPaginationSearchQuery } from 'apps/money-manager/src/app/shared/models/pagination-search-model';

@Component({
  selector: 'petar-cv-private-credit-card-items-table',
  templateUrl: './private-credit-card-items-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateCreditCardItemsTableComponent
  extends BasePaginationComponent
  implements OnInit
{
  public creditCardItems$?: Observable<ICreditCardItem[]>;
  public itemsCreateRouterLink =
    PrivateCreditCardItemsRoutes.PRIVATE_CREDIT_CARD_ITEMS_CREATE;
  public currentId?: string;

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
      text: 'privateCreditCardItems.fields.amountLeft',
      translate: true,
    },
    {
      text: 'privateCreditCardItems.fields.instalments',
      translate: true,
    },
    {
      text: 'privateCreditCardItems.fields.instalmentsLeft',
      translate: true,
    },
    {
      text: 'privateCreditCardItems.fields.boughtAt',
      translate: true,
    },
    {
      text: 'privateCreditCardItems.fields.firstInstalmentDate',
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
      pipes: [
        {
          pipe: 'amountLeft',
        },
        {
          pipe: 'customCurrency',
        },
      ],
    },
    {
      field: 'instalments',
    },
    {
      pipes: [
        {
          pipe: 'instalmentsLeft',
        },
      ],
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
      field: 'firstInstalmentDate',
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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly creditCardsService: CreditCardsService
  ) {
    super();
  }

  public ngOnInit(): void {
    const currentId = this.route.snapshot.paramMap.get('id');

    if (currentId) {
      this.currentId = currentId;
      this.loadData();
    }
  }

  onLazyLoad(event: LazyLoadEvent): void {
    super.onLazyLoadEvent(event);
    this.loadData();
  }

  private loadData(): void {
    if (!this.currentId) {
      return;
    }

    this.loading = true;
    const queryParams: IPaginationSearchQuery = {
      page: this.page,
      perPage: this.perPage,
      sortOrder: this.sortOrder,
      sortField: this.sortField,
      search: this.search,
    };
    this.creditCardItems$ = this.creditCardsService
      .findAllItemsForMyCreditCard(this.currentId, queryParams)
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
