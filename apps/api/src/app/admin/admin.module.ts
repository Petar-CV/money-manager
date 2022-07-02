import { Module } from '@nestjs/common';

import { AdminCreditCardIssuersModule } from './credit-card-issuers/admin-credit-card-issuers.module';

const adminModules = [AdminCreditCardIssuersModule];

@Module({
  imports: adminModules,
  exports: adminModules,
})
export class AdminModule {}
