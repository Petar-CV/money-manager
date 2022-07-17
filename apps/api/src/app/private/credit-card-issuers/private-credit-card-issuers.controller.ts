import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreditCardIssuer } from '@prisma/client';
import { Roles } from 'nest-keycloak-connect';

import { IApiResponse, PaginatedSortAndSearch } from '@petar-cv/api-interfaces';

import { PrivateCreditCardIssuersService } from './private-credit-card-issuers.service';

@ApiTags('Private - Credit card issuers')
@ApiBearerAuth()
@Roles({ roles: ['admin', 'user'] })
@Controller('private/credit-card-issuers')
export class PrivateCreditCardIssuersController {
  constructor(
    private readonly privateCreditCardIssuersService: PrivateCreditCardIssuersService
  ) {}

  @Get()
  findAll(
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch
  ): Promise<IApiResponse<CreditCardIssuer[]>> {
    return this.privateCreditCardIssuersService.findAll(paginatedSortAndSearch);
  }

  @Get('lov')
  findAllLov(): Promise<IApiResponse<Partial<CreditCardIssuer>[]>> {
    return this.privateCreditCardIssuersService.findAllLov();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IApiResponse<CreditCardIssuer>> {
    return this.privateCreditCardIssuersService.findOne(id);
  }
}
