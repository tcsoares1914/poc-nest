import { Test, TestingModule } from '@nestjs/testing';
import { CertificationsResolver } from '@src/certifications/certifications.resolver';
import { CertificationsService } from '@src/certifications/certifications.service';

describe('CertificationsResolver', () => {
  let resolver: CertificationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CertificationsResolver,
        {
          provide: CertificationsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<CertificationsResolver>(CertificationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
