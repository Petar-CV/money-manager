import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'https://money-manager.petar-cv.com/auth',
  realm: 'Money-Manager',
  clientId: 'money-manager-front',
};

export const environment = {
  production: true,
  private_api: 'http://money-manager.petar-cv.com/api/private',
  admin_api: 'http://money-manager.petar-cv.com/api/admin',
  keycloak: keycloakConfig,
};
