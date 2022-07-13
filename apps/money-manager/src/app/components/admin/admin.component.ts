import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'petar-cv-admin',
  templateUrl: './admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public adminMenuBarItems: MenuItem[] = [];

  constructor(private readonly translateService: TranslateService) {}

  ngOnInit() {
    this.loadAdminMenuBar();

    this.subscriptions.push(
      this.translateService.onLangChange.subscribe(() => {
        this.loadAdminMenuBar();
      })
    );
  }

  loadAdminMenuBar(): void {
    this.adminMenuBarItems = [
      {
        label: this.translateService.instant('navbar.home'),
        icon: 'pi pi-fw pi-home',
        routerLink: ['/'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: this.translateService.instant('navbar.admin'),
        icon: 'pi pi-fw pi-shield',
        routerLink: ['/admin'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: this.translateService.instant('adminNavbar.entities.title'),
        icon: 'pi pi-fw pi-database',
        items: [
          {
            label: this.translateService.instant(
              'adminNavbar.entities.creditCardIssuers'
            ),
            icon: 'pi pi-fw pi-building',
            routerLink: ['/credit-cards-issuers'],
          },
          {
            label: this.translateService.instant(
              'adminNavbar.entities.creditCards'
            ),
            icon: 'pi pi-fw pi-credit-card',
            routerLink: ['/credit-cards'],
          },
          {
            label: this.translateService.instant(
              'adminNavbar.entities.creditCardItems'
            ),
            icon: 'pi pi-fw pi-money-bill',
            routerLink: ['/credit-card-items'],
          },
        ],
      },
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
