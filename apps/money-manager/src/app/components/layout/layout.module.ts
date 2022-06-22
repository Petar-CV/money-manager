import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainContentComponent } from './main-content/main-content.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { MainFooterComponent } from './main-footer/main-footer.component';

@NgModule({
  declarations: [
    MainContentComponent,
    MainNavbarComponent,
    MainFooterComponent,
  ],
  imports: [CommonModule, RouterModule.forChild([])],
  exports: [MainContentComponent, MainNavbarComponent, MainFooterComponent],
})
export class LayoutModule {}
