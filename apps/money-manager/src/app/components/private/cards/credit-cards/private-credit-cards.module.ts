import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from 'apps/money-manager/src/app/shared/shared.module';
import { PrivateCreditCardsOutletComponent } from './private-credit-cards-outlet.component';
import { PrivateCreditCardsComponent } from './list/private-credit-cards.component';
import { CreditCardCardComponent } from './list/card/credit-card-card.component';
import { AddCreditCardCardComponent } from './list/add-card/add-credit-card-card.component';

const adminCreditCardsRoutes: Routes = [
  {
    path: '',
    component: PrivateCreditCardsOutletComponent,
    children: [
      // {
      //   path: 'create',
      //   component: PrivateCreditCardCreateComponent,
      // },
      // {
      //   path: ':id',
      //   component: PrivateCreditCardDetailsComponent,
      // },
      {
        path: '',
        pathMatch: 'full',
        component: PrivateCreditCardsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    PrivateCreditCardsOutletComponent,
    PrivateCreditCardsComponent,
    CreditCardCardComponent,
    AddCreditCardCardComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(adminCreditCardsRoutes),
    TranslateModule.forChild(),
  ],
})
export class PrivateCreditCardsModule {}
