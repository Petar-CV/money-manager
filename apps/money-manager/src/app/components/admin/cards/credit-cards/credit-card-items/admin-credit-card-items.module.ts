import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../../../../shared/shared.module';
import { AdminCreditCardItemsOutletComponent } from './admin-credit-card-items-outlet.component';
// import { AdminCreditCardItemCreateComponent } from './create/admin-about-us-image-create.component';
// import { AdminCreditCardItemDetailsComponent } from './details/admin-about-us-image-details.component';
// import { AdminCreditCardItemsComponent } from './list/admin-about-us-image.component';

const adminCreditCardItemsRoutes: Routes = [
  {
    path: '',
    component: AdminCreditCardItemsOutletComponent,
    children: [
      // {
      //   path: 'create',
      //   component: AdminCreditCardItemCreateComponent,
      // },
      // {
      //   path: ':aboutUsImageID',
      //   component: AdminCreditCardItemDetailsComponent,
      // },
      // {
      //   path: '',
      //   pathMatch: 'exact',
      //   component: AdminCreditCardItemsComponent,
      // },
    ],
  },
];

@NgModule({
  declarations: [
    AdminCreditCardItemsOutletComponent,
    // AdminCreditCardItemsComponent,
    // AdminCreditCardItemDetailsComponent,
    // AdminCreditCardItemCreateComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(adminCreditCardItemsRoutes),
    TranslateModule.forChild(),
  ],
})
export class AdminCreditCardItemsModule {}
