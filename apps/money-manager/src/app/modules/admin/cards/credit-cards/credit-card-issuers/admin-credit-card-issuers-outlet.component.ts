import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'petar-cv-admin-credit-card-issuers-outlet',
  template: ` <router-outlet> </router-outlet> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCreditCardIssuersOutletComponent {}
