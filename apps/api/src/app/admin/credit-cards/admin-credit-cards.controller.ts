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
import { CreditCard } from '@prisma/client';
import { Roles } from 'nest-keycloak-connect';

import { IApiResponse, PaginatedSortAndSearch } from '@petar-cv/api-interfaces';

import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';
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

  @Post()
  create(
    @Body() createCreditCardDto: CreateCreditCardDto
  ): Promise<IApiResponse<CreditCard>> {
    return this.adminCreditCardsService.create(createCreditCardDto);
  }

  @Put(':id')
  update(
    @Param('id') creditCardId: string,
    @Body() updateCreditCardDto: UpdateCreditCardDto
  ): Promise<IApiResponse<CreditCard>> {
    return this.adminCreditCardsService.update(
      creditCardId,
      updateCreditCardDto
    );
  }

  @Delete(':id')
  remove(@Param('id') creditCardId: string): Promise<IApiResponse> {
    return this.adminCreditCardsService.remove(creditCardId);
  }
}
