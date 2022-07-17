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
import { CreditCard, CreditCardItem } from '@prisma/client';
import { Roles } from 'nest-keycloak-connect';

import { IApiResponse, PaginatedSortAndSearch } from '@petar-cv/api-interfaces';

import { CreateAdminCreditCardDto } from './dto/create-admin-credit-card.dto';
import { UpdateAdminCreditCardDto } from './dto/update-admin-credit-card.dto';
import { AdminCreditCardsService } from './admin-credit-cards.service';
import { IRequestForLogging } from 'apps/api/src/models/errors/request-for-logging.model';

@ApiTags('Admin - Credit cards')
@ApiBearerAuth()
@Roles({ roles: ['admin'] })
@Controller('admin/credit-cards')
export class AdminCreditCardsController {
  constructor(
    private readonly adminCreditCardsService: AdminCreditCardsService
  ) {}

  @Get()
  findAll(
    @Request() req: IRequestForLogging,
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch
  ): Promise<IApiResponse<CreditCard[]>> {
    return this.adminCreditCardsService.findAll(req, paginatedSortAndSearch);
  }

  @Get(':id')
  findOne(
    @Request() req: IRequestForLogging,
    @Param('id') creditCardId: string
  ): Promise<IApiResponse<CreditCard>> {
    return this.adminCreditCardsService.findOne(req, creditCardId);
  }

  @Get(':id/items')
  findAllItemsForCreditCard(
    @Request() req: IRequestForLogging,
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch,
    @Param('id') creditCardId: string
  ): Promise<IApiResponse<CreditCardItem[]>> {
    return this.adminCreditCardsService.findAllItemsForCreditCard(
      req,
      paginatedSortAndSearch,
      creditCardId
    );
  }

  @Post()
  create(
    @Request() req: IRequestForLogging,
    @Body() createAdminCreditCardDto: CreateAdminCreditCardDto
  ): Promise<IApiResponse<CreditCard>> {
    return this.adminCreditCardsService.create(req, createAdminCreditCardDto);
  }

  @Put(':id')
  update(
    @Request() req: IRequestForLogging,
    @Param('id') creditCardId: string,
    @Body() updateAdminCreditCardDto: UpdateAdminCreditCardDto
  ): Promise<IApiResponse<CreditCard>> {
    return this.adminCreditCardsService.update(
      req,
      creditCardId,
      updateAdminCreditCardDto
    );
  }

  @Delete(':id')
  remove(
    @Request() req: IRequestForLogging,
    @Param('id') creditCardId: string
  ): Promise<IApiResponse> {
    return this.adminCreditCardsService.remove(req, creditCardId);
  }
}
