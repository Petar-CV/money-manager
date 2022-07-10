import { Module } from '@nestjs/common';

import { PublicCreditCardItemsService } from './public-credit-card-items.service';
import { PublicCreditCardItemsController } from './public-credit-card-items.controller';

@Module({
  controllers: [PublicCreditCardItemsController],
  providers: [PublicCreditCardItemsService],
})
export class PublicCreditCardItemsModule {}
