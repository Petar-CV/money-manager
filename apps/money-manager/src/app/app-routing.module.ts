import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainContentComponent } from './components/layout/main-content/main-content.component';
import { UserRole } from './shared/constants/user-roles.constants';
import { AuthGuard } from './shared/guards/admin-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainContentComponent,
    children: [
      // {
      //   path: 'exclusive',
      //   data: { pageTitle: 'admin.exclusive', roles: ['user'] as UserRole[] },
      //   loadChildren: () =>
      //     import('./components/public/exclusive/exclusive.module').then((m) => m.ExclusiveModule),
      // },
    ],
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { pageTitle: 'admin.pageTitle', roles: ['admin'] as UserRole[] },
    loadChildren: () =>
      import('./components/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
