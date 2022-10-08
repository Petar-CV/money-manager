import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ADMIN_DASHBOARDS } from 'apps/money-manager/src/app/shared/constants/dashboards/dashboards.constants';

@Component({
  selector: 'petar-cv-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {
  public dashboards = ADMIN_DASHBOARDS;
}
