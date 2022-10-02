import { Controller, Get, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';

import { IApiResponse } from '@petar-cv/api-interfaces';

import { AdminCreditCardDashboardService } from './admin-credit-card-dashboard.service';
import { IRequestForLogging } from 'apps/api/src/models/errors/request-for-logging.model';

@ApiTags('Admin - Dashboard credit card entities')
@ApiBearerAuth()
@Roles({ roles: ['admin'] })
@Controller('admin/dashboard/credit-cards')
export class AdminCreditCardDashboardController {
  constructor(
    private readonly entityService: AdminCreditCardDashboardService
  ) {}

  @Get('count/cards')
  countAllCards(
    @Request() req: IRequestForLogging
  ): Promise<IApiResponse<number>> {
    return this.entityService.countAllCards(req);
  }

  @Get('count/issuers')
  countAllIssuers(
    @Request() req: IRequestForLogging
  ): Promise<IApiResponse<number>> {
    return this.entityService.countAllIssuers(req);
  }

  @Get('count/card-items')
  countAllItems(
    @Request() req: IRequestForLogging
  ): Promise<IApiResponse<number>> {
    return this.entityService.countAllItems(req);
  }
}
