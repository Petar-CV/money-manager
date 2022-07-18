import { Module } from '@nestjs/common';

import { PrivateCreditCardItemsService } from './private-credit-card-items.service';
import { PrivateCreditCardItemsController } from './private-credit-card-items.controller';

@Module({
  controllers: [PrivateCreditCardItemsController],
  providers: [PrivateCreditCardItemsService],
})
export class PrivateCreditCardItemsModule {}
