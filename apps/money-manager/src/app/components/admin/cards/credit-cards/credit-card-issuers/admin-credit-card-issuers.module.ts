import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../../../../shared/shared.module';
import { AdminCreditCardIssuersOutletComponent } from './admin-credit-card-issuers-outlet.component';
import { AdminCreditCardIssuerCreateComponent } from './create/admin-credit-card-issuer-create.component';
import { AdminCreditCardIssuerDetailsComponent } from './details/admin-credit-card-issuer-details.component';
import { AdminCreditCardIssuersComponent } from './list/admin-credit-card-issuers.component';

const adminCreditCardIssuersRoutes: Routes = [
  {
    path: '',
    component: AdminCreditCardIssuersOutletComponent,
    children: [
      {
        path: 'create',
        component: AdminCreditCardIssuerCreateComponent,
      },
      {
        path: ':id',
        component: AdminCreditCardIssuerDetailsComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: AdminCreditCardIssuersComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminCreditCardIssuersOutletComponent,
    AdminCreditCardIssuersComponent,
    AdminCreditCardIssuerDetailsComponent,
    AdminCreditCardIssuerCreateComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(adminCreditCardIssuersRoutes),
    TranslateModule.forChild(),
  ],
})
export class AdminCreditCardIssuersModule {}
