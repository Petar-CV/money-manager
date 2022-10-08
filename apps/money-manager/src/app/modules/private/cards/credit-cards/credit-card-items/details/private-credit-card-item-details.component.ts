import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ICreditCardItem } from '@petar-cv/money-manager-models';

import { PrivateCreditCardsRoutes } from '../../../../constants/routing';
import { CreditCardItemsService } from '../services/credit-card-items.service';

@Component({
  selector: 'petar-cv-private-credit-card-item-details',
  templateUrl: './private-credit-card-item-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateCreditCardItemDetailsComponent implements OnInit {
  private currentId?: string;
  public currentCreditCardItem?: ICreditCardItem;
  public cardDetailsRouterLink = PrivateCreditCardsRoutes.PRIVATE_CREDIT_CARDS;

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
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly creditCardItemsService: CreditCardItemsService
  ) {}

  public ngOnInit(): void {
    const currentId = this.route.snapshot.paramMap.get('id');

    if (currentId) {
      this.currentId = currentId;
      this.fetchEntityDetailsAndLoadIntoForm();
    }
  }

  private fetchEntityDetailsAndLoadIntoForm(): void {
    if (this.currentId) {
      this.creditCardItemsService
        .findOne(this.currentId)
        .subscribe((creditCardItem) => {
          if (creditCardItem) {
            this.currentCreditCardItem = creditCardItem;

            this.form.patchValue({
              ...creditCardItem,
              boughtAt: new Date(creditCardItem.boughtAt),
              firstInstalmentDate: creditCardItem.firstInstalmentDate
                ? new Date(creditCardItem.firstInstalmentDate)
                : undefined,
            });

            this.cdr.markForCheck();
          } else {
            this.router.navigate([
              PrivateCreditCardsRoutes.PRIVATE_CREDIT_CARDS,
            ]);
          }
        });
    }
  }

  public onFormSubmit(): void {
    const entityData = this.form.value;

    if (this.currentId) {
      this.creditCardItemsService
        .update(entityData, this.currentId)
        .subscribe();
    }
  }
}
