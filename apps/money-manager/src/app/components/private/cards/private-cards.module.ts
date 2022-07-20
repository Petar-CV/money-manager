import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../../shared/shared.module';
import { PrivateCardsOutletComponent } from './private-cards-outlet.component';

const adminCreditCardsRoutes: Routes = [
  {
    path: '',
    component: PrivateCardsOutletComponent,
    children: [
      {
        path: 'credit',
        data: { pageTitle: 'privateCreditCards.pageTitle' },
        loadChildren: () =>
          import('./credit-cards/private-credit-cards.module').then(
            (m) => m.PrivateCreditCardsModule
          ),
      },
      // TODO: Implement default component which lists all submodules
    ],
  },
];

@NgModule({
  declarations: [PrivateCardsOutletComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(adminCreditCardsRoutes),
    TranslateModule.forChild(),
  ],
})
export class PrivateCreditCardsModule {}
