import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../../../../shared/shared.module';
import { AdminCreditCardIssuersOutletComponent } from './admin-credit-card-issuers-outlet.component';
import { AdminCreditCardIssuersComponent } from './list/admin-credit-card-issuers.component';
// import { AdminCreditCardIssuerCreateComponent } from './create/admin-about-us-image-create.component';
// import { AdminCreditCardIssuerDetailsComponent } from './details/admin-about-us-image-details.component';
// import { AdminCreditCardIssuersComponent } from './list/admin-about-us-image.component';

const adminCreditCardIssuersRoutes: Routes = [
  {
    path: '',
    component: AdminCreditCardIssuersOutletComponent,
    children: [
      // {
      //   path: 'create',
      //   component: AdminCreditCardIssuerCreateComponent,
      // },
      // {
      //   path: ':aboutUsImageID',
      //   component: AdminCreditCardIssuerDetailsComponent,
      // },
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
    // AdminCreditCardIssuerDetailsComponent,
    // AdminCreditCardIssuerCreateComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(adminCreditCardIssuersRoutes),
    TranslateModule.forChild(),
  ],
})
export class AdminCreditCardIssuersModule {}
