import { Pipe, PipeTransform } from '@angular/core';

import { ICreditCardItem } from '@petar-cv/money-manager-models';

import { calculateInstalmentsLeftForItem } from '../../../../modules/private/cards/credit-cards/utils/credit-card-items/instalments-left.util';

@Pipe({
  name: 'instalmentsLeft',
})
export class InstalmentsLeftPipe implements PipeTransform {
  transform(creditCardItem: ICreditCardItem): number {
    return calculateInstalmentsLeftForItem(creditCardItem);
  }
}
