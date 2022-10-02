import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../../shared/shared.module';
import { AdminDashboardOutletComponent } from './admin-dashboard-outlet.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardOutletComponent,
    children: [
      // {
      //   data: { pageTitle: 'adminDashboard.pageTitle' },
      //   path: 'credit',
      //   loadChildren: () =>
      //     import('./credit-cards/admin-credit-cards.module').then(
      //       (m) => m.AdminCreditCardsModule
      //     ),
      // },
      // TODO: Implement default component which lists all submodules
    ],
  },
];

@NgModule({
  declarations: [AdminDashboardOutletComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
})
export class AdminDashboardModule {}
