import { Module } from '@nestjs/common';

import { AdminCreditCardIssuersModule } from './credit-card-issuers/admin-credit-card-issuers.module';
import { AdminCreditCardItemsModule } from './credit-card-items/admin-credit-card-items.module';
import { AdminCreditCardsModule } from './credit-cards/admin-credit-cards.module';

const modules = [
  AdminCreditCardIssuersModule,
  AdminCreditCardsModule,
  AdminCreditCardItemsModule,
];

@Module({
  imports: modules,
  exports: modules,
})
export class AdminCreditCardsFullModule {}
