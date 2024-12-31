import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCertificationInput } from '@src/certifications/dto/create-certification.input';
import { UpdateCertificationInput } from '@src/certifications/dto/update-certification.input';
import { Certification } from '@src/certifications/schemas/certification.schema';

@Injectable()
export class CertificationsService {
  /**
   * Inject repository dependency.
   */
  constructor(
    @InjectModel(Certification.name)
    private certificationModel: Model<Certification>,
  ) {}

  /**
   * Create a new certification.
   */
  async create(
    createCertificationInput: CreateCertificationInput,
  ): Promise<Certification> {
    const user = new this.certificationModel(createCertificationInput);
    const newUser = await user.save();

    if (!newUser) {
      throw new InternalServerErrorException(
        'Problem to create a new certification. Try again!',
      );
    }

    return newUser;
  }

  /**
   * Find all certifications.
   */
  async findAll(): Promise<Certification[]> {
    const certifications = await this.certificationModel.find();

    return certifications;
  }

  /**
   * Find a certification by ID.
   */
  async findOne(id: string): Promise<Certification> {
    const certification = await this.certificationModel.findById(id);

    if (!certification) {
      throw new NotFoundException('Certification not found!');
    }

    return certification;
  }

  /**
   * Update a certification by ID.
   */
  async update(
    id: string,
    updateCertificationInput: UpdateCertificationInput,
  ): Promise<Certification> {
    const certification = await this.certificationModel.findByIdAndUpdate(
      id,
      updateCertificationInput,
    );

    if (!certification) {
      throw new NotFoundException('Certification not found!');
    }

    return certification;
  }

  /**
   * Remove a certification by ID.
   */
  async remove(id: number): Promise<Certification> {
    const certification = this.certificationModel.findByIdAndDelete(id);

    if (!certification) {
      throw new NotFoundException('Certification not found!');
    }

    return certification;
  }
}
