import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICreditCard } from '@petar-cv/money-manager-models';

import { BaseEntityService } from 'apps/money-manager/src/app/shared/services/base/base-entity.service';

@Injectable({
  providedIn: 'root',
})
export class AdminCreditCardsService extends BaseEntityService<ICreditCard> {
  constructor(protected readonly http: HttpClient) {
    super('credit-cards', 'admin');
  }

  override findAllLov(): Observable<Partial<ICreditCard>[]> {
    throw new Error('Method not implemented for this entity.');
  }
}
