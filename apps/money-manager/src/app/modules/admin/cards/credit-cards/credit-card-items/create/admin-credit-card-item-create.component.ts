import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminCreditCardItemsRoutes } from '../../../../constants/routing';
import { AdminCreditCardItemsService } from '../services/admin-credit-card-items.service';

@Component({
  selector: 'petar-cv-admin-credit-card-item-create',
  templateUrl: './admin-credit-card-item-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCreditCardItemCreateComponent {
  form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    instalments: [1, Validators.required],
    amount: [0, Validators.required],
    boughtAt: [new Date(), Validators.required],
    firstInstalmentDate: [new Date(), Validators.required],
    userId: ['', Validators.required],
    cardId: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly entityService: AdminCreditCardItemsService
  ) {}

  onFormSubmit(addNew?: boolean): void {
    const entityData = this.form.value;

    this.entityService.create(entityData).subscribe((newCreditCardItem) => {
      if (addNew) {
        this.clearForm();
        return;
      }

      this.router.navigate([
        AdminCreditCardItemsRoutes.ADMIN_CREDIT_CARD_ITEMS,
        newCreditCardItem?.id,
      ]);
    });
  }

  private clearForm(): void {
    this.form.reset();

    this.cdr.markForCheck();
  }
}
