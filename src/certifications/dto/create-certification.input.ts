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
  status: string;

  @IsNotEmpty()
  @IsString()
  verificationUrl: string;

  @IsNotEmpty()
  @IsString()
  badgeUrl: string;
}
