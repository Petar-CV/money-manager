import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreditCardIssuer } from '@prisma/client';
import { Roles } from 'nest-keycloak-connect';

import { IApiResponse, PaginatedSortAndSearch } from '@petar-cv/api-interfaces';

import { CreateAdminCreditCardIssuerDto } from './dto/create-admin-credit-card-issuer.dto';
import { UpdateAdminCreditCardIssuerDto } from './dto/update-admin-credit-card-issuer.dto';
import { AdminCreditCardIssuersService } from './admin-credit-card-issuers.service';
import { IRequestForLogging } from 'apps/api/src/models/errors/request-for-logging.model';

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
    @Request() req: IRequestForLogging,
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch
  ): Promise<IApiResponse<CreditCardIssuer[]>> {
    return this.adminCreditCardIssuersService.findAll(
      req,
      paginatedSortAndSearch
    );
  }

  @Get('lov')
  findAllLov(
    @Request() req: IRequestForLogging
  ): Promise<IApiResponse<Partial<CreditCardIssuer>[]>> {
    return this.adminCreditCardIssuersService.findAllLov(req);
  }

  @Get(':id')
  findOne(
    @Request() req: IRequestForLogging,
    @Param('id') creditCardIssuerId: string
  ): Promise<IApiResponse<CreditCardIssuer>> {
    return this.adminCreditCardIssuersService.findOne(req, creditCardIssuerId);
  }

  @Post()
  create(
    @Request() req: IRequestForLogging,
    @Body() createAdminCreditCardIssuerDto: CreateAdminCreditCardIssuerDto
  ): Promise<IApiResponse<CreditCardIssuer>> {
    return this.adminCreditCardIssuersService.create(
      req,
      createAdminCreditCardIssuerDto
    );
  }

  @Put(':id')
  update(
    @Request() req: IRequestForLogging,
    @Param('id') creditCardIssuerId: string,
    @Body() updateAdminCreditCardIssuerDto: UpdateAdminCreditCardIssuerDto
  ): Promise<IApiResponse<CreditCardIssuer>> {
    return this.adminCreditCardIssuersService.update(
      req,
      creditCardIssuerId,
      updateAdminCreditCardIssuerDto
    );
  }

  @Delete(':id')
  remove(
    @Request() req: IRequestForLogging,
    @Param('id') creditCardIssuerId: string
  ): Promise<IApiResponse> {
    return this.adminCreditCardIssuersService.remove(req, creditCardIssuerId);
  }
}
