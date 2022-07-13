import { ConfigModule } from '@nestjs/config'
import apiConfig from '@src/config/api.config'

const ConfigurationModule = ConfigModule.forRoot({
  load: [apiConfig],
  isGlobal: true,
})

export default ConfigurationModule
