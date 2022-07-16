import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PrivateCreditCardsOutletComponent } from './private-credit-cards-outlet.component';
import { SharedModule } from 'apps/money-manager/src/app/shared/shared.module';

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
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   component: PrivateCreditCardsComponent,
      // },
    ],
  },
];

@NgModule({
  declarations: [PrivateCreditCardsOutletComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(adminCreditCardsRoutes),
    TranslateModule.forChild(),
  ],
})
export class PrivateCreditCardsModule {}
