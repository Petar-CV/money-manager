import { Module } from '@nestjs/common';

import { PublicCreditCardIssuersService } from './public-credit-card-issuers.service';
import { PublicCreditCardIssuersController } from './public-credit-card-issuers.controller';

@Module({
  controllers: [PublicCreditCardIssuersController],
  providers: [PublicCreditCardIssuersService],
})
export class PublicCreditCardIssuersModule {}
