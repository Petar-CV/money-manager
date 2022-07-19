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
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';

import { IApiResponse, PaginatedSortAndSearch } from '@petar-cv/api-interfaces';

import { PrivateCreditCardItemsService } from './private-credit-card-items.service';
import { CreatePrivateCreditCardItemDto } from './dto/create-private-credit-card-item.dto';
import { UpdatePrivateCreditCardItemDto } from './dto/update-private-credit-card-item.dto';
import { IRequestForLogging } from 'apps/api/src/models/errors/request-for-logging.model';
import { IAuthenticatedUser } from 'apps/api/src/models/keycloak/authenticated-user.model';

@ApiTags('Private - Credit card items')
@ApiBearerAuth()
@Roles({ roles: ['admin', 'user'] })
@Controller('private/credit-card-items')
export class PrivateCreditCardItemsController {
  constructor(
    private readonly privateCreditCardItemsService: PrivateCreditCardItemsService
  ) {}

  @Get('')
  findMyCreditCardItems(
    @Request() req: IRequestForLogging,
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem[]>> {
    return this.privateCreditCardItemsService.findMyCreditCardItems(
      req,
      paginatedSortAndSearch,
      user
    );
  }

  @Get(':id')
  findMyCreditCard(
    @Request() req: IRequestForLogging,
    @Param('id') creditCardId: string,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem>> {
    return this.privateCreditCardItemsService.findMyCreditCard(
      req,
      creditCardId,
      user
    );
  }

  @Post()
  create(
    @Request() req: IRequestForLogging,
    @Body() createCreditCardItemDto: CreatePrivateCreditCardItemDto,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem>> {
    return this.privateCreditCardItemsService.create(
      req,
      createCreditCardItemDto,
      user
    );
  }

  @Put(':id')
  update(
    @Request() req: IRequestForLogging,
    @Param('id') id: string,
    @Body() updatePrivateCreditCardItemDto: UpdatePrivateCreditCardItemDto,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem>> {
    return this.privateCreditCardItemsService.update(
      req,
      id,
      updatePrivateCreditCardItemDto,
      user
    );
  }

  @Delete(':id')
  remove(
    @Request() req: IRequestForLogging,
    @Param('id') creditCardItemId: string,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse> {
    return this.privateCreditCardItemsService.remove(
      req,
      creditCardItemId,
      user
    );
  }
}
