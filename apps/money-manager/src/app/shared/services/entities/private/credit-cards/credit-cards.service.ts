import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICreditCard } from '@petar-cv/money-manager-models';

import { BaseEntityService } from '../../../base/base-entity.service';

@Injectable({
  providedIn: 'root',
})
export class CreditCardsService extends BaseEntityService<ICreditCard> {
  constructor(protected readonly http: HttpClient) {
    super('credit-cards', 'private');
  }

  override findAllLov(): Observable<Partial<ICreditCard>[]> {
    throw new Error('Method not implemented for this entity.');
  }
}
