import { Injectable } from '@nestjs/common';
import { UserProfileSettings } from '@prisma/client';

import { CommonResponses, IApiResponse } from '@petar-cv/api-interfaces';

import { PrismaService } from '../../../../prisma/prisma.service';
import { IAuthenticatedUser } from '../../../../models/keycloak/authenticated-user.model';
import { ProfileSettingsResponses } from './responses/user-profile-settings-responses';
import { UpdateProfileSettingsDto } from './dto/update-user-profile-settings.dto';
import { CreateProfileSettingsDto } from './dto/create-profile-settings.dto';
import { IRequestForLogging } from 'apps/api/src/models/errors/request-for-logging.model';
import { KafkaProducerService } from '../../../shared/modules/kafka/kafka-producer.service';
import { KafkaTopics } from '../../../shared/constants/kafka-topics.constants';
import { createExceptionFromRequest } from '../../../shared/utils/exception-from-request.util';

@Injectable()
export class ProfileSettingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaProducerService: KafkaProducerService
  ) {}

  async findOne(
    req: IRequestForLogging,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<UserProfileSettings>> {
    try {
      const userProfileSettings =
        await this.prisma.userProfileSettings.findFirst({
          where: {
            userId: user.user_id,
          },
        });

      return {
        data: userProfileSettings,
      };
    } catch (exception) {
      const exceptionLog = createExceptionFromRequest(req, exception);

      this.kafkaProducerService.produce({
        topic: KafkaTopics.EXCEPTION_LOGGER,
        messages: [
          {
            value: JSON.stringify(exceptionLog),
          },
        ],
      });

      return {
        message: CommonResponses.SERVER_ERROR,
      };
    }
  }

  async create(
    req: IRequestForLogging,
    createProfileSettingsDto: CreateProfileSettingsDto,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<UserProfileSettings>> {
    try {
      const userProfileSettings = await this.prisma.userProfileSettings.create({
        data: {
          currency: createProfileSettingsDto.currency,
          language: createProfileSettingsDto.language,
          userId: user.user_id,
        },
      });

      return {
        data: userProfileSettings,
      };
    } catch (exception) {
      const exceptionLog = createExceptionFromRequest(req, exception);

      this.kafkaProducerService.produce({
        topic: KafkaTopics.EXCEPTION_LOGGER,
        messages: [
          {
            value: JSON.stringify(exceptionLog),
          },
        ],
      });

      return {
        message: CommonResponses.SERVER_ERROR,
      };
    }
  }

  async update(
    req: IRequestForLogging,
    updateProfileSettingsDto: UpdateProfileSettingsDto,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<UserProfileSettings>> {
    try {
      const userProfileSettings = await this.prisma.userProfileSettings.update({
        where: {
          userId: user.user_id,
        },
        data: {
          currency: updateProfileSettingsDto.currency,
          language: updateProfileSettingsDto.language,
          userId: user.user_id,
        },
      });

      return {
        data: userProfileSettings,
        message: ProfileSettingsResponses.UPDATED,
      };
    } catch (exception) {
      const exceptionLog = createExceptionFromRequest(req, exception);

      this.kafkaProducerService.produce({
        topic: KafkaTopics.EXCEPTION_LOGGER,
        messages: [
          {
            value: JSON.stringify(exceptionLog),
          },
        ],
      });

      return {
        message: CommonResponses.SERVER_ERROR,
      };
    }
  }
}
