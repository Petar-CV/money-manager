import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreditCardItem } from '@prisma/client';
import { Roles } from 'nest-keycloak-connect';

import { IApiResponse, PaginatedSortAndSearch } from '@petar-cv/api-interfaces';

import { AdminCreditCardItemsService } from './admin-credit-card-items.service';
import { CreateAdminCreditCardItemDto } from './dto/create-admin-credit-card-item.dto';
import { UpdateAdminCreditCardItemDto } from './dto/update-admin-credit-card-item.dto';

@ApiTags('Admin - Credit card items')
@ApiBearerAuth()
@Roles({ roles: ['admin'] })
@Controller('admin/credit-card-items')
export class AdminCreditCardItemsController {
  constructor(
    private readonly adminCreditCardItemsService: AdminCreditCardItemsService
  ) {}

  @Get('')
  findAll(
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch
  ): Promise<IApiResponse<CreditCardItem[]>> {
    return this.adminCreditCardItemsService.findAll(paginatedSortAndSearch);
  }

  @Get(':id')
  findOne(
    @Param('id') creditCardId: string
  ): Promise<IApiResponse<CreditCardItem>> {
    return this.adminCreditCardItemsService.findOne(creditCardId);
  }

  @Post()
  create(
    @Body() createCreditCardItemDto: CreateAdminCreditCardItemDto
  ): Promise<IApiResponse<CreditCardItem>> {
    return this.adminCreditCardItemsService.create(createCreditCardItemDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminCreditCardItemDto: UpdateAdminCreditCardItemDto
  ): Promise<IApiResponse<CreditCardItem>> {
    return this.adminCreditCardItemsService.update(
      id,
      updateAdminCreditCardItemDto
    );
  }

  @Delete(':id')
  remove(@Param('id') creditCardItemId: string): Promise<IApiResponse> {
    return this.adminCreditCardItemsService.remove(creditCardItemId);
  }
}
