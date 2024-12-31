import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateCertificationInput } from '@src/certifications/dto/create-certification.input';

export class UpdateCertificationInput extends PartialType(
  CreateCertificationInput,
) {
  readonly id: string;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  verificationUrl: string;

  @IsOptional()
  @IsString()
  badgeUrl: string;
}
