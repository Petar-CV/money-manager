import { Injectable } from '@nestjs/common';
import { Prisma, CreditCardIssuer } from '@prisma/client';

import {
  CommonResponses,
  IApiResponse,
  PaginatedSortAndSearch,
} from '@petar-cv/api-interfaces';
import { createGlobalFilter } from '@petar-cv/prisma-utils';

import { CreateAdminCreditCardIssuerDto } from './dto/create-admin-credit-card-issuer.dto';
import { UpdateAdminCreditCardIssuerDto } from './dto/update-admin-credit-card-issuer.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { AdminCreditCardIssuersResponses } from './responses/admin-credit-card-issuers-responses';
import { KafkaProducerService } from '../../shared/modules/kafka/kafka-producer.service';
import { IRequestForLogging } from 'apps/api/src/models/errors/request-for-logging.model';
import { KafkaTopics } from '../../shared/constants/kafka-topics.constants';
import { createExceptionFromRequest } from '../../shared/utils/exception-from-request.util';

@Injectable()
export class AdminCreditCardIssuersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaProducerService: KafkaProducerService
  ) {}

  async findAll(
    req: IRequestForLogging,
    paginatedSortAndSearch: PaginatedSortAndSearch
  ): Promise<IApiResponse<CreditCardIssuer[]>> {
    try {
      const { page, perPage, search } = paginatedSortAndSearch;

      const filter = createGlobalFilter<
        typeof Prisma.CreditCardIssuerScalarFieldEnum
      >({
        search: search,
        matchType: 'contains',
        includedFields: {
          id: true,
          name: true,
        },
      });

      const [creditCardIssuers, count] = await this.prisma.$transaction([
        this.prisma.creditCardIssuer.findMany({
          where: {
            OR: filter,
            deletedAt: null,
          },
          skip: perPage && page ? perPage * (page - 1) : undefined,
          take: perPage && page ? perPage : undefined,
        }),
        this.prisma.creditCardIssuer.count({
          where: {
            OR: filter,
            deletedAt: null,
          },
        }),
      ]);

      return {
        data: creditCardIssuers,
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

  async findAllLov(
    req: IRequestForLogging
  ): Promise<IApiResponse<Partial<CreditCardIssuer>[]>> {
    try {
      const creditCardIssuers = await this.prisma.creditCardIssuer.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          deletedAt: null,
        },
      });

      return {
        data: creditCardIssuers,
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

  async findOne(
    req: IRequestForLogging,
    id: string
  ): Promise<IApiResponse<CreditCardIssuer>> {
    try {
      const creditCardIssuer = await this.prisma.creditCardIssuer.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      return {
        data: creditCardIssuer,
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
    createAdminCreditCardIssuerDto: CreateAdminCreditCardIssuerDto
  ): Promise<IApiResponse<CreditCardIssuer>> {
    try {
      const creditCardIssuer = await this.prisma.creditCardIssuer.create({
        data: {
          name: createAdminCreditCardIssuerDto.name,
          logo: createAdminCreditCardIssuerDto.logo,
        },
      });

      return {
        data: creditCardIssuer,
        message: AdminCreditCardIssuersResponses.CREATED,
        param: creditCardIssuer.id,
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
    updateAdminCreditCardIssuerDto: UpdateAdminCreditCardIssuerDto
  ): Promise<IApiResponse<CreditCardIssuer>> {
    try {
      const creditCardIssuer = await this.prisma.creditCardIssuer.update({
        where: {
          id: id,
        },
        data: {
          name: updateAdminCreditCardIssuerDto.name,
          logo: updateAdminCreditCardIssuerDto.logo,
          updatedAt: new Date(),
        },
      });

      return {
        data: creditCardIssuer,
        message: AdminCreditCardIssuersResponses.UPDATED,
        param: creditCardIssuer.id,
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

  async remove(req: IRequestForLogging, id: string): Promise<IApiResponse> {
    try {
      await this.prisma.creditCardIssuer.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return {
        message: AdminCreditCardIssuersResponses.DELETED,
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
