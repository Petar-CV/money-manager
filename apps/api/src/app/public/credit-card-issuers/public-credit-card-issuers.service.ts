import { Injectable } from '@nestjs/common';
import { Prisma, CreditCardIssuer } from '@prisma/client';

import {
  CommonResponses,
  IApiResponse,
  PaginatedSortAndSearch,
} from '@petar-cv/api-interfaces';
import { createGlobalFilter } from '@petar-cv/prisma-utils';

import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PublicCreditCardIssuersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    paginatedSortAndSearch: PaginatedSortAndSearch
  ): Promise<IApiResponse<CreditCardIssuer[]>> {
    try {
      const { page, perPage, search } = paginatedSortAndSearch;

      const filter = createGlobalFilter({
        model: Prisma.CreditCardIssuerScalarFieldEnum,
        search: search,
        matchType: 'contains',
        includedFields: ['name'],
      });

      // TODO: Implement parallel transactions
      const count = await this.prisma.creditCardIssuer.count({
        where: {
          OR: filter,
          deletedAt: null,
        },
      });

      const creditCardIssuers = await this.prisma.creditCardIssuer.findMany({
        where: {
          OR: filter,
          deletedAt: null,
        },
        skip: perPage && page ? perPage * (page - 1) : undefined,
        take: perPage && page ? perPage : undefined,
      });

      return {
        data: creditCardIssuers,
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

  async findOne(id: string): Promise<IApiResponse<CreditCardIssuer>> {
    const creditCardIssuer = await this.prisma.creditCardIssuer.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    return {
      data: creditCardIssuer,
    };
  }
}
