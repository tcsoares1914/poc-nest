import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import apiConfig from '@src/config/api.config';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthCheckModule } from '@src/health-check/health-check.module';
import { UsersModule } from '@src/users/users.module';
import { AuthModule } from '@src/auth/auth.module';

const importedModules = [HealthCheckModule, UsersModule, AuthModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      dbName: process.env.DATABASE_NAME,
    }),
    ...importedModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
