import { ChangeDetectionStrategy, Component } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';

import { ICreditCard } from '@petar-cv/money-manager-models';

import { CreditCardsService } from '../services/credit-cards.service';

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
      map((res) => res.body?.data ?? []),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
