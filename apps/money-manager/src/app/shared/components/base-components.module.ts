import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { PrimengModule } from '../primeng.module';
import { BaseBackButtonComponent } from './base-form/base-back-button/base-back-button.component';
import { BasePaginationComponent } from './base-pagination/base-pagination.component';
import { BasePrivateEntityTitleComponent } from './base-private-entity/base-private-entity-title/base-private-entity-title.component';
import { BaseTableModule } from './base-table/base-table.module';

const baseComponents = [
  BasePaginationComponent,
  BaseBackButtonComponent,
  BasePrivateEntityTitleComponent,
];

@NgModule({
  imports: [
    CommonModule,
    PrimengModule,
    TranslateModule.forChild(),
    SharedPipesModule,
  ],
  declarations: [...baseComponents],
  exports: [...baseComponents, BaseTableModule],
})
export class BaseComponentsModule {}
