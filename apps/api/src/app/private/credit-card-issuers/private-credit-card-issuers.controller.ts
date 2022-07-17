import { Controller, Get, Param, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreditCardIssuer } from '@prisma/client';
import { Roles } from 'nest-keycloak-connect';

import { IApiResponse, PaginatedSortAndSearch } from '@petar-cv/api-interfaces';

import { PrivateCreditCardIssuersService } from './private-credit-card-issuers.service';
import { IRequestForLogging } from 'apps/api/src/models/errors/request-for-logging.model';

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
    @Request() req: IRequestForLogging,
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch
  ): Promise<IApiResponse<CreditCardIssuer[]>> {
    return this.privateCreditCardIssuersService.findAll(
      req,
      paginatedSortAndSearch
    );
  }

  @Get('lov')
  findAllLov(
    @Request() req: IRequestForLogging
  ): Promise<IApiResponse<Partial<CreditCardIssuer>[]>> {
    return this.privateCreditCardIssuersService.findAllLov(req);
  }

  @Get(':id')
  findOne(
    @Request() req: IRequestForLogging,
    @Param('id') id: string
  ): Promise<IApiResponse<CreditCardIssuer>> {
    return this.privateCreditCardIssuersService.findOne(req, id);
  }
}
