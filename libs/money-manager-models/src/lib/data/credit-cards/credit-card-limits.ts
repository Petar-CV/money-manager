import { CreditCardLimit } from '@prisma/client';

export const CreditCardLimits = [
  {
    name: 'adminCreditCards.fields.limitType.values.MONTHLY',
    value: CreditCardLimit.MONTHLY,
  },
  {
    name: 'adminCreditCards.fields.limitType.values.OVERALL',
    value: CreditCardLimit.OVERALL,
  },
];
