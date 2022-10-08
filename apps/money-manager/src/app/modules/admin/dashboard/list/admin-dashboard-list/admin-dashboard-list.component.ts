import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ADMIN_DASHBOARDS } from '../../constants/dashboards.constants';

@Component({
  selector: 'petar-cv-admin-dashboard-list',
  templateUrl: './admin-dashboard-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardListComponent {
  public dashboards = ADMIN_DASHBOARDS;
}
