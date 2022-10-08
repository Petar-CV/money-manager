import { AdminDashboardRoutes } from '../routing';

export interface IAdminDashboard {
  title: string;
  description: string;
  route: string;
}

export const ADMIN_DASHBOARDS: IAdminDashboard[] = [
  {
    title: 'adminCreditCardsDashboard.pageTitle',
    description: 'adminCreditCardsDashboard.pageDescription',
    route: AdminDashboardRoutes.ADMIN_CREDIT_CARD_DASHBOARD,
  },
];
