import { Module } from '@nestjs/common';

import { PrivateCreditCardIssuersModule } from './credit-card-issuers/private-credit-card-issuers.module';
import { PrivateCreditCardItemsModule } from './credit-card-items/private-credit-card-items.module';
import { PrivateCreditCardsModule } from './credit-cards/private-credit-cards.module';

const modules = [
  PrivateCreditCardIssuersModule,
  PrivateCreditCardsModule,
  PrivateCreditCardItemsModule,
];

@Module({
  imports: modules,
  exports: modules,
})
export class PrivateCreditCardsFullModule {}
