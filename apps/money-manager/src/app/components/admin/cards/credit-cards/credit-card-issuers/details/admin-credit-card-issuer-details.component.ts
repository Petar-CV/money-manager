import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminCreditCardIssuersService } from '../../../../../../shared/services/entities/admin/credit-card-issuers/admin-credit-card-issuers.service';

@Component({
  selector: 'petar-cv-admin-credit-card-issuer-details',
  templateUrl: './admin-credit-card-issuer-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCreditCardIssuerDetailsComponent implements OnInit {
  private currentId?: string;

  creditCardIssuerForm = this.formBuilder.nonNullable.group({
    id: [''],
    name: ['', Validators.required],
    logo: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly adminCreditCardIssuersService: AdminCreditCardIssuersService
  ) {}

  public ngOnInit(): void {
    const currentId = this.route.snapshot.paramMap.get('id');

    if (currentId) {
      this.currentId = currentId;
      this.fetchEntityDetailsAndLoadIntoForm();
    }

    this.creditCardIssuerForm.get('id')?.disable({ onlySelf: true });
  }

  private fetchEntityDetailsAndLoadIntoForm(): void {
    if (this.currentId) {
      this.adminCreditCardIssuersService
        .findOne(this.currentId)
        .subscribe((creditCardIssuer) => {
          if (creditCardIssuer) {
            this.creditCardIssuerForm.patchValue(creditCardIssuer);
            this.loadLogoIntoForm();

            this.cdr.markForCheck();
          } else {
            this.router.navigate(['/admin/cards/credit/issuers']);
          }
        });
    }
  }

  // TODO: IMPLEMENT
  private loadLogoIntoForm(): void {
    // const logo = this.creditCardIssuerForm.value.logo;
    // if (logo) {
    //   const file = new File([new Blob([logo])], 'logo.png');
    //   if (this.fileUpload) {
    //     this.fileUpload.files.push(file);
    //     this.fileUpload.this.cdr.markForCheck();
    //     this.attachment.push(file);
    //     this.cdr.markForCheck();
    //     const vla = this.fileUpload;
    //     vla;
    //   }
    // }
  }

  public onFormSubmit(): void {
    const entityData = this.creditCardIssuerForm.value;

    if (this.currentId) {
      this.adminCreditCardIssuersService
        .update(entityData, this.currentId)
        .subscribe();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onFileSelect(event: any): void {
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

  public onFileRemove(): void {
    this.creditCardIssuerForm.patchValue({
      logo: '',
    });

    this.cdr.markForCheck();
  }
}
