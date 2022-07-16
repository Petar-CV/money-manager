import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'petar-cv-private-cards-outlet',
  template: ` <router-outlet> </router-outlet> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateCardsOutletComponent {}
