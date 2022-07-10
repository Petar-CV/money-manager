import { Module } from '@nestjs/common';

import { AdminCreditCardItemsService } from './admin-credit-card-items.service';
import { AdminCreditCardItemsController } from './admin-credit-card-items.controller';

@Module({
  controllers: [AdminCreditCardItemsController],
  providers: [AdminCreditCardItemsService],
})
export class AdminCreditCardItemsModule {}
