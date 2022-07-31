import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ICreditCardItem, ICreditCard } from '@petar-cv/money-manager-models';

import { IItemsLimitChartData } from '../../../../models/charts/credit-card-items/items-limit-chart.model';

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
        return this.calculateForMonthlyLimit(creditCardItems, creditCard);
    }
  }

  private calculateForOverallLimit(
    creditCardItems: ICreditCardItem[],
    creditCard: ICreditCard
  ): IItemsLimitChartData {
    const itemsNames = creditCardItems.map((item) => item.name);
    const labels = [
      this.translateService.instant(
        'privateCreditCards.details.limitChart.available'
      ),
      ...itemsNames,
    ];

    const sumOfItems = creditCardItems.reduce(
      (sum, item) => sum + +item.amount,
      0
    );

    const datasets: IItemsLimitChartData['datasets'] = [
      {
        data: [
          +(creditCard.limit - sumOfItems).toFixed(2),
          ...creditCardItems.map((item) => +(+item.amount).toFixed(2)),
        ],
        backgroundColor: ['green', ...creditCardItems.map(() => 'red')],
        hoverBackgroundColor: ['green', ...creditCardItems.map(() => 'red')],
      },
    ];

    return { labels, datasets };
  }

  private calculateForMonthlyLimit(
    creditCardItems: ICreditCardItem[],
    creditCard: ICreditCard
  ): IItemsLimitChartData {
    const itemsNames = creditCardItems.map((item) => item.name);
    const labels = [
      this.translateService.instant(
        'privateCreditCards.details.limitChart.available'
      ),
      ...itemsNames,
    ];

    const sumOfItemsDividedByInstalments = creditCardItems.reduce(
      (sum, item) => sum + item.amount / item.instalments,
      0
    );

    const datasets: IItemsLimitChartData['datasets'] = [
      {
        data: [
          +(creditCard.limit - sumOfItemsDividedByInstalments).toFixed(2),
          ...creditCardItems.map(
            (item) => +(item.amount / item.instalments).toFixed(2)
          ),
        ],
        backgroundColor: ['green', ...creditCardItems.map(() => 'red')],
        hoverBackgroundColor: ['green', ...creditCardItems.map(() => 'red')],
      },
    ];

    return { labels, datasets };
  }
}
