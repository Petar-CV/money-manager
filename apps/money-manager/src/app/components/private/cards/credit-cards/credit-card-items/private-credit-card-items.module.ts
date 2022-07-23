import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from 'apps/money-manager/src/app/shared/shared.module';
import { PrivateCreditCardItemsComponent } from './list/private-credit-card-items.component';
import { PrivateCreditCardItemsOutletComponent } from './private-credit-card-items-outlet.component';

const adminCreditCardsRoutes: Routes = [
  {
    path: '',
    component: PrivateCreditCardItemsOutletComponent,
    children: [
      // {
      //   path: 'create',
      //   data: { pageTitle: 'privateCreditCards.create.pageTitle' },
      //   component: PrivateCreditCardCreateComponent,
      // },
      // {
      //   path: ':id',
      //   data: { pageTitle: 'privateCreditCards.details.pageTitle' },
      //   component: PrivateCreditCardDetailsComponent,
      // },
      // {
      //   path: ':id/edit',
      //   data: { pageTitle: 'privateCreditCards.edit.pageTitle' },
      //   component: PrivateCreditCardDetailsEditComponent,
      // },
      {
        path: '',
        pathMatch: 'full',
        component: PrivateCreditCardItemsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    PrivateCreditCardItemsOutletComponent,
    PrivateCreditCardItemsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(adminCreditCardsRoutes),
    TranslateModule.forChild(),
  ],
})
export class PrivateCreditCardItemsModule {}
