import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckResolver } from '@src/health-check/health-check.resolver';
import { HealthCheckService } from '@src/health-check/health-check.service';

@Module({
  imports: [TerminusModule],
  providers: [HealthCheckResolver, HealthCheckService],
})
export class HealthCheckModule {}
