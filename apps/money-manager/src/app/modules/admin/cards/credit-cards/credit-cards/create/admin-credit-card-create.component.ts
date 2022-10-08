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

import { AdminCreditCardsRoutes } from '../../../../constants/routing';
import { AdminCreditCardIssuersService } from '../../credit-card-issuers/services/admin-credit-card-issuers.service';
import { AdminCreditCardsService } from '../services/admin-credit-cards.service';

@Component({
  selector: 'petar-cv-admin-credit-card-create',
  templateUrl: './admin-credit-card-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCreditCardCreateComponent {
  public creditCardIssuers$: Observable<Partial<ICreditCardIssuer>[]>;
  public creditCardLimits = CreditCardLimits;

  creditCardForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    limit: [0, Validators.required],
    billingDate: [1, Validators.required],
    limitType: [CreditCardLimit.OVERALL, Validators.required],
    userId: ['', Validators.required],
    issuerId: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly adminCreditCardsService: AdminCreditCardsService,
    private readonly adminCreditCardIssuersService: AdminCreditCardIssuersService
  ) {
    this.creditCardIssuers$ = this.adminCreditCardIssuersService.findAllLov();
  }

  onFormSubmit(addNew?: boolean): void {
    const entityData = this.creditCardForm.value;

    this.adminCreditCardsService
      .create(entityData)
      .subscribe((newCreditCard) => {
        if (addNew) {
          this.clearForm();
          return;
        }

        this.router.navigate([
          AdminCreditCardsRoutes.ADMIN_CREDIT_CARDS,
          newCreditCard?.id,
        ]);
      });
  }

  private clearForm(): void {
    this.creditCardForm.reset();

    this.cdr.markForCheck();
  }
}
