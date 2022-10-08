import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'petar-cv-admin-credit-cards-outlet',
  template: ` <router-outlet> </router-outlet> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCreditCardsOutletComponent {}
