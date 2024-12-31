import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCertificationInput {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  badgeUrl: string;

  @IsNotEmpty()
  @IsString()
  certificationUrl: string;

  @IsNotEmpty()
  @IsString()
  verificationUrl: string;
}
