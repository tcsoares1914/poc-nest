import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckResolver } from '@src/health-check/health-check.resolver';
import { HealthCheckService } from '@src/health-check/health-check.service';

describe('HealthCheckResolver', () => {
  let resolver: HealthCheckResolver;

  const mockService = {
    check: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthCheckResolver,
        {
          provide: HealthCheckService,
          useValue: mockService,
        },
      ],
    }).compile();

    mockService.check.mockReset();

    resolver = module.get<HealthCheckResolver>(HealthCheckResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should be "API"', async () => {
    const expected = {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
      healthy: true,
      services: { api: true, database: true },
    };
    mockService.check.mockResolvedValue(expected);

    await resolver.health();

    expect(resolver.health()).toBeDefined();
    expect(resolver.health()).resolves.toEqual(expected);
    expect(mockService.check).toHaveBeenCalledTimes(3);
  });
});
