import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaService } from 'apps/api/src/prisma/prisma.service';
import { IExceptionLog } from 'apps/api/src/models/errors/request-for-logging.model';
import { KafkaTopics } from '../../constants/kafka-topics.constants';
import { KafkaConsumerService } from '../../modules/kafka/kafka-consumer.service';

@Injectable()
export class ExceptionLoggerService implements OnModuleInit {
  constructor(
    private readonly kafkaConsumerService: KafkaConsumerService,
    private readonly prisma: PrismaService
  ) {}

  async onModuleInit() {
    await this.kafkaConsumerService.consume(
      { topics: [KafkaTopics.EXCEPTION_LOGGER] },
      {
        eachMessage: async ({ message }) => {
          await this.saveExceptionToDb(
            JSON.parse(message.value.toString()) as IExceptionLog
          );
        },
      }
    );
  }

  private async saveExceptionToDb(exception: IExceptionLog) {
    await this.prisma.exception.create({
      data: {
        endpoint: exception.endpoint,
        message: exception.message ?? '',
        params: exception.params ?? '',
        query: exception.query ?? '',
        userId: exception.userId,
      },
    });
  }
}
