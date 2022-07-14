import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ICreditCardIssuer } from '@petar-cv/money-manager-models';

import { BaseEntityService } from '../../../base/base-entity.service';

@Injectable({
  providedIn: 'root',
})
export class AdminCreditCardIssuersService extends BaseEntityService<ICreditCardIssuer> {
  constructor(protected readonly http: HttpClient) {
    super('credit-card-issuers', 'admin');
  }
}
