import { ICreditCardItem } from '@petar-cv/money-manager-models';

export function calculateInstalmentAmountForItem(
  creditCardItem: ICreditCardItem
): number {
  const { instalments, amount } = creditCardItem;

  return amount / instalments;
}
