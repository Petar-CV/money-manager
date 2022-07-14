import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../../../../shared/shared.module';
import { AdminCreditCardsOutletComponent } from './admin-credit-cards-outlet.component';
// import { AdminCreditCardCreateComponent } from './create/admin-about-us-image-create.component';
// import { AdminCreditCardDetailsComponent } from './details/admin-about-us-image-details.component';
// import { AdminCreditCardsComponent } from './list/admin-about-us-image.component';

const adminCreditCardsRoutes: Routes = [
  {
    path: '',
    component: AdminCreditCardsOutletComponent,
    children: [
      // {
      //   path: 'create',
      //   component: AdminCreditCardCreateComponent,
      // },
      // {
      //   path: ':aboutUsImageID',
      //   component: AdminCreditCardDetailsComponent,
      // },
      // {
      //   path: '',
      //   pathMatch: 'exact',
      //   component: AdminCreditCardsComponent,
      // },
    ],
  },
];

@NgModule({
  declarations: [
    AdminCreditCardsOutletComponent,
    // AdminCreditCardsComponent,
    // AdminCreditCardDetailsComponent,
    // AdminCreditCardCreateComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(adminCreditCardsRoutes),
    TranslateModule.forChild(),
  ],
})
export class AdminCreditCardsModule {}
