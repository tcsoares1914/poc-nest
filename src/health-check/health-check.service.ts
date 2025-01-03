import { Injectable } from '@nestjs/common';
import { HealthCheck } from '@src/graphql';

@Injectable()
export class HealthCheckService {
  /**
   * Return API status.
   *
   * @public
   * @returns API status
   */
  public async check(): Promise<HealthCheck> {
    const api = await this.getApiStatus();
    const database = await this.getDatabaseStatus();
    return {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
      healthy: api && database,
      services: {
        api: api,
        database: database,
      },
    };
  }

  /**
   * Get API status.
   *
   * @protected
   * @returns {boolean} API status.
   */
  protected async getApiStatus(): Promise<boolean> {
    return true;
  }

  /**
   * Get Database status.
   *
   * @protected
   * @returns {boolean} Database status.
   */
  protected async getDatabaseStatus(): Promise<boolean> {
    return true;
  }
}
