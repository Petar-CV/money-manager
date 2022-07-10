import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreditCardIssuer } from '@prisma/client';
import { Roles } from 'nest-keycloak-connect';

import { IApiResponse, PaginatedSortAndSearch } from '@petar-cv/api-interfaces';

import { CreateCreditCardIssuerDto } from './dto/create-credit-card-issuer.dto';
import { UpdateCreditCardIssuerDto } from './dto/update-credit-card-issuer.dto';
import { AdminCreditCardIssuersService } from './admin-credit-card-issuers.service';

@ApiTags('Admin - Credit card issuers')
@ApiBearerAuth()
@Roles({ roles: ['admin'] })
@Controller('admin/credit-card-issuers')
export class AdminCreditCardIssuersController {
  constructor(
    private readonly adminCreditCardIssuersService: AdminCreditCardIssuersService
  ) {}

  @Get()
  findAll(
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch
  ): Promise<IApiResponse<CreditCardIssuer[]>> {
    return this.adminCreditCardIssuersService.findAll(paginatedSortAndSearch);
  }

  @Get(':id')
  findOne(
    @Param('id') creditCardIssuerId: string
  ): Promise<IApiResponse<CreditCardIssuer>> {
    return this.adminCreditCardIssuersService.findOne(creditCardIssuerId);
  }

  @Post()
  create(
    @Body() createCreditCardIssuerDto: CreateCreditCardIssuerDto
  ): Promise<IApiResponse<CreditCardIssuer>> {
    return this.adminCreditCardIssuersService.create(createCreditCardIssuerDto);
  }

  @Put(':id')
  update(
    @Param('id') creditCardIssuerId: string,
    @Body() updateCreditCardIssuerDto: UpdateCreditCardIssuerDto
  ): Promise<IApiResponse<CreditCardIssuer>> {
    return this.adminCreditCardIssuersService.update(
      creditCardIssuerId,
      updateCreditCardIssuerDto
    );
  }

  @Delete(':id')
  remove(@Param('id') creditCardIssuerId: string): Promise<IApiResponse> {
    return this.adminCreditCardIssuersService.remove(creditCardIssuerId);
  }
}
