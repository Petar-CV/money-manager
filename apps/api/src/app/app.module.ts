import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';

import { PrismaModule } from '../prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { PrivateModule } from './private/private.module';
import { KafkaModule } from './shared/modules/kafka/kafka.module';
import { ExceptionLoggerService } from './shared/services/exception-logger/exception-logger.service';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/auth', // TODO: Implement environment variable
      realm: 'Money-Manager', // TODO: Implement environment variable
      clientId: 'money-manager-api', // TODO: Implement environment variable
      secret: 'UCfxwla5rOFfuOy4w6Oycvz8vjqj0yWx', // TODO: Implement environment variable
    }),
    PrismaModule,
    KafkaModule,
    PrivateModule,
    AdminModule,
  ],
  providers: [
    // This adds a global level authentication guard,
    // you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // This adds a global level resource guard, which is permissive.
    // Only controllers annotated with @Resource and
    // methods with @Scopes
    // are handled by this guard.
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    // New in 1.1.0
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the
    // optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    ExceptionLoggerService,
  ],
})
export class AppModule {}
