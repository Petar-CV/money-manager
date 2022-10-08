import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { AdminCreditCardDashboardService } from 'apps/money-manager/src/app/modules/admin/cards/credit-cards/dashboard/admin-credit-card-dashboard.service';

@Component({
  selector: 'petar-cv-admin-credit-card-dashboard',
  templateUrl: './admin-credit-cards-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCreditCardsDashboardComponent {
  public entityCounts$: Observable<{ [key: string]: number }>;

  constructor(
    private readonly dashboardService: AdminCreditCardDashboardService
  ) {
    this.entityCounts$ = combineLatest([
      this.dashboardService.countAllIssuers(),
      this.dashboardService.countAllCards(),
      this.dashboardService.countAllCardItems(),
    ]).pipe(
      map(([issuers, cards, cardItems]) => {
        return {
          issuers: issuers,
          cards: cards,
          cardItems: cardItems,
        };
      })
    );
  }
}
