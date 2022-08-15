import { KeycloakConnectOptions } from 'nest-keycloak-connect';

const keycloakConfig: KeycloakConnectOptions = {
  authServerUrl: 'http://localhost:8080/auth',
  realm: 'Money-Manager',
  clientId: 'money-manager-api',
  secret: '5lLPwG5KzXpIkhJqfS3wTxQFx2txY9yO',
};

export const environment = {
  production: false,
  kafka_url: 'localhost:9092',
  keycloak: keycloakConfig,
};
