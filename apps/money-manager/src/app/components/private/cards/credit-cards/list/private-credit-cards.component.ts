import { ChangeDetectionStrategy, Component } from '@angular/core';
import { finalize, map, Observable, tap } from 'rxjs';

import { ICreditCard } from '@petar-cv/money-manager-models';

import { CreditCardsService } from 'apps/money-manager/src/app/shared/services/entities/private/credit-cards/credit-cards.service';

@Component({
  selector: 'petar-cv-private-credit-cards',
  templateUrl: './private-credit-cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateCreditCardsComponent {
  public loading = false;
  public creditCards$?: Observable<ICreditCard[]>;

  constructor(private readonly creditCardsService: CreditCardsService) {
    this.loadData();
  }

  private loadData(): void {
    this.loading = true;
    this.creditCards$ = this.creditCardsService.findAll().pipe(
      tap((res) => {
        // this.totalItems = Number(res.headers.get('x-total-items'));
      }),
      map((res) => res.body?.data ?? []),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
