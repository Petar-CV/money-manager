import { KeycloakConnectOptions } from 'nest-keycloak-connect';

const keycloakConfig: KeycloakConnectOptions = {
  authServerUrl: 'https://money-manager.petar-cv.com/auth',
  realm: 'Money-Manager',
  clientId: 'money-manager-api',
  secret: 'BOG1z0eKGYH6ezoY3xA38sCjTVCwo00w',
};

export const environment = {
  production: true,
  kafka_url: 'kafka:9092',
  keycloak: keycloakConfig,
};
