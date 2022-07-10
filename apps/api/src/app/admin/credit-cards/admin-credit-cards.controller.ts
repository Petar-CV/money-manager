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
import { CreditCard, CreditCardItem } from '@prisma/client';
import { Roles } from 'nest-keycloak-connect';

import { IApiResponse, PaginatedSortAndSearch } from '@petar-cv/api-interfaces';

import { CreateAdminCreditCardDto } from './dto/create-admin-credit-card.dto';
import { UpdateAdminCreditCardDto } from './dto/update-admin-credit-card.dto';
import { AdminCreditCardsService } from './admin-credit-cards.service';

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
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch
  ): Promise<IApiResponse<CreditCard[]>> {
    return this.adminCreditCardsService.findAll(paginatedSortAndSearch);
  }

  @Get(':id')
  findOne(
    @Param('id') creditCardId: string
  ): Promise<IApiResponse<CreditCard>> {
    return this.adminCreditCardsService.findOne(creditCardId);
  }

  @Get(':id/items')
  findAllItemsForCreditCard(
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch,
    @Param('id') creditCardId: string
  ): Promise<IApiResponse<CreditCardItem[]>> {
    return this.adminCreditCardsService.findAllItemsForCreditCard(
      paginatedSortAndSearch,
      creditCardId
    );
  }

  @Post()
  create(
    @Body() createAdminCreditCardDto: CreateAdminCreditCardDto
  ): Promise<IApiResponse<CreditCard>> {
    return this.adminCreditCardsService.create(createAdminCreditCardDto);
  }

  @Put(':id')
  update(
    @Param('id') creditCardId: string,
    @Body() updateAdminCreditCardDto: UpdateAdminCreditCardDto
  ): Promise<IApiResponse<CreditCard>> {
    return this.adminCreditCardsService.update(
      creditCardId,
      updateAdminCreditCardDto
    );
  }

  @Delete(':id')
  remove(@Param('id') creditCardId: string): Promise<IApiResponse> {
    return this.adminCreditCardsService.remove(creditCardId);
  }
}
