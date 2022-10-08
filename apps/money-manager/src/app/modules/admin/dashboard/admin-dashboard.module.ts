import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../../shared/shared.module';
import { AdminDashboardOutletComponent } from './admin-dashboard-outlet.component';
import { AdminDashboardListComponent } from './list/admin-dashboard-list/admin-dashboard-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardOutletComponent,
    children: [
      {
        data: { pageTitle: 'adminCreditCardsDashboard.pageTitle' },
        path: 'credit-cards',
        loadChildren: () =>
          import('./credit-cards/admin-credit-cards-dashboard.module').then(
            (m) => m.AdminCreditCardsDashboardModule
          ),
      },
      {
        path: '',
        component: AdminDashboardListComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [AdminDashboardOutletComponent, AdminDashboardListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
})
export class AdminDashboardModule {}
