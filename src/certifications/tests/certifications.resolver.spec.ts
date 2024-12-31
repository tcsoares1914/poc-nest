import { Test, TestingModule } from '@nestjs/testing';
import { CertificationsResolver } from '@src/certifications/certifications.resolver';
import { CertificationsService } from '@src/certifications/certifications.service';
import { CreateCertificationInput } from '@src/certifications/dto/create-certification.input';
import { UpdateCertificationInput } from '@src/certifications/dto/update-certification.input';
import { CertificationTestMocks } from '@src/commom/tests/mocks/certification.mock';
import { NotFoundException } from '@nestjs/common';

describe('CertificationsResolver', () => {
  let resolver: CertificationsResolver;
  let service: CertificationsService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockCertifications = CertificationTestMocks.getCertifications();
  const mockNewCertification = CertificationTestMocks.getNewCertification();
  const mockUpdatedCertification =
    CertificationTestMocks.getUpdatedCertification();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CertificationsResolver,
        {
          provide: CertificationsService,
          useValue: mockService,
        },
      ],
    }).compile();

    mockService.create.mockReset();
    mockService.findAll.mockReset();
    mockService.findOne.mockReset();
    mockService.update.mockReset();
    mockService.remove.mockReset();

    resolver = module.get<CertificationsResolver>(CertificationsResolver);
    service = module.get<CertificationsService>(CertificationsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('When try to create a new certification.', () => {
    it('should create a new certification.', async () => {
      const input: CreateCertificationInput = {
        code: 'AZ-900',
        name: 'Azure Fundamentals',
        description: 'Azure Fundamentals Certification description.',
        badgeUrl: 'https://domain.com/assets/badge.png',
        certificationUrl: 'https://domain.com/certification/az-900',
        verificationUrl: 'https://domain.com/verify/az-900',
      };

      mockService.create.mockResolvedValue(mockNewCertification);
      const response = await resolver.create(input);

      expect(response).toEqual(mockNewCertification);
      expect(mockService.create).toHaveBeenCalledTimes(1);
      expect(mockService.create).toHaveBeenCalledWith(input);
    });
  });

  describe('When try to list all certifications.', () => {
    it('should return a list all certifications.', async () => {
      mockService.findAll.mockResolvedValue(mockCertifications);
      const response = await resolver.findAll();

      expect(typeof response).toEqual('object');
      expect(response).toEqual(mockCertifications);
      expect(mockService.findAll).toHaveBeenCalledTimes(1);
    });
    it('should thow an Error when list all certifications.', () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());
      expect(service.findAll).rejects.toThrowError();
    });
  });

  describe('When try to list one certification.', () => {
    it('should list one certification.', async () => {
      mockService.findOne.mockResolvedValue(mockCertifications[0]);
      const id = '00000000-0000-0000-0000-000000000000';
      const response = await resolver.findOne(id);

      expect(response).toEqual(mockCertifications[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
    it('should throw an Error when list one certification.', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      const id = '00000000-0000-0000-0000-000000000000';
      expect(service.findOne(id)).rejects.toThrowError();
    });
  });

  describe('When try to update certification data.', () => {
    it('should update a one certification data.', async () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const input: UpdateCertificationInput = {
        code: 'AZ-900',
      };
      mockService.update.mockResolvedValue(mockUpdatedCertification);
      const result = await resolver.update(id, input);

      expect(result).toMatchObject({
        code: input.code,
      });
      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(id, input);
    });
    it('should throw an Error when update one certification.', () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      expect(service.update).rejects.toThrowError();
    });
  });

  describe('When try to delete certification.', () => {
    it('should delete one certification.', async () => {
      mockService.remove.mockResolvedValue(undefined);
      const id = '00000000-0000-0000-0000-000000000000';
      const result = await resolver.remove(id);

      expect(result).toBeUndefined();
    });
    it('should throw an NotFoundException when delete one certification.', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new NotFoundException());

      expect(service.remove).rejects.toThrowError();
    });
  });
});
