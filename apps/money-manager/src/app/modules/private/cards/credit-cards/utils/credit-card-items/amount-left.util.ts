import { ICreditCardItem } from '@petar-cv/money-manager-models';

import { calculateInstalmentsPaidForItem } from './instalments-paid.util';

export function calculateAmountLeftForItem(
  creditCardItem: ICreditCardItem
): number {
  const { instalments, amount } = creditCardItem;

  const instalmentsPaid = calculateInstalmentsPaidForItem(creditCardItem);

  let amountLeft = (+amount / instalments) * (instalments - instalmentsPaid);

  if (amountLeft < 0) {
    amountLeft = 0; // if the amount left is negative, the item is paid off
  }

  return amountLeft;
}
