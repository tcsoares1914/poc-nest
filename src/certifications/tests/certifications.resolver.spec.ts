import { Test, TestingModule } from '@nestjs/testing';
import { CertificationsResolver } from '../certifications.resolver';
import { CertificationsService } from '../certifications.service';

describe('CertificationsResolver', () => {
  let resolver: CertificationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CertificationsResolver, CertificationsService],
    }).compile();

    resolver = module.get<CertificationsResolver>(CertificationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
