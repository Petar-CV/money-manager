import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseAdminDashboardService } from 'apps/money-manager/src/app/shared/services/base/admin/dashboard/base-admin-dashboard.service';

@Injectable({
  providedIn: 'root',
})
export class AdminCreditCardDashboardService extends BaseAdminDashboardService {
  constructor(protected readonly http: HttpClient) {
    super('dashboard/credit-cards');
  }

  public countAllIssuers(): Observable<number> {
    return this.countAll('issuers');
  }

  public countAllCards(): Observable<number> {
    return this.countAll('cards');
  }

  public countAllCardItems(): Observable<number> {
    return this.countAll('card-items');
  }
}
