import { KeycloakConnectOptions } from 'nest-keycloak-connect';

const keycloakConfig: KeycloakConnectOptions = {
  authServerUrl: 'http://localhost:8080/auth',
  realm: 'Money-Manager',
  clientId: 'money-manager-api',
  secret: 'UCfxwla5rOFfuOy4w6Oycvz8vjqj0yWx',
};

export const environment = {
  production: false,
  kafka_url: 'localhost:9092',
  keycloak: keycloakConfig,
};
