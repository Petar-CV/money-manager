import { Injectable, Logger } from '@nestjs/common';

import { CommonResponses, IApiResponse } from '@petar-cv/api-interfaces';

import { PrismaService } from '../../../../prisma/prisma.service';
import { KafkaTopics } from '../../../shared/constants/kafka-topics.constants';
import { createExceptionFromRequest } from '../../../shared/utils/exception-from-request.util';
import { KafkaProducerService } from '../../../shared/modules/kafka/kafka-producer.service';
import { IRequestForLogging } from 'apps/api/src/models/errors/request-for-logging.model';
import { createExceptionStringForLoggerFromRequest } from '../../../shared/utils/exception-log-from-request.util';

@Injectable()
export class AdminCreditCardDashboardService {
  private readonly logger = new Logger(AdminCreditCardDashboardService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaProducerService: KafkaProducerService
  ) {}

  async countAllCards(req: IRequestForLogging): Promise<IApiResponse<number>> {
    try {
      this.logger.log(`Executing countAllCards for the admin dashboard`);

      const count = await this.prisma.creditCard.count({
        where: {
          deletedAt: null,
        },
      });

      return {
        data: count,
        success: true,
      };
    } catch (exception) {
      const exceptionLog = createExceptionFromRequest(req, exception);

      this.logger.error(
        createExceptionStringForLoggerFromRequest(
          this.countAllCards.name,
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

  async countAllIssuers(
    req: IRequestForLogging
  ): Promise<IApiResponse<number>> {
    try {
      this.logger.log(`Executing countAllIssuers for the admin dashboard`);

      const count = await this.prisma.creditCardIssuer.count({
        where: {
          deletedAt: null,
        },
      });

      return {
        data: count,
        success: true,
      };
    } catch (exception) {
      const exceptionLog = createExceptionFromRequest(req, exception);

      this.logger.error(
        createExceptionStringForLoggerFromRequest(
          this.countAllIssuers.name,
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

  async countAllItems(req: IRequestForLogging): Promise<IApiResponse<number>> {
    try {
      this.logger.log(`Executing countAllItems for the admin dashboard`);

      const count = await this.prisma.creditCardIssuer.count({
        where: {
          deletedAt: null,
        },
      });

      return {
        data: count,
        success: true,
      };
    } catch (exception) {
      const exceptionLog = createExceptionFromRequest(req, exception);

      this.logger.error(
        createExceptionStringForLoggerFromRequest(
          this.countAllItems.name,
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
