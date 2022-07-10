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

import { PublicCreditCardsService } from './public-credit-cards.service';
import { IAuthenticatedUser } from '../../../models/keycloak/authenticated-user.model';
import { CreatePublicCreditCardDto } from './dto/create-public-credit-card.dto';
import { UpdatePublicCreditCardDto } from './dto/update-public-credit-card.dto';

@ApiTags('Public - Credit cards')
@ApiBearerAuth()
@Roles({ roles: ['admin', 'user'] })
@Controller('public/credit-cards')
export class PublicCreditCardsController {
  constructor(
    private readonly publicCreditCardsService: PublicCreditCardsService
  ) {}

  @Get('')
  findMyCreditCards(
    @Query() paginatedSortAndSearch: PaginatedSortAndSearch,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard[]>> {
    return this.publicCreditCardsService.findMyCreditCards(
      paginatedSortAndSearch,
      user
    );
  }

  @Get(':id')
  findMyCreditCard(
    @Param('id') creditCardId: string,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard>> {
    return this.publicCreditCardsService.findMyCreditCard(creditCardId, user);
  }

  @Post()
  create(
    @Body() createCreditCardDto: CreatePublicCreditCardDto,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard>> {
    return this.publicCreditCardsService.create(createCreditCardDto, user);
  }

  @Put(':id')
  update(
    @Param('id') creditCardId: string,
    @Body() updatePublicCreditCardDto: UpdatePublicCreditCardDto,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse<CreditCard>> {
    return this.publicCreditCardsService.update(
      creditCardId,
      updatePublicCreditCardDto,
      user
    );
  }

  @Delete(':id')
  remove(
    @Param('id') creditCardId: string,
    @AuthenticatedUser() user: IAuthenticatedUser
  ): Promise<IApiResponse> {
    return this.publicCreditCardsService.remove(creditCardId, user);
  }
}
