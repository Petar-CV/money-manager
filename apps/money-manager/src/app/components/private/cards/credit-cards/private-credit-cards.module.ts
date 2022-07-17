import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from 'apps/money-manager/src/app/shared/shared.module';
import { PrivateCreditCardsOutletComponent } from './private-credit-cards-outlet.component';
import { PrivateCreditCardsComponent } from './list/private-credit-cards.component';
import { CreditCardCardComponent } from './list/card/credit-card-card.component';
import { AddCreditCardCardComponent } from './list/add-card/add-credit-card-card.component';
import { PrivateCreditCardCreateComponent } from './create/private-credit-card-create.component';
import { PrivateCreditCardDetailsComponent } from './details/private-credit-card-details.component';
import { PrivateCreditCardDetailsEditComponent } from './details-edit/private-credit-card-details-edit.component';
import { PrivateCreditCardItemsTableComponent } from './details/items-table/private-credit-card-items-table.component';

const adminCreditCardsRoutes: Routes = [
  {
    path: '',
    component: PrivateCreditCardsOutletComponent,
    children: [
      {
        path: 'create',
        component: PrivateCreditCardCreateComponent,
      },
      {
        path: ':id',
        component: PrivateCreditCardDetailsComponent,
      },
      {
        path: ':id/edit',
        component: PrivateCreditCardDetailsEditComponent,
      },
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
    PrivateCreditCardCreateComponent,
    PrivateCreditCardDetailsComponent,
    PrivateCreditCardDetailsEditComponent,
    PrivateCreditCardItemsTableComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(adminCreditCardsRoutes),
    TranslateModule.forChild(),
  ],
})
export class PrivateCreditCardsModule {}
