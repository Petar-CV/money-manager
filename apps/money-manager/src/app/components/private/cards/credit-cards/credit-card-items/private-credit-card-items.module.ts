import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from 'apps/money-manager/src/app/shared/shared.module';
import { PrivateCreditCardItemCreateComponent } from './create/private-credit-card-item-create.component';
import { PrivateCreditCardItemDetailsComponent } from './details/private-credit-card-item-details.component';
import { PrivateCreditCardItemsComponent } from './list/private-credit-card-items.component';
import { PrivateCreditCardItemsOutletComponent } from './private-credit-card-items-outlet.component';

const adminCreditCardsRoutes: Routes = [
  {
    path: '',
    component: PrivateCreditCardItemsOutletComponent,
    children: [
      {
        path: 'create',
        data: { pageTitle: 'privateCreditCardItems.create.pageTitle' },
        component: PrivateCreditCardItemCreateComponent,
      },
      {
        path: ':id',
        data: { pageTitle: 'privateCreditCardItems.details.pageTitle' },
        component: PrivateCreditCardItemDetailsComponent,
      },
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
    PrivateCreditCardItemDetailsComponent,
    PrivateCreditCardItemCreateComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(adminCreditCardsRoutes),
    TranslateModule.forChild(),
  ],
})
export class PrivateCreditCardItemsModule {}
