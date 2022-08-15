import { KeycloakConnectOptions } from 'nest-keycloak-connect';

const keycloakConfig: KeycloakConnectOptions = {
  authServerUrl: 'http://localhost:8080/auth',
  realm: 'master',
  clientId: 'money-manager-api',
  secret: 'dwX2nVMI7G2XxYijYKs0wp4x59A1zyxY',
};

export const environment = {
  production: false,
  kafka_url: 'localhost:9092',
  keycloak: keycloakConfig,
};
