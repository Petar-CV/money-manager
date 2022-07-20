import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
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
        component: AdminDashboardComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [AdminComponent, AdminDashboardComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(adminRoutes),
    TranslateModule.forChild(),
  ],
})
export class AdminModule {}
