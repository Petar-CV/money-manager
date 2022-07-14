import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LocalizedDatePipe } from './utils/localized-date.pipe';
import { NumberToBooleanPipe } from './utils/number-to-boolean.pipe';
import { NumberToStringPipe } from './utils/number-to-string.pipe';

const sharedPipes = [
  LocalizedDatePipe,
  NumberToBooleanPipe,
  NumberToStringPipe,
];

@NgModule({
  imports: [CommonModule],
  declarations: sharedPipes,
  exports: sharedPipes,
})
export class SharedPipesModule {}
