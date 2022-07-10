import { Module } from '@nestjs/common';

import { AdminCreditCardIssuersModule } from './credit-card-issuers/admin-credit-card-issuers.module';
import { AdminCreditCardsModule } from './credit-cards/admin-credit-cards.module';

const adminModules = [AdminCreditCardIssuersModule, AdminCreditCardsModule];

@Module({
  imports: adminModules,
  exports: adminModules,
})
export class AdminModule {}
