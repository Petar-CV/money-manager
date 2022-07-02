import { Module } from '@nestjs/common';

import { PublicCreditCardIssuersModule } from './credit-card-issuers/public-credit-card-issuers.module';

const publicModules = [PublicCreditCardIssuersModule];

@Module({
  imports: publicModules,
  exports: publicModules,
})
export class PublicModule {}
