import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

import { SharedPipesModule } from '../../pipes/shared-pipes.module';
import { AmountLeftPipe } from '../../pipes/utils/credit-card-items/amount-left.pipe';
import { InstalmentsLeftPipe } from '../../pipes/utils/credit-card-items/instalments-left.pipe';
import { CustomCurrencyPipe } from '../../pipes/utils/custom-currency.pipe';
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
    CustomCurrencyPipe,
    LocalizedDatePipe,
    NumberToBooleanPipe,
    TranslatePipe,
    TitleCasePipe,
    AmountLeftPipe,
    InstalmentsLeftPipe,
  ],
})
export class BaseTableModule {}
