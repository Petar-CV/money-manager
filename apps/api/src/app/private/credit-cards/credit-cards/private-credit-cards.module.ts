import { Module } from '@nestjs/common';

import { PrivateCreditCardsService } from './private-credit-cards.service';
import { PrivateCreditCardsController } from './private-credit-cards.controller';

@Module({
  controllers: [PrivateCreditCardsController],
  providers: [PrivateCreditCardsService],
})
export class PrivateCreditCardsModule {}
