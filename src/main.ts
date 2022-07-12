import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService)
  const port = configService.get('api.port')
  const exposedPort = configService.get('api.exposedPort')
  await app.listen(port)
  Logger.log(
    `🔥 Nest Server running on http://localhost:${exposedPort}`,
    'NestBootstrap',
  )
}
bootstrap()
