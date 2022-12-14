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

import { PrivateCreditCardsRoutes } from '../../../../constants/routing';
import { CreditCardIssuersService } from '../../credit-card-issuers/services/credit-card-issuers.service';
import { CreditCardsService } from '../services/credit-cards.service';

@Component({
  selector: 'petar-cv-private-credit-card-details-edit',
  templateUrl: './private-credit-card-details-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateCreditCardDetailsEditComponent implements OnInit {
  public creditCardIssuers$: Observable<Partial<ICreditCardIssuer>[]>;
  public creditCardLimits = CreditCardLimits;
  private currentId?: string;

  form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    limit: [0, Validators.required],
    billingDate: [1, Validators.required],
    issuerId: ['', Validators.required],
    limitType: new FormControl<CreditCardLimit>(CreditCardLimit.OVERALL, {
      nonNullable: true,
    }),
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly entityService: CreditCardsService,
    private readonly creditCardIssuersService: CreditCardIssuersService
  ) {
    this.creditCardIssuers$ = this.creditCardIssuersService.findAllLov();
  }

  public ngOnInit(): void {
    const currentId = this.route.snapshot.paramMap.get('id');

    if (currentId) {
      this.currentId = currentId;
      this.fetchEntityDetailsAndLoadIntoForm();
    }
  }

  private fetchEntityDetailsAndLoadIntoForm(): void {
    if (this.currentId) {
      this.entityService.findOne(this.currentId).subscribe((creditCard) => {
        if (creditCard) {
          this.form.patchValue({
            ...creditCard,
          });

          this.cdr.markForCheck();
        } else {
          this.router.navigate([PrivateCreditCardsRoutes.PRIVATE_CREDIT_CARDS]);
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
