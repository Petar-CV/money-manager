import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IModifiedApiResponse } from '@petar-cv/api-interfaces';
import { ICreditCardIssuer } from '@petar-cv/money-manager-models';

import { BaseEntityService } from 'apps/money-manager/src/app/shared/services/base/base-entity.service';

@Injectable({
  providedIn: 'root',
})
export class CreditCardIssuersService extends BaseEntityService<ICreditCardIssuer> {
  constructor(protected readonly http: HttpClient) {
    super('credit-card-issuers', 'private');
  }

  override create(): Observable<ICreditCardIssuer | undefined> {
    // This method doesn't exist in the API, so we need to override it
    throw new Error('Method not implemented for this entity.');
  }

  override update(): Observable<IModifiedApiResponse<ICreditCardIssuer>> {
    // This method doesn't exist in the API, so we need to override it
    throw new Error('Method not implemented for this entity.');
  }

  override delete(): Observable<HttpResponse<void>> {
    // This method doesn't exist in the API, so we need to override it
    throw new Error('Method not implemented for this entity.');
  }
}
