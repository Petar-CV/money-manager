import { Module } from '@nestjs/common';

import { PrivateCreditCardsFullModule } from './credit-cards/private-credit-cards-full.module';
import { ProfileSettingsModule } from './profile/settings/user-profile-settings.module';

const privateModules = [PrivateCreditCardsFullModule, ProfileSettingsModule];

@Module({
  imports: privateModules,
  exports: privateModules,
})
export class PrivateModule {}
