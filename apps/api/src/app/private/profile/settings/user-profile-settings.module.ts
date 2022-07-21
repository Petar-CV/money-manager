import { Module } from '@nestjs/common';

import { ProfileSettingsService } from './user-profile-settings.service';
import { ProfileSettingsController } from './user-profile-settings.controller';

@Module({
  controllers: [ProfileSettingsController],
  providers: [ProfileSettingsService],
})
export class ProfileSettingsModule {}
