import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'petar-cv-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  entities!: MenuItem[];

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.loadDashboard();

    this.subscriptions.push(
      this.translateService.onLangChange.subscribe(() => {
        this.loadDashboard();
      })
    );
  }

  loadDashboard(): void {
    this.entities = [];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
