import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PrivateCreditCardsRoutes } from 'apps/money-manager/src/app/shared/constants/routing';

@Component({
  selector: 'petar-cv-add-credit-card-card',
  templateUrl: './add-credit-card-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCreditCardCardComponent {
  public routerLink = PrivateCreditCardsRoutes.PRIVATE_CREDIT_CARDS_CREATE;
}
