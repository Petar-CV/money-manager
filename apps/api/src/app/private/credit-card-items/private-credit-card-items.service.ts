import { Injectable } from '@nestjs/common';
import { CreditCardItem, Prisma } from '@prisma/client';

import {
  CommonResponses,
  IApiResponse,
  PaginatedSortAndSearch,
} from '@petar-cv/api-interfaces';
import { createGlobalFilter } from '@petar-cv/prisma-utils';

import { PrismaService } from '../../../prisma/prisma.service';
import { IAuthenticatedUser } from '../../../models/keycloak/authenticated-user.model';
import { PrivateCreditCardItemsResponses } from './responses/private-credit-card-items-responses';
import { UpdatePrivateCreditCardItemDto } from './dto/update-private-credit-card-item.dto';
import { CreatePrivateCreditCardItemDto } from './dto/create-private-credit-card-item.dto';
import { IRequestForLogging } from 'apps/api/src/models/errors/request-for-logging.model';
import { createExceptionFromRequest } from '../../shared/utils/exception-from-request.util';
import { KafkaTopics } from '../../shared/constants/kafka-topics.constants';
import { KafkaProducerService } from '../../shared/modules/kafka/kafka-producer.service';

@Injectable()
export class PrivateCreditCardItemsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaProducerService: KafkaProducerService
  ) {}

  async findMyCreditCardItems(
    req: IRequestForLogging,
    paginatedSortAndSearch: PaginatedSortAndSearch,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem[]>> {
    try {
      const { page, perPage, search } = paginatedSortAndSearch;

      const filter = createGlobalFilter<
        typeof Prisma.CreditCardItemScalarFieldEnum
      >({
        search: search,
        matchType: 'contains',
        includedFields: {
          id: true,
          name: true,
          description: true,
        },
      });

      const [creditCardItems, count] = await this.prisma.$transaction([
        this.prisma.creditCardItem.findMany({
          where: {
            OR: filter,
            deletedAt: null,
            userId: user.user_id,
          },
          skip: perPage && page ? perPage * (page - 1) : undefined,
          take: perPage && page ? perPage : undefined,
        }),
        this.prisma.creditCardItem.count({
          where: {
            OR: filter,
            deletedAt: null,
            userId: user.user_id,
          },
        }),
      ]);

      return {
        data: creditCardItems,
        totalItems: count,
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

  async findMyCreditCard(
    req: IRequestForLogging,
    id: string,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem>> {
    try {
      const creditCardItem = await this.prisma.creditCardItem.findFirst({
        where: {
          id: id,
          deletedAt: null,
          userId: user.user_id,
        },
      });

      return {
        data: creditCardItem,
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
    createCreditCardDto: CreatePrivateCreditCardItemDto,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem>> {
    try {
      const creditCardItem = await this.prisma.creditCardItem.create({
        data: {
          name: createCreditCardDto.name,
          boughtAt: createCreditCardDto.boughtAt,
          amount: createCreditCardDto.amount,
          instalments: createCreditCardDto.instalments,
          description: createCreditCardDto.description,
          userId: user.user_id,
          card: {
            connect: {
              id: createCreditCardDto.cardId,
            },
          },
        },
      });

      return {
        data: creditCardItem,
        message: PrivateCreditCardItemsResponses.CREATED,
        param: creditCardItem.id,
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
    id: string,
    updateCreditCardDto: UpdatePrivateCreditCardItemDto,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem>> {
    try {
      const creditCardItem = await this.prisma.creditCardItem.update({
        where: {
          id: id,
        },
        data: {
          name: updateCreditCardDto.name,
          boughtAt: updateCreditCardDto.boughtAt,
          amount: updateCreditCardDto.amount,
          instalments: updateCreditCardDto.instalments,
          description: updateCreditCardDto.description,
          userId: user.user_id,
          card: {
            connect: {
              id: updateCreditCardDto.cardId,
            },
          },
        },
      });

      return {
        data: creditCardItem,
        message: PrivateCreditCardItemsResponses.UPDATED,
        param: creditCardItem.id,
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

  async remove(
    req: IRequestForLogging,
    id: string,
    user: IAuthenticatedUser
  ): Promise<IApiResponse> {
    try {
      await this.prisma.creditCardItem.updateMany({
        where: {
          id: id,
          userId: user.user_id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return {
        message: PrivateCreditCardItemsResponses.DELETED,
        param: id,
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
