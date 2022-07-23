import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from 'apps/money-manager/src/app/shared/shared.module';
import { PrivateCreditCardsFullOutletComponent } from './private-credit-cards-full-outlet.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateCreditCardsFullOutletComponent,
    children: [
      {
        path: 'items',
        data: { pageTitle: 'privateCreditCards.pageTitle' },
        loadChildren: () =>
          import('./credit-card-items/private-credit-card-items.module').then(
            (m) => m.PrivateCreditCardItemsModule
          ),
      },
      {
        path: 'cards',
        data: { pageTitle: 'privateCreditCards.pageTitle' },
        loadChildren: () =>
          import('./credit-cards/private-credit-cards.module').then(
            (m) => m.PrivateCreditCardsFullModule
          ),
      },
      // TODO: Implement default component which lists all submodules
    ],
  },
];

@NgModule({
  declarations: [PrivateCreditCardsFullOutletComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
})
export class PrivateCreditCardsFullModule {}
