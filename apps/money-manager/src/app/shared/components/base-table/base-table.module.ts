import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

import { SharedPipesModule } from '../../pipes/shared-pipes.module';
import { LocalizedDatePipe } from '../../pipes/utils/localized-date.pipe';
import { NumberToBooleanPipe } from '../../pipes/utils/number-to-boolean.pipe';
import { PrimengModule } from '../../primeng.module';
import { BaseTableComponent } from './base-table.component';
import { BaseTablePipe } from './pipes/base-table-pipe.pipe';
import { NestedValuePipe } from './pipes/nested-value.pipe';

@NgModule({
  imports: [
    CommonModule,
    PrimengModule,
    TranslateModule.forChild(),
    SharedPipesModule,
  ],
  declarations: [BaseTableComponent, BaseTablePipe, NestedValuePipe],
  exports: [BaseTableComponent],
  providers: [
    CurrencyPipe,
    LocalizedDatePipe,
    NumberToBooleanPipe,
    TranslatePipe,
    TitleCasePipe,
  ],
})
export class BaseTableModule {}
