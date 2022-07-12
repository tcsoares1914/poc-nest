import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import ConfigurationModule from '@src/modules/configuration.module'

const bootstrapModules = [ConfigurationModule]

@Module({
  imports: [...bootstrapModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
