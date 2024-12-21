import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  /**
   * Return API status.
   */
  check() {
    return {
      healthy: true,
      name: 'API',
      version: process.env.npm_package_version,
    };
  }
}
