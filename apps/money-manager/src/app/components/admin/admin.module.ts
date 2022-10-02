import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AdminComponent } from './admin.component';
import { SharedModule } from '../../shared/shared.module';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'cards',
        data: { pageTitle: 'adminCards.pageTitle' },
        loadChildren: () =>
          import('./cards/admin-cards.module').then((m) => m.AdminCardsModule),
      },
      {
        path: '',
        pathMatch: 'full',
        data: { pageTitle: 'admin.pageTitle' },
        loadChildren: () =>
          import('./admin-dashboard/admin-dashboard.module').then(
            (m) => m.AdminDashboardModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(adminRoutes),
    TranslateModule.forChild(),
  ],
})
export class AdminModule {}
