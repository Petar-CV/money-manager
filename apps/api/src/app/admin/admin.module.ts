import { Module } from '@nestjs/common';

import { AdminCreditCardsFullModule } from './credit-cards/admin-credit-cards-full.module';
import { AdminCreditDashboardModule } from './dashboard/admin-dashboard.module';

const adminModules = [AdminCreditCardsFullModule, AdminCreditDashboardModule];

@Module({
  imports: adminModules,
  exports: adminModules,
})
export class AdminModule {}
