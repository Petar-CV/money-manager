import { Module } from '@nestjs/common';

import { PublicCreditCardsService } from './public-credit-cards.service';
import { PublicCreditCardsController } from './public-credit-cards.controller';

@Module({
  controllers: [PublicCreditCardsController],
  providers: [PublicCreditCardsService],
})
export class PublicCreditCardsModule {}
