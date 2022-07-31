import { Injectable, Logger } from '@nestjs/common';
import { CreditCardItem, Prisma } from '@prisma/client';

import {
  CommonResponses,
  IApiResponse,
  PaginatedSortAndSearch,
} from '@petar-cv/api-interfaces';
import { createGlobalFilter } from '@petar-cv/prisma-utils';

import { PrismaService } from '../../../../prisma/prisma.service';
import { AdminCreditCardItemsResponses } from './responses/admin-credit-card-items-responses';
import { UpdateAdminCreditCardItemDto } from './dto/update-admin-credit-card-item.dto';
import { CreateAdminCreditCardItemDto } from './dto/create-admin-credit-card-item.dto';
import { createExceptionFromRequest } from '../../../shared/utils/exception-from-request.util';
import { KafkaTopics } from '../../../shared/constants/kafka-topics.constants';
import { KafkaProducerService } from '../../../shared/modules/kafka/kafka-producer.service';
import { IRequestForLogging } from 'apps/api/src/models/errors/request-for-logging.model';
import { createExceptionStringForLoggerFromRequest } from '../../../shared/utils/exception-log-from-request.util';

@Injectable()
export class AdminCreditCardItemsService {
  private readonly logger = new Logger(AdminCreditCardItemsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaProducerService: KafkaProducerService
  ) {}

  async findAll(
    req: IRequestForLogging,
    paginatedSortAndSearch: PaginatedSortAndSearch
  ): Promise<IApiResponse<CreditCardItem[]>> {
    try {
      const { page, perPage, search } = paginatedSortAndSearch;

      this.logger.log(
        `Executing findAll with page: ${page}, perPage: ${perPage}, search: ${search}`
      );

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
          },
          skip: perPage && page ? perPage * (page - 1) : undefined,
          take: perPage && page ? perPage : undefined,
        }),
        this.prisma.creditCardItem.count({
          where: {
            OR: filter,
            deletedAt: null,
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
  ): Promise<IApiResponse<CreditCardItem>> {
    try {
      this.logger.log(`Executing findOne with id: ${id}`);

      const creditCardItem = await this.prisma.creditCardItem.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      return {
        data: creditCardItem,
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

  async create(
    req: IRequestForLogging,
    createCreditCardDto: CreateAdminCreditCardItemDto
  ): Promise<IApiResponse<CreditCardItem>> {
    try {
      this.logger.log(`Executing create`);

      const creditCardItem = await this.prisma.creditCardItem.create({
        data: {
          name: createCreditCardDto.name,
          boughtAt: createCreditCardDto.boughtAt,
          firstInstalmentDate: createCreditCardDto.firstInstalmentDate,
          amount: createCreditCardDto.amount,
          instalments: createCreditCardDto.instalments,
          description: createCreditCardDto.description,
          userId: createCreditCardDto.userId,
          card: {
            connect: {
              id: createCreditCardDto.cardId,
            },
          },
        },
      });

      return {
        data: creditCardItem,
        message: AdminCreditCardItemsResponses.CREATED,
        param: creditCardItem.id,
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
    updateCreditCardDto: UpdateAdminCreditCardItemDto
  ): Promise<IApiResponse<CreditCardItem>> {
    try {
      this.logger.log(`Executing update for id: ${id}`);

      const creditCardItem = await this.prisma.creditCardItem.update({
        where: {
          id: id,
        },
        data: {
          name: updateCreditCardDto.name,
          boughtAt: updateCreditCardDto.boughtAt,
          firstInstalmentDate: updateCreditCardDto.firstInstalmentDate,
          amount: updateCreditCardDto.amount,
          instalments: updateCreditCardDto.instalments,
          description: updateCreditCardDto.description,
          userId: updateCreditCardDto.userId,
          card: {
            connect: {
              id: updateCreditCardDto.cardId,
            },
          },
        },
      });

      return {
        data: creditCardItem,
        message: AdminCreditCardItemsResponses.UPDATED,
        param: creditCardItem.id,
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

      await this.prisma.creditCardItem.updateMany({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return {
        message: AdminCreditCardItemsResponses.DELETED,
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
