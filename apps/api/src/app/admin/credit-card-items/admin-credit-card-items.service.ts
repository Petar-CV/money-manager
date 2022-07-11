import { Injectable } from '@nestjs/common';
import { CreditCardItem, Prisma } from '@prisma/client';

import {
  CommonResponses,
  IApiResponse,
  PaginatedSortAndSearch,
} from '@petar-cv/api-interfaces';
import { createGlobalFilter } from '@petar-cv/prisma-utils';

import { PrismaService } from '../../../prisma/prisma.service';
import { AdminCreditCardItemsResponses } from './responses/admin-credit-card-items-responses';
import { UpdateAdminCreditCardItemDto } from './dto/update-admin-credit-card-item.dto';
import { CreateAdminCreditCardItemDto } from './dto/create-admin-credit-card-item.dto';

@Injectable()
export class AdminCreditCardItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    paginatedSortAndSearch: PaginatedSortAndSearch
  ): Promise<IApiResponse<CreditCardItem[]>> {
    const { page, perPage, search } = paginatedSortAndSearch;

    const filter = createGlobalFilter({
      model: Prisma.CreditCardItemScalarFieldEnum,
      search: search,
      matchType: 'contains',
      includedFields: ['name', 'description'],
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
  }

  async findOne(id: string): Promise<IApiResponse<CreditCardItem>> {
    const creditCardItem = await this.prisma.creditCardItem.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    return {
      data: creditCardItem,
    };
  }

  async create(
    createCreditCardDto: CreateAdminCreditCardItemDto
  ): Promise<IApiResponse<CreditCardItem>> {
    try {
      const creditCardItem = await this.prisma.creditCardItem.create({
        data: {
          name: createCreditCardDto.name,
          boughtAt: createCreditCardDto.boughtAt,
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
    updateCreditCardDto: UpdateAdminCreditCardItemDto
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
    } catch (e) {
      // TODO: Turn this into error response
      console.log(e);
      return {
        message: CommonResponses.SERVER_ERROR,
      };
    }
  }
}
