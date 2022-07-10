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
import { CreditCard } from '@prisma/client';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';

import { IApiResponse, PaginatedSortAndSearch } from '@petar-cv/api-interfaces';

import { PrivateCreditCardsService } from './private-credit-cards.service';
import { IAuthenticatedUser } from '../../../models/keycloak/authenticated-user.model';
import { CreatePrivateCreditCardDto } from './dto/create-private-credit-card.dto';
import { UpdatePrivateCreditCardDto } from './dto/update-private-credit-card.dto';

@ApiTags('Private - Credit cards')
@ApiBearerAuth()
@Roles({ roles: ['admin', 'user'] })
@Controller('private/credit-cards')
export class PrivateCreditCardsController {
  constructor(
    private readonly privateCreditCardsService: PrivateCreditCardsService
  ) {}

  @Get('')
  findMyCreditCards(
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard[]>> {
    return this.privateCreditCardsService.findMyCreditCards(
      paginatedSortAndSearch,
      user
    );
  }

  @Get(':id')
  findMyCreditCard(
    @Param('id') creditCardId: string,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard>> {
    return this.privateCreditCardsService.findMyCreditCard(creditCardId, user);
  }

  @Post()
  create(
    @Body() createCreditCardDto: CreatePrivateCreditCardDto,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard>> {
    return this.privateCreditCardsService.create(createCreditCardDto, user);
  }

  @Put(':id')
  update(
    @Param('id') creditCardId: string,
    @Body() updatePrivateCreditCardDto: UpdatePrivateCreditCardDto,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard>> {
    return this.privateCreditCardsService.update(
      creditCardId,
      updatePrivateCreditCardDto,
      user
    );
  }

  @Delete(':id')
  remove(
    @Param('id') creditCardId: string,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse> {
    return this.privateCreditCardsService.remove(creditCardId, user);
  }
}
