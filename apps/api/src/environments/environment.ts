import { KeycloakConnectOptions } from 'nest-keycloak-connect';

const keycloakConfig: KeycloakConnectOptions = {
  authServerUrl: 'http://localhost:8081/auth',
  realm: 'Money-Manager',
  clientId: 'money-manager-api',
  secret: 'tLBr8k14hC5W7vNmiEc75QECsbQ7XN4e',
};

export const environment = {
  production: false,
  kafka_url: 'localhost:9092',
  keycloak: keycloakConfig,
};
