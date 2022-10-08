import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../../../../shared/shared.module';
import { AdminCreditCardItemsOutletComponent } from './admin-credit-card-items-outlet.component';
import { AdminCreditCardItemCreateComponent } from './create/admin-credit-card-item-create.component';
import { AdminCreditCardItemDetailsComponent } from './details/admin-credit-card-item-details.component';
import { AdminCreditCardItemsComponent } from './list/admin-credit-card-items.component';

const adminCreditCardItemsRoutes: Routes = [
  {
    path: '',
    component: AdminCreditCardItemsOutletComponent,
    children: [
      {
        path: 'create',
        component: AdminCreditCardItemCreateComponent,
      },
      {
        path: ':id',
        component: AdminCreditCardItemDetailsComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: AdminCreditCardItemsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminCreditCardItemsOutletComponent,
    AdminCreditCardItemsComponent,
    AdminCreditCardItemDetailsComponent,
    AdminCreditCardItemCreateComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(adminCreditCardItemsRoutes),
    TranslateModule.forChild(),
  ],
})
export class AdminCreditCardItemsModule {}
