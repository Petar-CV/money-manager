import { Pipe, PipeTransform } from '@angular/core';

import { ICreditCardItem } from '@petar-cv/money-manager-models';

import { calculateInstalmentAmountForItem } from '../../../../modules/private/cards/credit-cards/utils/credit-card-items/instalment-amount.util';

@Pipe({
  name: 'instalmentAmount',
})
export class InstalmentAmountPipe implements PipeTransform {
  transform(creditCardItem: ICreditCardItem): number {
    return calculateInstalmentAmountForItem(creditCardItem);
  }
}
