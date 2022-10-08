import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import {
  CreditCardLimits,
  ICreditCardIssuer,
  CreditCardLimit,
} from '@petar-cv/money-manager-models';

import { PrivateCreditCardsRoutes } from '../../../../constants/routing';
import { CreditCardIssuersService } from '../../credit-card-issuers/services/credit-card-issuers.service';
import { CreditCardsService } from '../services/credit-cards.service';

@Component({
  selector: 'petar-cv-private-credit-card-create',
  templateUrl: './private-credit-card-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateCreditCardCreateComponent {
  public creditCardIssuers$: Observable<Partial<ICreditCardIssuer>[]>;
  public creditCardLimits = CreditCardLimits;

  form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    limit: [0, Validators.required],
    billingDate: [1, Validators.required],
    issuerId: ['', Validators.required],
    limitType: [CreditCardLimit.OVERALL, Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly entityService: CreditCardsService,
    private readonly creditCardIssuersService: CreditCardIssuersService
  ) {
    this.creditCardIssuers$ = this.creditCardIssuersService.findAllLov();
  }

  onFormSubmit(addNew?: boolean): void {
    const entityData = this.form.getRawValue();

    this.entityService.create(entityData).subscribe((newCreditCard) => {
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
    this.form.reset();

    this.cdr.markForCheck();
  }
}
