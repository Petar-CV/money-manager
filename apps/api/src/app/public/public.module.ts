import { Module } from '@nestjs/common';

import { PublicCreditCardIssuersModule } from './credit-card-issuers/public-credit-card-issuers.module';
import { PublicCreditCardItemsModule } from './credit-card-items/public-credit-card-items.module';
import { PublicCreditCardsModule } from './credit-cards/public-credit-cards.module';

const publicModules = [
  PublicCreditCardIssuersModule,
  PublicCreditCardsModule,
  PublicCreditCardItemsModule,
];

@Module({
  imports: publicModules,
  exports: publicModules,
})
export class PublicModule {}
