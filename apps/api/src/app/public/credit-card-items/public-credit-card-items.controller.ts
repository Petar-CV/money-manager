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

import { PublicCreditCardItemsService } from './public-credit-card-items.service';
import { IAuthenticatedUser } from '../../../models/keycloak/authenticated-user.model';
import { CreatePublicCreditCardItemDto } from './dto/create-public-credit-card-item.dto';
import { UpdatePublicCreditCardItemDto } from './dto/update-public-credit-card-item.dto';

@ApiTags('Public - Credit card items')
@ApiBearerAuth()
@Roles({ roles: ['admin', 'user'] })
@Controller('public/credit-card-items')
export class PublicCreditCardItemsController {
  constructor(
    private readonly publicCreditCardItemsService: PublicCreditCardItemsService
  ) {}

  @Get('')
  findMyCreditCardItems(
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem[]>> {
    return this.publicCreditCardItemsService.findMyCreditCardItems(
      paginatedSortAndSearch,
      user
    );
  }

  @Get(':id')
  findMyCreditCard(
    @Param('id') creditCardId: string,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem>> {
    return this.publicCreditCardItemsService.findMyCreditCard(
      creditCardId,
      user
    );
  }

  @Post()
  create(
    @Body() createCreditCardItemDto: CreatePublicCreditCardItemDto,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem>> {
    return this.publicCreditCardItemsService.create(
      createCreditCardItemDto,
      user
    );
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublicCreditCardItemDto: UpdatePublicCreditCardItemDto,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem>> {
    return this.publicCreditCardItemsService.update(
      id,
      updatePublicCreditCardItemDto,
      user
    );
  }

  @Delete(':id')
  remove(
    @Param('id') creditCardItemId: string,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse> {
    return this.publicCreditCardItemsService.remove(creditCardItemId, user);
  }
}
