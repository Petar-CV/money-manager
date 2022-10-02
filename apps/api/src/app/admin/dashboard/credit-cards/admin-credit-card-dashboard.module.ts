import { Module } from '@nestjs/common';

import { AdminCreditCardDashboardService } from './admin-credit-card-dashboard.service';
import { AdminCreditCardDashboardController } from './admin-credit-card-dashboard.controller';

@Module({
  controllers: [AdminCreditCardDashboardController],
  providers: [AdminCreditCardDashboardService],
})
export class AdminCreditCardsModule {}
