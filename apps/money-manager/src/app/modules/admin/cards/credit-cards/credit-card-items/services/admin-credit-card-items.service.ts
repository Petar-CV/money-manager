import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICreditCardItem } from '@petar-cv/money-manager-models';

import { BaseEntityService } from 'apps/money-manager/src/app/shared/services/base/base-entity.service';

@Injectable({
  providedIn: 'root',
})
export class AdminCreditCardItemsService extends BaseEntityService<ICreditCardItem> {
  constructor(protected readonly http: HttpClient) {
    super('credit-card-items', 'admin');
  }

  override findAllLov(): Observable<Partial<ICreditCardItem>[]> {
    throw new Error('Method not implemented for this entity.');
  }
}
