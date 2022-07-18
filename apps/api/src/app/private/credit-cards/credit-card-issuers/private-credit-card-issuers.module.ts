import { Module } from '@nestjs/common';

import { PrivateCreditCardIssuersService } from './private-credit-card-issuers.service';
import { PrivateCreditCardIssuersController } from './private-credit-card-issuers.controller';

@Module({
  controllers: [PrivateCreditCardIssuersController],
  providers: [PrivateCreditCardIssuersService],
})
export class PrivateCreditCardIssuersModule {}
