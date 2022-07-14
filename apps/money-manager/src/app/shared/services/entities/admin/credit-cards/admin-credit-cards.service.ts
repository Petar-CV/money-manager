import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ICreditCard } from '@petar-cv/money-manager-models';

import { BaseEntityService } from '../../../base/base-entity.service';

@Injectable({
  providedIn: 'root',
})
export class AdminCreditCardsService extends BaseEntityService<ICreditCard> {
  constructor(protected readonly http: HttpClient) {
    super('credit-cards', 'admin');
  }
}
