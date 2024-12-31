import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateCertificationInput } from '@src/certifications/dto/create-certification.input';

export class UpdateCertificationInput extends PartialType(
  CreateCertificationInput,
) {
  @IsOptional()
  @IsString()
  readonly id?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  badgeUrl?: string;

  @IsOptional()
  @IsString()
  certificationUrl?: string;

  @IsOptional()
  @IsString()
  verificationUrl?: string;
}
