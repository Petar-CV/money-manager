import { ICreditCardItem } from '@petar-cv/money-manager-models';

import { calculateInstalmentsPaidForItem } from './instalments-paid.util';

export function calculateInstalmentsLeftForItem(
  creditCardItem: ICreditCardItem
): number {
  const { instalments } = creditCardItem;

  const instalmentsPaid = calculateInstalmentsPaidForItem(creditCardItem);

  let instalmentsLeft = instalments - instalmentsPaid;

  if (instalmentsLeft < 0) {
    instalmentsLeft = 0; // if the amount left is negative, none of the instalments were paid
  }

  return instalmentsLeft;
}
