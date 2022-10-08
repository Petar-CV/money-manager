import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../../../../shared/shared.module';
import { AdminCreditCardsOutletComponent } from './admin-credit-cards-outlet.component';
import { AdminCreditCardCreateComponent } from './create/admin-credit-card-create.component';
import { AdminCreditCardDetailsComponent } from './details/admin-credit-card-details.component';
import { AdminCreditCardsComponent } from './list/admin-credit-cards.component';

const adminCreditCardsRoutes: Routes = [
  {
    path: '',
    component: AdminCreditCardsOutletComponent,
    children: [
      {
        path: 'create',
        component: AdminCreditCardCreateComponent,
      },
      {
        path: ':id',
        component: AdminCreditCardDetailsComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: AdminCreditCardsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminCreditCardsOutletComponent,
    AdminCreditCardsComponent,
    AdminCreditCardDetailsComponent,
    AdminCreditCardCreateComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(adminCreditCardsRoutes),
    TranslateModule.forChild(),
  ],
})
export class AdminCreditCardsModule {}
