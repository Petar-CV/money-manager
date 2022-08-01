import { Pipe, PipeTransform } from '@angular/core';

import { ICreditCardItem } from '@petar-cv/money-manager-models';

import { calculateAmountLeftForItem } from '../../../utils/credit-card-items/amount-left.util';

@Pipe({
  name: 'amountLeft',
})
export class AmountLeftPipe implements PipeTransform {
  transform(creditCardItem: ICreditCardItem): number {
    return calculateAmountLeftForItem(creditCardItem);
  }
}
