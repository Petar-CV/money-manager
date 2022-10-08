import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../../shared/shared.module';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

const routes: Routes = [
  {
    path: 'settings',
    data: { pageTitle: 'profileSettings.pageTitle' },
    component: ProfileSettingsComponent,
  },
];

@NgModule({
  declarations: [ProfileSettingsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
})
export class ProfileModule {}
