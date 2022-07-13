import { registerAs } from '@nestjs/config'
import { ApiConfig } from '@src/interfaces/config'

const { PORT, EXPOSED_PORT } = process.env

export const defaultApiConfig: ApiConfig = {
  port: parseInt(PORT) || 3000,
  exposedPort: parseInt(EXPOSED_PORT) || 4000,
}

export default registerAs('api', (): ApiConfig => defaultApiConfig)
