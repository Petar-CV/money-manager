import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'petar-cv-admin-credit-card-items-outlet',
  template: ` <router-outlet> </router-outlet> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCreditCardItemsOutletComponent {}
