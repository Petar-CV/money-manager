import { KeycloakConnectOptions } from 'nest-keycloak-connect';

const keycloakConfig: KeycloakConnectOptions = {
  authServerUrl: 'https://money-manager.petar-cv.com/auth',
  realm: 'Money-Manager',
  clientId: 'money-manager-api',
  secret: 'hUUBmlhqp0Q6qKCzKQ5coedvwHvTPFIm',
};

export const environment = {
  production: true,
  kafka_url: 'localhost:9092', // TODO: Change to production URL
  keycloak: keycloakConfig,
};
