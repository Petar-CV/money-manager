import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreditCardItem } from '@prisma/client';
import { Roles } from 'nest-keycloak-connect';

import { IApiResponse, PaginatedSortAndSearch } from '@petar-cv/api-interfaces';

import { AdminCreditCardItemsService } from './admin-credit-card-items.service';
import { CreateAdminCreditCardItemDto } from './dto/create-admin-credit-card-item.dto';
import { UpdateAdminCreditCardItemDto } from './dto/update-admin-credit-card-item.dto';
import { IRequestForLogging } from 'apps/api/src/models/errors/request-for-logging.model';

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
    @Request() req: IRequestForLogging,
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch
  ): Promise<IApiResponse<CreditCardItem[]>> {
    return this.adminCreditCardItemsService.findAll(
      req,
      paginatedSortAndSearch
    );
  }

  @Get(':id')
  findOne(
    @Request() req: IRequestForLogging,
    @Param('id') creditCardId: string
  ): Promise<IApiResponse<CreditCardItem>> {
    return this.adminCreditCardItemsService.findOne(req, creditCardId);
  }

  @Post()
  create(
    @Request() req: IRequestForLogging,
    @Body() createCreditCardItemDto: CreateAdminCreditCardItemDto
  ): Promise<IApiResponse<CreditCardItem>> {
    return this.adminCreditCardItemsService.create(
      req,
      createCreditCardItemDto
    );
  }

  @Put(':id')
  update(
    @Request() req: IRequestForLogging,
    @Param('id') id: string,
    @Body() updateAdminCreditCardItemDto: UpdateAdminCreditCardItemDto
  ): Promise<IApiResponse<CreditCardItem>> {
    return this.adminCreditCardItemsService.update(
      req,
      id,
      updateAdminCreditCardItemDto
    );
  }

  @Delete(':id')
  remove(
    @Request() req: IRequestForLogging,
    @Param('id') creditCardItemId: string
  ): Promise<IApiResponse> {
    return this.adminCreditCardItemsService.remove(req, creditCardItemId);
  }
}
