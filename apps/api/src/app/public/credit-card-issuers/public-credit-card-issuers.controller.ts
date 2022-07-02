import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreditCardIssuer } from '@prisma/client';
import { Roles } from 'nest-keycloak-connect';

import { IApiResponse, PaginatedSortAndSearch } from '@petar-cv/api-interfaces';

import { PublicCreditCardIssuersService } from './public-credit-card-issuers.service';

@ApiTags('Public - Credit card issuers')
@ApiBearerAuth()
@Roles({ roles: ['admin', 'user'] })
@Controller('api/public/credit-card-issuers')
export class PublicCreditCardIssuersController {
  constructor(
    private readonly publicCreditCardIssuersService: PublicCreditCardIssuersService
  ) {}

  @Get()
  findAll(
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch
  ): Promise<IApiResponse<CreditCardIssuer[]>> {
    return this.publicCreditCardIssuersService.findAll(paginatedSortAndSearch);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IApiResponse<CreditCardIssuer>> {
    return this.publicCreditCardIssuersService.findOne(id);
  }
}
