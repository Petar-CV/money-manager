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
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';

import { IApiResponse, PaginatedSortAndSearch } from '@petar-cv/api-interfaces';

import { PrivateCreditCardItemsService } from './private-credit-card-items.service';
import { IAuthenticatedUser } from '../../../models/keycloak/authenticated-user.model';
import { CreatePrivateCreditCardItemDto } from './dto/create-private-credit-card-item.dto';
import { UpdatePrivateCreditCardItemDto } from './dto/update-private-credit-card-item.dto';

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
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem[]>> {
    return this.privateCreditCardItemsService.findMyCreditCardItems(
      paginatedSortAndSearch,
      user
    );
  }

  @Get(':id')
  findMyCreditCard(
    @Param('id') creditCardId: string,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem>> {
    return this.privateCreditCardItemsService.findMyCreditCard(
      creditCardId,
      user
    );
  }

  @Post()
  create(
    @Body() createCreditCardItemDto: CreatePrivateCreditCardItemDto,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem>> {
    return this.privateCreditCardItemsService.create(
      createCreditCardItemDto,
      user
    );
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePrivateCreditCardItemDto: UpdatePrivateCreditCardItemDto,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem>> {
    return this.privateCreditCardItemsService.update(
      id,
      updatePrivateCreditCardItemDto,
      user
    );
  }

  @Delete(':id')
  remove(
    @Param('id') creditCardItemId: string,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse> {
    return this.privateCreditCardItemsService.remove(creditCardItemId, user);
  }
}
