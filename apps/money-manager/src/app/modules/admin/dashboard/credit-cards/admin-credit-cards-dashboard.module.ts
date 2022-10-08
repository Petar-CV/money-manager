import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../../../shared/shared.module';
import { AdminCreditCardsDashboardComponent } from './admin-credit-cards-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminCreditCardsDashboardComponent,
  },
];

@NgModule({
  declarations: [AdminCreditCardsDashboardComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
})
export class AdminCreditCardsDashboardModule {}
