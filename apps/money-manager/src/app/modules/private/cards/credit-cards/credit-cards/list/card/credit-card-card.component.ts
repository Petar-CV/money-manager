import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { ICreditCard } from '@petar-cv/money-manager-models';

import { PrivateCreditCardsRoutes } from '../../../../../constants/routing';

@Component({
  selector: 'petar-cv-credit-card-card',
  templateUrl: './credit-card-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditCardCardComponent implements OnInit {
  @Input()
  public creditCard?: ICreditCard;

  public routerLink?: string;

  public ngOnInit(): void {
    this.routerLink = `${PrivateCreditCardsRoutes.PRIVATE_CREDIT_CARDS}/${this.creditCard?.id}`;
  }
}
