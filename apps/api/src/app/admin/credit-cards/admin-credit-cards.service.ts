import { Injectable } from '@nestjs/common';
import { Prisma, CreditCard, CreditCardItem } from '@prisma/client';

import {
  CommonResponses,
  IApiResponse,
  PaginatedSortAndSearch,
} from '@petar-cv/api-interfaces';
import { createGlobalFilter } from '@petar-cv/prisma-utils';

import { CreateAdminCreditCardDto } from './dto/create-admin-credit-card.dto';
import { UpdateAdminCreditCardDto } from './dto/update-admin-credit-card.dto';
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

      const filter = createGlobalFilter<
        typeof Prisma.CreditCardScalarFieldEnum
      >({
        search: search,
        matchType: 'contains',
        includedFields: {
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
    } catch (e) {
      // TODO: Turn this into error response
      // TODO: Save into exception log table
      console.log(e);
      return {
        message: CommonResponses.SERVER_ERROR,
      };
    }
  }

  async findOne(id: string): Promise<IApiResponse<CreditCard>> {
    try {
      const creditCard = await this.prisma.creditCard.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      return {
        data: creditCard,
      };
    } catch (e) {
      // TODO: Turn this into error response
      // TODO: Save into exception log table
      console.log(e);
      return {
        message: CommonResponses.SERVER_ERROR,
      };
    }
  }

  async findAllItemsForCreditCard(
    paginatedSortAndSearch: PaginatedSortAndSearch,
    id: string
  ): Promise<IApiResponse<CreditCardItem[]>> {
    try {
      const { page, perPage, search } = paginatedSortAndSearch;

      const filter = createGlobalFilter<
        typeof Prisma.CreditCardItemScalarFieldEnum
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
    } catch (e) {
      // TODO: Turn this into error response
      // TODO: Save into exception log table
      console.log(e);
      return {
        message: CommonResponses.SERVER_ERROR,
      };
    }
  }

  async create(
    createAdminCreditCardDto: CreateAdminCreditCardDto
  ): Promise<IApiResponse<CreditCard>> {
    try {
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
    } catch (e) {
      // TODO: Turn this into error response
      // TODO: Save into exception log table
      console.log(e);
      return {
        message: CommonResponses.SERVER_ERROR,
      };
    }
  }

  async update(
    id: string,
    updateAdminCreditCardDto: UpdateAdminCreditCardDto
  ): Promise<IApiResponse<CreditCard>> {
    try {
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
    } catch (e) {
      // TODO: Turn this into error response
      // TODO: Save into exception log table
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
      // TODO: Save into exception log table
      console.log(e);
      return {
        message: CommonResponses.SERVER_ERROR,
      };
    }
  }
}
