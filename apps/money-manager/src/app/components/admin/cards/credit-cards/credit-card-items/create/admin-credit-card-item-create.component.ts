import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminCreditCardItemsService } from 'apps/money-manager/src/app/shared/services/entities/admin/credit-card-items/admin-credit-card-items.service';

@Component({
  selector: 'petar-cv-admin-credit-card-item-create',
  templateUrl: './admin-credit-card-item-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCreditCardItemCreateComponent {
  creditCardItemForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    instalments: [0, Validators.required],
    amount: [0, Validators.required],
    boughtAt: [new Date(), Validators.required],
    userId: ['', Validators.required],
    cardId: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly adminCreditCardsItemsService: AdminCreditCardItemsService
  ) {}

  onFormSubmit(addNew?: boolean): void {
    const entityData = this.creditCardItemForm.value;

    this.adminCreditCardsItemsService
      .create(entityData)
      .subscribe((newCreditCardItem) => {
        if (addNew) {
          this.clearForm();
          return;
        }

        this.router.navigate([
          '/admin/cards/credit/items',
          newCreditCardItem?.id,
        ]);
      });
  }

  private clearForm(): void {
    this.creditCardItemForm.reset();

    this.cdr.markForCheck();
  }
}
