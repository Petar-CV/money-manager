import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ICreditCardIssuer } from '@petar-cv/money-manager-models';

import { CreditCardsService } from 'apps/money-manager/src/app/shared/services/entities/private/credit-cards/credit-cards.service';
import { CreditCardIssuersService } from 'apps/money-manager/src/app/shared/services/entities/private/credit-card-issuers/credit-card-issuers.service';
import { PrivateCreditCardsRoutes } from 'apps/money-manager/src/app/shared/constants/routing';

@Component({
  selector: 'petar-cv-private-credit-card-create',
  templateUrl: './private-credit-card-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateCreditCardCreateComponent {
  public creditCardIssuers$: Observable<Partial<ICreditCardIssuer>[]>;

  creditCardForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    limit: [0, Validators.required],
    billingDate: [1, Validators.required],
    issuerId: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly creditCardsService: CreditCardsService,
    private readonly creditCardIssuersService: CreditCardIssuersService
  ) {
    this.creditCardIssuers$ = this.creditCardIssuersService.findAllLov();
  }

  onFormSubmit(addNew?: boolean): void {
    const entityData = this.creditCardForm.value;

    this.creditCardsService.create(entityData).subscribe((newCreditCard) => {
      if (addNew) {
        this.clearForm();
        return;
      }

      this.router.navigate([
        PrivateCreditCardsRoutes.PRIVATE_CREDIT_CARDS,
        newCreditCard?.id,
      ]);
    });
  }

  private clearForm(): void {
    this.creditCardForm.reset();

    this.cdr.markForCheck();
  }
}
