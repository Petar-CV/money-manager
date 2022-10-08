import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, zip } from 'rxjs';

import { ICreditCard, ICreditCardItem } from '@petar-cv/money-manager-models';

import {
  IItemsLimitChartData,
  IItemsLimitChartOptions,
} from '../../../models/charts/credit-card-items/items-limit-chart.model';
import { ItemsLimitChartService } from '../../../credit-card-items/services/items-limit-chart.service';
import { CreditCardsService } from '../../services/credit-cards.service';

@Component({
  selector: 'petar-cv-private-credit-card-items-limit-chart',
  templateUrl: './private-credit-card-items-limit-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateCreditCardItemsLimitChartComponent implements OnInit {
  public creditCardItems: ICreditCardItem[] = [];
  public currentCreditCard?: ICreditCard;
  public currentId?: string;
  public chartData?: IItemsLimitChartData;
  public chartOptions?: IItemsLimitChartOptions;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef,
    private readonly creditCardsService: CreditCardsService,
    private readonly itemsLimitChartService: ItemsLimitChartService
  ) {}

  public ngOnInit(): void {
    const currentId = this.route.snapshot.paramMap.get('id');

    if (currentId) {
      this.currentId = currentId;
      this.loadData();
    }
  }

  private loadData(): void {
    if (this.currentId) {
      zip(
        this.creditCardsService
          .findAllItemsForMyCreditCard(this.currentId)
          .pipe(
            map((items) => {
              return items.body?.data ?? [];
            })
          ),
        this.creditCardsService.findOne(this.currentId)
      ).subscribe(([creditCardItems, creditCard]) => {
        this.creditCardItems = creditCardItems;
        this.currentCreditCard = creditCard;

        this.calculatePieChart();
      });
    }
  }

  private calculatePieChart(): void {
    if (this.currentCreditCard) {
      this.chartData = this.itemsLimitChartService.calculateItemsLimitChart(
        this.creditCardItems,
        this.currentCreditCard
      );
      this.chartOptions = this.itemsLimitChartService.getChartOptions();
      this.cdr.markForCheck();
    }
  }
}
