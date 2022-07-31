import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICreditCard, ICreditCardItem } from '@petar-cv/money-manager-models';
import {
  IModifiedApiResponse,
  PaginatedSortAndSearch,
} from '@petar-cv/api-interfaces';

import { BaseEntityService } from '../../../base/base-entity.service';

@Injectable({
  providedIn: 'root',
})
export class CreditCardsService extends BaseEntityService<ICreditCard> {
  constructor(protected readonly http: HttpClient) {
    super('credit-cards', 'private');
  }

  /**
   * This function returns an observable of an HTTP response containing a modified API response of an
   * array of credit card items
   * @param {string} id - The id of the credit card you want to get the items for.
   * @param {PaginatedSortAndSearch} [queryParams] - PaginatedSortAndSearch
   * @returns An observable of an http response of a modified api response of an array of credit card
   * items.
   */
  public findAllItemsForMyCreditCard(
    id: string,
    queryParams?: PaginatedSortAndSearch
  ): Observable<HttpResponse<IModifiedApiResponse<ICreditCardItem[]>>> {
    return this.http.get<IModifiedApiResponse<ICreditCardItem[]>>(
      `${this.baseURL}/${id}/items`,
      {
        params: {
          ...queryParams,
        },
        observe: 'response',
      }
    );
  }
}
