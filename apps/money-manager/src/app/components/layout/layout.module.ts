import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MainContentComponent } from './main-content/main-content.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [MainContentComponent, MainNavbarComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([]),
    TranslateModule.forChild(),
  ],
  exports: [MainContentComponent, MainNavbarComponent],
})
export class LayoutModule {}
