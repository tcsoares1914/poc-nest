import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService } from '@src/health-check/health-check.service';

describe('HealthCheckService', () => {
  let service: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthCheckService],
    }).compile();

    service = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be "API"', () => {
    const expected = {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
      healthy: true,
      services: { api: true, database: true },
    };
    expect(service.check()).toBeDefined();
    expect(service.check()).resolves.toEqual(expected);
  });
});
