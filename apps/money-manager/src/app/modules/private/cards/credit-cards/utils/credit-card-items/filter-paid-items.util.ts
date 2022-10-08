import { ICreditCardItem } from '@petar-cv/money-manager-models';

import { calculateAreAllInstalmentsPaidForItem } from './all-instalments-paid.util';

export function filterPaidCreditCardItems(
  creditCardItems: ICreditCardItem[]
): ICreditCardItem[] {
  return creditCardItems.filter(
    (item) => !calculateAreAllInstalmentsPaidForItem(item)
  );
}
