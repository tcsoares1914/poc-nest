import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CertificationsService } from '@src/certifications/certifications.service';
import { Certification } from '@src/certifications/schemas/certification.schema';
import { CertificationTestMocks } from '@src/commom/tests/mocks/certification.mock';

describe('CertificationsService', () => {
  let service: CertificationsService;
  let model: Model<Certification>;

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

    mockModel.save.mockReset();
    mockModel.find.mockReset();
    mockModel.findById.mockReset();
    mockModel.findByIdAndUpdate.mockReset();
    mockModel.findByIdAndDelete.mockReset();

    service = module.get<CertificationsService>(CertificationsService);
    model = module.get<Model<Certification>>(getModelToken(Certification.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When try to create a new certification.', () => {
    it('should create a new certification.', async () => {});
    it('should throw an InternalServerErrorException when create a new certification.', async () => {});
  });

  describe('When try to list all certifications.', () => {
    it('should return a list all certifications.', async () => {
      const certifications = CertificationTestMocks.getCertifications();
      mockModel.find.mockReturnValue(certifications);
      const result = await service.findAll();

      expect(model.find).toHaveBeenCalledTimes(1);

      expect(result).toHaveLength(certifications.length);
      expect(mockModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When try to list one certification.', () => {
    it('should list one certification.', async () => {
      const certification = CertificationTestMocks.getValidCertification();
      mockModel.findById.mockReturnValue(certification);
      const id = '000000000000000000000000';
      const findAction = await service.findOne(id);

      expect(findAction).toMatchObject(certification);
      expect(mockModel.findById).toHaveBeenCalledTimes(1);
    });
    it('should throw an BadRequestException when list one certification.', async () => {
      mockModel.findById.mockReturnValue(null);
      const id = '000-000-000-000';

      await service.findOne(id).catch((ex) => {
        expect(ex).toBeInstanceOf(BadRequestException);
        expect(ex).toMatchObject({
          message: 'ID must be a ObjectId!',
        });
      });
    });
    it('should throw an NotFoundException when list one certification.', async () => {
      mockModel.findById.mockReturnValue(null);
      const id = '000000000000000000000000';

      await service.findOne(id).catch((ex) => {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex).toMatchObject({
          message: 'Certification not found!',
        });
      });
    });
  });

  describe('When try to update certification data.', () => {
    it('should update a one certification data.', async () => {
      const certifications = CertificationTestMocks.getCertifications();
      const id = '000000000000000000000000';
      const updatedCertification = {
        code: 'AZ-000',
      };
      mockModel.findByIdAndUpdate.mockReturnValue({
        ...certifications[0],
        ...updatedCertification,
      });

      const updateAction = await service.update(id, updatedCertification);

      expect(updateAction).toMatchObject(updatedCertification);
      expect(mockModel.findByIdAndUpdate).toBeCalledTimes(1);
    });
    it('should throw an BadRequestException when list one certification.', async () => {
      mockModel.findById.mockReturnValue(null);
      const id = '000-000-000-000';
      const data = { description: 'test' };

      await service.update(id, data).catch((ex) => {
        expect(ex).toBeInstanceOf(BadRequestException);
        expect(ex).toMatchObject({
          message: 'ID must be a ObjectId!',
        });
      });
    });
    it('should throw an NotFoundException when update one certification.', async () => {
      const id = '000000000000000000000000';
      const updatedCertification = {
        code: 'AZ-000',
      };
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new NotFoundException('Certification not found!'));

      await service.update(id, updatedCertification).catch((ex) => {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex).toMatchObject({
          message: 'Certification not found!',
        });
      });
    });
  });

  describe('When try to delete certification.', () => {
    it('should delete one certification.', async () => {
      const certification = CertificationTestMocks.getValidCertificationDto();
      mockModel.findById.mockReturnValue(certification);
      mockModel.findByIdAndDelete.mockReturnValue(certification);
      const id = '000000000000000000000000';
      const deleteAction = await service.remove(id);

      expect(deleteAction).toMatchObject(certification);
      expect(mockModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
    it('should throw an BadRequestException when list one certification.', async () => {
      mockModel.findById.mockReturnValue(null);
      const id = '000-000-000-000';

      await service.remove(id).catch((ex) => {
        expect(ex).toBeInstanceOf(BadRequestException);
        expect(ex).toMatchObject({
          message: 'ID must be a ObjectId!',
        });
      });
    });
    it('should throw an NotFoundException when delete one certification.', async () => {
      const certification = CertificationTestMocks.getValidCertificationDto();
      mockModel.findById.mockReturnValue(certification);
      mockModel.findByIdAndDelete.mockReturnValue(null);
      const id = '000000000000000000000000';

      await service.remove(id).catch((ex) => {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex).toMatchObject({
          message: 'Certification not found!',
        });
      });
    });
  });
});
