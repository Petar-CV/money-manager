import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminCreditCardItemsService } from 'apps/money-manager/src/app/shared/services/entities/admin/credit-card-items/admin-credit-card-items.service';

@Component({
  selector: 'petar-cv-admin-credit-card-item-details',
  templateUrl: './admin-credit-card-item-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCreditCardItemDetailsComponent implements OnInit {
  private currentId?: string;

  creditCardItemForm = this.formBuilder.nonNullable.group({
    id: [''],
    name: ['', Validators.required],
    description: [''],
    instalments: [0, Validators.required],
    amount: [0, Validators.required],
    boughtAt: [new Date(), Validators.required],
    userId: ['', Validators.required],
    cardId: ['', Validators.required],
    createdAt: [new Date()],
    updatedAt: [new Date()],
    deletedAt: [new Date()],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly adminCreditCardsItemsService: AdminCreditCardItemsService
  ) {}

  public ngOnInit(): void {
    const currentId = this.route.snapshot.paramMap.get('id');

    if (currentId) {
      this.currentId = currentId;
      this.fetchEntityDetailsAndLoadIntoForm();
    }

    // TODO: Extract to utility function
    this.creditCardItemForm.controls.id?.disable({ onlySelf: true });
    this.creditCardItemForm.controls.createdAt?.disable({ onlySelf: true });
    this.creditCardItemForm.controls.updatedAt?.disable({ onlySelf: true });
    this.creditCardItemForm.controls.deletedAt?.disable({ onlySelf: true });
  }

  private fetchEntityDetailsAndLoadIntoForm(): void {
    if (this.currentId) {
      this.adminCreditCardsItemsService
        .findOne(this.currentId)
        .subscribe((creditCardItem) => {
          if (creditCardItem) {
            this.creditCardItemForm.patchValue({
              ...creditCardItem,
              boughtAt: new Date(creditCardItem.boughtAt),
              updatedAt: creditCardItem.updatedAt
                ? new Date(creditCardItem.updatedAt)
                : undefined,
              createdAt: creditCardItem.createdAt
                ? new Date(creditCardItem.createdAt)
                : undefined,
              deletedAt: creditCardItem.deletedAt
                ? new Date(creditCardItem.deletedAt)
                : undefined,
            });

            this.cdr.markForCheck();
          } else {
            this.router.navigate(['/admin/cards/credit/items']);
          }
        });
    }
  }

  public onFormSubmit(): void {
    const entityData = this.creditCardItemForm.value;

    if (this.currentId) {
      this.adminCreditCardsItemsService
        .update(entityData, this.currentId)
        .subscribe();
    }
  }
}
