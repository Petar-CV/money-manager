import { CreditCardLimit } from '../../models/credit-cards/credit-card-limit.model';

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
