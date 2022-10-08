import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminCreditCardItemsRoutes } from '../../../../constants/routing';
import { AdminCreditCardItemsService } from '../services/admin-credit-card-items.service';

@Component({
  selector: 'petar-cv-admin-credit-card-item-details',
  templateUrl: './admin-credit-card-item-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCreditCardItemDetailsComponent implements OnInit {
  private currentId?: string;

  form = this.formBuilder.nonNullable.group({
    id: [''],
    name: ['', Validators.required],
    description: [''],
    instalments: [1, Validators.required],
    amount: [0, Validators.required],
    boughtAt: [new Date(), Validators.required],
    firstInstalmentDate: [new Date(), Validators.required],
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
    private readonly entityService: AdminCreditCardItemsService
  ) {}

  public ngOnInit(): void {
    const currentId = this.route.snapshot.paramMap.get('id');

    if (currentId) {
      this.currentId = currentId;
      this.fetchEntityDetailsAndLoadIntoForm();
    }

    // TODO: Extract to utility function
    this.form.controls.id?.disable({ onlySelf: true });
    this.form.controls.createdAt?.disable({ onlySelf: true });
    this.form.controls.updatedAt?.disable({ onlySelf: true });
    this.form.controls.deletedAt?.disable({ onlySelf: true });
  }

  private fetchEntityDetailsAndLoadIntoForm(): void {
    if (this.currentId) {
      this.entityService.findOne(this.currentId).subscribe((creditCardItem) => {
        if (creditCardItem) {
          this.form.patchValue({
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
            firstInstalmentDate: creditCardItem.firstInstalmentDate
              ? new Date(creditCardItem.firstInstalmentDate)
              : undefined,
          });

          this.cdr.markForCheck();
        } else {
          this.router.navigate([
            AdminCreditCardItemsRoutes.ADMIN_CREDIT_CARD_ITEMS,
          ]);
        }
      });
    }
  }

  public onFormSubmit(): void {
    const entityData = this.form.getRawValue();

    if (this.currentId) {
      this.entityService.update(entityData, this.currentId).subscribe();
    }
  }
}
