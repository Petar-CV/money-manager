import { Module } from '@nestjs/common';

import { AdminCreditCardsModule } from './credit-cards/admin-credit-card-dashboard.module';

const modules = [AdminCreditCardsModule];

@Module({
  imports: modules,
  exports: modules,
})
export class AdminCreditDashboardModule {}
