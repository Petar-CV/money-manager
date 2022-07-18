import { Module } from '@nestjs/common';

import { AdminCreditCardsService } from './admin-credit-cards.service';
import { AdminCreditCardsController } from './admin-credit-cards.controller';

@Module({
  controllers: [AdminCreditCardsController],
  providers: [AdminCreditCardsService],
})
export class AdminCreditCardsModule {}
