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
  findOne(@Param('id') id: string): Promise<IApiResponse<CreditCard>> {
    return this.adminCreditCardsService.findOne(id);
  }

  @Post()
  create(
    @Body() createCreditCardDto: CreateCreditCardDto
  ): Promise<IApiResponse<CreditCard>> {
    return this.adminCreditCardsService.create(createCreditCardDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeJobDto: UpdateCreditCardDto
  ): Promise<IApiResponse<CreditCard>> {
    return this.adminCreditCardsService.update(id, updateEmployeeJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IApiResponse> {
    return this.adminCreditCardsService.remove(id);
  }
}
