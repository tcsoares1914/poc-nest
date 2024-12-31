import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CertificationsService } from '@src/certifications/certifications.service';
import { Certification } from '@src/certifications/schemas/certification.schema';

describe('CertificationsService', () => {
  let service: CertificationsService;

  const mockModel = {
    save: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Certification.name),
          useValue: mockModel,
        },
        CertificationsService,
      ],
    }).compile();

    service = module.get<CertificationsService>(CertificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
