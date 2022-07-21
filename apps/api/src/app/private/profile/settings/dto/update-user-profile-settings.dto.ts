import { PartialType } from '@nestjs/swagger';

import { CreateProfileSettingsDto } from './create-profile-settings.dto';

export class UpdateProfileSettingsDto extends PartialType(
  CreateProfileSettingsDto
) {}
