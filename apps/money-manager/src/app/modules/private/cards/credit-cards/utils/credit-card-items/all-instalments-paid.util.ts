import { ICreditCardItem } from '@petar-cv/money-manager-models';

import { calculateInstalmentsPaidForItem } from './instalments-paid.util';

export function calculateAreAllInstalmentsPaidForItem(
  creditCardItem: ICreditCardItem
): boolean {
  const { instalments } = creditCardItem;

  const instalmentsPaid = calculateInstalmentsPaidForItem(creditCardItem);

  const instalmentsLeft = instalments - instalmentsPaid;

  return instalmentsLeft <= 0; // if the amount left is negative, all of the instalments were paid
}
