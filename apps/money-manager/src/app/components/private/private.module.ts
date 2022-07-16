import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../shared/shared.module';
import { PrivateOutletComponent } from './private-outlet.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateOutletComponent,
    children: [
      {
        path: 'cards',
        loadChildren: () =>
          import('./cards/private-cards.module').then(
            (m) => m.PrivateCreditCardsModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
    ],
  },
];

@NgModule({
  declarations: [PrivateOutletComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
})
export class PrivateModule {}
