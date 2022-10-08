import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'petar-cv-private-credit-card-items-outlet',
  template: ` <router-outlet> </router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateCreditCardItemsOutletComponent {}
