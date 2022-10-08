import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ICreditCard, ICreditCardItem } from '@petar-cv/money-manager-models';

import {
  PrivateCreditCardsRoutes,
  PrivateCreditCardItemsRoutes,
} from '../../../../constants/routing';
import { CreditCardsService } from '../../credit-cards/services/credit-cards.service';
import { CreditCardItemsService } from '../services/credit-card-items.service';

@Component({
  selector: 'petar-cv-private-credit-card-item-create',
  templateUrl: './private-credit-card-item-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateCreditCardItemCreateComponent implements OnInit {
  public creditCards$: Observable<Partial<ICreditCard>[]>;
  public currentCreditCardItem?: ICreditCardItem;
  public currentCreditCard?: ICreditCard;
  public cardDetailsRouterLink = PrivateCreditCardsRoutes.PRIVATE_CREDIT_CARDS;
  public creditCardId?: string;

  form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    cardId: ['', Validators.required],
    amount: [0, Validators.required],
    instalments: [0, Validators.required],
    boughtAt: [new Date(), Validators.required],
    firstInstalmentDate: [new Date(), Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef,
    private readonly entityService: CreditCardsService,
    private readonly creditCardItemsService: CreditCardItemsService
  ) {
    this.creditCards$ = this.entityService.findAllLov();
  }

  public ngOnInit(): void {
    this.route.queryParams.forEach((queryParams) => {
      this.creditCardId = queryParams['cardId'];

      this.loadCardDetails();

      this.form.patchValue({
        cardId: this.creditCardId,
      });
    });
  }

  private loadCardDetails(): void {
    if (this.creditCardId) {
      this.entityService.findOne(this.creditCardId).subscribe((creditCard) => {
        if (creditCard) {
          this.currentCreditCard = creditCard;
          this.cdr.markForCheck();
        }
      });
    }
  }

  public onFormSubmit(addNew?: boolean): void {
    const entityData = this.form.value;

    this.creditCardItemsService
      .create(entityData)
      .subscribe((newCreditCard) => {
        if (addNew) {
          this.clearForm();
          return;
        }

        this.router.navigate([
          PrivateCreditCardItemsRoutes.PRIVATE_CREDIT_CARD_ITEMS,
          newCreditCard?.id,
        ]);
      });
  }

  private clearForm(): void {
    this.form.reset();

    this.cdr.markForCheck();
  }
}
