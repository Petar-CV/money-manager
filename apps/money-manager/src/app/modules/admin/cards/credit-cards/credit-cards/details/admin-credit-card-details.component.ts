import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'petar-cv-admin-credit-card-details',
  templateUrl: './admin-credit-card-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCreditCardDetailsComponent implements OnInit {
  public creditCardIssuers$: Observable<Partial<ICreditCardIssuer>[]>;
  public creditCardLimits = CreditCardLimits;
  private currentId?: string;

  form = this.formBuilder.nonNullable.group({
    id: '',
    name: ['', Validators.required],
    issuerId: ['', Validators.required],
    limit: [0, Validators.required],
    billingDate: [1, Validators.required],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    userId: ['', Validators.required],
    limitType: new FormControl<CreditCardLimit>(CreditCardLimit.OVERALL, {
      nonNullable: true,
    }),
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly entityService: AdminCreditCardsService,
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
    this.form.controls.id?.disable({ onlySelf: true });
    this.form.controls.createdAt?.disable({ onlySelf: true });
    this.form.controls.updatedAt?.disable({ onlySelf: true });
    this.form.controls.deletedAt?.disable({ onlySelf: true });
  }

  private fetchEntityDetailsAndLoadIntoForm(): void {
    if (this.currentId) {
      this.entityService.findOne(this.currentId).subscribe((creditCard) => {
        if (creditCard) {
          this.form.patchValue({
            ...creditCard,
            issuerId: creditCard.issuerId,
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
    const entityData = this.form.getRawValue();

    if (this.currentId) {
      this.entityService.update(entityData, this.currentId).subscribe();
    }
  }
}
