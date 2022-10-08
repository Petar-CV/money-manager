import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { IModifiedApiResponse } from '@petar-cv/api-interfaces';

import { BASE_ADMIN_API } from '../../../../shared/constants/app.constants';

@Injectable()
export abstract class BaseAdminDashboardService {
  protected baseURL: string;
  protected abstract http: HttpClient;

  /**
   * The constructor function is used to inject the entityURLName into the class
   * @param {string} entityURLName - This is the name of the entity that you want to use for the API.
   * For example, if you want to use the API for the entity "User", then you would pass in "users" as
   * the entityURLName.
   */
  constructor(@Inject('') private entityURLName: string) {
    this.baseURL = `${BASE_ADMIN_API}/${this.entityURLName}/count`;
  }

  /**
   * This method is used to get the count of all specified entities from the API.
   * @returns Returns an observable with the number of entities in the database
   */
  protected countAll(entity: string): Observable<number> {
    return this.http
      .get<IModifiedApiResponse<number>>(`${this.baseURL}/${entity}`)
      .pipe(map((response: IModifiedApiResponse<number>) => response.data));
  }
}
