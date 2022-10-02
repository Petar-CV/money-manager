import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseAdminDashboardService } from 'apps/money-manager/src/app/shared/services/base/admin/dashboard/base-admin-dashboard.service';

@Injectable({
  providedIn: 'root',
})
export class AdminCreditCardDashboardService extends BaseAdminDashboardService {
  constructor(protected readonly http: HttpClient) {
    super('admin/dashboard/credit-cards');
  }

  countAllIssuers() {
    return this.countAll('issuers');
  }

  countAllCards() {
    return this.countAll('cards');
  }

  countAllCardItems() {
    return this.countAll('card-items');
  }
}
