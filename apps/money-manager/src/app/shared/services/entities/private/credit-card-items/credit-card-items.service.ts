import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ICreditCardItem } from '@petar-cv/money-manager-models';

import { BaseEntityService } from '../../base/base-entity.service';

@Injectable({
  providedIn: 'root',
})
export class CreditCardItemsService extends BaseEntityService<ICreditCardItem> {
  constructor(protected readonly http: HttpClient) {
    super('credit-card-items', 'private');
  }
}
