import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import apiConfig from '@src/config/api.config';
import { GraphQLModule } from '@nestjs/graphql';
import graphqlConfig from '@src/config/graphql.config';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthCheckModule } from '@src/health-check/health-check.module';
import { UsersModule } from '@src/users/users.module';
import { CertificationsModule } from '@src/certifications/certifications.module';

const importedModules = [HealthCheckModule, UsersModule, CertificationsModule];
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig],
      isGlobal: true,
    }),
    GraphQLModule.forRoot(graphqlConfig),
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      dbName: process.env.DATABASE_NAME,
    }),
    ...importedModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
