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
import { PublicCreditCardItemsResponses } from './responses/public-credit-card-items-responses';
import { UpdatePublicCreditCardItemDto } from './dto/update-public-credit-card-item.dto';
import { CreatePublicCreditCardItemDto } from './dto/create-public-credit-card-item.dto';

@Injectable()
export class PublicCreditCardItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMyCreditCardItems(
    paginatedSortAndSearch: PaginatedSortAndSearch,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem[]>> {
    const { page, perPage, search } = paginatedSortAndSearch;

    const filter = createGlobalFilter({
      model: Prisma.CreditCardItemScalarFieldEnum,
      search: search,
      matchType: 'contains',
      includedFields: ['name', 'description'],
    });

    // TODO: Implement parallel transactions
    const count = await this.prisma.creditCardItem.count({
      where: {
        OR: filter,
        deletedAt: null,
        userId: user.user_id,
      },
      skip: perPage && page ? perPage * (page - 1) : undefined,
      take: perPage && page ? perPage : undefined,
    });

    const creditCardItems = await this.prisma.creditCardItem.findMany({
      where: {
        OR: filter,
        deletedAt: null,
        userId: user.user_id,
      },
      skip: perPage && page ? perPage * (page - 1) : undefined,
      take: perPage && page ? perPage : undefined,
    });

    return {
      data: creditCardItems,
      totalItems: count,
    };
  }

  async findMyCreditCard(
    id: string,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem>> {
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
  }

  async create(
    createCreditCardDto: CreatePublicCreditCardItemDto,
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
        message: PublicCreditCardItemsResponses.CREATED,
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
    updateCreditCardDto: UpdatePublicCreditCardItemDto,
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
        message: PublicCreditCardItemsResponses.UPDATED,
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

  async remove(id: string, user: IAuthenticatedUser): Promise<IApiResponse> {
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
        message: PublicCreditCardItemsResponses.DELETED,
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
