import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ICreditCardItem, ICreditCard } from '@petar-cv/money-manager-models';

import {
  IItemsLimitChartData,
  IItemsLimitChartOptions,
} from '../../../../models/charts/credit-card-items/items-limit-chart.model';
import { calculateAmountLeftForItem } from '../../../../utils/credit-card-items/amount-left.util';
import { filterPaidCreditCardItems } from '../../../../utils/credit-card-items/filter-paid-items.util';

@Injectable({
  providedIn: 'root',
})
export class ItemsLimitChartService {
  constructor(private readonly translateService: TranslateService) {}

  public calculateItemsLimitChart(
    creditCardItems: ICreditCardItem[],
    creditCard: ICreditCard
  ): IItemsLimitChartData {
    switch (creditCard.limitType) {
      case 'OVERALL':
        return this.calculateForOverallLimit(creditCardItems, creditCard);
      case 'MONTHLY':
      default:
        return this.calculateForMonthlyLimit(creditCardItems, creditCard);
    }
  }

  private calculateForOverallLimit(
    creditCardItems: ICreditCardItem[],
    creditCard: ICreditCard
  ): IItemsLimitChartData {
    const itemsToBePaid = filterPaidCreditCardItems(creditCardItems);

    const itemsNames = itemsToBePaid.map((item) => item.name);

    const sumOfItems = itemsToBePaid.reduce(
      (sum, item) => sum + calculateAmountLeftForItem(item),
      0
    );

    const labels = [
      this.translateService.instant(
        'privateCreditCards.details.limitChart.available'
      ),
      ...itemsNames,
    ];

    const datasets: IItemsLimitChartData['datasets'] = [
      {
        data: [
          +(creditCard.limit - sumOfItems).toFixed(2),
          ...itemsToBePaid.map(
            (item) => +calculateAmountLeftForItem(item).toFixed(2)
          ),
        ],
        backgroundColor: ['seagreen', ...itemsToBePaid.map(() => 'red')],
        hoverBackgroundColor: [
          'darkgreen',
          ...itemsToBePaid.map(() => 'darkred'),
        ],
      },
    ];

    return { labels, datasets };
  }

  private calculateForMonthlyLimit(
    creditCardItems: ICreditCardItem[],
    creditCard: ICreditCard
  ): IItemsLimitChartData {
    const itemsToBePaid = filterPaidCreditCardItems(creditCardItems);

    const itemsNames = itemsToBePaid.map((item) => item.name);

    const sumOfItemsDividedByInstalments = itemsToBePaid.reduce(
      (sum, item) => sum + item.amount / item.instalments,
      0
    );

    const labels = [
      this.translateService.instant(
        'privateCreditCards.details.limitChart.available'
      ),
      ...itemsNames,
    ];

    const datasets: IItemsLimitChartData['datasets'] = [
      {
        data: [
          +(creditCard.limit - sumOfItemsDividedByInstalments).toFixed(2),
          ...itemsToBePaid.map(
            (item) => +(item.amount / item.instalments).toFixed(2)
          ),
        ],
        backgroundColor: ['seagreen', ...itemsToBePaid.map(() => 'red')],
        hoverBackgroundColor: [
          'darkgreen',
          ...itemsToBePaid.map(() => 'darkred'),
        ],
      },
    ];

    return { labels, datasets };
  }

  public getChartOptions(): IItemsLimitChartOptions {
    return {
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    };
  }
}
