import { ICreditCardItem } from '@petar-cv/money-manager-models';

export function calculateInstalmentsPaidForItem(
  creditCardItem: ICreditCardItem
): number {
  const firstInstalmentDate = new Date(creditCardItem.firstInstalmentDate);
  const now = new Date();

  let instalmentsPaid = Math.ceil(
    (now.getTime() - firstInstalmentDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );

  if (instalmentsPaid < 0) {
    instalmentsPaid = 0; // if the first instalment date is in the future, we know instalment is not Paid yet and we set it to 0
  }

  return instalmentsPaid;
}
