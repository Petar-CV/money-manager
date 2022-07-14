import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../../../shared/shared.module';
import { AdminCreditCardsOutletComponent } from './admin-credit-cards-outlet.component';

const adminCreditCardsRoutes: Routes = [
  {
    path: '',
    component: AdminCreditCardsOutletComponent,
    children: [
      {
        path: 'issuers',
        loadChildren: () =>
          import('./credit-card-issuers/admin-credit-card-issuers.module').then(
            (m) => m.AdminCreditCardIssuersModule
          ),
      },
      {
        path: 'items',
        loadChildren: () =>
          import('./credit-card-items/admin-credit-card-items.module').then(
            (m) => m.AdminCreditCardItemsModule
          ),
      },
      {
        path: 'cards',
        loadChildren: () =>
          import('./credit-cards/admin-credit-cards.module').then(
            (m) => m.AdminCreditCardsModule
          ),
      },
      // TODO: Implement default component which lists all submodules
    ],
  },
];

@NgModule({
  declarations: [AdminCreditCardsOutletComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(adminCreditCardsRoutes),
    TranslateModule.forChild(),
  ],
})
export class AdminCardsModule {}
