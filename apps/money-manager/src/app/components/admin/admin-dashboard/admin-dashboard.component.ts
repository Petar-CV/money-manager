import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'petar-cv-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public entities!: MenuItem[];

  constructor(
    private readonly translateService: TranslateService,
    private readonly cdr: ChangeDetectorRef
  ) {}

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

    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
