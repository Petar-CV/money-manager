import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ICreditCardIssuer } from '@petar-cv/money-manager-models';

import { AdminCreditCardIssuersService } from 'apps/money-manager/src/app/shared/services/entities/admin/credit-card-issuers/admin-credit-card-issuers.service';
import { AdminCreditCardsService } from '../../../../../../shared/services/entities/admin/credit-cards/admin-credit-cards.service';
import { AdminCreditCardsRoutes } from 'apps/money-manager/src/app/shared/constants/routing';

@Component({
  selector: 'petar-cv-admin-credit-card-details',
  templateUrl: './admin-credit-card-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCreditCardDetailsComponent implements OnInit {
  public creditCardIssuers$: Observable<Partial<ICreditCardIssuer>[]>;
  private currentId?: string;

  creditCardForm = this.formBuilder.nonNullable.group({
    id: '',
    name: ['', Validators.required],
    issuerId: ['', Validators.required],
    limit: [0, Validators.required],
    billingDate: [new Date(), Validators.required],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    userId: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly adminCreditCardsService: AdminCreditCardsService,
    private readonly adminCreditCardIssuersService: AdminCreditCardIssuersService
  ) {
    this.creditCardIssuers$ = this.adminCreditCardIssuersService.findAllLov();
  }

  public ngOnInit(): void {
    const currentId = this.route.snapshot.paramMap.get('id');

    if (currentId) {
      this.currentId = currentId;
      this.fetchEntityDetailsAndLoadIntoForm();
    }

    // TODO: Extract to utility function
    this.creditCardForm.controls.id?.disable({ onlySelf: true });
    this.creditCardForm.controls.createdAt?.disable({ onlySelf: true });
    this.creditCardForm.controls.updatedAt?.disable({ onlySelf: true });
    this.creditCardForm.controls.deletedAt?.disable({ onlySelf: true });
  }

  private fetchEntityDetailsAndLoadIntoForm(): void {
    if (this.currentId) {
      this.adminCreditCardsService
        .findOne(this.currentId)
        .subscribe((creditCard) => {
          if (creditCard) {
            this.creditCardForm.patchValue({
              ...creditCard,
              issuerId: creditCard.issuerId,
              billingDate: new Date(creditCard.billingDate),
              updatedAt: creditCard.updatedAt
                ? new Date(creditCard.updatedAt)
                : undefined,
              createdAt: creditCard.createdAt
                ? new Date(creditCard.createdAt)
                : undefined,
              deletedAt: creditCard.deletedAt
                ? new Date(creditCard.deletedAt)
                : undefined,
            });

            this.cdr.markForCheck();
          } else {
            this.router.navigate([AdminCreditCardsRoutes.ADMIN_CREDIT_CARDS]);
          }
        });
    }
  }

  public onFormSubmit(): void {
    const entityData = this.creditCardForm.value;

    if (this.currentId) {
      this.adminCreditCardsService
        .update(entityData, this.currentId)
        .subscribe();
    }
  }
}
