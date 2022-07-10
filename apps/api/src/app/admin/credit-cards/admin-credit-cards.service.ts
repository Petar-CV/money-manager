import { Injectable } from '@nestjs/common';
import { Prisma, CreditCard } from '@prisma/client';

import {
  CommonResponses,
  IApiResponse,
  PaginatedSortAndSearch,
} from '@petar-cv/api-interfaces';
import { createGlobalFilter } from '@petar-cv/prisma-utils';

import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { AdminCreditCardsResponses } from './responses/admin-credit-cards-responses';

@Injectable()
export class AdminCreditCardsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    paginatedSortAndSearch: PaginatedSortAndSearch
  ): Promise<IApiResponse<CreditCard[]>> {
    try {
      const { page, perPage, search } = paginatedSortAndSearch;

      const filter = createGlobalFilter({
        model: Prisma.CreditCardScalarFieldEnum,
        search: search,
        matchType: 'contains',
        includedFields: ['name'],
      });

      // TODO: Implement parallel transactions
      const count = await this.prisma.creditCard.count({
        where: {
          OR: filter,
          deletedAt: null,
        },
      });

      const creditCards = await this.prisma.creditCard.findMany({
        where: {
          OR: filter,
          deletedAt: null,
        },
        skip: perPage && page ? perPage * (page - 1) : undefined,
        take: perPage && page ? perPage : undefined,
      });

      return {
        data: creditCards,
        totalItems: count,
      };
    } catch (e) {
      // TODO: Turn this into error response
      console.log(e);
      return {
        message: CommonResponses.SERVER_ERROR,
      };
    }
  }

  async findOne(id: string): Promise<IApiResponse<CreditCard>> {
    const creditCard = await this.prisma.creditCard.findUnique({
      where: {
        id: id,
      },
    });

    return {
      data: creditCard,
    };
  }

  async create(
    createCreditCardDto: CreateCreditCardDto
  ): Promise<IApiResponse<CreditCard>> {
    try {
      const creditCard = await this.prisma.creditCard.create({
        data: {
          name: createCreditCardDto.name,
          billingDate: createCreditCardDto.billingDate,
          limit: createCreditCardDto.limit,
          userId: createCreditCardDto.userId,
          issuer: {
            connect: {
              id: createCreditCardDto.issuerId,
            },
          },
        },
      });

      return {
        data: creditCard,
        message: AdminCreditCardsResponses.CREATED,
        param: creditCard.id,
      };
    } catch (e) {
      // TODO: Turn this into error response
      console.log(e);
      return {
        message: CommonResponses.SERVER_ERROR,
      };
    }
  }

  async update(
    id: string,
    updateCreditCardDto: UpdateCreditCardDto
  ): Promise<IApiResponse<CreditCard>> {
    try {
      const creditCard = await this.prisma.creditCard.update({
        where: {
          id: id,
        },
        data: {
          name: updateCreditCardDto.name,
          billingDate: updateCreditCardDto.billingDate,
          limit: updateCreditCardDto.limit,
          userId: updateCreditCardDto.userId,
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
        message: AdminCreditCardsResponses.UPDATED,
        param: creditCard.id,
      };
    } catch (e) {
      // TODO: Turn this into error response
      console.log(e);
      return {
        message: CommonResponses.SERVER_ERROR,
      };
    }
  }

  async remove(id: string): Promise<IApiResponse> {
    try {
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
    } catch (e) {
      // TODO: Turn this into error response
      console.log(e);
      return {
        message: CommonResponses.SERVER_ERROR,
      };
    }
  }
}
