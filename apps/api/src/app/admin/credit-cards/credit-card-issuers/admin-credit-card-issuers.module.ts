import { Module } from '@nestjs/common';

import { AdminCreditCardIssuersService } from './admin-credit-card-issuers.service';
import { AdminCreditCardIssuersController } from './admin-credit-card-issuers.controller';

@Module({
  controllers: [AdminCreditCardIssuersController],
  providers: [AdminCreditCardIssuersService],
})
export class AdminCreditCardIssuersModule {}
