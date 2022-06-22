import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MainContentComponent } from './main-content/main-content.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MainContentComponent,
    MainNavbarComponent,
    MainFooterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([]),
    TranslateModule.forChild(),
  ],
  exports: [MainContentComponent, MainNavbarComponent, MainFooterComponent],
})
export class LayoutModule {}
