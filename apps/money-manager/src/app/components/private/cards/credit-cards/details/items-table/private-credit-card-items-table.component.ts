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
  public creditCardItems$?: Observable<Partial<ICreditCardItem>[]>;
  public itemsCreateRouterLink =
    PrivateCreditCardItemsRoutes.PRIVATE_CREDIT_CARD_ITEMS_CREATE;
  private currentId?: string;

  tableHeaders: IBaseTableColumn[] = [
    {
      text: 'commonFields.name',
      translate: true,
    },
    {
      text: 'adminCreditCardItems.fields.amount',
      translate: true,
    },
    {
      text: 'adminCreditCardItems.fields.instalments',
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
        route: PrivateCreditCardItemsRoutes.PRIVATE_CREDIT_CARD_ITEMS + '/:id',
        type: 'navigate',
        tooltip: 'commonActions.edit',
      },
    },
  ];

  constructor(
    private readonly creditCardsService: CreditCardsService,
    private readonly route: ActivatedRoute
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
