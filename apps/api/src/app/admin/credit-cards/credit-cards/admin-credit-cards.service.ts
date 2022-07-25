import { Injectable, Logger } from '@nestjs/common';
import { Prisma, CreditCard, CreditCardItem } from '@prisma/client';

import {
  CommonResponses,
  IApiResponse,
  PaginatedSortAndSearch,
} from '@petar-cv/api-interfaces';
import { createGlobalFilter } from '@petar-cv/prisma-utils';

import { CreateAdminCreditCardDto } from './dto/create-admin-credit-card.dto';
import { UpdateAdminCreditCardDto } from './dto/update-admin-credit-card.dto';
import { PrismaService } from '../../../../prisma/prisma.service';
import { AdminCreditCardsResponses } from './responses/admin-credit-cards-responses';
import { KafkaTopics } from '../../../shared/constants/kafka-topics.constants';
import { createExceptionFromRequest } from '../../../shared/utils/exception-from-request.util';
import { KafkaProducerService } from '../../../shared/modules/kafka/kafka-producer.service';
import { IRequestForLogging } from 'apps/api/src/models/errors/request-for-logging.model';
import { createExceptionStringForLoggerFromRequest } from '../../../shared/utils/exception-log-from-request.util';

@Injectable()
export class AdminCreditCardsService {
  private readonly logger = new Logger(AdminCreditCardsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaProducerService: KafkaProducerService
  ) {}

  async findAll(
    req: IRequestForLogging,
    paginatedSortAndSearch: PaginatedSortAndSearch
  ): Promise<IApiResponse<CreditCard[]>> {
    try {
      const { page, perPage, search } = paginatedSortAndSearch;

      this.logger.log(
        `Executing findAll with page: ${page}, perPage: ${perPage}, search: ${search}`
      );

      const filter = createGlobalFilter<
        typeof Prisma.CreditCardScalarFieldEnum
      >({
        search: search,
        matchType: 'contains',
        includedFields: {
          id: true,
          name: true,
        },
      });

      const [creditCards, count] = await this.prisma.$transaction([
        this.prisma.creditCard.findMany({
          where: {
            OR: filter,
            deletedAt: null,
          },
          skip: perPage && page ? perPage * (page - 1) : undefined,
          take: perPage && page ? perPage : undefined,
        }),
        this.prisma.creditCard.count({
          where: {
            OR: filter,
            deletedAt: null,
          },
        }),
      ]);

      return {
        data: creditCards,
        totalItems: count,
      };
    } catch (exception) {
      const exceptionLog = createExceptionFromRequest(req, exception);

      this.logger.error(
        createExceptionStringForLoggerFromRequest(
          this.findAll.name,
          exceptionLog
        )
      );

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

  async findOne(
    req: IRequestForLogging,
    id: string
  ): Promise<IApiResponse<CreditCard>> {
    try {
      this.logger.log(`Executing findOne with id: ${id}`);

      const creditCard = await this.prisma.creditCard.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      return {
        data: creditCard,
      };
    } catch (exception) {
      const exceptionLog = createExceptionFromRequest(req, exception);

      this.logger.error(
        createExceptionStringForLoggerFromRequest(
          this.findOne.name,
          exceptionLog
        )
      );

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

  async findAllItemsForCreditCard(
    req: IRequestForLogging,
    paginatedSortAndSearch: PaginatedSortAndSearch,
    id: string
  ): Promise<IApiResponse<CreditCardItem[]>> {
    try {
      const { page, perPage, search } = paginatedSortAndSearch;

      this.logger.log(
        `Executing findAllItemsForCreditCard with page: ${page}, perPage: ${perPage}, search: ${search}`
      );

      const filter = createGlobalFilter<
        typeof Prisma.CreditCardItemScalarFieldEnum
      >({
        search: search,
        matchType: 'contains',
        includedFields: {
          id: true,
          name: true,
        },
      });

      const [creditCardItems, count] = await this.prisma.$transaction([
        this.prisma.creditCardItem.findMany({
          where: {
            OR: filter,
            deletedAt: null,
            cardId: id,
          },
          skip: perPage && page ? perPage * (page - 1) : undefined,
          take: perPage && page ? perPage : undefined,
        }),
        this.prisma.creditCardItem.count({
          where: {
            OR: filter,
            deletedAt: null,
            cardId: id,
          },
        }),
      ]);

      return {
        data: creditCardItems,
        totalItems: count,
      };
    } catch (exception) {
      const exceptionLog = createExceptionFromRequest(req, exception);

      this.logger.error(
        createExceptionStringForLoggerFromRequest(
          this.findAllItemsForCreditCard.name,
          exceptionLog
        )
      );

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
    createAdminCreditCardDto: CreateAdminCreditCardDto
  ): Promise<IApiResponse<CreditCard>> {
    try {
      this.logger.log(`Executing create`);

      const creditCard = await this.prisma.creditCard.create({
        data: {
          name: createAdminCreditCardDto.name,
          billingDate: createAdminCreditCardDto.billingDate,
          limit: createAdminCreditCardDto.limit,
          userId: createAdminCreditCardDto.userId,
          issuer: {
            connect: {
              id: createAdminCreditCardDto.issuerId,
            },
          },
        },
      });

      return {
        data: creditCard,
        message: AdminCreditCardsResponses.CREATED,
        param: creditCard.id,
      };
    } catch (exception) {
      const exceptionLog = createExceptionFromRequest(req, exception);

      this.logger.error(
        createExceptionStringForLoggerFromRequest(
          this.create.name,
          exceptionLog
        )
      );

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
    updateAdminCreditCardDto: UpdateAdminCreditCardDto
  ): Promise<IApiResponse<CreditCard>> {
    try {
      this.logger.log(`Executing update for id: ${id}`);

      const creditCard = await this.prisma.creditCard.update({
        where: {
          id: id,
        },
        data: {
          name: updateAdminCreditCardDto.name,
          billingDate: updateAdminCreditCardDto.billingDate,
          limit: updateAdminCreditCardDto.limit,
          userId: updateAdminCreditCardDto.userId,
          updatedAt: new Date(),
          issuer: {
            connect: {
              id: updateAdminCreditCardDto.issuerId,
            },
          },
        },
      });

      return {
        data: creditCard,
        message: AdminCreditCardsResponses.UPDATED,
        param: creditCard.id,
      };
    } catch (exception) {
      const exceptionLog = createExceptionFromRequest(req, exception);

      this.logger.error(
        createExceptionStringForLoggerFromRequest(
          this.update.name,
          exceptionLog
        )
      );

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

  async remove(req: IRequestForLogging, id: string): Promise<IApiResponse> {
    try {
      this.logger.log(`Executing delete for id: ${id}`);

      await this.prisma.creditCard.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return {
        message: AdminCreditCardsResponses.DELETED,
        param: id,
      };
    } catch (exception) {
      const exceptionLog = createExceptionFromRequest(req, exception);

      this.logger.error(
        createExceptionStringForLoggerFromRequest(
          this.remove.name,
          exceptionLog
        )
      );

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
