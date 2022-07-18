import { Module } from '@nestjs/common';

import { PrivateCreditCardsFullModule } from './credit-cards/private-credit-cards-full.module';

const privateModules = [PrivateCreditCardsFullModule];

@Module({
  imports: privateModules,
  exports: privateModules,
})
export class PrivateModule {}
