import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainContentComponent } from './components/layout/main-content/main-content.component';

const routes: Routes = [
  {
    path: '',
    component: MainContentComponent,
    children: [
      // {
      //   path: 'exclusive',
      //   data: { pageTitle: 'exclusive.pageTitle' },
      //   loadChildren: () =>
      //     import('./components/public/exclusive/exclusive.module').then((m) => m.ExclusiveModule),
      // },
    ],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
