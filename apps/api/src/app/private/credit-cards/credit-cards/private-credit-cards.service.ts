import { Injectable, Logger } from '@nestjs/common';
import { CreditCard, CreditCardItem, Prisma } from '@prisma/client';

import {
  CommonResponses,
  IApiResponse,
  PaginatedSortAndSearch,
} from '@petar-cv/api-interfaces';
import { createGlobalFilter } from '@petar-cv/prisma-utils';

import { PrismaService } from '../../../../prisma/prisma.service';
import { IAuthenticatedUser } from '../../../../models/keycloak/authenticated-user.model';
import { PrivateCreditCardsResponses } from './responses/private-credit-cards-responses';
import { UpdatePrivateCreditCardDto } from './dto/update-private-credit-card.dto';
import { CreatePrivateCreditCardDto } from './dto/create-private-credit-card.dto';
import { IRequestForLogging } from 'apps/api/src/models/errors/request-for-logging.model';
import { KafkaProducerService } from '../../../shared/modules/kafka/kafka-producer.service';
import { KafkaTopics } from '../../../shared/constants/kafka-topics.constants';
import { createExceptionFromRequest } from '../../../shared/utils/exception-from-request.util';
import { createExceptionStringForLoggerFromRequest } from '../../../shared/utils/exception-log-from-request.util';

@Injectable()
export class PrivateCreditCardsService {
  private readonly logger = new Logger(PrivateCreditCardsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaProducerService: KafkaProducerService
  ) {}

  async findAll(
    req: IRequestForLogging,
    paginatedSortAndSearch: PaginatedSortAndSearch,
    user: IAuthenticatedUser
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
            userId: user.sub,
          },
          include: {
            issuer: true,
          },
          skip: perPage && page ? perPage * (page - 1) : undefined,
          take: perPage && page ? perPage : undefined,
        }),
        this.prisma.creditCard.count({
          where: {
            OR: filter,
            deletedAt: null,
            userId: user.sub,
          },
        }),
      ]);

      return {
        data: creditCards,
        totalItems: count,
        success: true,
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
        success: false,
      };
    }
  }

  async findAllLov(
    req: IRequestForLogging,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<Partial<CreditCard>[]>> {
    try {
      this.logger.log(`Executing findAllLov`);

      const data = await this.prisma.creditCard.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          deletedAt: null,
          userId: user.sub,
        },
      });

      return {
        data: data,
        success: true,
      };
    } catch (exception) {
      const exceptionLog = createExceptionFromRequest(req, exception);

      this.logger.error(
        createExceptionStringForLoggerFromRequest(
          this.findAllLov.name,
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
        success: false,
      };
    }
  }

  async findOne(
    req: IRequestForLogging,
    id: string,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard>> {
    try {
      this.logger.log(`Executing findOne with id: ${id}`);

      const creditCard = await this.prisma.creditCard.findFirst({
        where: {
          id: id,
          deletedAt: null,
          userId: user.sub,
        },
        include: {
          issuer: true,
          items: true,
        },
      });

      return {
        data: creditCard,
        success: true,
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
        success: false,
      };
    }
  }

  async findAllItemsForMyCreditCard(
    req: IRequestForLogging,
    paginatedSortAndSearch: PaginatedSortAndSearch,
    id: string,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem[]>> {
    try {
      const { page, perPage, search } = paginatedSortAndSearch;

      this.logger.log(
        `Executing findAllItemsForMyCreditCard with page: ${page}, perPage: ${perPage}, search: ${search}`
      );

      const filter = createGlobalFilter<
        typeof Prisma.CreditCardScalarFieldEnum
      >({
        search: search,
        matchType: 'contains',
        includedFields: {
          name: true,
        },
      });

      const [creditCardItems, count] = await this.prisma.$transaction([
        this.prisma.creditCardItem.findMany({
          where: {
            OR: filter,
            deletedAt: null,
            cardId: id,
            userId: user.sub,
          },
          skip: perPage && page ? perPage * (page - 1) : undefined,
          take: perPage && page ? perPage : undefined,
        }),
        this.prisma.creditCardItem.count({
          where: {
            OR: filter,
            deletedAt: null,
            cardId: id,
            userId: user.sub,
          },
        }),
      ]);

      return {
        data: creditCardItems,
        totalItems: count,
        success: true,
      };
    } catch (exception) {
      const exceptionLog = createExceptionFromRequest(req, exception);

      this.logger.error(
        createExceptionStringForLoggerFromRequest(
          this.findAllItemsForMyCreditCard.name,
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
        success: false,
      };
    }
  }

  async create(
    req: IRequestForLogging,
    createCreditCardDto: CreatePrivateCreditCardDto,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard>> {
    try {
      this.logger.log(`Executing create`);

      const creditCard = await this.prisma.creditCard.create({
        data: {
          name: createCreditCardDto.name,
          billingDate: createCreditCardDto.billingDate,
          limit: createCreditCardDto.limit,
          userId: user.sub,
          limitType: createCreditCardDto.limitType,
          issuer: {
            connect: {
              id: createCreditCardDto.issuerId,
            },
          },
        },
      });

      return {
        data: creditCard,
        message: PrivateCreditCardsResponses.CREATED,
        param: creditCard.id,
        success: true,
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
        success: false,
      };
    }
  }

  async update(
    req: IRequestForLogging,
    id: string,
    updateCreditCardDto: UpdatePrivateCreditCardDto,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard>> {
    try {
      this.logger.log(`Executing update for id: ${id}`);

      const creditCard = await this.prisma.creditCard.update({
        where: {
          id: id,
        },
        data: {
          name: updateCreditCardDto.name,
          billingDate: updateCreditCardDto.billingDate,
          limit: updateCreditCardDto.limit,
          userId: user.sub,
          limitType: updateCreditCardDto.limitType,
          updatedAt: new Date(),
          issuer: {
            connect: {
              id: updateCreditCardDto.issuerId,
            },
          },
        },
      });

      return {
        data: creditCard,
        message: PrivateCreditCardsResponses.UPDATED,
        param: creditCard.id,
        success: true,
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
        success: false,
      };
    }
  }

  async remove(
    req: IRequestForLogging,
    id: string,
    user: IAuthenticatedUser
  ): Promise<IApiResponse> {
    try {
      this.logger.log(`Executing delete for id: ${id}`);

      await this.prisma.creditCard.updateMany({
        where: {
          id: id,
          userId: user.sub,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return {
        message: PrivateCreditCardsResponses.DELETED,
        param: id,
        success: true,
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
        success: false,
      };
    }
  }
}
