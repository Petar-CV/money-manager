import { Module } from '@nestjs/common';

import { AdminCreditCardsFullModule } from './credit-cards/admin-credit-cards-full.module';

const adminModules = [AdminCreditCardsFullModule];

@Module({
  imports: adminModules,
  exports: adminModules,
})
export class AdminModule {}
