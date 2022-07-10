import { Injectable } from '@nestjs/common';
import { CreditCard, Prisma } from '@prisma/client';

import {
  CommonResponses,
  IApiResponse,
  PaginatedSortAndSearch,
} from '@petar-cv/api-interfaces';
import { createGlobalFilter } from '@petar-cv/prisma-utils';

import { PrismaService } from '../../../prisma/prisma.service';
import { IAuthenticatedUser } from '../../../models/keycloak/authenticated-user.model';
import { PublicCreditCardsResponses } from './responses/public-credit-cards-responses';
import { UpdatePublicCreditCardDto } from './dto/update-public-credit-card.dto';
import { CreatePublicCreditCardDto } from './dto/create-public-credit-card.dto';

@Injectable()
export class PublicCreditCardsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMyCreditCards(
    paginatedSortAndSearch: PaginatedSortAndSearch,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard[]>> {
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
        userId: user.user_id,
      },
      skip: perPage && page ? perPage * (page - 1) : undefined,
      take: perPage && page ? perPage : undefined,
    });

    const creditCards = await this.prisma.creditCard.findMany({
      where: {
        OR: filter,
        deletedAt: null,
        userId: user.user_id,
      },
      skip: perPage && page ? perPage * (page - 1) : undefined,
      take: perPage && page ? perPage : undefined,
    });

    return {
      data: creditCards,
      totalItems: count,
    };
  }

  async findMyCreditCard(
    id: string,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard>> {
    const creditCard = await this.prisma.creditCard.findFirst({
      where: {
        id: id,
        deletedAt: null,
        userId: user.user_id,
      },
    });

    return {
      data: creditCard,
    };
  }

  async create(
    createCreditCardDto: CreatePublicCreditCardDto,
    user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard>> {
    try {
      const creditCard = await this.prisma.creditCard.create({
        data: {
          name: createCreditCardDto.name,
          billingDate: createCreditCardDto.billingDate,
          limit: createCreditCardDto.limit,
          userId: user.user_id,
          issuer: {
            connect: {
              id: createCreditCardDto.issuerId,
            },
          },
        },
      });

      return {
        data: creditCard,
        message: PublicCreditCardsResponses.CREATED,
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
    updateCreditCardDto: UpdatePublicCreditCardDto,
    user: IAuthenticatedUser
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
          userId: user.user_id,
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
        message: PublicCreditCardsResponses.UPDATED,
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

  async remove(id: string, user: IAuthenticatedUser): Promise<IApiResponse> {
    try {
      await this.prisma.creditCard.updateMany({
        where: {
          id: id,
          userId: user.user_id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return {
        message: PublicCreditCardsResponses.DELETED,
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