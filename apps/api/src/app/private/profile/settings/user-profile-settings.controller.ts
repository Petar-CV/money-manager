import { Body, Controller, Get, Post, Put, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileSettings } from '@prisma/client';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';

import { IApiResponse } from '@petar-cv/api-interfaces';

import { ProfileSettingsService } from './user-profile-settings.service';
import { CreateProfileSettingsDto } from './dto/create-profile-settings.dto';
import { UpdateProfileSettingsDto } from './dto/update-user-profile-settings.dto';
import { IRequestForLogging } from 'apps/api/src/models/errors/request-for-logging.model';
import { IAuthenticatedUser } from 'apps/api/src/models/keycloak/authenticated-user.model';

@ApiTags('Private - User profile settings')
@ApiBearerAuth()
@Roles({ roles: ['admin', 'user'] })
@Controller('private/profile/settings')
export class ProfileSettingsController {
  constructor(
    private readonly userProfileSettingsService: ProfileSettingsService
  ) {}

  @Get()
  findOne(
    @Request() req: IRequestForLogging,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<ProfileSettings>> {
    return this.userProfileSettingsService.findOne(req, user);
  }

  @Post()
  create(
    @Request() req: IRequestForLogging,
    @Body() data: CreateProfileSettingsDto,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<ProfileSettings>> {
    return this.userProfileSettingsService.create(req, data, user);
  }

  @Put()
  update(
    @Request() req: IRequestForLogging,
    @Body() data: UpdateProfileSettingsDto,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<ProfileSettings>> {
    return this.userProfileSettingsService.update(req, data, user);
  }
}
