import { KeycloakConnectOptions } from 'nest-keycloak-connect';

const keycloakConfig: KeycloakConnectOptions = {
  authServerUrl: 'https://money-manager.petar-cv.com/auth',
  realm: 'master',
  clientId: 'money-manager-api',
  secret: 'dwX2nVMI7G2XxYijYKs0wp4x59A1zyxY',
};

export const environment = {
  production: true,
  kafka_url: 'localhost:9092', // TODO: Change to production URL
  keycloak: keycloakConfig,
};
