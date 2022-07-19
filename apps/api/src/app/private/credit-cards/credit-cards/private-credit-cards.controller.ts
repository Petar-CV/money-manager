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
import { CreditCard, CreditCardItem } from '@prisma/client';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';

import { IApiResponse, PaginatedSortAndSearch } from '@petar-cv/api-interfaces';

import { PrivateCreditCardsService } from './private-credit-cards.service';
import { CreatePrivateCreditCardDto } from './dto/create-private-credit-card.dto';
import { UpdatePrivateCreditCardDto } from './dto/update-private-credit-card.dto';
import { IRequestForLogging } from 'apps/api/src/models/errors/request-for-logging.model';
import { IAuthenticatedUser } from 'apps/api/src/models/keycloak/authenticated-user.model';

@ApiTags('Private - Credit cards')
@ApiBearerAuth()
@Roles({ roles: ['admin', 'user'] })
@Controller('private/credit-cards')
export class PrivateCreditCardsController {
  constructor(
    private readonly privateCreditCardsService: PrivateCreditCardsService
  ) {}

  @Get('')
  findAll(
    @Request() req: IRequestForLogging,
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard[]>> {
    return this.privateCreditCardsService.findAll(
      req,
      paginatedSortAndSearch,
      user
    );
  }

  @Get(':id')
  findOne(
    @Request() req: IRequestForLogging,
    @Param('id') creditCardId: string,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard>> {
    return this.privateCreditCardsService.findOne(req, creditCardId, user);
  }

  @Get(':id/items')
  findAllItemsForMyCreditCard(
    @Request() req: IRequestForLogging,
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch,
    @Param('id') creditCardId: string,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCardItem[]>> {
    return this.privateCreditCardsService.findAllItemsForMyCreditCard(
      req,
      paginatedSortAndSearch,
      creditCardId,
      user
    );
  }

  @Post()
  create(
    @Request() req: IRequestForLogging,
    @Body() createCreditCardDto: CreatePrivateCreditCardDto,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard>> {
    return this.privateCreditCardsService.create(
      req,
      createCreditCardDto,
      user
    );
  }

  @Put(':id')
  update(
    @Request() req: IRequestForLogging,
    @Param('id') creditCardId: string,
    @Body() updatePrivateCreditCardDto: UpdatePrivateCreditCardDto,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard>> {
    return this.privateCreditCardsService.update(
      req,
      creditCardId,
      updatePrivateCreditCardDto,
      user
    );
  }

  @Delete(':id')
  remove(
    @Request() req: IRequestForLogging,
    @Param('id') creditCardId: string,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse> {
    return this.privateCreditCardsService.remove(req, creditCardId, user);
  }
}
