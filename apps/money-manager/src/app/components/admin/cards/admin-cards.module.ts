import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../../shared/shared.module';
import { AdminCreditCardsOutletComponent } from './admin-cards-outlet.component';

const adminCreditCardsRoutes: Routes = [
  {
    path: '',
    component: AdminCreditCardsOutletComponent,
    children: [
      {
        path: 'credit',
        loadChildren: () =>
          import('./credit-cards/admin-credit-cards.module').then(
            (m) => m.AdminCardsModule
          ),
      },
      // TODO: Implement default component which lists all submodules
    ],
  },
];

@NgModule({
  declarations: [AdminCreditCardsOutletComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(adminCreditCardsRoutes),
    TranslateModule.forChild(),
  ],
})
export class AdminCardsModule {}
