import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { PrimengModule } from '../primeng.module';
import { BasePaginationComponent } from './base-pagination/base-pagination.component';
import { BaseTableModule } from './base-table/base-table.module';

const baseComponents = [BasePaginationComponent];

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
