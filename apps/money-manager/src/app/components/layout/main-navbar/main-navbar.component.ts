import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

import { includesRole } from '../../../shared/utils/has-role.util';

@Component({
  selector: 'petar-cv-main-navbar',
  templateUrl: './main-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavbarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public navbarItems: MenuItem[] = [];
  public isLoggedIn = false;
  public userProfile?: KeycloakProfile;
  public userRoles: string[] = [];

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly translateService: TranslateService,
    private readonly keycloak: KeycloakService
  ) {
    this.subscriptions.push(
      this.translateService.onLangChange.subscribe(() => {
        this.loadNavbar();
      })
    );
  }

  public async ngOnInit(): Promise<void> {
    this.loadNavbar();
    await this.checkUserLoggedIn();
  }

  private async checkUserLoggedIn(): Promise<void> {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.userRoles = await this.keycloak.getUserRoles();
    }

    this.loadNavbar();
  }

  private loadNavbar(): void {
    this.navbarItems = [
      {
        label: this.translateService.instant('navbar.home'),
        icon: 'pi pi-fw pi-home',
        routerLink: ['/'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: this.translateService.instant('navbar.creditCards'),
        icon: 'pi pi-fw pi-credit-card',
        items: [
          {
            label: this.translateService.instant('navbar.creditCards'),
            icon: 'pi pi-fw pi-credit-card',
            routerLink: ['/credit-cards'],
          },
          {
            label: this.translateService.instant('navbar.creditCardItems'),
            icon: 'pi pi-fw pi-money-bill',
            routerLink: ['/credit-card-items'],
          },
        ],
      },
      {
        label: this.translateService.instant('navbar.account'),
        icon: 'pi pi-fw pi-user',
        items: [
          {
            visible: this.isLoggedIn,
            label: this.translateService.instant('navbar.settings'),
            icon: 'pi pi-fw pi-cog',
            disabled: true,
          },
          {
            visible: this.isLoggedIn,
            label: this.translateService.instant('navbar.logout'),
            command: () => this.logout(),
            icon: 'pi pi-fw pi-sign-out',
          },
          {
            visible: !this.isLoggedIn,
            label: this.translateService.instant('navbar.login'),
            command: () => this.login(),
            icon: 'pi pi-fw pi-sign-in',
          },
        ],
      },
      {
        visible: includesRole(this.userRoles, 'admin'),
        label: this.translateService.instant('navbar.admin'),
        icon: 'pi pi-fw pi-shield',
        routerLink: ['/admin'],
      },
    ];

    this.cdr.markForCheck();
  }

  public login(): void {
    this.keycloak.login();
  }

  public logout(): void {
    this.keycloak.logout();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
