import { Injectable } from '@nestjs/common';
import { Prisma, CreditCardIssuer } from '@prisma/client';

import {
  CommonResponses,
  IApiResponse,
  PaginatedSortAndSearch,
} from '@petar-cv/api-interfaces';
import { createGlobalFilter } from '@petar-cv/prisma-utils';

import { CreateCreditCardIssuerDto } from './dto/create-credit-card-issuer.dto';
import { UpdateCreditCardIssuerDto } from './dto/update-credit-card-issuer.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { AdminCreditCardIssuersResponses } from './responses/admin-credit-card-issuers-responses';

@Injectable()
export class AdminCreditCardIssuersService {
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
    const creditCardIssuer = await this.prisma.creditCardIssuer.findUnique({
      where: {
        id: id,
      },
    });

    return {
      data: creditCardIssuer,
    };
  }

  async create(
    createCreditCardIssuerDto: CreateCreditCardIssuerDto
  ): Promise<IApiResponse<CreditCardIssuer>> {
    try {
      const creditCardIssuer = await this.prisma.creditCardIssuer.create({
        data: {
          name: createCreditCardIssuerDto.name,
          logo: createCreditCardIssuerDto.logo,
        },
      });

      return {
        data: creditCardIssuer,
        message: AdminCreditCardIssuersResponses.CREATED,
        param: creditCardIssuer.id,
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
    updateCreditCardIssuerDto: UpdateCreditCardIssuerDto
  ): Promise<IApiResponse<CreditCardIssuer>> {
    try {
      const creditCardIssuer = await this.prisma.creditCardIssuer.update({
        where: {
          id: id,
        },
        data: {
          name: updateCreditCardIssuerDto.name,
          logo: updateCreditCardIssuerDto.logo,
          updatedAt: new Date(),
        },
      });

      return {
        data: creditCardIssuer,
        message: AdminCreditCardIssuersResponses.UPDATED,
        param: creditCardIssuer.id,
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
    } catch (e) {
      // TODO: Turn this into error response
      console.log(e);
      return {
        message: CommonResponses.SERVER_ERROR,
      };
    }
  }
}