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
export class PrivateCreditCardIssuersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
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
    } catch (e) {
      // TODO: Turn this into error response
      // TODO: Save into exception log table
      console.log(e);
      return {
        message: CommonResponses.SERVER_ERROR,
      };
    }
  }

  async findAllLov(): Promise<IApiResponse<Partial<CreditCardIssuer>[]>> {
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
    } catch (e) {
      // TODO: Turn this into error response
      // TODO: Save into exception log table
      console.log(e);
      return {
        message: CommonResponses.SERVER_ERROR,
      };
    }
  }

  async findOne(id: string): Promise<IApiResponse<CreditCardIssuer>> {
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
