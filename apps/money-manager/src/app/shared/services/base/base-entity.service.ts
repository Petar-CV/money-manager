import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  IModifiedApiResponse,
  PaginatedSortAndSearch,
} from '@petar-cv/api-interfaces';

import {
  BASE_ADMIN_API,
  BASE_PRIVATE_API,
} from '../../constants/app.constants';

type BaseEntityServiceType = 'admin' | 'private';

@Injectable()
export abstract class BaseEntityService<T> {
  private baseURL: string;

  protected abstract http: HttpClient;

  /**
   * The constructor function is used to inject the entityURLName into the class
   * @param {string} entityURLName - This is the name of the entity that you want to use for the API.
   * For example, if you want to use the API for the entity "User", then you would pass in "users" as
   * the entityURLName.
   */
  constructor(
    @Inject('') private entityURLName: string,
    @Inject('') private type: BaseEntityServiceType
  ) {
    switch (this.type) {
      case 'admin':
        this.baseURL = `${BASE_ADMIN_API}/${this.entityURLName}`;
        break;
      case 'private':
        this.baseURL = `${BASE_PRIVATE_API}/${this.entityURLName}`;
        break;
    }
  }

  /**
   * It returns an observable of an HTTP response of a modified API response of an array of type T
   * @param {PaginatedSortAndSearch} [queryParams] - PaginatedSortAndSearch
   * @returns An observable of the response from the server.
   */
  findAll(
    queryParams?: PaginatedSortAndSearch
  ): Observable<HttpResponse<IModifiedApiResponse<T[]>>> {
    return this.http.get<IModifiedApiResponse<T[]>>(`${this.baseURL}`, {
      params: {
        ...queryParams,
      },
      observe: 'response',
    });
  }

  /**
   * It returns an Observable of type T or null
   * @param {string} id - string - The id of the entity you want to get
   * @returns Observable<T | null>
   */
  findOne(id: string): Observable<T | null> {
    return this.http
      .get<IModifiedApiResponse<T | null>>(`${this.baseURL}/${id}`)
      .pipe(map((res) => res.data ?? null));
  }

  /**
   * It takes an entity of type T, sends it to the server, and returns an observable of type T or null
   * @param {T} entity - T - The entity to create
   * @returns Observable<T | null>
   */
  create(entity: T): Observable<T | null> {
    return this.http
      .post<IModifiedApiResponse<T | null>>(this.baseURL, entity)
      .pipe(map((res) => res.data ?? null));
  }

  /**
   * It takes an entity and an id, and then it returns an observable of type IModifiedApiResponse of
   * type T
   * @param {T} entity - The entity to be updated.
   * @param {string} id - The id of the entity to update
   * @returns An observable of type IModifiedApiResponse<T>
   */
  update(entity: T, id: string): Observable<IModifiedApiResponse<T>> {
    return this.http.put<IModifiedApiResponse<T>>(
      `${this.baseURL}/${id}`,
      entity
    );
  }

  /**
   * It returns an observable of type HttpResponse<void> which is an observable of an HTTP response
   * with a void body
   * @param {number} id - number - The id of the entity to delete.
   * @returns An observable of type HttpResponse<void>
   */
  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.baseURL}/${id}`, {
      observe: 'response',
    });
  }
}
