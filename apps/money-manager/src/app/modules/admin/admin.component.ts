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

import { ProfileSettingsRoutes } from '../private/constants/routing';
import {
  AdminRoutes,
  AdminCreditCardIssuersRoutes,
  AdminCreditCardsRoutes,
  AdminCreditCardItemsRoutes,
} from './constants/routing';

@Component({
  selector: 'petar-cv-admin',
  templateUrl: './admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public adminMenuBarItems: MenuItem[] = [];
  public userProfile?: KeycloakProfile;

  constructor(
    private readonly translateService: TranslateService,
    private readonly keycloakService: KeycloakService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.userProfile = await this.keycloakService.loadUserProfile();

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
        label: this.translateService.instant('navbar.account'),
        icon: 'pi pi-fw pi-user',
        items: [
          {
            visible: !!this.userProfile,
            label: this.translateService.instant('navbar.settings'),
            icon: 'pi pi-fw pi-cog',
            routerLink: [ProfileSettingsRoutes.PRIVATE_PROFILE_SETTINGS],
          },
          {
            visible: !!this.userProfile,
            label: this.translateService.instant('navbar.logout'),
            command: () => this.keycloakService.logout(),
            icon: 'pi pi-fw pi-sign-out',
          },
          {
            visible: !this.userProfile,
            label: this.translateService.instant('navbar.login'),
            command: () => this.keycloakService.login(),
            icon: 'pi pi-fw pi-sign-in',
          },
        ],
      },
      {
        label: this.translateService.instant('navbar.admin'),
        icon: 'pi pi-fw pi-shield',
        routerLink: [AdminRoutes.ADMIN],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: this.translateService.instant('adminNavbar.entities.title'),
        icon: 'pi pi-fw pi-database',
        items: [
          {
            label: this.translateService.instant(
              'adminNavbar.entities.creditCards'
            ),
            icon: 'pi pi-fw pi-credit-card',
            items: [
              {
                label: this.translateService.instant(
                  'adminNavbar.entities.creditCardIssuers'
                ),
                icon: 'pi pi-fw pi-building',
                routerLink: [
                  AdminCreditCardIssuersRoutes.ADMIN_CREDIT_CARD_ISSUERS,
                ],
              },
              {
                label: this.translateService.instant(
                  'adminNavbar.entities.creditCards'
                ),
                icon: 'pi pi-fw pi-credit-card',
                routerLink: [AdminCreditCardsRoutes.ADMIN_CREDIT_CARDS],
              },
              {
                label: this.translateService.instant(
                  'adminNavbar.entities.creditCardItems'
                ),
                icon: 'pi pi-fw pi-money-bill',
                routerLink: [
                  AdminCreditCardItemsRoutes.ADMIN_CREDIT_CARD_ITEMS,
                ],
              },
            ],
          },
        ],
      },
    ];

    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
