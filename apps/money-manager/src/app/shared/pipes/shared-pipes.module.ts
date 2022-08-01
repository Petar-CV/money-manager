import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AmountLeftPipe } from './utils/credit-card-items/amount-left.pipe';
import { InstalmentsLeftPipe } from './utils/credit-card-items/instalments-left.pipe';
import { CustomCurrencyPipe } from './utils/custom-currency.pipe';
import { LocalizedDatePipe } from './utils/localized-date.pipe';
import { NumberToBooleanPipe } from './utils/number-to-boolean.pipe';
import { NumberToStringPipe } from './utils/number-to-string.pipe';

const sharedPipes = [
  LocalizedDatePipe,
  NumberToBooleanPipe,
  NumberToStringPipe,
  CustomCurrencyPipe,
  AmountLeftPipe,
  InstalmentsLeftPipe,
];

@NgModule({
  imports: [CommonModule],
  declarations: sharedPipes,
  exports: sharedPipes,
})
export class SharedPipesModule {}
