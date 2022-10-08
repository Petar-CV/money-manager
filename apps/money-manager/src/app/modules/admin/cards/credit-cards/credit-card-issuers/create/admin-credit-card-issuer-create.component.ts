import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminCreditCardIssuersRoutes } from '../../../../constants/routing';
import { AdminCreditCardIssuersService } from '../services/admin-credit-card-issuers.service';

@Component({
  selector: 'petar-cv-admin-credit-card-issuer-create',
  templateUrl: './admin-credit-card-issuer-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCreditCardIssuerCreateComponent {
  creditCardIssuerForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    logo: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly adminCreditCardIssuersService: AdminCreditCardIssuersService
  ) {}

  onFormSubmit(addNew?: boolean): void {
    const entityData = this.creditCardIssuerForm.value;

    this.adminCreditCardIssuersService
      .create(entityData)
      .subscribe((newCreditCardIssuer) => {
        if (addNew) {
          this.clearForm();
          return;
        }

        this.router.navigate([
          AdminCreditCardIssuersRoutes.ADMIN_CREDIT_CARD_ISSUERS,
          newCreditCardIssuer?.id,
        ]);
      });
  }

  private clearForm(): void {
    this.creditCardIssuerForm.reset();

    this.cdr.markForCheck();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelect(event: any): void {
    const fileReader = new FileReader();

    for (const file of event.files) {
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          this.creditCardIssuerForm.patchValue({
            logo: fileReader.result,
          });

          this.cdr.markForCheck();
        }
      };
    }
  }

  onFileRemove(): void {
    this.creditCardIssuerForm.patchValue({
      logo: '',
    });

    this.cdr.markForCheck();
  }
}
