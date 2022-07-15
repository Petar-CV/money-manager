import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { PrimengModule } from '../primeng.module';
import { BaseAdminBackButtonComponent } from './base-admin-form/base-admin-back-button/base-admin-back-button.component';
import { BasePaginationComponent } from './base-pagination/base-pagination.component';
import { BaseTableModule } from './base-table/base-table.module';

const baseComponents = [BasePaginationComponent, BaseAdminBackButtonComponent];

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