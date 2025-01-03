import { Resolver, Query } from '@nestjs/graphql';
import { HealthCheckService } from '@src/health-check/health-check.service';

@Resolver('HealthCheck')
export class HealthCheckResolver {
  /**
   * Inject repository dependency.
   */
  constructor(private readonly healthCheckService: HealthCheckService) {}

  /**
   * Get Health Check.
   */
  @Query('healthCheck')
  public health() {
    return this.healthCheckService.check();
  }
}
